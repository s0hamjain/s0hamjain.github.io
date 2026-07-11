import type { ReactNode } from 'react';
import { Atom, Binary, Brain, Eye, Layers, LineChart, Sigma, Smartphone } from 'lucide-react';
import {
  SiAmazonec2,
  SiCss3,
  SiDocker,
  SiFirebase,
  SiFlask,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiOpencv,
  SiOpenapiinitiative,
  SiPython,
  SiRailway,
  SiRasa,
  SiReact,
  SiScrumalliance,
  SiSharp,
  SiTypescript,
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
  'REST APIs': { label: 'REST APIs', icon: <SiOpenapiinitiative />, colorClass: 'text-[#6BA539]' },
  'GitHub Actions': { label: 'GitHub Actions', icon: <SiGithubactions />, colorClass: 'text-[#2088FF]' },
  Docker: { label: 'Docker', icon: <SiDocker />, colorClass: 'text-[#2496ED]' },
  OpenCV: { label: 'OpenCV', icon: <SiOpencv />, colorClass: 'text-[#5C3EE8]' },
  'Next.js': { label: 'Next.js', icon: <SiNextdotjs />, colorClass: 'text-zinc-300' },
  Python: { label: 'Python', icon: <SiPython />, colorClass: 'text-[#3776AB]' },
  'AWS EC2': { label: 'AWS EC2', icon: <SiAmazonec2 />, colorClass: 'text-[#FF9900]' },
  MongoDB: { label: 'MongoDB', icon: <SiMongodb />, colorClass: 'text-[#47A248]' },
  Agile: { label: 'Agile', icon: <SiScrumalliance />, colorClass: 'text-[#009FDA]' },
  'C#': { label: 'C#', icon: <SiSharp />, colorClass: 'text-[#512BD4]' },
  Vite: { label: 'Vite', icon: <SiVite />, colorClass: 'text-[#646CFF]' },
  Firebase: { label: 'Firebase', icon: <SiFirebase />, colorClass: 'text-[#FFCA28]' },
  Rasa: { label: 'Rasa', icon: <SiRasa />, colorClass: 'text-[#5A17EE]' },
  HTML: { label: 'HTML', icon: <SiHtml5 />, colorClass: 'text-[#E34F26]' },
  'Vanilla CSS': { label: 'Vanilla CSS', icon: <SiCss3 />, colorClass: 'text-[#1572B6]' },
  Flask: { label: 'Flask', icon: <SiFlask />, colorClass: 'text-zinc-300' },
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
