import { Loader2, Play, Search } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CodeLine, Packet, ScaledCanvas, StageShell, Typewriter } from '../shared';
import type { Frame } from './script';

const W = 640;
const H = 320;

const EDITOR_CODE = [
  'def binary_search(arr, target):',
  '    lo, hi = 0, len(arr) - 1',
  '    while lo <= hi:',
  '        mid = (lo + hi) // 2',
  '        if arr[mid] == target:',
  '            return mid',
  '        if arr[mid] < target:',
  '            lo = mid',
  '        else:',
  '            hi = mid - 1',
  '    return -1',
];

const MANIM_CODE = [
  'from manim import *',
  'class BinarySearch(Scene):',
  '    def construct(self):',
  '        arr = [2, 5, 8, 11, 14, 17, 20, 23]',
  '        cells = VGroup(*[Square(0.8) for _ in arr])',
  '        cells.arrange(RIGHT, buff=0.1)',
  '        self.play(Create(cells))',
  '        lo, hi = 0, len(arr) - 1',
  '        arrow = Arrow(UP, DOWN).next_to(cells[3], UP)',
  '        self.play(GrowArrow(arrow))',
  "        cells[3].set_label('mid')",
  '        self.play(cells[:4].animate.set_opacity(0.2))',
];
const BUGGY_LINE = 10;
const FIXED_LINE = '        self.play(Indicate(cells[3]))';

const EXPLANATION = [
  '`lo` and `hi` bound the part of the list still in play.',
  'Each pass checks the middle: mid = (lo + hi) // 2.',
  'When arr[mid] < target, `lo = mid` can leave lo unchanged, so the loop never ends.',
  'Fix: move past the middle with lo = mid + 1.',
];

const ARRAY = [2, 5, 8, 11, 14, 17, 20, 23];

/* ---------- small building blocks ---------- */

const Window = ({
  title,
  className,
  style,
  children,
  right,
}: {
  title: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  right?: ReactNode;
}) => (
  <div
    className={cn('absolute overflow-hidden rounded-xl border border-white/10 bg-[#15181f] shadow-2xl shadow-black/60', className)}
    style={style}
  >
    <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-3">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      <span className="ml-2 font-mono text-[11px] text-white/50">{title}</span>
      <span className="ml-auto">{right}</span>
    </div>
    {children}
  </div>
);

const Key = ({ k, pressed }: { k: string; pressed?: boolean }) => (
  <span
    className={cn(
      'flex h-7 min-w-7 items-center justify-center rounded-md border border-white/20 bg-white/10 px-1.5 font-mono text-xs text-white shadow-[0_2px_0_rgba(255,255,255,0.15)] transition-transform duration-150',
      pressed && 'translate-y-0.5 bg-primary/40 shadow-none',
    )}
  >
    {k}
  </span>
);

const Editor = ({ highlightBug }: { highlightBug?: boolean }) => (
  <Window title="binary_search.py" style={{ left: 36, top: 30, width: 380, height: 252 }}>
    <pre className="px-3 py-2 font-mono text-[11.5px] leading-[19px] text-white/85">
      {EDITOR_CODE.map((line, i) => (
        <div key={i} className={cn('flex', highlightBug && i === 7 && 'bg-rose-500/15')}>
          <span className="mr-3 w-4 select-none text-right text-white/25">{i + 1}</span>
          <span className="whitespace-pre">
            <CodeLine line={line} />
          </span>
        </div>
      ))}
    </pre>
  </Window>
);

/* ---------- scenes ---------- */

const SEL = { left: 50, top: 70, width: 356, height: 206 };

