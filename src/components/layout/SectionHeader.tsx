import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  /** Terminal-style path label, rendered as `~/kicker`. */
  kicker: string;
  title: string;
  className?: string;
};

const SectionHeader = ({ kicker, title, className }: SectionHeaderProps) => (
  <div className={cn('mb-12 text-center md:mb-14', className)}>
    <p className="mb-3 font-mono text-sm tracking-wide text-primary/90">
      <span className="text-slate-500">~/</span>
      {kicker}
    </p>
    <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
  </div>
);

export default SectionHeader;
