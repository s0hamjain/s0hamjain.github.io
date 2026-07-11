import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Footer from '@/components/Footer';
import { NAV_ITEMS, paths } from '@/lib/siteRoutes';
import { cn } from '@/lib/utils';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200',
    isActive
      ? 'bg-primary/15 text-primary'
      : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
  );

const SiteLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === paths.home;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed left-1/2 top-4 z-50 w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2">
        {/* Desktop: centered pill of tabs */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-slate-700/60 bg-[#131318]/85 p-1.5 shadow-lg shadow-black/40 backdrop-blur-md md:flex"
        >
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === paths.home} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile: compact pill with hamburger */}
        <div className="relative md:hidden">
          <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-[#131318]/85 py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/40 backdrop-blur-md">
            <Link to={paths.home} className="text-sm font-semibold text-slate-100">
              Soham Jain
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200',
                menuOpen
                  ? 'bg-slate-700/60 text-slate-100'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-slate-100'
              )}
            >
              {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>

          {menuOpen && (
            <nav
              aria-label="Primary"
              className="absolute left-1/2 top-full mt-2 flex w-56 -translate-x-1/2 flex-col gap-1 rounded-2xl border border-slate-700/60 bg-[#131318]/95 p-2 shadow-xl shadow-black/50 backdrop-blur-md"
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

      <Outlet />

      {!isHome && <Footer />}
    </div>
  );
};

export default SiteLayout;
