import {
  AudioLines,
  Bell,
  Bot,
  Check,
  Cloud,
  Cpu,
  Database,
  Droplets,
  Footprints,
  Mic,
  Plus,
  Sandwich,
  Sparkles,
  Sun,
  Utensils,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Packet, ScaledCanvas, StageShell, Typewriter } from '../shared';
import { TASKS } from './script';
import type { Frame } from './script';

const W = 640;
const H = 320;

const ICONS = { sun: Sun, drop: Droplets, food: Utensils, shoe: Footprints, lunch: Sandwich };
const ICON_BG = { sun: '#FCD34D', drop: '#7DD3FC', food: '#FDBA74', shoe: '#C4B5FD', lunch: '#86EFAC' };

/* ---------- layout: where each piece sits in each beat ---------- */

type Rect = { l: number; t: number; w: number; h: number };
type NodeId = 'api' | 'db' | 'fcm' | 'ai' | 'cpp' | 'stt';

const NODE_INFO: Record<NodeId, { label: string; icon: typeof Cloud }> = {
  api: { label: 'Spring Boot API', icon: Cloud },
  db: { label: 'Firestore', icon: Database },
  fcm: { label: 'FCM push', icon: Bell },
  ai: { label: 'Gemini', icon: Sparkles },
  cpp: { label: 'C++ audio', icon: Cpu },
  stt: { label: 'Speech-to-Text', icon: AudioLines },
};
/** Where a node rests when it isn't part of the current beat (it fades out there). */
const NODE_HOME: Record<NodeId, [number, number]> = {
  api: [385, 110],
  db: [385, 210],
  fcm: [190, 150],
  ai: [385, 210],
  cpp: [290, 70],
  stt: [290, 160],
};

const PHONE_W = 156;
const PHONE_H = 300;

type Layout = {
  portal: Rect | null;
  /** Phone's left edge, or null when off stage. */
  phone: number | null;
  nodes: Partial<Record<NodeId, [number, number]>>;
  active: NodeId[];
};

function layoutFor({ scene, sub }: Frame): Layout {
  switch (scene) {
    case 'build':
      return sub < 3
        ? { portal: { l: 50, t: 14, w: 320, h: 292 }, phone: null, nodes: { api: [500, 110], db: [500, 210] }, active: sub === 2 ? ['api', 'db'] : [] }
        : { portal: { l: 14, t: 14, w: 290, h: 292 }, phone: 470, nodes: { api: [385, 110], db: [385, 210] }, active: ['db'] };
    case 'remind':
      return { portal: null, phone: 330, nodes: { fcm: [190, 150] }, active: sub === 1 ? ['fcm'] : [] };
    case 'complete':
      return { portal: { l: 300, t: 14, w: 320, h: 292 }, phone: 60, nodes: {}, active: [] };
    case 'ask':
      return {
        portal: { l: 14, t: 14, w: 290, h: 292 },
        phone: 470,
        nodes: { api: [385, 110], ai: [385, 210] },
        active: sub === 1 ? ['api'] : sub >= 2 ? ['api', 'ai'] : [],
      };
    case 'voice':
      return {
        portal: sub >= 3 ? { l: 380, t: 14, w: 246, h: 292 } : null,
        phone: 40,
        nodes: sub >= 3 ? { ai: [290, 160] } : { cpp: [290, 70], stt: [290, 160], ai: [290, 250] },
        active: sub === 1 ? ['cpp', 'stt'] : sub === 2 ? ['ai'] : [],
      };
  }
}

/** A point on the phone's left or right edge, for packets. */
const phoneEdge = (l: number, side: 'left' | 'right', y = 150): [number, number] => [side === 'left' ? l : l + PHONE_W, y];

/* ---------- small pieces ---------- */

const TaskIcon = ({ icon, size = 'sm' }: { icon: keyof typeof ICONS; size?: 'sm' | 'lg' }) => {
  const Icon = ICONS[icon];
  return (
    <span
      className={cn('flex shrink-0 items-center justify-center rounded-xl', size === 'lg' ? 'h-16 w-16' : 'h-7 w-7')}
      style={{ background: `${ICON_BG[icon]}33` }}
    >
      <Icon className={size === 'lg' ? 'h-9 w-9' : 'h-4 w-4'} style={{ color: ICON_BG[icon] }} />
    </span>
  );
};

