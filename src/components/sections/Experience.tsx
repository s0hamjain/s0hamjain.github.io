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
      company: 'ScottyLabs',
      position: 'Software Engineer',
      period: 'Aug 2025 – Present',
      location: 'Pittsburgh, PA',
      achievements: [
        'Integrate live data from Dining Services into CMUEats using React, TypeScript, and Railway, streamlining menus and specials for 10,000+ users each month across mobile and web.',
        'Lead the development of a geospatial routing system with JavaScript and REST APIs to rank dining locations by walking distance, resulting in a 30–50% reduction in search time.',
        'Automate CI/CD pipelines for 50+ developers with GitHub Actions and Docker to enforce linting and unit testing.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Railway',
        'JavaScript',
        'REST APIs',
        'GitHub Actions',
        'Docker',
      ],
    },
    {
      company: 'Vytal.AI',
      position: 'Software Engineer',
      period: 'May 2022 – Feb 2025',
      location: 'Alexandria, VA',
      achievements: [
        'Developed a mobile application that analyzes ocular biometrics using OpenCV and Next.js to quantify brain health in under 30 seconds.',
        'Optimized Python pipelines and deployed ML models on AWS EC2 and MongoDB to scale to 300 clinical beta users.',
        'Implemented OCR-driven PDF parsing using Agile methodologies like sprint cycles and stand-ups, decreasing the average processing time for uploaded health records by 90 seconds.',
      ],
      technologies: ['OpenCV', 'Next.js', 'Python', 'AWS EC2', 'MongoDB', 'Agile'],
    },
    {
      company: 'Virginia Tech',
      position: 'Computer Science Research Intern',
      period: 'Apr 2024 – Jan 2025',
      location: 'Blacksburg, VA',
      achievements: [
        'Spearheaded research with a team of 10+ developers to develop algorithms for constraint satisfaction problems in C# and Python, reducing computation time by up to 65% compared to standard recursive methods.',
        'Implemented object-oriented programming architecture for nodes and edges, solving the graph coloring problem on a map of the United States in less than 25 seconds.',
      ],
      technologies: ['C#', 'Python', 'Algorithms', 'OOP'],
    },
    {
      company: 'George Mason University',
      position: 'Machine Learning Research Intern',
      period: 'Jun 2023 – Jan 2024',
      location: 'Fairfax, VA',
      achievements: [
        "Published a first-author paper in the Journal of Student-Scientists' Research, introducing a web dashboard built with Flask and HTML/CSS to standardize five technical metrics for analyzing molecular dynamics simulations.",
        'Visualized data for 20,000+ simulations with Matplotlib, cutting evaluation time from 12 hours to under 25 minutes.',
      ],
      technologies: ['Flask', 'Python', 'HTML/CSS', 'Matplotlib', 'Molecular Dynamics'],
    },
  ];

  return (
    <SectionShell id="experience">
      <SectionHeader kicker="experience" title="Work Experience" />

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
