import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionShellProps = {
  id: string;
  children: ReactNode;
  /** Extra classes for the outer <section>. */
  className?: string;
  /** Extra classes for the inner container (e.g. max-w overrides). */
  containerClassName?: string;
};

/**
 * Standard page wrapper: clean dark base, cursor spotlight, container width,
 * and top padding that clears the floating navbar.
 */
const SectionShell = ({ id, children, className, containerClassName }: SectionShellProps) => {
  return (
    <section
      id={id}
      className={cn('relative min-h-screen overflow-hidden bg-background pt-24 pb-20 md:pt-28', className)}
    >
      <div className={cn('container relative z-10 mx-auto max-w-6xl px-4 sm:px-6', containerClassName)}>
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
