import { Flame, Instagram, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Overview', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Experience', to: '/experience' },
  { label: 'Private Dining', to: '/private-dining' },
  { label: 'Reservations', to: '/reservations' },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav-link nav-link-active' : 'nav-link';
}

export function SiteLayout() {
  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  return (
    <div className="bg-ink min-h-screen text-off-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md sm:rounded-full sm:px-6 sm:py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:h-11 sm:w-11">
              <Flame size={16} className="text-gold" />
            </div>
            <NavLink
              to="/"
              className="font-serif text-[1.75rem] font-light tracking-[0.22em] uppercase text-white sm:text-3xl sm:tracking-widest"
            >
              Aura
            </NavLink>
          </div>

          <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="/reservations"
              className="hidden rounded-full border border-white/30 px-6 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black xl:inline-flex"
            >
              Book a Table
            </NavLink>
            <button
              type="button"
              className="mobile-nav-toggle text-white lg:hidden"
              aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={navOpen}
              aria-controls="mobile-navigation"
              onClick={() => setNavOpen((current) => !current)}
            >
              {navOpen ? <X size={24} className="opacity-90" /> : <Menu size={24} className="opacity-80" />}
            </button>
          </div>
        </div>

        {navOpen ? (
          <>
            <button
              type="button"
              className="absolute top-full right-0 left-0 h-screen bg-black/55 backdrop-blur-[2px] lg:hidden"
              aria-label="Close navigation menu"
              onClick={() => setNavOpen(false)}
            />
            <div
              id="mobile-navigation"
              className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-black/88 px-5 py-5 backdrop-blur-xl lg:hidden sm:px-6 sm:py-6"
            >
              <div className="border-b border-white/10 pb-5">
                <p className="small-caps text-gold">Navigate Aura</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/58">
                  Choose the room, the menu, or go straight to reservations.
                </p>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      isActive ? 'mobile-nav-link mobile-nav-link-active' : 'mobile-nav-link'
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <NavLink
                  to="/reservations"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white"
                >
                  Book a Table
                </NavLink>
                <a
                  href="tel:+97145550199"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-5 py-3 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Phone size={16} className="text-gold" />
                  +971 4 555 0199
                </a>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5 text-sm text-white/45">
                Jumeirah Beach Road, Dubai
              </div>
            </div>
          </>
        ) : null}
      </nav>

      <Outlet />

      <footer className="border-t border-white/10 bg-ink px-6 py-12 sm:px-12 md:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <p className="small-caps text-gold">Aura Steakhouse</p>
              <h2 className="mt-4 max-w-md font-serif text-4xl font-light leading-tight">
                A dark-room steakhouse in Dubai built around fire, reserve pours, and long-table gravity.
              </h2>
            </div>
            <div>
              <p className="small-caps text-gold">Contact</p>
              <div className="mt-5 space-y-4 text-white/65">
                <p className="flex items-center gap-3">
                  <Phone size={16} className="text-white/35" />
                  +971 4 555 0199
                </p>
                <p className="flex items-center gap-3">
                  <Instagram size={16} className="text-white/35" />
                  @aura.steak
                </p>
                <p>Jumeirah Beach Road, Dubai, United Arab Emirates</p>
              </div>
            </div>
            <div>
              <p className="small-caps text-gold">Explore</p>
              <div className="mt-5 flex flex-col gap-3 text-white/65">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} end={item.to === '/'} className="transition-colors hover:text-white">
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} Aura Steakhouse. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Press
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
