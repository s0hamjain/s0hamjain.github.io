import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionShellProps = {
  id: string;
  title: string;
  /** Center the heading (and let children center themselves). */
  centered?: boolean;
  children: ReactNode;
  className?: string;
};

/** Right-column section with a large display heading. */
const SectionShell = ({ id, title, centered, children, className }: SectionShellProps) => (
  <section id={id} aria-label={title} className={cn('pt-24 lg:pt-28', className)}>
    <h2
      className={cn('mb-10 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl', centered && 'text-center')}
    >
      {title}
    </h2>
    {children}
  </section>
);

export default SectionShell;
