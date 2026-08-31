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
      period: 'Jun 2026 – Aug 2026',
      location: 'Washington, DC',
      achievements: [
        'Accelerated service issue resolution by 75% across a 2.5M+ subscriber base by developing a full-stack application with React, TypeScript, Node.js, and MySQL to centralize issue tracking and operator workflows.',
        'Scaled microservices traffic to 25,000+ daily requests by designing a networking layer with Akamai CDN for frontend delivery, AWS Application Load Balancer for request distribution, and Nginx for backend routing.',
        'Automated CI/CD across 4 environments by developing AWS CDK infrastructure in Java and Jenkins pipelines that lint, test, compile, and deploy the application to AWS S3.',
        'Shipped 50+ pull requests using AWS Kiro and GitHub Copilot to diagnose bugs and improve code quality.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'MySQL',
        'Java',
        'Jenkins',
        'AWS',
        'AWS S3',
        'GitHub Copilot',
      ],
    },
    {
      company: 'ScottyLabs',
      position: 'Software Developer Intern',
      period: 'Aug 2025 – May 2026',
      location: 'Pittsburgh, PA',
      achievements: [
        'Streamlined meal planning for 10,000+ monthly active users across 30 campus locations by developing a React, Vite, and TypeScript application for live dining availability and menus.',
        'Drove a 70% increase in daily sessions by launching rating and distance-based search features with JavaScript and PostgreSQL, using Cursor to optimize feature iteration and code review.',
        'Maintained 99.9% backend uptime while refreshing dining data every 5 minutes by building Node.js REST APIs, containerizing services with Docker, and deploying on Railway.',
      ],
      technologies: ['React', 'Vite', 'TypeScript', 'JavaScript', 'PostgreSQL', 'Node.js', 'REST APIs', 'Docker', 'Railway'],
    },
    {
      company: 'Vytal.AI',
      position: 'Software Engineer Intern',
      period: 'May 2022 – Oct 2024',
      location: 'McLean, VA',
      achievements: [
        'Delivered brain health evaluations in under 30 seconds by building gaze-tracking software that processes 8,000+ ocular data points in Python and serves results through Flask to a Next.js frontend.',
        'Coordinated biweekly feature releases for a cross-disciplinary team of 20+ engineers and ML researchers by organizing Agile sprints and tracking development progress in Jira.',
        'Scaled cloud infrastructure for 300 beta users by managing MongoDB storage and deploying services on AWS EC2.',
      ],
      technologies: ['Python', 'Flask', 'Next.js', 'Jira', 'MongoDB', 'AWS EC2'],
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