const CaptureScene = ({ sub }: { sub: number }) => (
  <>
    <Editor />
    {sub >= 1 && (
      <div
        className="absolute rounded-sm border border-dashed border-white/80"
        style={{
          left: SEL.left,
          top: SEL.top,
          width: SEL.width,
          height: SEL.height,
          boxShadow: '0 0 0 999px rgba(4,6,10,0.62), 0 0 24px rgba(125,211,252,0.35)',
          animation: 'demo-grow-box 1s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {[
          ['-left-1 -top-1'],
          ['-right-1 -top-1'],
          ['-left-1 -bottom-1'],
          ['-right-1 -bottom-1'],
        ].map(([pos]) => (
          <span key={pos} className={cn('absolute h-2 w-2 rounded-[2px] bg-white', pos)} />
        ))}
        {sub >= 2 && (
          <span className="demo-pop absolute -bottom-7 right-0 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white/80">
            {SEL.width} × {SEL.height}
          </span>
        )}
      </div>
    )}
    <div className="demo-pop absolute bottom-5 right-6 flex gap-1.5">
      <Key k="⌘" pressed={sub === 0} />
      <Key k="⇧" pressed={sub === 0} />
      <Key k="E" pressed={sub === 0} />
    </div>
  </>
);

const AskScene = ({ sub }: { sub: number }) => (
  <>
    <Editor />
    <div className="absolute inset-0 bg-[#04060a]/60" />
    <div
      className={cn(
        'demo-drop absolute flex items-center gap-3 rounded-2xl border border-white/15 bg-[#1b1f28]/95 px-3 shadow-2xl shadow-black/70 backdrop-blur transition-all duration-500',
        sub >= 1 && 'scale-95 opacity-0',
      )}
      style={{ left: 40, top: 118, width: 560, height: 58 }}
    >
      <span className="h-9 w-12 shrink-0 overflow-hidden rounded-md border border-white/15 bg-[#15181f]">
        <span className="block origin-top-left scale-[0.14] whitespace-pre font-mono text-[11px] leading-[19px] text-white/70">
          {EDITOR_CODE.join('\n')}
        </span>
      </span>
      <Search className="h-4 w-4 shrink-0 text-white/40" />
      <Typewriter text="Help me visualize how this program runs so I can debug it" speed={32} caret className="whitespace-nowrap text-[12.5px] text-white" />
      <span className="ml-auto flex items-center gap-1.5">
        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">Tutor</span>
        <span className="rounded-md bg-primary/30 px-1.5 py-0.5 text-[10px] text-white">Answer</span>
        <Key k="↵" pressed={sub >= 1} />
      </span>
    </div>
    <p className="demo-fade absolute text-[11px] text-white/40" style={{ left: 44, top: 184, animationDelay: '600ms' }}>
      ↓ reuse a recent screenshot
    </p>
  </>
);

const ResultWindow = ({ sub, children, status }: { sub: number; children: ReactNode; status: ReactNode }) => (
  <Window
    title="Clarity"
    className={cn(sub === 0 && 'demo-rise')}
    style={{ left: 110, top: 18, width: 420, height: 276 }}
    right={status}
  >
    {children}
  </Window>
);

