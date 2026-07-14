import { Github, Linkedin, Mail, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
  { href: 'mailto:jainsoham01@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://linkedin.com/in/sohamja1n', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/s0hamjain', label: 'GitHub', icon: Github },
  { href: 'https://www.youtube.com/@CodingWithSohamJain', label: 'YouTube', icon: Youtube },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative shrink-0 border-t border-slate-800/80 bg-background">
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Soham Jain
        </p>

        <div className="flex gap-2.5">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/30 text-slate-400 transition-all duration-200 hover:border-slate-600/50 hover:bg-slate-700/40 hover:text-slate-100"
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
