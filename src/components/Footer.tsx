import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/siteRoutes';

const SOCIAL_LINKS = [
  { href: 'mailto:jainsoham01@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://linkedin.com/in/sohamja1n', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/s0hamjain', label: 'GitHub', icon: Github },
  { href: 'https://www.youtube.com/@CodingWithSohamJain', label: 'YouTube', icon: Youtube },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800/80 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div>
            <p className="text-lg font-semibold text-white">Soham Jain</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Computer Science at Carnegie Mellon University
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {NAV_ITEMS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/30 text-slate-400 transition-all duration-200 hover:border-slate-600/50 hover:bg-slate-700/40 hover:text-slate-100"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-1 border-t border-slate-800/80 pt-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
            <p>© {currentYear} Soham Jain. All rights reserved.</p>
            <p>Made using React, Vite, TypeScript, &amp; Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
