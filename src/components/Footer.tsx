import type { CSSProperties } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToSection } from '@/lib/siteRoutes';
import { SOCIAL_LINKS, socialLinkProps } from '@/lib/social';

const Footer = () => (
  <footer className="relative border-t border-border bg-card/40">
    <div className="mx-auto max-w-screen-xl px-6 py-14 md:px-12 lg:px-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-foreground">Soham Jain</p>
          <p className="mt-2 text-sm text-muted-foreground">Computer Science at Carnegie Mellon University</p>
        </div>

        <ul className="flex gap-2.5" aria-label="Social links">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, brand, ink, onBrand }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...socialLinkProps(href)}
                className="social-link flex h-10 w-10 items-center justify-center rounded-full"
                style={{ '--brand': brand, '--brand-ink': ink, '--on-brand': onBrand } as CSSProperties}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Soham Jain</p>
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
