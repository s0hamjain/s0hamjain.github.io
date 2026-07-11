import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  className?: string;
};

const SectionHeader = ({ title, className }: SectionHeaderProps) => (
  <div className={cn('mb-12 text-center md:mb-14', className)}>
    <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
  </div>
);

export default SectionHeader;
