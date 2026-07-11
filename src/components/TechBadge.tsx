import type { ReactNode } from 'react';
import { Atom, Binary, Brain, Code2, Eye, KeyRound, Layers, LineChart, Link2, Sigma, Smartphone } from 'lucide-react';
import {
  SiAmazon,
  SiAmazonec2,
  SiCss3,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFlask,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiJira,
  SiKotlin,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiOpenapiinitiative,
  SiPython,
  SiRailway,
  SiRasa,
  SiReact,
  SiScrumalliance,
  SiSharp,
  SiSpringboot,
  SiTypescript,
  SiAngular,
  SiFastapi,
  SiGnubash,
  SiGooglecloud,
  SiVite,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

type TechDef = {
  label: string;
  icon: ReactNode;
  colorClass: string;
  wide?: boolean;
  lucide?: boolean;
};

const TECH_LOOKUP: Record<string, TechDef> = {
  React: { label: 'React', icon: <SiReact />, colorClass: 'text-[#61DAFB]' },
  'React Native': { label: 'React Native', icon: <SiReact />, colorClass: 'text-[#61DAFB]' },
  TypeScript: { label: 'TypeScript', icon: <SiTypescript />, colorClass: 'text-[#3178C6]' },
  Railway: { label: 'Railway', icon: <SiRailway />, colorClass: 'text-[#B026FF]' },
  JavaScript: { label: 'JavaScript', icon: <SiJavascript />, colorClass: 'text-[#E8D44D]' },
  'C++': { label: 'C++', icon: <SiCplusplus />, colorClass: 'text-[#00599C]' },
  Java: { label: 'Java', icon: <Code2 className="h-3.5 w-3.5" />, colorClass: 'text-[#E76F00]', lucide: true },
  Kotlin: { label: 'Kotlin', icon: <SiKotlin />, colorClass: 'text-[#7F52FF]' },
  Groovy: { label: 'Groovy', icon: <Code2 className="h-3.5 w-3.5" />, colorClass: 'text-zinc-400', lucide: true },
  'REST APIs': { label: 'REST APIs', icon: <SiOpenapiinitiative />, colorClass: 'text-[#6BA539]' },
  'GitHub Actions': { label: 'GitHub Actions', icon: <SiGithubactions />, colorClass: 'text-[#2088FF]' },
  Docker: { label: 'Docker', icon: <SiDocker />, colorClass: 'text-[#2496ED]' },
  OpenCV: { label: 'OpenCV', icon: <SiOpencv />, colorClass: 'text-[#5C3EE8]' },
  'Next.js': { label: 'Next.js', icon: <SiNextdotjs />, colorClass: 'text-zinc-300' },
  'Node.js': { label: 'Node.js', icon: <SiNodedotjs />, colorClass: 'text-[#339933]' },
  Python: { label: 'Python', icon: <SiPython />, colorClass: 'text-[#3776AB]' },
  AWS: { label: 'AWS', icon: <SiAmazon />, colorClass: 'text-[#FF9900]' },
  'AWS EC2': { label: 'AWS EC2', icon: <SiAmazonec2 />, colorClass: 'text-[#FF9900]' },
  'AWS S3': { label: 'AWS S3', icon: <SiAmazon />, colorClass: 'text-[#FF9900]' },
  MongoDB: { label: 'MongoDB', icon: <SiMongodb />, colorClass: 'text-[#47A248]' },
  MySQL: { label: 'MySQL', icon: <SiMysql />, colorClass: 'text-[#4479A1]' },
  PostgreSQL: { label: 'PostgreSQL', icon: <SiPostgresql />, colorClass: 'text-[#336791]' },
  Jenkins: { label: 'Jenkins', icon: <SiJenkins />, colorClass: 'text-[#D24939]' },
  Jira: { label: 'Jira', icon: <SiJira />, colorClass: 'text-[#0052CC]' },
  'Google Cloud Platform': { label: 'Google Cloud Platform', icon: <SiGooglecloud />, colorClass: 'text-[#4285F4]' },
  Agile: { label: 'Agile', icon: <SiScrumalliance />, colorClass: 'text-[#009FDA]' },
  'C#': { label: 'C#', icon: <SiSharp />, colorClass: 'text-[#512BD4]' },
  Vite: { label: 'Vite', icon: <SiVite />, colorClass: 'text-[#646CFF]' },
  Firebase: { label: 'Firebase', icon: <SiFirebase />, colorClass: 'text-[#FFCA28]' },
  Rasa: { label: 'Rasa', icon: <SiRasa />, colorClass: 'text-[#5A17EE]' },
  HTML: { label: 'HTML', icon: <SiHtml5 />, colorClass: 'text-[#E34F26]' },
  'Vanilla CSS': { label: 'Vanilla CSS', icon: <SiCss3 />, colorClass: 'text-[#1572B6]' },
  Flask: { label: 'Flask', icon: <SiFlask />, colorClass: 'text-zinc-300' },
  'Express.js': { label: 'Express.js', icon: <SiExpress />, colorClass: 'text-zinc-400' },
  'Spring Boot': { label: 'Spring Boot', icon: <SiSpringboot />, colorClass: 'text-[#6DB33F]' },
  Angular: { label: 'Angular', icon: <SiAngular />, colorClass: 'text-[#DD0031]' },
  FastAPI: { label: 'FastAPI', icon: <SiFastapi />, colorClass: 'text-[#009688]' },
  WebSockets: { label: 'WebSockets', icon: <Link2 className="h-3.5 w-3.5" />, colorClass: 'text-sky-400', lucide: true },
  'OAuth 2.0': { label: 'OAuth 2.0', icon: <KeyRound className="h-3.5 w-3.5" />, colorClass: 'text-amber-300', lucide: true },
  Algorithms: {
    label: 'Algorithms',
    icon: <Binary className="h-3.5 w-3.5" />,
    colorClass: 'text-zinc-400',
    lucide: true,
  },
  OOP: {
    label: 'OOP',
    icon: <Layers className="h-3.5 w-3.5" />,
    colorClass: 'text-zinc-400',
    lucide: true,
  },
  'HTML/CSS': {
    label: 'HTML / CSS',
    icon: (
      <span className="flex shrink-0 items-center gap-px">
        <SiHtml5 className="h-3.5 w-3.5" />
        <SiCss3 className="h-3.5 w-3.5" />
      </span>
    ),
    colorClass: 'text-[#E34F26]',
    wide: true,
  },
  Matplotlib: {
    label: 'Matplotlib',
    icon: <LineChart className="h-3.5 w-3.5" />,
    colorClass: 'text-emerald-400/80',
    lucide: true,
  },
  'Molecular Dynamics': {
    label: 'Molecular dynamics',
    icon: <Atom className="h-3.5 w-3.5" />,
    colorClass: 'text-sky-400/80',
    lucide: true,
  },
  'Computer Vision': {
    label: 'Computer Vision',
    icon: <Eye className="h-3.5 w-3.5" />,
    colorClass: 'text-sky-400/80',
    lucide: true,
  },
  'AI/ML': {
    label: 'AI / ML',
    icon: <Brain className="h-3.5 w-3.5" />,
    colorClass: 'text-violet-400/80',
    lucide: true,
  },
  'Kalman Filtering': {
    label: 'Kalman Filtering',
    icon: <Sigma className="h-3.5 w-3.5" />,
    colorClass: 'text-amber-400/80',
    lucide: true,
  },
  'Monte Carlo': {
    label: 'Monte Carlo',
    icon: <Sigma className="h-3.5 w-3.5" />,
    colorClass: 'text-amber-400/80',
    lucide: true,
  },
  'Mobile Development': {
    label: 'Mobile Development',
    icon: <Smartphone className="h-3.5 w-3.5" />,
    colorClass: 'text-zinc-400',
    lucide: true,
  },
};

function TechBadge({ name }: { name: string }) {
  const def = TECH_LOOKUP[name];
  if (!def) {
    return (
      <span className="inline-flex items-center rounded-md border border-border/70 bg-muted/15 px-2.5 py-1.5 text-xs font-medium text-foreground/90">
        {name}
      </span>
    );
  }

  return (
    <span
      title={def.label}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/15 px-2 py-1.5 text-xs font-medium text-foreground/90',
        def.colorClass,
        def.lucide
          ? '[&_svg]:fill-none [&_svg]:stroke-current'
          : '[&_svg]:fill-current [&_svg]:h-3.5 [&_svg]:w-3.5',
        def.wide && !def.lucide && '[&_span_svg]:h-3.5 [&_span_svg]:w-3.5'
      )}
    >
      <span className="flex shrink-0 items-center justify-center opacity-95">{def.icon}</span>
      <span className="text-foreground/85">{def.label}</span>
    </span>
  );
}

export default TechBadge;
