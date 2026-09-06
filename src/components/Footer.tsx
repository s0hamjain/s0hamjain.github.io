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
    <footer className="shrink-0 border-t border-slate-800/60 bg-background py-5">
      <div className="flex items-center justify-between px-8 sm:px-12 lg:px-16">
        <p className="font-mono text-sm text-slate-500">
          © {currentYear} Soham Jain
        </p>

        <div className="flex gap-3">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/40 bg-slate-800/20 ${color} transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50`}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
