import {
  BatteryFull,
  Bell,
  CalendarDays,
  Check,
  BookOpen,
  House,
  MessagesSquare,
  Music,
  Waves,
  Menu,
  MessageCircle,
  Mic,
  Plus,
  UserRound,
  Wifi,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ScaledCanvas, StageShell, Typewriter } from '../shared';
import { TASKS } from './script';
import type { Frame } from './script';

const W = 640;
const H = 320;

/** Material 3 light palette (baseline purple). */
const M3 = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  surface: '#FEF7FF',
  surfaceContainer: '#F3EDF7',
  surfaceContainerHigh: '#ECE6F0',
  onSurface: '#1D1B20',
  onSurfaceVariant: '#49454F',
};

const ICONS = { speech: MessagesSquare, book: BookOpen, swim: Waves, home: House, music: Music };
const ICON_TINT = { speech: '#7C3AED', book: '#EA580C', swim: '#0EA5E9', home: '#16A34A', music: '#DB2777' };

const TaskIcon = ({ icon, size = 'sm' }: { icon: keyof typeof ICONS; size?: 'sm' | 'lg' }) => {
  const Icon = ICONS[icon];
  return (
    <span
      className={cn('flex shrink-0 items-center justify-center', size === 'lg' ? 'h-16 w-16 rounded-3xl' : 'h-7 w-7 rounded-xl')}
      style={{ background: `${ICON_TINT[icon]}1f` }}
    >
      <Icon className={size === 'lg' ? 'h-9 w-9' : 'h-4 w-4'} style={{ color: ICON_TINT[icon] }} />
    </span>
  );
};

/* ---------- chat content shared by the phone and the parent's history ---------- */

type Msg = { who: 'kid' | 'bot'; text: string };

function chatFor({ scene, sub }: Frame): Msg[] {
  const msgs: Msg[] = [];
  if (scene === 'ask' || scene === 'voice') {
    msgs.push({ who: 'kid', text: 'What next?' });
    if (scene === 'voice' || sub >= 1) msgs.push({ who: 'bot', text: 'Swim class at 1:00.' });
    if (scene === 'voice' || sub >= 2) msgs.push({ who: 'kid', text: 'Who is my swim coach?' });
    if (scene === 'voice' || sub >= 3) msgs.push({ who: 'bot', text: 'Coach Maria!' });
  }
  if (scene === 'voice' && sub >= 1) msgs.push({ who: 'kid', text: 'When do I see Grandma?' });
  if (scene === 'voice' && sub >= 2) msgs.push({ who: 'bot', text: 'At 3:00, after swim.' });
  return msgs;
}

/* ---------- parent web portal (Angular) ---------- */

const PortalTask = ({ t, done, now }: { t: (typeof TASKS)[number]; done?: boolean; now?: boolean }) => (
  <div
    className="flex items-center gap-2.5 rounded-xl border px-2.5 py-[3px] text-[11px]"
    style={{ borderColor: now ? M3.primary : '#E7E0EC', background: now ? M3.primaryContainer : '#FFFFFF' }}
  >
    <span className="w-9 text-[10px] tabular-nums" style={{ color: M3.onSurfaceVariant }}>
      {t.time}
    </span>
    <TaskIcon icon={t.icon} />
    <span className={cn('flex-1 font-semibold', done && 'line-through opacity-50')} style={{ color: M3.onSurface }}>
      {t.title}
    </span>
    {done && <Check className="demo-pop h-3.5 w-3.5 text-emerald-600" />}
    {now && (
      <span className="rounded-full px-1.5 text-[9px] font-bold" style={{ background: M3.primary, color: M3.onPrimary }}>
        NOW
      </span>
    )}
  </div>
);

