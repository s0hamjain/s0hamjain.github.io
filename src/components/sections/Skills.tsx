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
  SiMysql,
  SiFlask,
  SiGit,
  SiGooglecloud,
  SiVite,
  SiNextdotjs,
  SiKotlin,
  SiDocker,
  SiRailway,
  SiAmazon,
  SiJenkins,
  SiJira,
  SiPostgresql,
  SiSpringboot,
  SiFastapi,
  SiGo,
  SiMongodb,
  SiGithubcopilot,
  SiOpenai,
  SiGooglegemini,
  SiAnthropic,
  SiOpenapiinitiative,
} from 'react-icons/si';
import { cn } from '@/lib/utils';
import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { TerminalWindow } from '@/components/layout/TerminalChrome';

type SkillItem = { name: string; icon: ReactNode; colorClass: string; lucide?: boolean };

const skillCategories: { category: string; skills: SkillItem[] }[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', icon: <Code2 />, colorClass: 'text-[#E76F00]', lucide: true },
      { name: 'Python', icon: <SiPython />, colorClass: 'text-[#3776AB]' },
      { name: 'TypeScript', icon: <SiTypescript />, colorClass: 'text-[#3178C6]' },
      { name: 'JavaScript', icon: <SiJavascript />, colorClass: 'text-[#E8D44D]' },
      { name: 'C/C++', icon: <SiCplusplus />, colorClass: 'text-[#00599C]' },
      { name: 'SQL', icon: <SiMysql />, colorClass: 'text-[#4479A1]' },
      { name: 'HTML/CSS', icon: <SiHtml5 />, colorClass: 'text-[#E34F26]' },
      { name: 'Go', icon: <SiGo />, colorClass: 'text-[#00ADD8]' },
      { name: 'Kotlin', icon: <SiKotlin />, colorClass: 'text-[#7F52FF]' },
    ],
  },
  {
    category: 'Frameworks & Technologies',
    skills: [
      { name: 'React', icon: <SiReact />, colorClass: 'text-[#61DAFB]' },
      { name: 'Node.js', icon: <SiNodedotjs />, colorClass: 'text-[#339933]' },
      { name: 'Spring Boot', icon: <SiSpringboot />, colorClass: 'text-[#6DB33F]' },
      { name: 'FastAPI', icon: <SiFastapi />, colorClass: 'text-[#009688]' },
      { name: 'Flask', icon: <SiFlask />, colorClass: 'text-zinc-200' },
      { name: 'Next.js', icon: <SiNextdotjs />, colorClass: 'text-zinc-100' },
      { name: 'Vite', icon: <SiVite />, colorClass: 'text-[#646CFF]' },
      { name: 'REST APIs', icon: <SiOpenapiinitiative />, colorClass: 'text-[#6BA539]' },
    ],
  },
  {
    category: 'AI & Developer Tools',
    skills: [
      { name: 'Git', icon: <SiGit />, colorClass: 'text-[#F05032]' },
      { name: 'Docker', icon: <SiDocker />, colorClass: 'text-[#2496ED]' },
      { name: 'Jenkins', icon: <SiJenkins />, colorClass: 'text-[#D24939]' },
      { name: 'Jira', icon: <SiJira />, colorClass: 'text-[#0052CC]' },
      { name: 'GitHub Copilot', icon: <SiGithubcopilot />, colorClass: 'text-zinc-100' },
      { name: 'AWS Kiro', icon: <SiAmazon />, colorClass: 'text-[#FF9900]' },
      { name: 'Cursor', icon: <Code2 />, colorClass: 'text-emerald-400', lucide: true },
      { name: 'Claude', icon: <SiAnthropic />, colorClass: 'text-[#D4A574]' },
      { name: 'GPT-4o', icon: <SiOpenai />, colorClass: 'text-zinc-100' },
      { name: 'Gemini', icon: <SiGooglegemini />, colorClass: 'text-[#8E75B2]' },
    ],
  },
  {
    category: 'Cloud & Databases',
    skills: [
      { name: 'AWS', icon: <SiAmazon />, colorClass: 'text-[#FF9900]' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, colorClass: 'text-[#336791]' },
      { name: 'MySQL', icon: <SiMysql />, colorClass: 'text-[#4479A1]' },
      { name: 'MongoDB', icon: <SiMongodb />, colorClass: 'text-[#47A248]' },
      { name: 'Google Cloud', icon: <SiGooglecloud />, colorClass: 'text-[#4285F4]' },
      { name: 'Railway', icon: <SiRailway />, colorClass: 'text-[#B026FF]' },
    ],
  },
];

const SkillChip = ({ skill }: { skill: SkillItem }) => (
  <span className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-sm font-medium text-foreground/90 transition-colors duration-200 hover:border-border/80 hover:bg-background/60">
    <span
      className={cn(
        'flex h-6 w-6 shrink-0 items-center justify-center [&_svg]:h-3.5 [&_svg]:w-3.5',
        skill.lucide ? '[&_svg]:fill-none [&_svg]:stroke-current' : '[&_svg]:fill-current',
        skill.colorClass
      )}
      aria-hidden
    >
      {skill.icon}
    </span>
    {skill.name}
  </span>
);

const Skills = () => (
  <SectionShell id="skills">
    <SectionHeader command="cat skills" title="Technical Skills">
      <TerminalWindow title="skills — zsh" className="shadow-card-glow">
        <div className="grid gap-5 bg-[#14151a] p-6 sm:gap-6 sm:p-8 md:grid-cols-2">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="rounded-xl border border-border/50 bg-background/20 p-5 sm:p-6"
            >
              <h3 className="mb-4 font-mono text-sm text-slate-400">
                {`// ${cat.category}`}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </SectionHeader>
  </SectionShell>
);

export default Skills;
