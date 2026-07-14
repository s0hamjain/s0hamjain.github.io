import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Footer from '@/components/Footer';
import { NAV_ITEMS, paths } from '@/lib/siteRoutes';
import { cn } from '@/lib/utils';

const SiteLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === paths.home;
  const isContact = location.pathname === paths.contact;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setScrolled(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isHome) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-full px-5 py-2 text-[15px] font-medium whitespace-nowrap transition-colors duration-200',
      isActive
        ? scrolled
          ? 'bg-primary/15 text-primary'
          : 'text-primary'
        : scrolled
          ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
          : 'text-slate-400 hover:text-slate-100'
    );

  return (
    <div
      className={cn(
        'flex flex-col bg-background',
        isContact ? 'h-dvh overflow-hidden' : 'min-h-dvh'
      )}
    >
      {!isHome && (
        <header
          className={cn(
            'fixed left-0 right-0 z-50 transition-[top,padding] duration-300',
            scrolled ? 'top-4' : 'top-0 pt-5'
          )}
        >
          {/* Desktop */}
          <nav
            aria-label="Primary"
            className={cn(
              'mx-auto hidden w-max min-w-[36rem] items-center justify-center transition-all duration-300 md:flex lg:min-w-[42rem]',
              scrolled
                ? 'gap-1.5 rounded-full border border-slate-700/60 bg-[#131318]/85 px-2 py-2 shadow-lg shadow-black/30 backdrop-blur-md'
                : 'gap-1 bg-transparent p-0'
            )}
          >
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === paths.home} className={navLinkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile */}
          <div className="relative flex items-center justify-between px-4 md:hidden">
            <span className="h-10 w-10" aria-hidden />
            <Link
              to={paths.home}
              className={cn(
                'px-5 py-2 text-[15px] font-semibold text-slate-100 transition-all duration-300',
                scrolled
                  ? 'rounded-full border border-slate-700/60 bg-[#131318]/85 shadow-lg shadow-black/30 backdrop-blur-md'
                  : 'rounded-full bg-transparent'
              )}
            >
              Soham Jain
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className={cn(
                'flex h-10 w-10 items-center justify-center text-slate-300 transition-all duration-300',
                scrolled || menuOpen
                  ? cn(
                      'rounded-full border border-slate-700/60 bg-[#131318]/85 shadow-lg shadow-black/30 backdrop-blur-md',
                      menuOpen ? 'bg-slate-700/70 text-slate-100' : 'hover:bg-slate-800/70 hover:text-slate-100'
                    )
                  : 'rounded-full bg-transparent hover:text-slate-100'
              )}
            >
              {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>

            {menuOpen && (
              <nav
                aria-label="Primary"
                className="absolute right-4 top-[3.25rem] flex w-56 flex-col gap-1 rounded-2xl border border-slate-700/60 bg-[#131318]/95 p-2 shadow-xl shadow-black/40 backdrop-blur-md"
              >
                {NAV_ITEMS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === paths.home}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors duration-200',
                        isActive
                          ? 'bg-primary/15 text-primary'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        </header>
      )}

      <div className={cn('flex flex-1 flex-col', isContact && 'min-h-0')}>
        <Outlet />
      </div>

      {!isHome && <Footer />}
    </div>
  );
};

export default SiteLayout;
