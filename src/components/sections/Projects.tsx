import type { ReactNode } from 'react';
import { ArrowUpRight, Github, Pause, Play, RotateCcw } from 'lucide-react';
import SectionShell from '@/components/layout/SectionShell';
import Reveal from '@/components/layout/Reveal';
import { useScrollFocus } from '@/hooks/useScrollFocus';
import { useProjectSnap } from '@/hooks/useProjectSnap';
import { useStepPlayer } from '@/hooks/useStepPlayer';
import TechStack from '@/components/TechStack';
import { allocatorShowcase } from '@/components/demos/allocator';
import type { Showcase } from '@/components/demos/types';
import { cn } from '@/lib/utils';
import clarityImage from '@/assets/projects/clarity.png';
import spryntImage from '@/assets/projects/sprynt.png';
import routineRemindImage from '@/assets/projects/routineremind.jpg';

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
} & (
  | { image: string; imageAlt: string; imageStyle?: string; showcase?: never }
  /** Projects with a showcase get an animated walkthrough instead of a still image. */
  | { showcase: Showcase; image?: never; imageAlt?: never; imageStyle?: never }
);

const projects: Project[] = [
  {
    title: 'Clarity',
    description:
      'Native macOS app that lets developers visually debug programs in under 2 minutes: it captures a selected code region, interprets it with Gemini, and uses Claude to generate animated Manim execution traces, orchestrated by a Go backend with MongoDB Atlas vector search.',
    technologies: ['Python', 'JavaScript', 'Shell', 'Go', 'Gemini API', 'Anthropic API', 'MongoDB'],
    links: {
      demo: 'https://clarity-web-black.vercel.app/',
      github: 'https://github.com/s0hamjain/Clarity',
      demoLabel: 'Visit Site',
    },
    image: clarityImage,
    imageAlt: 'Clarity macOS app icon',
    imageStyle: 'object-contain p-12 md:p-20 group-hover:scale-[1.03]',
  },
  {
    title: 'Sprynt',
    description:
      'End-to-end production debugging platform that consolidates 5+ incident response tools into one shared workspace for on-call engineers, with Claude-powered workflows that assign Jira tickets and recommend GitHub code fixes from Zoom transcripts, plus automated meeting reports.',
    technologies: ['Next.js', 'React', 'Go', 'FastAPI', 'PostgreSQL', 'AWS S3', 'Jira', 'Anthropic API'],
    links: {
      demo: 'https://sprynt-mu.vercel.app/',
      github: 'https://github.com/s0hamjain/Sprynt',
      demoLabel: 'Visit Site',
    },
    image: spryntImage,
    imageAlt: 'Sprynt landing page showing the live incident workspace',
    imageStyle: 'object-cover object-center group-hover:scale-[1.03]',
  },
  {
    title: 'Dynamic Memory Allocator',
    description:
      '64-bit memory allocator in C++ with segregated free lists and best-fit search, reaching 74.4% average heap utilization at 12.9M operations per second, paired with a Vue.js visualizer that replays 25+ allocation traces to show heap fragmentation and memory reuse.',
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
      'Patent-pending Android + web app that helps children with autism follow daily routines through visual task cards and an AI chatbot.',
    technologies: ['Kotlin', 'Java', 'Spring Boot', 'Angular', 'C++', 'Google Cloud Platform', 'Docker'],
    links: {
      demo: 'https://www.congressionalappchallenge.us/22-va10/',
      github: 'https://github.com/s0hamjain/RoutineRemind',
      demoLabel: 'Read More',
    },
    image: routineRemindImage,
    imageAlt: 'RoutineRemind title card from the Congressional App Challenge demo video',
  },
];

/** Full-screen slot that fades cards in and out as they pass the viewport center. */
const PanelFrame = ({ first, children }: { first: boolean; children: ReactNode }) => {
  const focusRef = useScrollFocus<HTMLDivElement>();
  return (
    // The first card sits right under the section heading; later ones get a full screen each.
    <div
      data-snap
      className={
        first ? 'pb-10 lg:flex lg:min-h-[85dvh] lg:items-start' : 'py-10 lg:flex lg:min-h-dvh lg:items-center lg:py-0'
      }
    >
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

const ProjectPanel = ({ project }: { project: Project }) => {
  const primaryHref = project.links?.demo ?? project.links?.github;

  return (
    <article className="group grid overflow-hidden rounded-3xl border border-border bg-card/70 lg:grid-cols-[1.15fr_1fr]">
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-secondary/40 lg:aspect-auto lg:min-h-[480px]"
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-out ${project.imageStyle ?? 'object-cover object-top group-hover:scale-[1.03]'}`}
        />
      </a>

      <div className="flex flex-col p-7 sm:p-10 xl:p-12">
        <h3 className="text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">{project.title}</h3>
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{project.description}</p>

        <TechStack items={project.technologies} size="sm" className="mt-7" />

        {project.links && (
          <div className="mt-auto flex flex-wrap gap-3 pt-9">
            <ProjectLinkButtons links={project.links} />
          </div>
        )}
      </div>
    </article>
  );
};

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
    <SectionShell id="projects" title="Projects">
      {projects.map((project, i) => (
        <PanelFrame key={project.title} first={i === 0}>
          {project.showcase ? (
            <ShowcasePanel project={project} showcase={project.showcase} />
          ) : (
            <ProjectPanel project={project} />
          )}
        </PanelFrame>
      ))}
    </SectionShell>
  );
};

export default Projects;
