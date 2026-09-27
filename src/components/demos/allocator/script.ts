import { CELL_BYTES, blockBytes, coalesce, findFit, freeLists, grow, heapFrom, markFree, place, sizeClass } from './model';
import type { Block, Heap } from './model';

export type Tone = 'scan' | 'reject' | 'pick' | 'new' | 'merge' | 'fresh';

export type Frame = {
  heap: Heap;
  /** Heap cells to outline, as [start, length] runs. */
  focus?: { runs: [number, number][]; tone: Tone };
  trace: string[];
  /** How long to hold this frame, in ms. */
  hold: number;
};

export type Step = { title: string; body: string; frames: Frame[] };

const hex = (n: number) => `0x${n.toString(16)}`;
/** Payload address the program gets back: block start plus the 8-byte header. */
const addr = (b: Block) => hex(0x1000 + b.start * CELL_BYTES + 8);

/*
 * A program that has been running for a while: live blocks with a few holes between them.
 * Cells are 16 bytes; the heap starts at one 4 KB chunk (256 cells).
 */
const START = heapFrom([
  [10, 'a'], [6, null], [14, 'b'], [5, 'c'], [3, null], [20, 'd'],
  [8, null], [9, 'e'], [4, null], [12, 'f'], [10, null], [30, 'g'],
  [2, null], [40, 'h'], [25, 'i'], [1, null], [57, 'j'],
]);

const HISTORY = ['…', 'e = malloc(136)', 'free(x)', 'f = malloc(180)'];

const find = (heap: Heap, pred: (b: Block) => boolean) => heap.blocks.find(pred)!;
const run = (b: Block): [number, number] => [b.start, b.cells];
/** Deterministic PRNG so the sped-up trace plays the same every time. */
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
}

const holes = (heap: Heap) => heap.blocks.filter((b) => !b.alloc).map(run);

/** Speed multiplier for steps 1–4 (lower is faster). */
const WALKTHROUGH_PACE = 0.6;

