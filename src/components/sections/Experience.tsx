import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';
import TechBadge from '@/components/TechBadge';

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description?: string;
  achievements: string[];
  technologies: string[];
  location?: string;
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      company: 'The Washington Post',
      position: 'Software Engineer Intern',
      period: 'Jun 2026 – Present',
      location: 'Washington, DC',
      achievements: [
        'Build a complaint dispatch application for 2.5M+ digital and print subscribers using React, TypeScript, Express.js, and MySQL, helping carriers resolve service issues 40% faster.',
        'Automate build, test, and deployment lifecycles for 6 full-stack apps by designing Jenkins pipelines with Groovy and Docker containerized agents.',
        'Deploy 35+ microservices to ECS via AWS CDK stacks in Java that provision Route 53 DNS and load balancing automatically.',
      ],
      technologies: ['React', 'TypeScript', 'Express.js', 'MySQL', 'Jenkins', 'Groovy', 'Docker', 'AWS'],
    },
    {
      company: 'ScottyLabs',
      position: 'Software Developer Intern',
      period: 'Aug 2025 – May 2026',
      location: 'Pittsburgh, PA',
      achievements: [
        'Developed a campus dining PWA with React, Vite, JavaScript, and TypeScript for 10,000+ students across 30+ locations.',
        'Engineered a Node.js web scraping service on Railway that serves dining data across 8 REST endpoints with 99% uptime.',
        'Led distance-based and rating-based sorting features using React Query and geolocation data, tripling daily active sessions.',
        'Configured GitHub Actions pipelines with Vitest and Oxlint to catch type and style issues before production.',
      ],
      technologies: ['React', 'Vite', 'JavaScript', 'TypeScript', 'Node.js', 'Railway', 'REST APIs', 'GitHub Actions'],
    },
    {
      company: 'Vytal.AI',
      position: 'Software Engineer Intern',
      period: 'May 2022 – Oct 2024',
      location: 'McLean, VA',
      achievements: [
        'Created a gaze-tracking assessment platform with Python, Flask, Next.js, and HTML/CSS that processes 10,000+ ocular data points in under 30 seconds.',
        'Managed MongoDB storage and AWS EC2 deployments to serve 300+ clinical beta users.',
        'Collaborated across software engineering and ML teams via Agile sprints with Jira and Notion, delivering features biweekly.',
      ],
      technologies: ['Python', 'Flask', 'Next.js', 'HTML/CSS', 'MongoDB', 'AWS EC2', 'Jira'],
    },
  ];

  return (
    <SectionShell id="experience">
      <SectionHeader title="Work Experience" />

      <div className="flex w-full flex-col gap-10 md:gap-12">
        {experiences.map((exp, index) => (
          <article
            key={exp.company}
            className="card-surface shadow-card-glow animate-fade-up p-6 md:p-8"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <header className="border-b border-border/60 pb-5 md:pb-6">
              <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">{exp.company}</h3>
              <p className="mt-2 text-base font-semibold text-primary/90 md:text-lg">{exp.position}</p>
              <p className="mt-2.5 text-sm text-muted-foreground md:text-[15px]">
                <span className="tabular-nums">{exp.period}</span>
                {exp.location ? (
                  <>
                    <span className="mx-2 text-muted-foreground/50">·</span>
                    <span>{exp.location}</span>
                  </>
                ) : null}
              </p>
            </header>

            <div className="pt-5 md:pt-6">
              {exp.description ? (
                <p className="mb-5 text-base leading-relaxed text-foreground/80 md:mb-6">{exp.description}</p>
              ) : null}

              <ul className="list-none space-y-3.5 md:space-y-4">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/75 md:text-[17px] md:leading-relaxed">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" aria-hidden />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies.length > 0 ? (
                <div className="mt-7 border-t border-border/60 pt-6 md:mt-8 md:pt-7">
                  <p className="mb-3 text-sm font-semibold text-foreground md:mb-3.5">Technologies</p>
                  <div className="flex flex-wrap gap-2 md:gap-2.5">
                    {exp.technologies.map((tech) => (
                      <TechBadge key={`${exp.company}-${tech}`} name={tech} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
};

export default Experience;
