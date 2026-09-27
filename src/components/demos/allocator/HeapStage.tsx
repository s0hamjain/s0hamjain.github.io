import { memo, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { CELL_BYTES, HEADER_BYTES, coalesce, findFit } from './model';
import type { Heap } from './model';
import { MAX_CELLS } from './script';
import type { Frame, Tone } from './script';

/** Grid width in cells: wide on desktop, narrower on phones so cells stay legible. */
const WIDE_COLS = 32;
const NARROW_COLS = 24;
/** First cell added by the heap's growth step. */
const GROW_FROM = MAX_CELLS / 2;
const PITCH = 16;
const SIZE = 14;

const TONE_STROKE: Record<Tone, string> = {
  scan: 'rgba(244,244,245,0.55)',
  pick: '#F4F4F5',
  new: '#F4F4F5',
  reject: '#FB7185',
  merge: '#FBBF24',
  fresh: '#7DD3FC',
};

/** Split a run of cells into one [x, y, width] segment per grid row it touches. */
function segments([start, len]: [number, number], cols: number) {
  const out: [number, number, number][] = [];
  for (let i = start; i < start + len;) {
    const row = Math.floor(i / cols);
    const end = Math.min(start + len, (row + 1) * cols);
    out.push([(i % cols) * PITCH, row * PITCH, (end - i) * PITCH - (PITCH - SIZE)]);
    i = end;
  }
  return out;
}

const HeapGrid = memo(({ frame, cols }: { frame: Frame; cols: number }) => {
  const rows = Math.ceil(MAX_CELLS / cols);
  const { heap, focus } = frame;
  const owner = new Array<{ alloc: boolean; head: boolean } | null>(MAX_CELLS).fill(null);
  for (const b of heap.blocks) {
    for (let i = 0; i < b.cells; i++) owner[b.start + i] = { alloc: b.alloc, head: i === 0 };
  }
  const growing = focus?.tone === 'fresh';

  return (
    <svg
      viewBox={`-2 -2 ${cols * PITCH + 2} ${rows * PITCH + 2}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`Heap of ${(heap.cells * CELL_BYTES) / 1024} KB: blue blocks are in use, orange blocks are free`}
    >
      {owner.map((cell, i) => {
        const row = Math.floor(i / cols);
        const x = (i % cols) * PITCH;
        const y = row * PITCH;
        // New cells fill in row by row when the heap grows.
        const delay = growing && i >= GROW_FROM ? `${(row - Math.floor(GROW_FROM / cols)) * 60}ms` : '0ms';
        const fill = !cell
          ? 'transparent'
          : cell.alloc
            ? cell.head
              ? 'hsl(217 62% 46%)'
              : 'hsl(217 85% 63%)'
            : cell.head
              ? 'hsl(18 62% 46%)'
              : 'hsl(18 82% 62%)';
        return (
          <g key={i}>
            <circle
              cx={x + SIZE / 2}
              cy={y + SIZE / 2}
              r={1}
              className="fill-muted-foreground/40 transition-opacity duration-500"
              style={{ opacity: cell ? 0 : 1 }}
            />
            <rect
              x={x}
              y={y}
              width={SIZE}
              height={SIZE}
              rx={2}
              fill={fill}
              className="transition-[fill,opacity] duration-500 ease-out"
              style={{ opacity: cell ? 1 : 0, transitionDelay: delay }}
            />
          </g>
        );
      })}
      {focus?.runs.flatMap((r) =>
        segments(r, cols).map(([x, y, w]) => (
          <rect
            key={`${focus.tone}-${r[0]}-${y}`}
            x={x - 1.5}
            y={y - 1.5}
            width={w + 3}
            height={SIZE + 3}
            rx={3}
            fill="none"
            stroke={TONE_STROKE[focus.tone]}
            strokeWidth={1.5}
            className={cn('heap-focus', focus.tone === 'new' && 'heap-focus-new')}
          />
        )),
      )}
    </svg>
  );
});
HeapGrid.displayName = 'HeapGrid';

const TracePanel = ({ frame }: { frame: Frame }) => (
  // Room for all 7 lines up front so the stats below never shift.
  <ol className="h-48 space-y-1 font-mono text-[13px] leading-6">
    {frame.trace.slice(-7).map((line, i, lines) => {
      const [op, ret] = line.split('  → ');
      const last = i === lines.length - 1;
      return (
        <li
          key={`${frame.trace.length - lines.length + i}-${line}`}
          className={cn('truncate transition-colors duration-300', last ? 'text-foreground' : 'text-muted-foreground/60')}
        >
          <span className={cn('mr-2', last ? 'text-primary' : 'text-transparent')}>›</span>
          {op}
          {ret && <span className="text-muted-foreground"> → {ret}</span>}
        </li>
      );
    })}
  </ol>
);

const Stat = ({ value, unit, label }: { value: string; unit: string; label: string }) => (
  <div>
    <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl">
      {value}
      <span className="ml-0.5 text-xl text-muted-foreground sm:text-2xl">{unit}</span>
    </p>
    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
  </div>
);

/** Share of the heap holding program data: allocated blocks minus their 8-byte headers. */
function utilization(heap: Heap) {
  const payload = heap.blocks.filter((b) => b.alloc).reduce((sum, b) => sum + b.cells * CELL_BYTES - HEADER_BYTES, 0);
  return (100 * payload) / (heap.cells * CELL_BYTES);
}

/**
 * Throughput of the allocator model on this exact heap, measured in the browser:
 * run fit searches of varied sizes (plus a coalescing pass) for a few milliseconds.
 */
function throughput(heap: Heap) {
  const start = performance.now();
  let ops = 0;
  while (performance.now() - start < 3) {
    for (let k = 1; k <= 16; k++) findFit(heap, k * 2);
    coalesce(heap);
    ops += 17;
  }
  return ops / ((performance.now() - start) / 1000) / 1e6;
}

const Stats = ({ heap, className }: { heap: Heap; className?: string }) => {
  const util = useMemo(() => utilization(heap), [heap]);
  const ops = useMemo(() => throughput(heap), [heap]);
  return (
    <div className={cn('flex gap-10', className)}>
      <Stat value={util.toFixed(1)} unit="%" label="utilization" />
      <Stat value={ops.toFixed(1)} unit="M" label="ops / second" />
    </div>
  );
};

/** The animated stage: program trace (with the headline stats under it) beside the heap grid. */
const HeapStage = ({ frame }: { frame: Frame }) => {
  const isMobile = useIsMobile();
  return (
    <figure className="grid items-stretch gap-10 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
      <div className="hidden flex-col xl:flex">
        <TracePanel frame={frame} />
        <Stats heap={frame.heap} className="mt-8 border-t border-border pt-7" />
      </div>
      <div className="flex flex-col justify-center">
        <HeapGrid frame={frame} cols={isMobile ? NARROW_COLS : WIDE_COLS} />
        <Stats heap={frame.heap} className="mt-6 justify-between sm:justify-start xl:hidden" />
      </div>
    </figure>
  );
};

export default HeapStage;