const CardList = ({ done, stagger }: { done: number; stagger?: boolean }) => (
  <div className="space-y-1.5 px-2.5 pt-2">
    {TASKS.map((t, i) => (
      <div
        key={t.title}
        className={cn(
          'flex items-center gap-2 rounded-xl border px-2 py-1.5 transition-all duration-500',
          stagger && 'demo-rise',
          i < done ? 'border-emerald-400/30 bg-emerald-400/5' : i === done ? 'border-primary/60 bg-primary/10' : 'border-white/5 bg-white/[0.03]',
        )}
        style={stagger ? { animationDelay: `${i * 140}ms` } : undefined}
      >
        <TaskIcon icon={t.icon} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[10.5px] text-white">{t.title}</span>
          <span className="block text-[9px] text-white/45">{t.time}</span>
        </span>
      </div>
    ))}
  </div>
);

const TodayList = ({ done, pulse }: { done: number; pulse?: number }) => (
  <div className="space-y-1 px-3 pt-2">
    {TASKS.map((t, i) => (
      <div
        key={t.title}
        className={cn(
          'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10.5px] transition-colors duration-500',
          i === pulse ? 'bg-emerald-400/15' : 'bg-white/[0.03]',
        )}
      >
        <span className="w-9 font-mono text-[9.5px] text-white/45">{t.time}</span>
        <TaskIcon icon={t.icon} />
        <span className={cn('flex-1', i < done ? 'text-white/45 line-through' : 'text-white/85')}>{t.title}</span>
        {i < done ? <Check className="demo-pop h-3.5 w-3.5 text-emerald-400" /> : <span className="h-1.5 w-1.5 rounded-full bg-white/20" />}
      </div>
    ))}
  </div>
);

type Bubble = { who: 'kid' | 'bot'; text: string; tag?: string };

const Chat = ({ bubbles, typing }: { bubbles: Bubble[]; typing?: boolean }) => (
  <div className="flex flex-col gap-1.5 px-2.5 pt-2">
    {bubbles.map((b, i) => (
      <div
        key={i}
        className={cn(
          'demo-rise max-w-[88%] rounded-2xl px-2.5 py-1.5 text-[10px] leading-[14px]',
          b.who === 'kid' ? 'self-end rounded-br-sm bg-primary text-black' : 'self-start rounded-bl-sm bg-white/10 text-white',
        )}
      >
        {b.text}
        {b.tag && <span className="mt-0.5 block text-[8.5px] text-white/45">{b.tag}</span>}
      </div>
    ))}
    {typing && (
      <div className="demo-rise flex gap-1 self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="demo-pulse h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: `${i * 180}ms` }} />
        ))}
      </div>
    )}
  </div>
);

const QUICK = ['What now?', 'What next?', 'When do I eat?', 'I need help'];
const NOISY = Array.from({ length: 22 }, (_, i) => 20 + ((i * 53) % 70));
const CLEAN = Array.from({ length: 22 }, (_, i) => 30 + 55 * Math.abs(Math.sin(i * 0.55)));

/* ---------- per-beat content for the portal and the phone ---------- */

