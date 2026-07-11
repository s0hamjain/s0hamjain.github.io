import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Code2 } from 'lucide-react';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTensorflow,
  SiNodedotjs,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiMysql,
  SiFlask,
  SiExpress,
  SiFirebase,
  SiGit,
  SiMongodb,
  SiGooglecloud,
  SiVite,
  SiKeras,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiOpencv,
  SiSharp,
  SiKotlin,
  SiDocker,
  SiRailway,
  SiAmazon,
  SiLinux,
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
        { name: 'C/C++', icon: <SiCplusplus />, colorClass: 'text-[#00599C]' },
        { name: 'JavaScript', icon: <SiJavascript />, colorClass: 'text-[#E8D44D]' },
        { name: 'TypeScript', icon: <SiTypescript />, colorClass: 'text-[#3178C6]' },
        { name: 'C#', icon: <SiSharp />, colorClass: 'text-[#512BD4]' },
        { name: 'SQL', icon: <SiMysql />, colorClass: 'text-[#4479A1]' },
        { name: 'HTML/CSS', icon: <SiHtml5 />, colorClass: 'text-[#E34F26]' },
        { name: 'Kotlin', icon: <SiKotlin />, colorClass: 'text-[#7F52FF]' },
        { name: 'Assembly', icon: <Code2 />, colorClass: 'text-zinc-400', lucide: true },
      ],
    },
    {
      category: 'Developer Tools',
      skills: [
        { name: 'Git', icon: <SiGit />, colorClass: 'text-[#F05032]' },
        { name: 'Linux/Unix', icon: <SiLinux />, colorClass: 'text-[#FCC624]' },
        { name: 'Docker', icon: <SiDocker />, colorClass: 'text-[#2496ED]' },
        { name: 'VS Code', icon: <Code2 />, colorClass: 'text-[#007ACC]', lucide: true },
        { name: 'Railway', icon: <SiRailway />, colorClass: 'text-[#B026FF]' },
        { name: 'AWS', icon: <SiAmazon />, colorClass: 'text-[#FF9900]' },
        {
          name: 'Google Cloud Platform',
          icon: <SiGooglecloud />,
          colorClass: 'text-[#4285F4]',
        },
        { name: 'Firebase', icon: <SiFirebase />, colorClass: 'text-[#FFCA28]' },
        { name: 'MongoDB', icon: <SiMongodb />, colorClass: 'text-[#47A248]' },
      ],
    },
    {
      category: 'Frameworks & Libraries',
      skills: [
        { name: 'React', icon: <SiReact />, colorClass: 'text-[#61DAFB]' },
        { name: 'Vite', icon: <SiVite />, colorClass: 'text-[#646CFF]' },
        { name: 'Node.js', icon: <SiNodedotjs />, colorClass: 'text-[#339933]' },
        { name: 'Flask', icon: <SiFlask />, colorClass: 'text-zinc-200' },
        { name: 'Express', icon: <SiExpress />, colorClass: 'text-zinc-400' },
        { name: 'Next.js', icon: <SiNextdotjs />, colorClass: 'text-zinc-100' },
        { name: 'OpenCV', icon: <SiOpencv />, colorClass: 'text-[#5C3EE8]' },
        { name: 'NumPy', icon: <SiNumpy />, colorClass: 'text-[#4DABC2]' },
        { name: 'Pandas', icon: <SiPandas />, colorClass: 'text-[#A15BB4]' },
        { name: 'TensorFlow', icon: <SiTensorflow />, colorClass: 'text-[#FF6F00]' },
        { name: 'Keras', icon: <SiKeras />, colorClass: 'text-[#D00000]' },
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
        <div
          className={cn(visible && 'animate-fade-up', !visible && 'opacity-0')}
          style={visible ? { animationDelay: '0ms' } : undefined}
        >
          <SectionHeader kicker="skills" title="Technical Skills" />
        </div>

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
