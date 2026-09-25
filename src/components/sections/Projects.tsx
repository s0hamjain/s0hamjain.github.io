import { ArrowUpRight, Github } from 'lucide-react';
import SectionShell from '@/components/layout/SectionShell';
import Reveal from '@/components/layout/Reveal';
import { useScrollFocus } from '@/hooks/useScrollFocus';
import TechStack from '@/components/TechStack';
import clarityImage from '@/assets/projects/clarity.png';
import spryntImage from '@/assets/projects/sprynt.png';
import routineRemindImage from '@/assets/projects/routineremind.jpg';

interface ProjectLinks {
  demo?: string;
  github: string;
  demoLabel?: string;
}

interface Project {
  title: string;
  description: string;
  period: string;
  technologies: string[];
  links: ProjectLinks | null;
  image: string;
  imageAlt: string;
  imageStyle?: string;
}

const projects: Project[] = [
  {
    title: 'Clarity',
    description:
      'Native macOS app that lets developers visually debug programs in under 2 minutes: it captures a selected code region, interprets it with Gemini, and uses Claude to generate animated Manim execution traces, orchestrated by a Go backend with MongoDB Atlas vector search.',
    period: 'Sep 2026 - Present',
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
    period: 'Mar 2026 - Aug 2026',
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
    title: 'RoutineRemind',
    description:
      'Patent-pending Android + web app that helps children with autism follow daily routines through visual task cards and an AI chatbot.',
    period: 'Jun 2022 - Aug 2025',
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

const ProjectPanel = ({ project, first }: { project: Project; first: boolean }) => {
  const focusRef = useScrollFocus<HTMLDivElement>();
  const primaryHref = project.links?.demo ?? project.links?.github;

  return (
    // The first card sits right under the section heading; later ones get a full screen each.
    <div
      className={
        first ? 'pb-10 lg:flex lg:min-h-[85dvh] lg:items-start' : 'py-10 lg:flex lg:min-h-dvh lg:items-center lg:py-0'
      }
    >
      <div ref={focusRef} className="w-full will-change-transform">
        <Reveal>
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
              <p className="text-sm text-muted-foreground">{project.period}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{project.description}</p>

              <TechStack items={project.technologies} size="sm" className="mt-7" />

              {project.links && (
                <div className="mt-auto flex flex-wrap gap-3 pt-9">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
                    >
                      {project.links.demoLabel}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <Github className="h-4 w-4" />
                    Source
                  </a>
                </div>
              )}
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
};

const Projects = () => (
  <SectionShell id="projects" title="Projects">
    {projects.map((project, i) => (
      <ProjectPanel key={project.title} project={project} first={i === 0} />
    ))}

    <Reveal className="mt-4 flex justify-center">
      <a
        href="https://github.com/s0hamjain"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-full border border-border bg-card/70 py-2 pl-2 pr-6 text-base font-medium text-foreground shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-secondary"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
          <Github className="h-5 w-5" />
        </span>
        See more on GitHub
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </a>
    </Reveal>
  </SectionShell>
);

export default Projects;
