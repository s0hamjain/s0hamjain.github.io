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
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-52 lg:shrink-0 lg:items-center lg:pl-10 xl:w-60 xl:pl-12">
          <nav aria-label="Primary">
            <ul className="space-y-1">
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
                      aria-current={isActive ? 'true' : undefined}
                      className="group flex items-center gap-3 py-2.5"
                    >
                      <span
                        className={cn(
                          'h-px transition-all duration-300 ease-out',
                          isActive
                            ? 'w-12 bg-foreground'
                            : 'w-6 bg-muted-foreground/60 group-hover:w-12 group-hover:bg-foreground',
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm font-medium transition-colors duration-300',
                          isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
                        )}
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
