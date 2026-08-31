import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';
import TechBadge from '@/components/TechBadge';
import spryntImage from '@/assets/projects/sprynt.png';
import routineRemindImage from '@/assets/projects/routineremind.jpg';
import eyelsImage from '@/assets/projects/eyels.jpg';

interface ProjectLinks {
  demo: string;
  github: string;
  demoLabel: string;
}

interface Project {
  title: string;
  description: string;
  period: string;
  technologies: string[];
  links: ProjectLinks | null;
  image: string;
  imageAlt: string;
}

const projects: Project[] = [
  {
    title: "Sprynt",
    description: "Incident response platform that keeps on-call engineers aligned during live outages with a shared workspace for investigation, action items, and AI-assisted analysis.",
    period: "Mar 2026 - Present",
    technologies: [
      "Next.js",
      "React",
      "WebSockets",
      "FastAPI",
      "PostgreSQL",
      "AWS S3",
      "Jira",
      "OAuth 2.0"
    ],
    links: {
      demo: "https://sprynt-mu.vercel.app/",
      github: "https://github.com/kanisiva2/Sprynt",
      demoLabel: "Visit Site"
    },
    image: spryntImage,
    imageAlt: "Sprynt landing page showing the live incident workspace"
  },
  {
    title: "RoutineRemind",
    description: "Patent-pending Android + web app that helps children with autism follow daily routines through visual task cards and an AI chatbot.",
    period: "Jun 2022 - Aug 2025",
    technologies: [
      "Kotlin",
      "Java",
      "Spring Boot",
      "Angular",
      "C++",
      "Google Cloud Platform",
      "Docker"
    ],
    links: {
      demo: "https://www.congressionalappchallenge.us/22-va10/",
      github: "https://github.com/s0hamjain/RoutineRemind",
      demoLabel: "Read More"
    },
    image: routineRemindImage,
    imageAlt: "RoutineRemind title card from the Congressional App Challenge demo video"
  },
  {
    title: "EyeLS",
    description: "Accessible gaze-tracking web application designed to enable ALS patients to communicate nonverbally using precise eye movement detection.",
    period: "Aug 2023 - Present",
    technologies: ["JavaScript", "HTML/CSS", "Computer Vision", "Kalman Filtering", "Monte Carlo"],
    links: {
      demo: "https://www.youtube.com/watch?v=YAlBLGYtgLA",
      github: "https://github.com/s0hamjain/EyeLS",
      demoLabel: "View Demo"
    },
    image: eyelsImage,
    imageAlt: "EyeLS demo video title slide with gaze-tracking keyboard"
  }
];

const ProjectVisual = ({ project }: { project: Project }) => {
  const visual = (
    <div className="relative h-full min-h-[220px] overflow-hidden sm:min-h-[280px]">
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  );

  if (project.links?.demo) {
    return (
      <a
        href={project.links.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="block h-full"
      >
        {visual}
      </a>
    );
  }

  return visual;
};

const Projects = () => {
  return (
    <SectionShell id="projects" containerClassName="max-w-6xl">
      <SectionHeader command="cat projects" title="Featured Projects">
        <div className="flex flex-col gap-10">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="card-surface shadow-card-glow group overflow-hidden transition-colors duration-300 hover:border-slate-600/60"
            >
            <div className="flex items-center gap-2 border-b border-slate-700/40 bg-slate-900/50 px-5 py-2.5 font-mono text-xs text-slate-500">
              <span className="text-emerald-400/70">{'>'}</span>
              <span>{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
              <span className="ml-auto text-slate-600">{project.period}</span>
            </div>

            <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
              <div className={`border-b border-border/40 lg:border-b-0 [direction:ltr] ${index % 2 === 1 ? 'lg:border-l' : 'lg:border-r'} border-border/40`}>
                <ProjectVisual project={project} />
              </div>

              <div className="flex flex-col p-6 [direction:ltr] md:p-8">
                <header className="mb-4">
                  <p className="mb-1.5 font-mono text-sm text-slate-400">
                    {`// ${project.period}`}
                  </p>
                  <h3 className="font-mono text-xl font-bold tracking-tight text-white md:text-2xl">
                    {project.title}
                  </h3>
                </header>

                <p className="mb-6 text-base leading-relaxed text-foreground/75">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <div className="border-t border-border/40 pt-5">
                    <p className="mb-2.5 font-mono text-sm text-slate-400">{'// Tech Stack'}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <TechBadge key={`${project.title}-${tech}`} name={tech} />
                      ))}
                    </div>
                  </div>

                  {project.links && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        className="flex-1 border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs font-medium text-emerald-400 transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/20 sm:flex-none"
                        asChild
                      >
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3.5 w-3.5" />
                          {project.links.demoLabel}
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-slate-700/60 bg-transparent font-mono text-xs text-slate-300 transition-all duration-200 hover:border-slate-500/70 hover:bg-slate-800/50 hover:text-slate-100 sm:flex-none"
                        asChild
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-3.5 w-3.5" />
                          source
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 font-mono text-sm text-slate-500">
          <span className="text-emerald-400/60">$</span>
          <span>more projects on</span>
          <a
            href="https://github.com/s0hamjain"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors duration-200 hover:text-emerald-400 hover:decoration-emerald-400/40"
          >
            <Github className="h-4 w-4" />
            github
          </a>
        </div>
      </SectionHeader>
    </SectionShell>
  );
};

export default Projects;