function portalView(frame: Frame): { tab: string; body: ReactNode } {
  const { scene, sub, done } = frame;
  if (scene === 'build') {
    const rows = [1, 3, 5, 5][sub];
    return {
      tab: 'Routine',
      body: (
        <>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[13px] font-extrabold" style={{ color: M3.onSurface }}>
              Ava’s Saturday
            </p>
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold transition-colors duration-300"
              style={sub >= 2 ? { background: '#DCFCE7', color: '#166534' } : { background: M3.primary, color: M3.onPrimary }}
            >
              {sub >= 2 ? 'Saved ✓' : 'Save'}
            </span>
          </div>
          <div className="space-y-1">
            {TASKS.slice(0, rows).map((t) => (
              <div key={t.title} className="demo-fade">
                <PortalTask t={t} />
              </div>
            ))}
            {rows < 5 && (
              <p className="flex items-center gap-1 pl-1 text-[10.5px] font-semibold" style={{ color: M3.primary }}>
                <Plus className="h-3.5 w-3.5" /> Add task
              </p>
            )}
          </div>
        </>
      ),
    };
  }
  if (scene === 'remind' || scene === 'complete') {
    const now = scene === 'remind' ? (sub >= 1 ? 0 : -1) : done;
    return {
      tab: 'Today',
      body: (
        <>
          <p className="mb-1.5 text-[13px] font-extrabold" style={{ color: M3.onSurface }}>
            Today · {done}/{TASKS.length} done
          </p>
          <div className="space-y-[3px]">
            {TASKS.map((t, i) => (
              <PortalTask key={t.title} t={t} done={i < done} now={i === now} />
            ))}
          </div>
        </>
      ),
    };
  }
  const msgs = chatFor(frame);
  return {
    tab: 'Chat',
    body: (
      <>
        <div className="mb-2 rounded-xl px-2.5 py-1.5 text-[10.5px]" style={{ background: '#FFF4D6', color: '#6B4E00' }}>
          <span className="font-bold">Note for the chatbot:</span> Coach Maria teaches swim today
        </div>
        <p className="mb-1.5 text-[13px] font-extrabold" style={{ color: M3.onSurface }}>
          Ava’s questions
        </p>
        <div className="space-y-1">
          {msgs.map((m, i) =>
            m.who === 'kid' ? (
              <p key={i} className="demo-fade text-[11px] font-semibold" style={{ color: M3.onSurface }}>
                “{m.text}”
              </p>
            ) : (
              <p key={i} className="demo-fade -mt-0.5 pl-3 text-[10.5px]" style={{ color: M3.onSurfaceVariant }}>
                → {m.text}
              </p>
            ),
          )}
          {msgs.length === 0 && (
            <p className="text-[10.5px]" style={{ color: M3.onSurfaceVariant }}>
              No questions yet
            </p>
          )}
        </div>
      </>
    ),
  };
}

const Portal = ({ frame }: { frame: Frame }) => {
  const view = portalView(frame);
  return (
    <div className="absolute overflow-hidden rounded-xl bg-white shadow-xl shadow-black/15" style={{ left: 16, top: 14, width: 350, height: 292 }}>
      {/* browser chrome */}
      <div className="flex h-7 items-center gap-1.5 bg-[#DEE1E6] px-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-2 flex-1 rounded-full bg-white px-2.5 py-0.5 text-[9.5px] text-[#5F6368]">routineremind.app/parent</span>
      </div>
      {/* app bar */}
      <div className="flex h-9 items-center gap-2 px-3" style={{ background: M3.primary, color: M3.onPrimary }}>
        <Menu className="h-4 w-4" />
        <span className="text-[12.5px] font-extrabold">RoutineRemind</span>
        <span className="ml-auto flex gap-1 text-[10px] font-semibold">
          {['Routine', 'Today', 'Chat'].map((t) => (
            <span key={t} className={cn('rounded-full px-2 py-0.5 transition-colors', t === view.tab ? 'bg-white/25' : 'opacity-70')}>
              {t}
            </span>
          ))}
        </span>
      </div>
      <div className="px-3 pt-2.5" style={{ background: M3.surface, height: 292 - 28 - 36 }}>
        {view.body}
      </div>
    </div>
  );
};

/* ---------- child's Android phone (Kotlin + Compose, Material 3) ---------- */