function build(): Step[] {
  let trace = [...HISTORY];
  let heap = START;

  /* 1 · Size classes: only one segregated list is searched ------------------ */
  const req = 100;
  const size = blockBytes(req);
  const cls = sizeClass(size);
  const candidates = freeLists(heap)[cls];
  trace = [...trace, `p = malloc(${req})`];
  const classes: Step = {
    title: 'Size classes',
    body: 'Free blocks live in 15 segregated lists by size. malloc(100) needs a 112-byte block, so only the 80–128 byte list is searched.',
    frames: [
      { heap, trace, hold: 1200 },
      { heap, trace, focus: { runs: holes(heap), tone: 'scan' }, hold: 1500 },
      { heap, trace, focus: { runs: candidates.map(run), tone: 'pick' }, hold: 1900 },
    ],
  };

  /* 2 · Best fit & split ------------------------------------------------------ */
  const fit = findFit(heap, size / CELL_BYTES)!;
  const searchFrames: Frame[] = candidates.map((b) => ({
    heap,
    trace,
    focus: { runs: [run(b)], tone: b.cells * CELL_BYTES >= size ? 'pick' : 'reject' },
    hold: 1300,
  }));
  heap = place(heap, fit.start, size / CELL_BYTES, 'p');
  const placed = find(heap, (b) => b.id === 'p');
  trace = [...trace.slice(0, -1), `p = malloc(${req})  → ${addr(placed)}`];
  const search: Step = {
    title: 'Best fit & split',
    body: 'The list is walked for the smallest hole that fits. The 128-byte hole wins, and the leftover 16 bytes split off as a mini block.',
    frames: [...searchFrames, { heap, trace, focus: { runs: [run(placed)], tone: 'new' }, hold: 2400 }],
  };

  /* 3 · Coalesce ------------------------------------------------------------- */
  const victim = find(heap, (b) => b.id === 'f');
  const idx = heap.blocks.indexOf(victim);
  const [left, right] = [heap.blocks[idx - 1], heap.blocks[idx + 1]];
  trace = [...trace, 'free(f)'];
  const freed = markFree(heap, 'f');
  heap = coalesce(freed);
  const merged = find(heap, (b) => b.start === left.start);
  const free: Step = {
    title: 'Coalesce',
    body: 'free() merges the block with its free neighbors right away, and the merged hole moves to the list for its new size.',
    frames: [
      { heap: freed, trace, focus: { runs: [run(victim)], tone: 'reject' }, hold: 1600 },
      { heap: freed, trace, focus: { runs: [run(left), run(victim), run(right)], tone: 'merge' }, hold: 1600 },
      { heap, trace, focus: { runs: [run(merged)], tone: 'merge' }, hold: 2200 },
    ],
  };

  /* 4 · Grow ---------------------------------------------------------------- */
  const big = 3000;
  const bigSize = blockBytes(big);
  trace = [...trace, `q = malloc(${big})`];
  const before = heap;
  heap = grow(heap, bigSize / CELL_BYTES);
  const chunk = heap.blocks[heap.blocks.length - 1];
  const grown = heap;
  heap = place(heap, chunk.start, bigSize / CELL_BYTES, 'q');
  const q = find(heap, (b) => b.id === 'q');
  trace = [...trace.slice(0, -1), `q = malloc(${big})  → ${addr(q)}`];
  const growStep: Step = {
    title: 'Grow',
    body: 'No list has room for malloc(3000), so the heap grows by 4 KB and the block is carved from the new chunk.',
    frames: [
      { heap: before, trace, focus: { runs: holes(before), tone: 'reject' }, hold: 1700 },
      { heap: grown, trace, focus: { runs: [run(chunk)], tone: 'fresh' }, hold: 1600 },
      { heap, trace, focus: { runs: [run(q)], tone: 'new' }, hold: 2600 },
    ],
  };

  /* 5 · A larger trace, sped up ------------------------------------------- */
  // Same rules, many more requests; skips any malloc that would grow past the 8 KB shown.
  const rand = rng(7);
  const traceFrames: Frame[] = [];
  let next = 0;
  while (traceFrames.length < 48) {
    const live = heap.blocks.filter((b) => b.alloc);
    let focus: Frame['focus'];
    if (live.length > 8 && rand() < 0.45) {
      const b = live[Math.floor(rand() * live.length)];
      trace = [...trace, `free(${b.id})`];
      heap = coalesce(markFree(heap, b.id!));
      focus = { runs: [run(b)], tone: 'merge' };
    } else {
      const bytes = 16 + Math.floor(rand() * 24) * 16;
      const cells = blockBytes(bytes) / CELL_BYTES;
      const hole = findFit(heap, cells);
      if (!hole) continue;
      const id = `r${next++}`;
      heap = place(heap, hole.start, cells, id);
      const b = find(heap, (x) => x.id === id);
      trace = [...trace, `${id} = malloc(${bytes})  → ${addr(b)}`];
      focus = { runs: [run(b)], tone: 'new' };
    }
    traceFrames.push({ heap, trace, focus, hold: 160 });
  }
  traceFrames[traceFrames.length - 1].hold = 2500;
  const larger: Step = {
    title: 'Larger trace',
    body: 'The same rules on a longer run of mallocs and frees, sped up: holes open, get reused and merge as the program churns.',
    frames: traceFrames,
  };

  // Walkthrough steps play a bit brisker than the holds above were first tuned for.
  for (const step of [classes, search, free, growStep]) {
    for (const f of step.frames) f.hold = Math.round(f.hold * WALKTHROUGH_PACE);
  }

  return [classes, search, free, growStep, larger];
}

export const STEPS = build();

/** Largest heap any frame shows, so the grid can reserve room for growth. */
export const MAX_CELLS = Math.max(...STEPS.flatMap((s) => s.frames.map((f) => f.heap.cells)));
