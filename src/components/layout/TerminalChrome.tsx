import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TerminalChromeProps = {
  title: string;
};

const TerminalChrome = ({ title }: TerminalChromeProps) => (
  <div className="relative flex shrink-0 items-center gap-2 border-b border-slate-700/60 bg-[#2d2d2d] px-4 py-2.5">
    <div className="relative z-10 flex gap-2">
      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
      <div className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
      <div className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
    </div>
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-20">
      <span className="text-center font-mono text-xs tracking-wide text-slate-400">{title}</span>
    </div>
  </div>
);

type TerminalWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

const TerminalWindow = ({ title, children, className }: TerminalWindowProps) => (
  <div className={cn('card-surface shadow-terminal overflow-hidden', className)}>
    <TerminalChrome title={title} />
    {children}
  </div>
);

export { TerminalChrome, TerminalWindow };
export default TerminalChrome;
