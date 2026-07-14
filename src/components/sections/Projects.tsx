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
      <SectionHeader title="Featured Projects" />

      <div className="flex flex-col gap-10">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="card-surface shadow-card-glow animate-fade-up group overflow-hidden transition-colors duration-300 hover:border-slate-600/60"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
              <div className={`border-b border-border/60 lg:border-b-0 [direction:ltr] ${index % 2 === 1 ? 'lg:border-l' : 'lg:border-r'}`}>
                <ProjectVisual project={project} />
              </div>

              <div className="flex flex-col p-6 [direction:ltr] md:p-10">
                <header className="mb-4">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{project.period}</p>
                </header>

                <p className="mb-6 text-base leading-relaxed text-foreground/75">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <div className="border-t border-border/60 pt-5">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <TechBadge key={`${project.title}-${tech}`} name={tech} />
                      ))}
                    </div>
                  </div>

                  {project.links && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        className="flex-1 border-0 bg-primary font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg sm:flex-none"
                        asChild
                      >
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {project.links.demoLabel}
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-slate-700/60 bg-transparent text-slate-300 transition-all duration-200 hover:border-slate-500/70 hover:bg-slate-800/50 hover:text-slate-100 sm:flex-none"
                        asChild
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
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

      <div className="mt-16 text-center">
        <p className="mb-6 text-muted-foreground">
          Want to see more of my work? Check out my GitHub!
        </p>
        <Button
          size="lg"
          variant="outline"
          className="border-slate-700/60 bg-transparent text-slate-300 transition-all duration-200 hover:border-slate-500/70 hover:bg-slate-800/50 hover:text-slate-100"
          asChild
        >
          <a href="https://github.com/s0hamjain" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-5 w-5" />
            View All Projects
          </a>
        </Button>
      </div>
    </SectionShell>
  );
};

export default Projects;