function phoneView(frame: Frame): { time: string; body: ReactNode; tab: 'today' | 'ask' } {
  const { scene, sub, done } = frame;
  if (scene === 'build') {
    return {
      time: '8:40',
      tab: 'today',
      body:
        sub >= 3 ? (
          <div className="space-y-1.5 px-3 pt-2">
            {TASKS.slice(0, 4).map((t) => (
              <div key={t.title} className="demo-fade flex items-center gap-2 rounded-2xl px-2 py-1.5" style={{ background: M3.surfaceContainer }}>
                <TaskIcon icon={t.icon} />
                <span className="text-[11px] font-bold" style={{ color: M3.onSurface }}>
                  {t.title}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-24 text-center text-[11px]" style={{ color: M3.onSurfaceVariant }}>
            No routine yet
          </p>
        ),
    };
  }
  if (scene === 'remind' || scene === 'complete') {
    const current = scene === 'remind' ? TASKS[0] : TASKS[done];
    const showCard = scene === 'complete' || sub >= 1;
    return {
      time: scene === 'remind' ? (sub === 0 ? '8:59' : '9:00') : ['9:02', '10:28', '12:40'][sub],
      tab: 'today',
      body: (
        <>
          {scene === 'remind' && sub === 1 && (
            <div className="demo-drop absolute inset-x-2 top-7 z-10 rounded-2xl p-2 shadow-lg" style={{ background: M3.surfaceContainerHigh }}>
              <p className="flex items-center gap-1.5 text-[9px]" style={{ color: M3.onSurfaceVariant }}>
                <Bell className="h-3 w-3" /> RoutineRemind · now
              </p>
              <p className="text-[11px] font-bold" style={{ color: M3.onSurface }}>
                Time for speech therapy!
              </p>
            </div>
          )}
          {showCard ? (
            <div key={current.title} className="demo-fade flex flex-col items-center px-3 pt-2 text-center">
              <span className="mb-2 rounded-full px-2.5 py-0.5 text-[9px] font-bold" style={{ background: M3.primaryContainer, color: M3.onPrimaryContainer }}>
                NOW · {current.time}
              </span>
              <TaskIcon icon={current.icon} size="lg" />
              <p className="mt-2 text-[15px] font-extrabold" style={{ color: M3.onSurface }}>
                {current.title}
              </p>
              {scene === 'complete' && done > 0 && (
                <p className="mt-1 text-[10px]" style={{ color: M3.onSurfaceVariant }}>
                  {TASKS[done - 1].hint}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-24 text-center text-[11px]" style={{ color: M3.onSurfaceVariant }}>
              Good morning, Ava
            </p>
          )}
          {scene === 'complete' && (
            <span
              className={cn('absolute inset-x-4 bottom-[58px] flex h-9 items-center justify-center rounded-full text-[12px] font-bold transition-transform', sub === 0 && 'scale-95')}
              style={{ background: M3.primary, color: M3.onPrimary }}
            >
              Done
            </span>
          )}
        </>
      ),
    };
  }
  const msgs = chatFor(frame).slice(scene === 'voice' ? 4 : 0).slice(-3);
  const listening = scene === 'voice' && sub === 0;
  return {
    time: scene === 'ask' ? '12:45' : '2:10',
    tab: 'ask',
    body: (
      <>
        <div className="flex flex-col gap-1.5 px-2.5 pt-2">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={cn(
                'demo-fade max-w-[85%] rounded-2xl px-2.5 py-1.5 text-[10.5px] font-semibold',
                m.who === 'kid' ? 'self-end rounded-br-md' : 'self-start rounded-bl-md',
              )}
              style={m.who === 'kid' ? { background: M3.primary, color: M3.onPrimary } : { background: M3.surfaceContainerHigh, color: M3.onSurface }}
            >
              {scene === 'voice' && m.who === 'kid' ? <Typewriter text={m.text} speed={35} /> : m.text}
            </div>
          ))}
        </div>
        <div className="absolute inset-x-2.5 bottom-[54px] flex items-center gap-1.5">
          <span className="flex h-8 flex-1 items-center rounded-full px-3 text-[10px]" style={{ background: M3.surfaceContainerHigh, color: M3.onSurfaceVariant }}>
            {listening ? 'Listening…' : 'Ask a question'}
          </span>
          <span
            className={cn('flex h-8 w-8 items-center justify-center rounded-full', listening && 'demo-pulse')}
            style={{ background: listening ? '#B3261E' : M3.primaryContainer, color: listening ? '#fff' : M3.onPrimaryContainer }}
          >
            <Mic className="h-4 w-4" />
          </span>
        </div>
      </>
    ),
  };
}

const Phone = ({ frame }: { frame: Frame }) => {
  const view = phoneView(frame);
  return (
    <div
      className="absolute overflow-hidden rounded-[30px] border-[4px] border-[#2B2930] shadow-xl shadow-black/20"
      style={{ left: 444, top: 6, width: 168, height: 308, background: M3.surface }}
    >
      {/* status bar with punch-hole camera */}
      <div className="relative flex h-6 items-center justify-between px-4 text-[9.5px] font-semibold" style={{ color: M3.onSurface }}>
        <span className="tabular-nums">{view.time}</span>
        <span className="absolute left-1/2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-black" />
        <span className="flex items-center gap-1">
          <Wifi className="h-2.5 w-2.5" />
          <BatteryFull className="h-3 w-3" />
        </span>
      </div>
      <p className="px-4 pb-1 pt-1 text-[14px] font-extrabold" style={{ color: M3.onSurface }}>
        {view.tab === 'ask' ? 'Ask' : 'My day'}
      </p>
      {view.body}
      {/* navigation bar + gesture handle */}
      <div className="absolute inset-x-0 bottom-0 pb-1.5 pt-1.5" style={{ background: M3.surfaceContainer }}>
        <div className="flex justify-around text-[8.5px] font-semibold" style={{ color: M3.onSurfaceVariant }}>
          {(
            [
              [CalendarDays, 'Today', view.tab === 'today'],
              [MessageCircle, 'Ask', view.tab === 'ask'],
              [UserRound, 'Me', false],
            ] as const
          ).map(([Icon, label, on]) => (
            <span key={label} className="flex flex-col items-center gap-0.5">
              <span
                className="flex h-5 w-10 items-center justify-center rounded-full transition-colors"
                style={on ? { background: M3.primaryContainer, color: M3.onPrimaryContainer } : undefined}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
            </span>
          ))}
        </div>
        <div className="mx-auto mt-1 h-1 w-14 rounded-full bg-black/40" />
      </div>
    </div>
  );
};

/** Parent's web portal and the child's Android app side by side; only their screens change. */
const RoutineStage = ({ frame }: { frame: Frame }) => (
  <StageShell>
    <ScaledCanvas width={W} height={H}>
      <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-[#E8E6EC] [font-family:'Nunito',sans-serif]">
        <Portal frame={frame} />
        <Phone frame={frame} />
      </div>
    </ScaledCanvas>
  </StageShell>
);

export default RoutineStage;
