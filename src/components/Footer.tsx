import { Github, Linkedin, Mail, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
  { href: 'mailto:jainsoham01@gmail.com', label: 'Email', icon: Mail, color: 'text-emerald-400/80' },
  { href: 'https://linkedin.com/in/sohamja1n', label: 'LinkedIn', icon: Linkedin, color: 'text-[#5b9bd5]' },
  { href: 'https://github.com/s0hamjain', label: 'GitHub', icon: Github, color: 'text-slate-300' },
  { href: 'https://www.youtube.com/@CodingWithSohamJain', label: 'YouTube', icon: Youtube, color: 'text-[#e06060]' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative shrink-0 border-t border-slate-800/80 bg-background">
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="font-mono text-xs text-slate-600">
          <span className="text-emerald-400/50">$</span>{' '}
          <span className="text-slate-500">echo</span> "© {currentYear} Soham Jain"
        </p>

        <div className="flex gap-2.5">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`flex h-8 w-8 items-center justify-center rounded-md border border-slate-700/50 bg-slate-800/30 ${color} transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/60`}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
