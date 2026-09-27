import { Bot, Check, GitPullRequest, Loader2, MessageSquare, Mic, MicOff, ScreenShare, ShieldCheck, Users, Video } from 'lucide-react';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CodeLine, Packet, ScaledCanvas, StageShell } from '../shared';
import { TRANSCRIPT } from './script';
import type { Frame } from './script';

const W = 640;
const H = 320;

const SPEAKER_COLOR: Record<string, string> = { Maya: '#F9A8D4', Leo: '#7DD3FC', Priya: '#FCD34D' };

const Panel = ({
  title,
  right,
  className,
  style,
  children,
  accent = '#D4D4D8',
}: {
  title: ReactNode;
  right?: ReactNode;
  className?: string;
  style: CSSProperties;
  children?: ReactNode;
  /** Colour identifying the panel. */
  accent?: string;
}) => (
  <div className={cn('absolute overflow-hidden rounded-xl border bg-black', className)} style={{ borderColor: `${accent}40`, ...style }}>
    <div className="flex h-8 items-center justify-between border-b px-3 text-[11px]" style={{ background: `${accent}14`, borderColor: `${accent}26` }}>
      <span className="font-medium" style={{ color: accent }}>
        {title}
      </span>
      <span className="text-white/45">{right}</span>
    </div>
    {children}
  </div>
);

/* ---------- 1 · join ---------- */

/** Zoom's avatar colours when video is off. */
const ZOOM_AVATAR: Record<string, string> = { Maya: '#C2410C', Leo: '#0E7490', Priya: '#7E22CE' };

const TILES: [string, string][] = [
  ['Maya', 'M'],
  ['Leo', 'L'],
  ['Priya', 'P'],
];