function portalContent({ scene, sub, done }: Frame): { title: string; body: ReactNode } {
  switch (scene) {
    case 'build': {
      const rows = [1, 3, 5, 5][sub];
      return {
        title: 'Ava’s routine',
        body: (
          <>
            <div className="mx-3 mt-1.5 flex items-center justify-between">
              <span className={cn('flex items-center gap-1 text-[10.5px] text-white/60', sub < 2 && 'demo-pulse')}>
                <Plus className="h-3.5 w-3.5" /> Add task
              </span>
              <span
                className={cn(
                  'rounded-lg px-3 py-1 text-[10.5px] font-medium transition-all',
                  sub >= 2 ? 'scale-95 bg-emerald-500 text-black' : 'bg-white text-black',
                )}
              >
                {sub >= 2 ? 'Saved ✓' : 'Save routine'}
              </span>
            </div>
            <div className="space-y-0.5 px-3 pt-1.5">
              {TASKS.slice(0, rows).map((t, i) => (
                <div
                  key={t.title}
                  className="demo-rise flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-[3px]"
                  style={{ animationDelay: `${(i % 2) * 180}ms` }}
                >
                  <span className="w-8 font-mono text-[9.5px] text-white/50">{t.time}</span>
                  <TaskIcon icon={t.icon} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10.5px] text-white">{t.title}</span>
                  </span>
                </div>
              ))}
            </div>
          </>
        ),
      };
    }
    case 'complete':
      return { title: 'Today', body: <TodayList done={done} pulse={sub >= 1 ? done - 1 : undefined} /> };
    case 'ask':
      return {
        title: 'Parent note',
        body: (
          <>
            <div className="mx-3 mt-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
              <p
                className={cn(
                  'mt-1 text-[11px] text-white/85 transition-colors duration-500',
                  sub >= 3 && 'rounded bg-amber-300/15 text-amber-100',
                )}
              >
                Pancakes for breakfast
              </p>
            </div>
            <div className="mx-3 mt-3 space-y-1.5 text-[10.5px]">
              <p className={cn('rounded-lg border px-2.5 py-1.5 transition-colors', sub === 1 ? 'border-emerald-400/50 text-emerald-200' : 'border-white/10 text-white/60')}>
                Now / next → rules
              </p>
              <p className={cn('rounded-lg border px-2.5 py-1.5 transition-colors', sub >= 2 ? 'border-primary/60 text-white' : 'border-white/10 text-white/60')}>
                Anything else → Gemini
              </p>
            </div>
          </>
        ),
      };
    default:
      return {
        title: 'Chat history',
        body: (
          <div className="space-y-1.5 px-3 pt-2">
            {[
              ['What next?', 'Eat breakfast at 8:00.'],
              ['What’s for breakfast?', 'Pancakes!'],
              ['When do I eat lunch?', 'Lunch is at 12:00.'],
            ].map(([q, a], i) => (
              <div key={q} className="demo-rise rounded-lg bg-white/[0.04] p-2" style={{ animationDelay: `${300 + i * 220}ms` }}>
                <p className="text-[10.5px] text-white">“{q}”</p>
                <p className="mt-0.5 text-[10px] text-white/55">→ {a}</p>
              </div>
            ))}
          </div>
        ),
      };
  }
}

