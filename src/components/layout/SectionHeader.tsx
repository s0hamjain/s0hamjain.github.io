import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  command?: string;
  className?: string;
  children?: ReactNode;
  contentClassName?: string;
  onRevealed?: (revealed: boolean) => void;
};

const TYPING_SPEED = 38;

const SectionHeader = ({
  title,
  command,
  className,
  children,
  contentClassName,
  onRevealed,
}: SectionHeaderProps) => {
  const cmd = command ?? '';
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion.current) {
      setVisible(true);
      setTyped(cmd.length);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [cmd]);

  useEffect(() => {
    if (!visible || reducedMotion.current || typed >= cmd.length) return;
    const t = setTimeout(() => setTyped((c) => c + 1), TYPING_SPEED);
    return () => clearTimeout(t);
  }, [visible, typed, cmd]);

  const doneTyping = typed >= cmd.length;
  const revealed = doneTyping && visible;

  useEffect(() => {
    onRevealed?.(revealed);
  }, [revealed, onRevealed]);

  return (
    <div ref={ref} className={className}>
      {cmd && (
        <div className="mb-3 flex items-center font-mono text-sm">
          <span className="text-emerald-400">$</span>
          <span className="ml-2 text-slate-300">
            {cmd.slice(0, visible ? typed : 0)}
          </span>
          {visible && (
            <span
              className={cn(
                'ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-px bg-emerald-400',
                doneTyping ? 'animate-cursor-blink' : ''
              )}
            />
          )}
        </div>
      )}

      <h2
        className={cn(
          'font-mono text-3xl font-bold tracking-tight text-white transition-all duration-500 md:text-4xl',
          revealed
            ? 'translate-y-0 opacity-100'
            : 'translate-y-1 opacity-0'
        )}
      >
        {title}
      </h2>

      {children && (
        <div
          className={cn(
            'mt-8 transition-all duration-700 ease-out md:mt-10',
            contentClassName,
            revealed
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          )}
          style={{ transitionDelay: revealed ? '120ms' : '0ms' }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