const JoinScene = ({ sub, lines }: { sub: number; lines: number }) => {
  const speaking = lines > 0 ? TRANSCRIPT[lines - 1][0] : null;
  const shown = TRANSCRIPT.slice(Math.max(0, lines - 4), lines);
  return (
    <>
      {/* Zoom meeting window */}
      <div className="zoom-ui absolute overflow-hidden rounded-lg bg-[#1c1c1c] font-sans shadow-2xl" style={{ left: 16, top: 14, width: 316, height: 266 }}>
        <div className="flex h-6 items-center gap-1.5 bg-[#242424] px-2.5 text-[9.5px] text-white/80">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <ShieldCheck className="ml-2 h-3 w-3 text-[#23D959]" />
          <span className="mx-auto pr-10">Zoom Meeting</span>
        </div>
        <div className="grid grid-cols-2 gap-1 p-1" style={{ height: 206 }}>
          {[...TILES, ['Sprynt AI', '']].map(([name, initial]) => (
            <div
              key={name}
              className={cn(
                'relative flex items-center justify-center rounded-md bg-[#2b2b2b] ring-2 transition-shadow duration-300',
                speaking === name ? 'ring-[#23D959]' : 'ring-transparent',
              )}
            >
              {initial ? (
                <span className="flex h-12 w-12 items-center justify-center rounded-full text-[18px] font-semibold text-white" style={{ background: ZOOM_AVATAR[name] }}>
                  {initial}
                </span>
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E72ED]">
                  <Bot className="h-6 w-6 text-white" />
                </span>
              )}
              <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">
                {speaking === name ? <Mic className="h-2.5 w-2.5 text-[#23D959]" /> : <MicOff className="h-2.5 w-2.5 text-[#E02828]" />}
                {name}
              </span>
              {!initial && <span className="absolute right-1 top-1 rounded bg-[#E02828] px-1 text-[8px] font-semibold text-white">REC</span>}
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-between bg-[#1a1a1a] px-3 text-[8px] text-white/80">
          {[
            [Mic, 'Mute'],
            [Video, 'Start Video'],
            [Users, 'Participants'],
            [MessageSquare, 'Chat'],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Mic;
            return (
              <span key={label as string} className="flex flex-col items-center gap-0.5">
                <I className="h-3.5 w-3.5" />
                {label as string}
              </span>
            );
          })}
          <span className="flex flex-col items-center gap-0.5 text-[#23D959]">
            <ScreenShare className="h-3.5 w-3.5" />
            Share
          </span>
          <span className="rounded bg-[#E02828] px-2 py-1 text-[9px] font-semibold text-white">End</span>
        </div>
      </div>
      <Panel
        title="Incident room · transcript"
        right={
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> WebSocket
          </span>
        }
        style={{ left: 340, top: 44, width: 280, height: 236 }}
      >
        <div className="space-y-2 p-3">
          {shown.length === 0 && <p className="text-[11px] text-white/40">listening…</p>}
          {shown.map(([who, text]) => (
            <p key={text} className="demo-rise text-[11px] leading-4">
              <span style={{ color: SPEAKER_COLOR[who] }}>{who}</span>
              <span className="text-white/80"> {text}</span>
            </p>
          ))}
        </div>
      </Panel>
      {sub >= 1 && <Packet key={`ws-${sub}`} from={[332, 160]} to={[340, 160]} color="#86EFAC" duration={500} />}
      {sub >= 1 && <Packet key={`ws2-${sub}`} from={[250, 120]} to={[400, 110]} color="#86EFAC" duration={800} />}
    </>
  );
};

/* ---------- 2 · extract ---------- */

type Card = { title: string; owner: string; quote: string };
const CARDS: Card[] = [
  { title: 'Roll back payments-api', owner: 'Leo', quote: '“can you roll back payments-api?”' },
  { title: 'Check DB connection pool', owner: 'Priya', quote: '“I’ll check the DB connection pool”' },
];
/** Column each card sits in per sub-beat (-1 = not detected yet). */
const CARD_COL = [
  [0, 1, 2, 2],
  [-1, 0, 1, 2],
];
const COLS = ['Detected', 'Stable', 'Jira'];
const COL_COLOR = ['#D4D4D8', '#D4D4D8', '#D4D4D8'];
const COL_X = [20, 226, 432];

const ExtractScene = ({ sub }: { sub: number }) => (
  <>
    {COLS.map((c, i) => (
      <div
        key={c}
        className="absolute rounded-xl border"
        style={{ left: COL_X[i], top: 40, width: 188, height: 244, background: 'rgba(255,255,255,0.02)', borderColor: `${COL_COLOR[i]}30` }}
      >
        <p className="flex items-center justify-between px-3 py-2 text-[11px] font-medium" style={{ color: COL_COLOR[i] }}>
          {c}
          {i === 2 && <span className="rounded bg-[#2684FF]/20 px-1.5 text-[9px] text-[#8DB9FF]">Jira sync</span>}
        </p>
      </div>
    ))}
    {CARDS.map((card, i) => {
      const col = CARD_COL[i][sub];
      if (col < 0) return null;
      return (
        <div
          key={card.title}
          className={cn(
            'demo-pop absolute rounded-lg border bg-black p-2.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            col === 2 ? 'border-[#2684FF]/60' : col === 1 ? 'border-emerald-400/40' : 'border-white/10',
          )}
          style={{ left: COL_X[col] + 8, top: 72 + i * 100, width: 172, height: 88 }}
        >
          {col === 0 && <span className="demo-shimmer absolute inset-0 rounded-lg" />}
          <p className="text-[11.5px] font-medium leading-4 text-white">{card.title}</p>
          <p className="mt-1 truncate text-[10px] italic text-white/45">{card.quote}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] text-white/70">
              <span className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-semibold text-black" style={{ background: SPEAKER_COLOR[card.owner] }}>
                {card.owner[0]}
              </span>
              {card.owner}
            </span>
            {col === 0 && <span className="text-[9px] text-white/40">stabilizing…</span>}
            {col === 1 && <span className="text-[9px] text-emerald-300">stable</span>}
            {col === 2 && (
              <span className="demo-pop flex items-center gap-1 rounded bg-[#2684FF]/25 px-1.5 py-0.5 font-mono text-[9px] text-[#B3D1FF]">
                <Check className="h-2.5 w-2.5" /> Jira
              </span>
            )}
          </div>
        </div>
      );
    })}
  </>
);

/* ---------- 3 · deep dive ---------- */

const FILES: [string, number][] = [
  ['api/checkout.go', 0.38],
  ['cmd/server/main.go', 0.12],
  ['db/pool.go', 0.64],
  ['payments/client.go', 0.71],
  ['payments/retry.go', 0.92],
];
const RANKED = [...FILES].sort((a, b) => b[1] - a[1]).map(([name]) => name);

const RETRY_GO = [
  'func (c *Client) Do(req *Request) (*Response, error) {',
  '    backoff := 50 * time.Millisecond',
  '    for attempt := 0; ; attempt++ {',
  '        resp, err := c.do(req)',
  '        if err == nil {',
  '            return resp, nil',
  '        }',
  '        time.Sleep(backoff)',
  '    }',
  '}',
];
const SUSPECT = [2, 7];

const DeepDiveScene = ({ sub }: { sub: number }) => (
  <>
    <Panel
      title="Suspect files"
      right={
        sub === 0 ? (
          <span className="flex items-center gap-1">
            <Loader2 className="demo-spin h-3 w-3" /> analyzing
          </span>
        ) : (
          '38 commits · 2 call signals'
        )
      }
      style={{ left: 20, top: 40, width: 300, height: 244 }}
    >
      {FILES.map(([name, score]) => {
        const rank = sub >= 2 ? RANKED.indexOf(name) : FILES.findIndex(([n]) => n === name);
        const top = sub >= 2 && rank === 0;
        return (
          <div
            key={name}
            className={cn(
              'absolute inset-x-2 flex h-9 items-center gap-2 rounded-lg px-2 font-mono text-[10.5px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
              top ? 'bg-rose-500/10 text-white ring-1 ring-rose-400/50' : 'text-white/70',
            )}
            style={{ top: 40 + rank * 40 }}
          >
            <span className="w-4 text-white/35">{rank + 1}</span>
            <span className="w-[128px] truncate">{name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <span
                className={cn('block h-full rounded-full transition-[width] duration-700', score > 0.8 ? 'bg-rose-400' : score > 0.5 ? 'bg-amber-300' : 'bg-white/40')}
                style={{ width: sub >= 1 ? `${score * 100}%` : '0%' }}
              />
            </span>
            <span className="w-7 text-right text-white/60">{sub >= 1 ? score.toFixed(2) : '–'}</span>
          </div>
        );
      })}
    </Panel>
    <Panel title="payments/retry.go" right={sub >= 2 ? 'lines 3–8' : ''} style={{ left: 336, top: 40, width: 284, height: 244 }}>
      <pre className="relative px-2 py-1.5 font-mono text-[9.5px] leading-[15px] text-white/80">
        {sub >= 2 && (
          <span
            className={cn('demo-fade absolute inset-x-1 rounded bg-rose-500/15 ring-1 ring-rose-400/40', sub === 3 && 'demo-pulse')}
            style={{ top: 6 + SUSPECT[0] * 15, height: (SUSPECT[1] - SUSPECT[0] + 1) * 15 }}
          />
        )}
        {RETRY_GO.map((l, i) => (
          <div key={i} className="relative flex">
            <span className="mr-2 w-3 text-right text-white/25">{i + 1}</span>
            <span className="truncate whitespace-pre">
              <CodeLine line={l} />
            </span>
          </div>
        ))}
      </pre>
      {sub >= 2 && (
        <div className="absolute inset-x-2 bottom-2 space-y-1">
          <p className="demo-rise truncate rounded-md bg-white/5 px-2 py-1 font-mono text-[9.5px] text-white/70">
            commit a41c9e · “tune retry backoff” · 2:08 PM
          </p>
          <p className="demo-rise truncate rounded-md bg-white/5 px-2 py-1 font-mono text-[9.5px] text-white/70" style={{ animationDelay: '200ms' }}>
            call · Maya: “did the retry logic change…”
          </p>
        </div>
      )}
    </Panel>
  </>
);

/* ---------- 4 · fix ---------- */

const DIFF: [before: string, after: string, kind: 'same' | 'mod' | 'add'][] = [
  ['for attempt := 0; ; attempt++ {', 'for attempt := 0; attempt < maxRetries; attempt++ {', 'mod'],
  ['    resp, err := c.do(req)', '    resp, err := c.do(req)', 'same'],
  ['    if err == nil {', '    if err == nil {', 'same'],
  ['        return resp, nil', '        return resp, nil', 'same'],
  ['    }', '    }', 'same'],
  ['    time.Sleep(backoff)', '    time.Sleep(backoff << attempt)', 'mod'],
  ['}', '}', 'same'],
  ['', 'return nil, ErrRetriesExhausted', 'add'],
];

const FixScene = ({ sub }: { sub: number }) => (
  <>
    {(['before', 'after'] as const).map((side, s) => (
      <Panel
        key={side}
        title={s === 0 ? 'payments/retry.go · current' : 'proposed fix'}
        right={s === 1 && sub === 0 ? <Loader2 className="demo-spin h-3 w-3" /> : undefined}
        style={{ left: 20 + s * 304, top: 16, width: 296, height: 206 }}
      >
        <pre className="py-2 font-mono text-[9.5px] leading-[19px]">
          {DIFF.map(([before, after, kind], i) => {
            if (s === 1 && sub === 0) {
              return <div key={i} className="demo-shimmer mx-3 my-[5px] h-[9px] rounded bg-white/[0.05]" style={{ width: `${40 + ((i * 37) % 50)}%` }} />;
            }
            const text = s === 0 ? before : after;
            const changed = kind !== 'same' && text !== '';
            return (
              <div
                key={i}
                className={cn(
                  'flex px-2',
                  s === 1 && 'demo-rise',
                  changed && (s === 0 ? 'bg-rose-500/15' : 'bg-emerald-500/15'),
                )}
                style={s === 1 ? { animationDelay: `${i * 110}ms` } : undefined}
              >
                <span className={cn('mr-1.5 w-2', changed ? (s === 0 ? 'text-rose-300' : 'text-emerald-300') : 'text-transparent')}>
                  {s === 0 ? '−' : '+'}
                </span>
                <span className="truncate whitespace-pre text-white/80">
                  <CodeLine line={text} />
                </span>
              </div>
            );
          })}
        </pre>
      </Panel>
    ))}
    <div className="absolute flex items-center gap-3" style={{ left: 20, top: 236 }}>
      <span
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-300',
          sub >= 2 ? 'scale-95 bg-emerald-500 text-black' : 'bg-white text-black',
        )}
      >
        <GitPullRequest className="h-3.5 w-3.5" /> Open pull request
      </span>
      {sub >= 2 && (
        <span className="demo-pop flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-200">
          <Check className="h-3.5 w-3.5" /> Pull request ready for review
        </span>
      )}
      {sub >= 1 && <span className="demo-fade text-[11px] text-white/50">+3 −2 · bounded retries with exponential backoff</span>}
    </div>
  </>
);

const SCENES: Record<Frame['scene'], ComponentType<{ sub: number; lines: number }>> = {
  join: JoinScene,
  extract: ExtractScene,
  deepdive: DeepDiveScene,
  fix: FixScene,
};

const SpryntStage = ({ frame }: { frame: Frame }) => {
  const Scene = SCENES[frame.scene];
  return (
    <StageShell>
      <ScaledCanvas width={W} height={H}>
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-[#0f1115]">
          <div className="flex h-7 items-center gap-3 border-b border-white/15 bg-black px-3 text-[11px]">
            <span className="font-semibold text-white">Sprynt</span>
            <span className="text-white/50">checkout latency spike</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] text-rose-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="demo-ping absolute inset-0 rounded-full bg-rose-400" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-rose-400" />
              </span>
              LIVE
            </span>
          </div>
          <div key={frame.scene} className="demo-fade absolute inset-0 top-7">
            <Scene sub={frame.sub} lines={frame.lines} />
          </div>
        </div>
      </ScaledCanvas>
    </StageShell>
  );
};

export default SpryntStage;
