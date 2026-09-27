/**
 * A tiny model of the segregated-fit allocator from dynamic-memory-allocator (mm.cpp),
 * just detailed enough to drive the demo: 16-byte cells, an 8-byte header, best fit
 * within a size class, splitting down to 16-byte mini blocks, immediate coalescing,
 * and 4 KB heap growth.
 */

export const CELL_BYTES = 16;
export const HEADER_BYTES = 8;
/** 4 KB growth chunk, in cells. */
export const CHUNK_CELLS = 4096 / CELL_BYTES;

export type Block = { start: number; cells: number; alloc: boolean; id?: string };
export type Heap = { blocks: Block[]; cells: number };

/** Size classes shown in the demo (the allocator has 15; larger ones are folded into the last). */
export const CLASS_LABELS = ['16', '32', '48–64', '80–128', '144–256', '272–512', '528–1K', '1K–2K', '2K+'];

/** Port of get_bucket_index(): 16 B, 32 B, then powers of two. */
export function sizeClass(bytes: number): number {
  if (bytes === CELL_BYTES) return 0;
  let idx = 1;
  let search = Math.max(bytes, 32);
  while (search > 32 && idx < CLASS_LABELS.length - 1) {
    search = Math.floor(search / 2);
    idx++;
  }
  return idx;
}

/** Block size for a request: payload plus header, rounded up to 16 bytes. */
export const blockBytes = (request: number) =>
  Math.max(CELL_BYTES, Math.ceil((request + HEADER_BYTES) / CELL_BYTES) * CELL_BYTES);

export const bytesOf = (b: Block) => b.cells * CELL_BYTES;

export const cloneHeap = (heap: Heap): Heap => ({ cells: heap.cells, blocks: heap.blocks.map((b) => ({ ...b })) });

/** Free blocks grouped by size class, in address order. */
export function freeLists(heap: Heap): Block[][] {
  const lists: Block[][] = CLASS_LABELS.map(() => []);
  for (const b of heap.blocks) if (!b.alloc) lists[sizeClass(bytesOf(b))].push(b);
  return lists;
}

/** Best fit: the first class with any hole that fits, then the smallest such hole. */
export function findFit(heap: Heap, cells: number): Block | null {
  const lists = freeLists(heap);
  for (let c = sizeClass(cells * CELL_BYTES); c < lists.length; c++) {
    const fits = lists[c].filter((b) => b.cells >= cells);
    if (fits.length) return fits.reduce((best, b) => (b.cells < best.cells ? b : best));
  }
  return null;
}

/** Mark `cells` of the free block at `start` as allocated, splitting off any remainder. */
export function place(heap: Heap, start: number, cells: number, id: string): Heap {
  const next = cloneHeap(heap);
  const i = next.blocks.findIndex((b) => b.start === start);
  const hole = next.blocks[i];
  const rest = hole.cells - cells;
  next.blocks.splice(i, 1, { start, cells, alloc: true, id });
  if (rest > 0) next.blocks.splice(i + 1, 0, { start: start + cells, cells: rest, alloc: false });
  return next;
}

/** Merge runs of adjacent free blocks. */
export function coalesce(heap: Heap): Heap {
  const blocks: Block[] = [];
  for (const b of heap.blocks) {
    const last = blocks[blocks.length - 1];
    if (last && !last.alloc && !b.alloc) last.cells += b.cells;
    else blocks.push({ ...b });
  }
  return { cells: heap.cells, blocks };
}

export function markFree(heap: Heap, id: string): Heap {
  const next = cloneHeap(heap);
  const b = next.blocks.find((x) => x.id === id);
  if (b) {
    b.alloc = false;
    delete b.id;
  }
  return next;
}

/** Extend the heap by at least one 4 KB chunk, as a new free block. */
export function grow(heap: Heap, cells: number): Heap {
  const add = Math.max(cells, CHUNK_CELLS);
  const next = cloneHeap(heap);
  next.blocks.push({ start: heap.cells, cells: add, alloc: false });
  next.cells += add;
  return next;
}

/** Build a heap from a list of [cells, id | null] runs (null = free). */
export function heapFrom(runs: [number, string | null][]): Heap {
  let start = 0;
  const blocks = runs.map(([cells, id]) => {
    const b: Block = id ? { start, cells, alloc: true, id } : { start, cells, alloc: false };
    start += cells;
    return b;
  });
  return { blocks, cells: start };
}
