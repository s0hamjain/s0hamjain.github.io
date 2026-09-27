import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import { NAV_ITEMS, SECTION_IDS, scrollToSection } from '@/lib/siteRoutes';
import type { SectionId } from '@/lib/siteRoutes';
import { startSmoothScroll } from '@/lib/smoothScroll';
import { cn } from '@/lib/utils';

const SiteLayout = () => {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    const onScroll = () => {
      // Active section: the last one whose top has crossed the middle of the viewport.
      const line = window.innerHeight / 2;
      let current: SectionId | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = SECTION_IDS[SECTION_IDS.length - 1];
      }
      setActive(current ?? SECTION_IDS[0]);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="relative min-h-dvh bg-background">
      <div className="page-glow pointer-events-none fixed inset-0" aria-hidden />

      <Hero />

      <div className="relative lg:flex">
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-20 lg:shrink-0 lg:items-center lg:justify-center xl:w-24">
          <nav aria-label="Primary">
            <ul className="flex flex-col items-center gap-1 rounded-full border border-border bg-card/60 px-1.5 py-2.5 backdrop-blur">
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                      aria-label={label}
                      aria-current={isActive ? 'true' : undefined}
                      className="group relative flex h-7 w-7 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span
                        className={cn(
                          'w-1.5 rounded-full transition-all duration-300 ease-out',
                          isActive
                            ? 'h-4 bg-foreground'
                            : 'h-1.5 bg-muted-foreground/60 group-hover:bg-foreground',
                        )}
                      />
                      <span
                        className="pointer-events-none absolute left-full ml-3 -translate-x-1 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                        aria-hidden
                      >
                        {label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-6 pb-24 md:px-12 lg:pb-32 lg:pl-4 lg:pr-12 xl:pr-20">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SiteLayout;
