import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Code2 } from 'lucide-react';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiFlask,
  SiExpress,
  SiGit,
  SiGooglecloud,
  SiVite,
  SiNextdotjs,
  SiSharp,
  SiKotlin,
  SiDocker,
  SiRailway,
  SiAmazon,
  SiLinux,
  SiJenkins,
  SiJira,
  SiPostgresql,
  SiGnubash,
  SiSpringboot,
  SiAngular,
  SiFastapi,
} from 'react-icons/si';
import { cn } from '@/lib/utils';
import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';

type SkillItem = { name: string; icon: ReactNode; colorClass: string; lucide?: boolean };

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const skillCategories: { category: string; skills: SkillItem[] }[] = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Python', icon: <SiPython />, colorClass: 'text-[#3776AB]' },
        { name: 'Java', icon: <Code2 />, colorClass: 'text-[#E76F00]', lucide: true },
        { name: 'C', icon: <SiCplusplus />, colorClass: 'text-[#00599C]' },
        { name: 'C++', icon: <SiCplusplus />, colorClass: 'text-[#00599C]' },
        { name: 'TypeScript', icon: <SiTypescript />, colorClass: 'text-[#3178C6]' },
        { name: 'JavaScript', icon: <SiJavascript />, colorClass: 'text-[#E8D44D]' },
        { name: 'SQL', icon: <SiMysql />, colorClass: 'text-[#4479A1]' },
        { name: 'HTML', icon: <SiHtml5 />, colorClass: 'text-[#E34F26]' },
        { name: 'CSS', icon: <SiCss3 />, colorClass: 'text-[#1572B6]' },
        { name: 'Kotlin', icon: <SiKotlin />, colorClass: 'text-[#7F52FF]' },
        { name: 'Shell', icon: <SiGnubash />, colorClass: 'text-[#E6E6E6]' },
        { name: 'Groovy', icon: <Code2 />, colorClass: 'text-zinc-400', lucide: true },
      ],
    },
    {
      category: 'Developer Tools',
      skills: [
        { name: 'Git', icon: <SiGit />, colorClass: 'text-[#F05032]' },
        { name: 'AWS', icon: <SiAmazon />, colorClass: 'text-[#FF9900]' },
        { name: 'Jenkins', icon: <SiJenkins />, colorClass: 'text-[#D24939]' },
        { name: 'Docker', icon: <SiDocker />, colorClass: 'text-[#2496ED]' },
        { name: 'Jira', icon: <SiJira />, colorClass: 'text-[#0052CC]' },
        { name: 'Linux/Unix', icon: <SiLinux />, colorClass: 'text-[#FCC624]' },
        { name: 'Google Cloud Platform', icon: <SiGooglecloud />, colorClass: 'text-[#4285F4]' },
        { name: 'Railway', icon: <SiRailway />, colorClass: 'text-[#B026FF]' },
        { name: 'MySQL', icon: <SiMysql />, colorClass: 'text-[#4479A1]' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, colorClass: 'text-[#336791]' },
      ],
    },
    {
      category: 'Frameworks & Technologies',
      skills: [
        { name: 'React', icon: <SiReact />, colorClass: 'text-[#61DAFB]' },
        { name: 'Vite', icon: <SiVite />, colorClass: 'text-[#646CFF]' },
        { name: 'Node.js', icon: <SiNodedotjs />, colorClass: 'text-[#339933]' },
        { name: 'Spring Boot', icon: <SiSpringboot />, colorClass: 'text-[#6DB33F]' },
        { name: 'Flask', icon: <SiFlask />, colorClass: 'text-zinc-200' },
        { name: 'Angular', icon: <SiAngular />, colorClass: 'text-[#DD0031]' },
        { name: 'Next.js', icon: <SiNextdotjs />, colorClass: 'text-zinc-100' },
        { name: 'Express.js', icon: <SiExpress />, colorClass: 'text-zinc-400' },
        { name: 'FastAPI', icon: <SiFastapi />, colorClass: 'text-[#009688]' },
      ],
    },
  ];

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionShell id="skills">
      <div ref={sectionRef} className="skills-section">
        <SectionHeader title="Technical Skills" />

        <div>
          <div
            className={cn(
              'card-surface shadow-card-glow p-8 md:p-10 lg:p-12',
              visible && 'animate-fade-up',
              !visible && 'opacity-0'
            )}
            style={visible ? { animationDelay: '0.05s' } : undefined}
          >
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-0">
              {skillCategories.map((cat, colIndex) => {
                const skillsBefore = skillCategories
                  .slice(0, colIndex)
                  .reduce((sum, c) => sum + c.skills.length, 0);

                return (
                  <div
                    key={cat.category}
                    className={
                      colIndex === 0
                        ? 'lg:pr-10 xl:pr-14'
                        : 'lg:border-l lg:border-border/60 lg:pl-10 xl:pl-14'
                    }
                  >
                    <h3
                      className={cn(
                        'mb-6 border-b border-border/60 pb-3 text-xl font-bold tracking-tight text-foreground',
                        visible && 'animate-fade-up',
                        !visible && 'opacity-0'
                      )}
                      style={
                        visible ? { animationDelay: `${0.1 + colIndex * 0.08}s` } : undefined
                      }
                    >
                      {cat.category}
                    </h3>
                    <ul className="space-y-3">
                      {cat.skills.map((skill, skillIdx) => {
                        const i = skillsBefore + skillIdx;
                        const delay =
                          visible ? `${0.16 + colIndex * 0.03 + i * 0.022}s` : undefined;
                        return (
                          <li key={skill.name}>
                            <div
                              className={cn(
                                'group flex items-center gap-3.5 rounded-lg py-0.5 transition-transform duration-200 ease-out hover:translate-x-1',
                                visible && 'animate-skills-row',
                                !visible && 'opacity-0'
                              )}
                              style={visible ? { animationDelay: delay } : undefined}
                            >
                              <span
                                className={cn(
                                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-border/60 bg-background/50 transition-colors duration-200 hover:border-border/80 [&_svg]:h-[1.05rem] [&_svg]:w-[1.05rem] group-hover:scale-105 group-hover:shadow-sm',
                                  skill.lucide
                                    ? '[&_svg]:fill-none [&_svg]:stroke-current'
                                    : '[&_svg]:fill-current',
                                  skill.colorClass
                                )}
                                aria-hidden
                              >
                                {skill.icon}
                              </span>
                              <span className="text-[15px] font-medium leading-snug text-foreground/90 transition-colors duration-200 group-hover:text-foreground">
                                {skill.name}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default Skills;