const ExplainScene = ({ sub }: { sub: number }) => (
  <>
    <div className="absolute inset-0 opacity-30">
      <Editor highlightBug />
    </div>
    <ResultWindow
      sub={sub}
      status={
        sub === 0 ? (
          <span className="flex items-center gap-1 text-[10px] text-white/60">
            <Loader2 className="demo-spin h-3 w-3" /> writing explanation…
          </span>
        ) : (
          <span className="demo-pop rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">
            explanation ready
          </span>
        )
      }
    >
      <div className="space-y-2.5 p-4">
        {sub === 0
          ? [80, 92, 70, 60].map((w, i) => (
              <div key={i} className="demo-shimmer h-3.5 rounded bg-white/[0.06]" style={{ width: `${w}%` }} />
            ))
          : EXPLANATION.map((line, i) => (
              <p key={i} className="demo-rise flex gap-2.5 text-[12.5px] leading-[18px] text-white/85" style={{ animationDelay: `${i * 450}ms` }}>
                <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/25 text-[10px] text-white">
                  {i + 1}
                </span>
                <span>{line.replace(/`/g, '')}</span>
              </p>
            ))}
      </div>
      <div className="absolute inset-x-4 bottom-4 flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-3">
        <Play className="h-4 w-4 text-white/40" />
        <div className="demo-shimmer h-2 flex-1 rounded-full bg-white/[0.06]" />
        <span className="text-[10px] text-white/45">video on the way</span>
      </div>
      {sub >= 2 && (
        <span className="demo-pop absolute bottom-[72px] right-4 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
          Explainer: critique passed ✓
        </span>
      )}
    </ResultWindow>
  </>
);

/** What Gemini pulled out of the screenshot and the typed question. */
const CONTEXT: [string, string][] = [
  ['language', 'Python'],
  ['topic', 'binary search'],
  ['bug', 'line 8: lo = mid'],
  ['ask', 'visualize it to debug'],
];

/** Manim documentation chunks retrieved from MongoDB Atlas, with similarity scores. */
const DOCS: [name: string, doc: string, score: number][] = [
  ['Square', 'a square mobject', 0.91],
  ['Arrow', 'points from start to end', 0.88],
  ['Indicate', 'briefly highlights a mobject', 0.84],
];

const GenerateScene = ({ sub }: { sub: number }) => {
  const writing = sub >= 2;
  const repaired = sub >= 4;
  return (
    <>
      {/* Gemini's read of the problem */}
      <div
        className={cn(
          'demo-rise absolute rounded-xl border bg-[#15181f] p-3 transition-all duration-500',
          sub === 0 ? 'border-sky-400/60 shadow-[0_0_24px_rgba(56,189,248,0.25)]' : 'border-white/10',
        )}
        style={{ left: 14, top: 10, width: 236, height: 118 }}
      >
        <p className="mb-2 flex items-center justify-between text-[10px]">
          <span className="font-medium text-sky-300">Gemini · problem context</span>
          <span className="text-white/40">from screenshot</span>
        </p>
        {CONTEXT.map(([k, v], i) => (
          <p key={k} className="demo-rise flex justify-between font-mono text-[10.5px] leading-[19px]" style={{ animationDelay: `${150 + i * 170}ms` }}>
            <span className="text-white/45">{k}</span>
            <span className="text-white/90">{v}</span>
          </p>
        ))}
      </div>

      {/* Manim docs retrieved from MongoDB Atlas */}
      <div
        className={cn(
          'absolute rounded-xl border bg-[#15181f] p-3 transition-all duration-500',
          sub === 1 ? 'border-emerald-400/60 shadow-[0_0_24px_rgba(52,211,153,0.25)]' : 'border-white/10',
          sub < 1 && 'opacity-40',
        )}
        style={{ left: 14, top: 138, width: 236, height: 156 }}
      >
        <p className="mb-1.5 flex items-center justify-between text-[10px]">
          <span className="font-medium text-emerald-300">MongoDB Atlas · Manim docs</span>
          {sub === 1 && <Loader2 className="demo-spin h-3 w-3 text-emerald-300" />}
        </p>
        {sub >= 1 ? (
          <>
            <p className="demo-fade mb-1.5 truncate rounded bg-black/30 px-1.5 py-0.5 font-mono text-[9.5px] text-white/60">
              vector search: “array cells + pointer arrow”
            </p>
            {DOCS.map(([name, doc, score], i) => (
              <div
                key={name}
                className="demo-rise mb-1 flex items-center gap-2 rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[9.5px]"
                style={{ animationDelay: `${400 + i * 260}ms` }}
              >
                <span className="w-12 shrink-0 text-[#FFCB6B]">{name}</span>
                <span className="min-w-0 flex-1 truncate text-white/50">{doc}</span>
                <span className="text-emerald-300">{score}</span>
              </div>
            ))}
          </>
        ) : (
          <p className="mt-6 text-center text-[10px] text-white/35">waiting for context…</p>
        )}
      </div>

      {/* context + docs flow into Claude */}
      {sub === 1 && <Packet key="g0" from={[132, 128]} to={[132, 150]} color="#7DD3FC" duration={600} />}
      {sub === 2 && (
        <>
          <Packet key="g1" from={[250, 60]} to={[270, 60]} color="#7DD3FC" duration={500} />
          <Packet key="g2" from={[250, 220]} to={[270, 220]} color="#86EFAC" duration={500} delay={250} />
        </>
      )}

      {/* Claude writes the script, then the sandbox renders it */}
      <Window
        title="scene.py"
        className={cn('transition-all duration-500', sub === 2 && 'border-[#D4A27F]/60 shadow-[0_0_28px_rgba(212,162,127,0.25)]')}
        style={{ left: 264, top: 10, width: 362, height: 284 }}
        right={
          <span className="flex items-center gap-1 text-[10px] text-[#E8C4A6]">
            {sub === 2 && <Loader2 className="demo-spin h-3 w-3" />}
            Claude
          </span>
        }
      >
        {writing ? (
          <pre className="px-3 py-1.5 font-mono text-[9.5px] leading-[14px] text-white/85">
            {MANIM_CODE.map((line, i) => {
              const bug = i === BUGGY_LINE;
              const text = bug && repaired ? FIXED_LINE : line;
              return (
                <div
                  key={`${i}-${bug && repaired}`}
                  className={cn(
                    'flex transition-colors duration-500',
                    sub === 2 && 'demo-rise',
                    bug && sub === 3 && 'bg-rose-500/20',
                    bug && repaired && 'bg-emerald-500/15',
                  )}
                  style={{ animationDelay: sub === 2 ? `${i * 150}ms` : '0ms' }}
                >
                  <span className="mr-2 w-4 select-none text-right text-white/25">{i + 1}</span>
                  <span className="truncate whitespace-pre">
                    <CodeLine line={text} />
                    {bug && sub === 3 && <span className="demo-fade text-rose-300">  ← AttributeError</span>}
                  </span>
                </div>
              );
            })}
          </pre>
        ) : (
          <div className="space-y-2 p-4">
            {[70, 50, 85, 60, 75].map((w, i) => (
              <div key={i} className="h-2.5 rounded bg-white/[0.04]" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
        <div className="absolute inset-x-3 bottom-2.5 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5">
          <p className="mb-1 flex items-center justify-between font-mono text-[9.5px] text-white/50">
            <span>Docker sandbox · no network</span>
            {sub === 3 && <span className="text-amber-300">↺ Claude repairs line {BUGGY_LINE + 1}</span>}
          </p>
          {sub < 3 && <p className="font-mono text-[10px] text-white/35">waiting for script…</p>}
          {sub === 3 && <RenderAttempt n={1} failed running />}
          {sub >= 4 && <RenderAttempt n={2} ok />}
        </div>
      </Window>
    </>
  );
};

const RenderAttempt = ({ n, running, failed, ok }: { n: number; running?: boolean; failed?: boolean; ok?: boolean }) => (
  <div className="demo-rise mb-1 font-mono text-[10px]">
    <div className="flex items-center justify-between text-white/70">
      <span>attempt {n}/3</span>
      {failed && <span className="text-rose-300">failed</span>}
      {ok && <span className="text-emerald-300">clip.mp4 ✓</span>}
    </div>
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
      <div
        className={cn('h-full rounded-full', failed ? 'bg-rose-400' : ok ? 'bg-emerald-400' : 'bg-primary')}
        style={{ animation: `demo-fill ${running ? 1300 : 900}ms ease-out both`, width: failed ? '58%' : '100%' }}
      />
    </div>
  </div>
);

const WatchScene = ({ sub }: { sub: number }) => {
  const lo = sub >= 2 ? 4 : 0;
  const hi = 7;
  const mid = sub >= 3 ? 5 : sub >= 1 ? 3 : -1;
  const found = sub >= 4;
  const CELL = 46;
  const x0 = (420 - 8 * CELL) / 2 + 110;
  const pointer = (i: number, label: string, color: string, top: number) => (
    <span
      className="absolute flex flex-col items-center font-mono text-[11px] transition-all duration-700 ease-out"
      style={{ left: x0 + i * CELL + CELL / 2 - 16, top, width: 32, color }}
    >
      {top < 150 ? (
        <>
          {label}
          <span className="text-[13px] leading-none">▼</span>
        </>
      ) : (
        <>
          <span className="text-[13px] leading-none">▲</span>
          {label}
        </>
      )}
    </span>
  );
  return (
    <>
      <Window title="Clarity" style={{ left: 60, top: 12, width: 520, height: 282 }} right={<span className="text-[10px] text-white/50">Explanation · <span className="text-white">Video</span></span>}>
        <div className="absolute inset-x-3 bottom-3 top-10 rounded-lg bg-black" />
        <p className="demo-fade absolute font-mono text-[12px] text-white/70" style={{ left: 30, top: 50 }}>
          target = 17
        </p>
        <p key={sub} className="demo-rise absolute right-7 font-mono text-[12px]" style={{ top: 50 }}>
          {sub === 1 && <span className="text-amber-300">arr[3] = 11 &lt; 17</span>}
          {sub === 2 && <span className="text-sky-300">lo = mid + 1</span>}
          {sub === 3 && <span className="text-amber-300">arr[5] = 17 == 17</span>}
          {sub === 4 && <span className="text-emerald-300">found at index 5</span>}
        </p>
        <div className="absolute inset-x-6 bottom-6 flex items-center gap-3">
          <Play className="h-3.5 w-3.5 fill-white text-white" />
          <div className="h-1 flex-1 rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white transition-[width] duration-1000 ease-linear" style={{ width: `${(sub + 1) * 20}%` }} />
          </div>
          <span className="font-mono text-[10px] text-white/60">0:{String(4 + sub * 3).padStart(2, '0')} / 0:18</span>
        </div>
      </Window>
      {ARRAY.map((v, i) => {
        const out = i < lo || i > hi;
        return (
          <span
            key={v}
            className={cn(
              'demo-pop absolute flex items-center justify-center rounded-md border font-mono text-[15px] transition-all duration-700',
              found && i === 5
                ? 'border-emerald-300 bg-emerald-400/25 text-white shadow-[0_0_24px_rgba(52,211,153,0.6)]'
                : i === mid
                  ? 'border-amber-300 bg-amber-300/15 text-white'
                  : out
                    ? 'border-white/10 text-white/20'
                    : 'border-white/40 text-white',
            )}
            style={{ left: x0 + i * CELL + 3, top: 140, width: CELL - 6, height: CELL - 6, animationDelay: `${i * 60}ms` }}
          >
            {v}
          </span>
        );
      })}
      {pointer(lo, 'lo', '#7DD3FC', 196)}
      {pointer(hi, 'hi', '#F9A8D4', 196)}
      {mid >= 0 && pointer(mid, 'mid', '#FCD34D', 100)}
    </>
  );
};

/* ---------- side panel + stage ---------- */

const SCENES = {
  capture: CaptureScene,
  ask: AskScene,
  explain: ExplainScene,
  generate: GenerateScene,
  watch: WatchScene,
};

const ClarityStage = ({ frame }: { frame: Frame }) => {
  const Scene = SCENES[frame.scene];
  return (
    <StageShell>
      <ScaledCanvas width={W} height={H}>
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
          <div className="flex h-5 items-center justify-end gap-3 bg-white/[0.04] px-3 text-[10px] text-white/50">
            <span className={cn('flex items-center gap-1 transition-colors', frame.status >= 0 && frame.status < 6 && 'text-primary')}>
              <Search className="h-3 w-3" /> Clarity
            </span>
            <span>9:41</span>
          </div>
          <div key={frame.scene} className="demo-fade absolute inset-0 top-5">
            <Scene sub={frame.sub} />
          </div>
        </div>
      </ScaledCanvas>
    </StageShell>
  );
};

export default ClarityStage;
