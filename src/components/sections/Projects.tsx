import { ExternalLink, Github, Smartphone, Eye, Users, Utensils, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';
import TechBadge from '@/components/TechBadge';

const Projects = () => {
  const projects = [
    {
      title: "RoutineRemind",
      description: "Provisional patented, utility patent-pending scheduling application specifically designed for individuals with speech and cognitive disabilities. Currently being deployed on both Google Play Store and Apple App Store.",
      icon: <Smartphone className="h-7 w-7" />,
      period: "June 2022 - Present",
      technologies: ["React", "JavaScript", "TypeScript", "Python", "HTML/CSS", "Firebase", "Rasa"],
      links: {
        demo: "https://www.congressionalappchallenge.us/22-va10/",
        github: "https://github.com/sjain2025/RoutineRemind"
      }
    },
    {
      title: "EyeLS",
      description: "Gaze-tracking web application designed to enable ALS patients to communicate nonverbally. Implements Kalman Filtering and Monte Carlo algorithms for precise eye movement detection.",
      icon: <Eye className="h-7 w-7" />,
      period: "August 2023 - Present",
      technologies: ["JavaScript", "HTML/CSS", "Computer Vision", "Kalman Filtering", "Monte Carlo"],
      links: {
        demo: "https://www.youtube.com/watch?v=YAlBLGYtgLA",
        github: "https://github.com/sjain2025/EyeLS"
      }
    },
    {
      title: "CMUEats",
      description: "Comprehensive dining locations website for Carnegie Mellon University, providing real-time information about campus dining options, hours, and menus. Developed as part of ScottyLabs student organization.",
      icon: <Utensils className="h-7 w-7" />,
      period: "August 2025 - Present",
      technologies: ["Vite", "React", "TypeScript", "HTML", "Vanilla CSS", "Elysia"],
      links: {
        demo: "https://cmueats.com/",
        github: "https://github.com/ScottyLabs/cmueats"
      }
    },
    {
      title: "Memory Lane",
      description: "Mobile application designed to provide people with Alzheimer's and other memory loss-related conditions with a platform to replay memories from their past. The app requires a login through email for each user, and upon authentication, the user is presented with three options: Add an entry, Ask a question, and a unique feature called \"A Memory A Day.\"",
      icon: <Brain className="h-7 w-7" />,
      period: "March 2023 - June 2024",
      technologies: ["React Native", "JavaScript", "Firebase", "TypeScript", "HTML/CSS"],
      links: {
        demo: "https://www.youtube.com/watch?v=ySS6zBkvRq4",
        github: "https://github.com/sjain2025/MemoryLane"
      }
    },
    {
      title: "NeurOS",
      description: "Smartphone AI application that quantifies brain health using gaze-tracking algorithms. Developed during my time at Vytal.AI.",
      icon: <Users className="h-7 w-7" />,
      period: "May 2022 - Present",
      technologies: ["React Native", "Python", "AI/ML", "Mobile Development", "Computer Vision"],
      links: {
        demo: "#",
        github: "#"
      }
    }
  ];

  return (
    <SectionShell id="projects" containerClassName="max-w-7xl">
      <SectionHeader kicker="projects" title="Featured Projects" />

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`card-surface shadow-card-glow animate-fade-up group flex flex-col p-6 transition-colors duration-300 hover:border-slate-600/60 md:p-8 ${project.title === "NeurOS" ? "lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-2xl" : ""}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <header className="mb-5 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                {project.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{project.period}</p>
              </div>
            </header>

            <p className="mb-6 text-base leading-relaxed text-foreground/75">
              {project.description}
            </p>

            <div className="mt-auto">
              <div className="border-t border-border/60 pt-5">
                <p className="mb-3 text-sm font-semibold text-foreground">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <TechBadge key={`${project.title}-${tech}`} name={tech} />
                  ))}
                </div>
              </div>

              {project.title !== "NeurOS" && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    className="flex-1 border-0 bg-primary font-medium text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 sm:flex-none"
                    asChild
                  >
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {project.title === "RoutineRemind" ? "Read More" : project.title === "CMUEats" ? "View Website" : "View Demo"}
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
          <a href="https://github.com/sjain2025" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-5 w-5" />
            View All Projects
          </a>
        </Button>
      </div>
    </SectionShell>
  );
};

export default Projects;
