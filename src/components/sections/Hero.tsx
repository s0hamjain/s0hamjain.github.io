import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Download } from 'lucide-react';
import profileImage from '@/assets/headshot.jpg';
import resumePdf from '@/assets/resume.pdf';
import TechStack from '@/components/TechStack';
import { SOCIAL_LINKS, socialLinkProps } from '@/lib/social';

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Fade and drift the hero up as the page scrolls away from it.
  useEffect(() => {
    const el = contentRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.8));
      el.style.opacity = (1 - p).toFixed(3);
      el.style.transform = `translate3d(0, ${(-p * 80).toFixed(1)}px, 0) scale(${(1 - p * 0.04).toFixed(4)})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  return (
    <section id="home" aria-label="Home" className="relative min-h-[100svh]">
      <div ref={contentRef} className="flex min-h-[100svh] items-center will-change-transform">
        <div className="mx-auto w-full max-w-screen-xl px-6 py-24 md:px-12 md:pb-36 lg:px-16">
          <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
            <div className="animate-fade-up">
              <h1 className="text-6xl font-semibold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                Soham Jain
              </h1>
              <p className="mt-5 text-xl text-muted-foreground sm:text-2xl">
                Computer Science at Carnegie Mellon University
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ul className="flex gap-3" aria-label="Social links">
                  {SOCIAL_LINKS.map(({ href, label, icon: Icon, brand, ink, onBrand }) => (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={label}
                        title={label}
                        {...socialLinkProps(href)}
                        className="social-link flex h-12 w-12 items-center justify-center rounded-full"
                        style={{ '--brand': brand, '--brand-ink': ink, '--on-brand': onBrand } as CSSProperties}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
                <span className="mx-1 hidden h-7 w-px bg-border sm:block" aria-hidden />
                <a
                  href={resumePdf}
                  download="Soham_Jain_Resume.pdf"
                  className="social-link flex h-12 items-center gap-2 rounded-full pl-4 pr-5 text-sm font-semibold"
                  style={{ '--brand': '#F4F4F5', '--brand-ink': '#E4E4E7', '--on-brand': '#0B0B0F' } as CSSProperties}
                >
                  <Download className="h-[18px] w-[18px]" aria-hidden />
                  Resume
                </a>
              </div>
            </div>

            <div className="animate-fade-in relative shrink-0">
              <div
                className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/25 via-transparent to-violet-400/15 blur-2xl"
                aria-hidden
              />
              {/* headshot.jpg is the original portrait extended to a square with the face centered. */}
              <div className="relative h-48 w-48 overflow-hidden rounded-full border border-border sm:h-60 sm:w-60 lg:h-80 lg:w-80 xl:h-[22rem] xl:w-[22rem]">
                <img
                  src={profileImage}
                  alt="Soham Jain"
                  className="h-full w-full origin-[50%_45%] scale-110 object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <TechStack stagger className="-mx-2 mt-16 md:mt-20 xl:flex-nowrap xl:justify-between" />
        </div>

        <div
          className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:flex flex-col items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          aria-hidden
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-border">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-foreground/70" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