function phoneContent({ scene, sub, done }: Frame): { time: string; body: ReactNode } {
  switch (scene) {
    case 'build':
      return { time: '7:29', body: sub >= 3 ? <CardList done={0} stagger /> : null };
    case 'remind':
      return {
        time: sub === 0 ? '7:29' : '7:30',
        body: (
          <>
            {sub < 2 ? (
              <CardList done={0} />
            ) : (
              <div className="demo-pop flex flex-col items-center px-3 pt-6 text-center">
                <span className="mb-3 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-primary">NOW · 7:30</span>
                <TaskIcon icon="sun" size="lg" />
                <p className="mt-3 text-[15px] font-semibold text-white">Wake up</p>
              </div>
            )}
            {sub >= 1 && (
              <div
                className={cn(
                  'demo-drop absolute inset-x-2 top-7 rounded-2xl border border-white/10 bg-[#252833]/95 p-2 shadow-xl transition-all duration-500',
                  sub === 2 && '-translate-y-24 opacity-0',
                )}
              >
                <p className="flex items-center gap-1.5 text-[9px] text-white/55">
                  <Bell className="h-3 w-3" /> RoutineRemind · now
                </p>
                <p className="mt-0.5 text-[10.5px] text-white">Time to wake up! ☀️</p>
              </div>
            )}
          </>
        ),
      };
    case 'complete': {
      const current = TASKS[done];
      const prev = TASKS[done - 1];
      return {
        time: ['7:31', '7:44', '7:58'][sub],
        body: (
          <>
            <div key={done} className="demo-rise flex flex-col items-center px-3 pt-4 text-center">
              <span className="mb-2 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-primary">
                NOW · {current.time}
              </span>
              <TaskIcon icon={current.icon} size="lg" />
              <p className="mt-2 text-[14px] font-semibold text-white">{current.title}</p>
              {prev && <p className="demo-pop mt-2 rounded-full bg-amber-300/15 px-2.5 py-1 text-[10px] text-amber-200">{prev.hint}</p>}
            </div>
            <div className="absolute inset-x-3 bottom-4">
              <div className="mb-3 flex justify-center gap-1">
                {TASKS.map((t, i) => (
                  <span
                    key={t.title}
                    className={cn('h-1.5 w-5 rounded-full transition-colors duration-500', i < done ? 'bg-emerald-400' : 'bg-white/15')}
                  />
                ))}
              </div>
              <span className="relative flex h-10 items-center justify-center overflow-hidden rounded-2xl bg-emerald-500 text-[13px] font-semibold text-black">
                {sub === 0 && <span className="demo-ripple absolute h-10 w-10 rounded-full bg-white" />}
                Done
              </span>
            </div>
          </>
        ),
      };
    }
    case 'ask': {
      const bubbles: Bubble[] = [{ who: 'kid', text: 'What next?' }];
      if (sub >= 1) bubbles.push({ who: 'bot', text: 'Eat breakfast at 8:00.', tag: 'rules' });
      if (sub >= 2) bubbles.push({ who: 'kid', text: 'What’s for breakfast?' });
      if (sub >= 3) bubbles.push({ who: 'bot', text: 'Pancakes!', tag: 'Gemini' });
      return {
        time: '7:59',
        body: (
          <>
            <Chat bubbles={bubbles} typing={sub === 2} />
            <div
              className={cn(
                'absolute inset-x-2 bottom-3 grid grid-cols-2 gap-1 transition-all duration-500',
                sub >= 1 && 'translate-y-4 opacity-0',
              )}
            >
              {QUICK.map((q) => (
                <span
                  key={q}
                  className={cn(
                    'relative overflow-hidden rounded-lg border px-1.5 py-1 text-center text-[9px] transition-colors',
                    q === 'What next?' && sub === 0 ? 'border-primary bg-primary/25 text-white' : 'border-white/10 text-white/70',
                  )}
                >
                  {q === 'What next?' && sub === 0 && (
                    <span className="demo-ripple absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                  )}
                  {q}
                </span>
              ))}
            </div>
          </>
        ),
      };
    }
    default:
      return {
        time: '11:02',
        body: (
          <div className="flex flex-col items-center px-3 pt-4">
            <span className={cn('relative flex h-12 w-12 items-center justify-center rounded-full', sub === 0 ? 'bg-rose-500' : 'bg-white/10')}>
              {sub === 0 && <span className="demo-ping absolute inset-0 rounded-full bg-rose-500" />}
              <Mic className="relative h-5 w-5 text-white" />
            </span>
            <div className="mt-3 flex h-10 items-center gap-[3px]">
              {(sub === 0 ? NOISY : CLEAN).map((h, i) => (
                <span
                  key={i}
                  className={cn('w-[3px] rounded-full transition-all duration-700', sub === 0 ? 'bg-rose-300' : 'bg-sky-300')}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            {sub >= 1 && (
              <p className="demo-rise mt-2 text-center text-[11px] text-white">
                <Typewriter text="“When do I eat lunch?”" speed={35} />
              </p>
            )}
            {sub >= 2 && (
              <div className="demo-rise mt-3 flex items-start gap-1.5 self-start rounded-2xl rounded-bl-sm bg-white/10 px-2.5 py-1.5 text-[10.5px] text-white">
                <Bot className="mt-px h-3.5 w-3.5 shrink-0 text-primary" /> Lunch is at 12:00.
              </div>
            )}
          </div>
        ),
      };
  }
}

/** Data moving between pieces in each beat. */
function packets(frame: Frame, lay: Layout): ReactNode {
  const { scene, sub } = frame;
  const n = lay.nodes;
  const k = `${scene}-${sub}`;
  const nodeL = (id: NodeId): [number, number] => [n[id]![0] - 66, n[id]![1]];
  const nodeR = (id: NodeId): [number, number] => [n[id]![0] + 66, n[id]![1]];
  const portalR = (y: number): [number, number] => [lay.portal!.l + lay.portal!.w, y];
  const portalL = (y: number): [number, number] => [lay.portal!.l, y];
  if (scene === 'build' && sub === 2)
    return (
      <>
        <Packet key={`${k}a`} from={portalR(270)} to={nodeL('api')} />
        <Packet key={`${k}b`} from={[n.api![0], n.api![1] + 25]} to={[n.db![0], n.db![1] - 25]} delay={650} />
      </>
    );
  if (scene === 'build' && sub === 3)
    return <Packet key={k} from={nodeR('db')} to={phoneEdge(lay.phone!, 'left', 120)} color="#86EFAC" delay={500} />;
  if (scene === 'remind' && sub === 1)
    return <Packet key={k} from={nodeR('fcm')} to={phoneEdge(lay.phone!, 'left', 40)} color="#FCD34D" duration={800} />;
  if (scene === 'complete' && sub >= 1) return <Packet key={k} from={phoneEdge(lay.phone!, 'right', 220)} to={portalL(90)} color="#86EFAC" />;
  if (scene === 'ask' && sub === 1) return <Packet key={k} from={phoneEdge(lay.phone!, 'left', 70)} to={nodeR('api')} />;
  if (scene === 'ask' && sub === 2) return <Packet key={k} from={phoneEdge(lay.phone!, 'left', 150)} to={nodeR('ai')} />;
  if (scene === 'ask' && sub === 3) return <Packet key={k} from={nodeR('ai')} to={phoneEdge(lay.phone!, 'left', 170)} color="#86EFAC" />;
  if (scene === 'voice' && sub === 1)
    return (
      <>
        <Packet key={`${k}a`} from={phoneEdge(lay.phone!, 'right', 80)} to={nodeL('cpp')} color="#7DD3FC" />
        <Packet key={`${k}b`} from={[n.cpp![0], n.cpp![1] + 25]} to={[n.stt![0], n.stt![1] - 25]} color="#7DD3FC" delay={600} />
      </>
    );
  if (scene === 'voice' && sub === 2) return <Packet key={k} from={nodeL('ai')} to={phoneEdge(lay.phone!, 'right', 200)} color="#86EFAC" />;
  if (scene === 'voice' && sub === 3) return <Packet key={k} from={nodeR('ai')} to={portalL(120)} color="#86EFAC" delay={400} />;
  return null;
}

/* ---------- stage ---------- */

/** Pieces glide to their spot for each beat. */
const glide: CSSProperties = { transitionDuration: '800ms', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' };

const RoutineStage = ({ frame }: { frame: Frame }) => {
  const lay = layoutFor(frame);
  const portal = portalContent(frame);
  const phone = phoneContent(frame);
  const portalRect = lay.portal ?? { l: -330, t: 14, w: 300, h: 292 };

  return (
    <StageShell>
      <ScaledCanvas width={W} height={H}>
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
          {/* parent web portal */}
          <div
            className="absolute overflow-hidden rounded-xl border border-white/10 bg-[#13151b] transition-all"
            style={{ ...glide, left: portalRect.l, top: portalRect.t, width: portalRect.w, height: portalRect.h, opacity: lay.portal ? 1 : 0 }}
          >
            <div className="flex h-7 items-center gap-2 border-b border-white/5 bg-white/[0.03] px-3">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-1 flex-1 truncate rounded bg-black/30 px-2 py-0.5 font-mono text-[9.5px] text-white/45">
                Parent portal
              </span>
            </div>
            <div key={frame.scene} className="demo-fade">
              <p className="px-3 pt-2.5 text-[12px] font-medium text-white">{portal.title}</p>
              {portal.body}
            </div>
          </div>

          {/* backend services */}
          {(Object.keys(NODE_INFO) as NodeId[]).map((id) => {
            const pos = lay.nodes[id];
            const [x, y] = pos ?? NODE_HOME[id];
            const info = NODE_INFO[id];
            const Icon = info.icon;
            const on = lay.active.includes(id);
            return (
              <div
                key={id}
                className={cn(
                  'absolute flex h-[50px] w-[132px] items-center gap-2 rounded-xl border bg-[#13151b] px-2.5 transition-all',
                  on ? 'border-primary/70 shadow-[0_0_22px_rgba(125,160,255,0.35)]' : 'border-white/10',
                )}
                style={{ ...glide, left: x - 66, top: y - 25, opacity: pos ? 1 : 0, transform: pos ? 'none' : 'scale(0.9)' }}
              >
                <Icon className={cn('h-4 w-4 shrink-0 transition-colors', on ? 'text-primary' : 'text-white/45')} />
                <span className="min-w-0">
                  <span className="block truncate text-[11px] text-white">{info.label}</span>
                  </span>
                {on && <span className="demo-ping absolute inset-0 rounded-xl border border-primary/40" />}
              </div>
            );
          })}

          {/* child's phone */}
          <div
            className="absolute overflow-hidden rounded-[28px] border-[3px] border-[#2a2d36] bg-[#0f1116] transition-all"
            style={{ ...glide, left: lay.phone ?? 660, top: 8, width: PHONE_W, height: PHONE_H, opacity: lay.phone === null ? 0 : 1 }}
          >
            <div className="flex h-6 items-center justify-between px-4 text-[9px] text-white/70">
              <span key={phone.time} className="demo-fade tabular-nums">
                {phone.time}
              </span>
              <span className="h-3.5 w-12 rounded-full bg-black" />
              <span>●●●</span>
            </div>
            <div key={frame.scene} className="demo-fade">
              {phone.body}
            </div>
          </div>

          {packets(frame, lay)}
        </div>
      </ScaledCanvas>
    </StageShell>
  );
};

export default RoutineStage;
