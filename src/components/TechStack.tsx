import { TECH_ICONS } from '@/lib/techIcons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const HERO_STACK = [
  'Python',
  'Java',
  'C',
  'C++',
  'TypeScript',
  'JavaScript',
  'Go',
  'React',
  'Next.js',
  'Node.js',
  'Angular',
  'FastAPI',
  'Flask',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'AWS',
  'Jenkins',
  'Nginx',
  'Git',
  'Linux',
];

type TechStackProps = {
  /** Technology names (keys of TECH_ICONS). Defaults to the full hero stack. */
  items?: string[];
  size?: 'md' | 'sm';
  /** Fade the icons in one after another on mount. */
  stagger?: boolean;
  className?: string;
};

/** Row of brand icons with a tooltip naming each technology. */
const TechStack = ({ items = HERO_STACK, size = 'md', stagger = false, className }: TechStackProps) => (
  <ul className={cn('flex flex-wrap', size === 'md' ? 'gap-2' : 'gap-1.5', className)} aria-label="Tech stack">
    {items.map((name, i) => {
      const tech = TECH_ICONS[name];
      if (!tech) return null;
      const Icon = tech.icon;
      return (
        <li
          key={name}
          className={cn(stagger && 'animate-fade-up [animation-fill-mode:both]')}
          style={stagger ? { animationDelay: `${300 + i * 35}ms` } : undefined}
        >
          <Tooltip delayDuration={80}>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                aria-label={name}
                className={cn(
                  'flex items-center justify-center rounded-xl outline-none transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring',
                  size === 'md'
                    ? 'h-11 w-11 hover:scale-110'
                    : 'h-10 w-10 border border-border bg-secondary/50 hover:border-foreground/20 hover:bg-secondary'
                )}
              >
                <Icon className={size === 'md' ? 'h-7 w-7' : 'h-5 w-5'} style={{ color: tech.color }} aria-hidden />
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="rounded-lg border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground"
            >
              {name}
            </TooltipContent>
          </Tooltip>
        </li>
      );
    })}
  </ul>
);

export default TechStack;
