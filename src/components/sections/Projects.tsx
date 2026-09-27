import type { ReactNode } from 'react';
import { ArrowUpRight, Github, Pause, Play, RotateCcw } from 'lucide-react';
import SectionShell from '@/components/layout/SectionShell';
import Reveal from '@/components/layout/Reveal';
import { useScrollFocus } from '@/hooks/useScrollFocus';
import { useProjectSnap } from '@/hooks/useProjectSnap';
import { useStepPlayer } from '@/hooks/useStepPlayer';
import TechStack from '@/components/TechStack';
import { allocatorShowcase } from '@/components/demos/allocator';
import { clarityShowcase } from '@/components/demos/clarity';
import { routineRemindShowcase } from '@/components/demos/routineremind';
import { spryntShowcase } from '@/components/demos/sprynt';
import type { Showcase } from '@/components/demos/types';
import { cn } from '@/lib/utils';

interface ProjectLinks {
  demo?: string;
  github: string;
  demoLabel?: string;
}

type Project = {
  title: string;
  description: string;
  technologies: string[];
  links: ProjectLinks | null;
  /** Step-by-step animated walkthrough of how the project works. */
  showcase: Showcase;
};

const projects: Project[] = [
  {
    title: 'Clarity',
    description:
      'A macOS app that explains any problem on your screen in seconds. Gemini reads a screenshot and writes a step-by-step explanation, then Claude generates a custom Manim animation of it using documentation retrieved from MongoDB Atlas.',
    technologies: ['Python', 'JavaScript', 'Shell', 'Go', 'Gemini API', 'Anthropic API', 'MongoDB'],
    links: {
      demo: 'https://clarity-web-black.vercel.app/',
      github: 'https://github.com/s0hamjain/Clarity',
      demoLabel: 'Visit Site',
    },
    showcase: clarityShowcase,
  },
  {
    title: 'Sprynt',
    description:
      'An AI incident responder that joins live outage calls and streams the conversation into a shared incident room. It turns what engineers say into Jira tickets, ranks the suspect files in the GitHub repo, and proposes a fix for review.',
    technologies: ['Next.js', 'React', 'Go', 'FastAPI', 'PostgreSQL', 'AWS S3', 'Jira', 'Anthropic API'],
    links: {
      demo: 'https://sprynt-mu.vercel.app/',
      github: 'https://github.com/s0hamjain/Sprynt',
      demoLabel: 'Visit Site',
    },
    showcase: spryntShowcase,
  },
  {
    title: 'Dynamic Memory Allocator',
    description:
      'A 64-bit memory allocator in C++ built on segregated free lists, best-fit search, and immediate coalescing. It reaches 74.4% average heap utilization at 12.9M operations per second, with a Vue.js visualizer that replays real allocation traces.',
    technologies: ['C++', 'Linux', 'Vue.js'],
    links: {
      demo: 'https://dynamic-memory-allocator-woad.vercel.app',
      github: 'https://github.com/s0hamjain/dynamic-memory-allocator',
      demoLabel: 'Visit Site',
    },
    showcase: allocatorShowcase,
  },
  {
    title: 'RoutineRemind',
    description:
      'A patent-pending Android and web app that helps children with autism follow their daily routines. Parents build visual schedules with reminders, and children check off tasks and ask a schedule-aware AI chatbot what comes next.',
    technologies: ['Kotlin', 'Java', 'Spring Boot', 'Angular', 'C++', 'Google Cloud Platform', 'Docker'],
    links: {
      demo: 'https://www.congressionalappchallenge.us/22-va10/',
      github: 'https://github.com/s0hamjain/RoutineRemind',
      demoLabel: 'Read More',
    },
    showcase: routineRemindShowcase,
  },
];

/** Full-screen slot that fades cards in and out as they pass the viewport center. */
const PanelFrame = ({ children }: { children: ReactNode }) => {
  const focusRef = useScrollFocus<HTMLDivElement>();
  return (
    // Each project gets a full screen of its own.
    <div data-snap className="py-10 lg:flex lg:min-h-dvh lg:items-center lg:py-0">
      <div ref={focusRef} className="w-full will-change-transform">
        <Reveal>{children}</Reveal>
      </div>
    </div>
  );
};

const ProjectLinkButtons = ({ links }: { links: ProjectLinks }) => (
  <>
    {links.demo && (
      <a
        href={links.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
      >
        {links.demoLabel}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    )}
    <a
      href={links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
    >
      <Github className="h-4 w-4" />
      Source
    </a>
  </>
);

/** Description on top; the animated walkthrough and its numbered steps below. */
const ShowcasePanel = ({ project, showcase }: { project: Project; showcase: Showcase }) => {
  const player = useStepPlayer(showcase.steps);
  const { Stage } = showcase;
  const control =
    'inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground';

  return (
    <article ref={player.ref} className="overflow-hidden rounded-3xl border border-border bg-card/70">
      <div className="border-b border-border p-7 sm:p-10">
        <h3 className="text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">{project.title}</h3>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-6">
          <TechStack items={project.technologies} size="sm" />
          {project.links && (
            <div className="flex flex-wrap gap-3">
              <ProjectLinkButtons links={project.links} />
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="p-5 sm:p-8 xl:pl-10">
          <Stage frame={player.frame} />
        </div>

        <div className="flex flex-col border-t border-border p-7 sm:p-8 lg:border-l lg:border-t-0">
          <ol>
            {showcase.steps.map((s, i) => {
              const active = i === player.step;
              return (
                <li key={s.title} className="border-t border-border first:border-t-0">
                  <button
                    type="button"
                    onClick={() => player.goTo(i)}
                    aria-current={active ? 'step' : undefined}
                    className="group/step relative flex w-full gap-4 py-3.5 text-left"
                  >
                    <span
                      className={cn(
                        'w-4 shrink-0 font-mono text-xs leading-6 tabular-nums transition-colors',
                        active ? 'text-primary' : 'text-muted-foreground/60',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block font-medium leading-6 transition-colors',
                          active ? 'text-foreground' : 'text-muted-foreground group-hover/step:text-foreground',
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className={cn(
                          'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                          active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-1 text-[15px] leading-relaxed text-muted-foreground">{s.body}</span>
                        </span>
                      </span>
                    </span>
                    {active && !player.reduced && (
                      <span className="absolute inset-x-0 -top-px h-px overflow-hidden" aria-hidden>
                        <span
                          key={player.run}
                          className="step-progress block h-full bg-primary"
                          style={{
                            animationDuration: `${player.stepDuration}ms`,
                            animationPlayState: player.playing ? 'running' : 'paused',
                          }}
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
          {!player.reduced && (
            <div className="mt-auto flex gap-2 pt-6">
              <button type="button" onClick={player.replay} className={control}>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Replay
              </button>
              <button type="button" onClick={player.togglePause} className={control} aria-pressed={player.paused}>
                {player.paused ? (
                  <Play className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  <Pause className="h-3.5 w-3.5" aria-hidden />
                )}
                {player.paused ? 'Play' : 'Pause'}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  useProjectSnap();
  return (
    <SectionShell id="projects" title="Projects" hideTitle className="pt-0 lg:pt-0">
      {projects.map((project) => (
        <PanelFrame key={project.title}>
          <ShowcasePanel project={project} showcase={project.showcase} />
        </PanelFrame>
      ))}
    </SectionShell>
  );
};

export default Projects;
