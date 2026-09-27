import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type StatValue = { value: string; unit?: string; label: string };

const Stat = ({ value, unit, label }: StatValue) => (
  <div>
    <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl">
      {value}
      {unit && <span className="ml-0.5 text-xl text-muted-foreground sm:text-2xl">{unit}</span>}
    </p>
    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
  </div>
);

export const Stats = ({ stats, className }: { stats: StatValue[]; className?: string }) => (
  <div className={cn('flex gap-10', className)}>
    {stats.map((s) => (
      <Stat key={s.label} {...s} />
    ))}
  </div>
);

/**
 * Shared stage layout for project demos. With a `side` panel, it sits beside the animation with
 * headline stats under it (below xl the panel hides and the stats move under the animation).
 * Without one, the animation takes the full width.
 */
export const StageShell = ({
  side,
  stats = [],
  children,
}: {
  side?: ReactNode;
  stats?: StatValue[];
  children: ReactNode;
}) =>
  side ? (
    <figure className="grid items-stretch gap-10 xl:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
      <div className="hidden flex-col xl:flex">
        {side}
        <Stats stats={stats} className="mt-8 border-t border-border pt-7" />
      </div>
      <div className="flex flex-col justify-center">
        {children}
        <Stats stats={stats} className="mt-6 justify-between sm:justify-start xl:hidden" />
      </div>
    </figure>
  ) : (
    <figure>{children}</figure>
  );

/** Fixed height for side panels so the stats under them never shift between frames. */
export const SidePanel = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('h-48 overflow-hidden font-mono text-[13px] leading-6', className)}>{children}</div>
);

/**
 * Draws its children on a fixed-size design canvas and scales it to the available width,
 * so an animation looks the same on a phone and a desktop.
 */
export const ScaledCanvas = ({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={cn('relative w-full', className)} style={{ height: height * scale }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})` }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
};

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Types `text` out one character at a time whenever it changes. */
export const Typewriter = ({
  text,
  speed = 28,
  className,
  caret = false,
}: {
  text: string;
  /** ms per character */
  speed?: number;
  className?: string;
  caret?: boolean;
}) => {
  const [n, setN] = useState(() => (reducedMotion() ? text.length : 0));
  useEffect(() => {
    if (reducedMotion()) {
      setN(text.length);
      return;
    }
    setN(0);
    const id = window.setInterval(() => {
      setN((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return (
    <span className={className}>
      {text.slice(0, n)}
      {caret && <span className="demo-caret" />}
    </span>
  );
};

/** A glowing dot that travels from (x1, y1) to (x2, y2) on a canvas, once per mount. */
export const Packet = ({
  from,
  to,
  color = '#7DD3FC',
  duration = 700,
  delay = 0,
}: {
  from: [number, number];
  to: [number, number];
  color?: string;
  duration?: number;
  delay?: number;
}) => (
  <span
    className="demo-packet absolute h-2.5 w-2.5 rounded-full"
    style={
      {
        left: from[0] - 5,
        top: from[1] - 5,
        background: color,
        boxShadow: `0 0 12px 2px ${color}`,
        '--dx': `${to[0] - from[0]}px`,
        '--dy': `${to[1] - from[1]}px`,
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
      } as CSSProperties
    }
  />
);

/** Mono log line with the newest entry highlighted, shared by the side panels. */
export const LogList = ({ lines, render }: { lines: string[]; render?: (line: string) => ReactNode }) => (
  <ol className="space-y-1">
    {lines.map((line, i) => {
      const last = i === lines.length - 1;
      return (
        <li
          key={`${i}-${line}`}
          className={cn('truncate transition-colors duration-300', last ? 'text-foreground' : 'text-muted-foreground/60')}
        >
          <span className={cn('mr-2', last ? 'text-primary' : 'text-transparent')}>›</span>
          {render ? render(line) : line}
        </li>
      );
    })}
  </ol>
);

const KEYWORDS = new Set([
  'def', 'return', 'if', 'else', 'elif', 'while', 'for', 'in', 'class', 'from', 'import', 'self', 'and', 'or',
  'not', 'None', 'True', 'False', 'func', 'const', 'let', 'await', 'async', 'go', 'err', 'nil', 'with', 'as',
]);

/** Minimal syntax colouring for the one-line code snippets in the demos. */
export const CodeLine = ({ line }: { line: string }) => {
  const [code, comment] = line.split(/(?=#|\/\/)/, 2);
  const parts = code.split(/(\s+|[()[\]{}:,.=+\-*/<>]|"[^"]*"|'[^']*')/).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        let cls = '';
        if (KEYWORDS.has(p)) cls = 'text-[#C792EA]';
        else if (/^\d/.test(p)) cls = 'text-[#F78C6C]';
        else if (/^["']/.test(p)) cls = 'text-[#C3E88D]';
        else if (/^[A-Z][A-Za-z]+$/.test(p)) cls = 'text-[#FFCB6B]';
        else if (/^[a-z_]\w*$/.test(p) && parts[i + 1] === '(') cls = 'text-[#82AAFF]';
        return (
          <span key={i} className={cls}>
            {p}
          </span>
        );
      })}
      {comment && <span className="text-[#5C6773]">{comment}</span>}
    </>
  );
};
