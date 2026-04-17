import { Flame, Instagram, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

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
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="bg-ink min-h-screen text-off-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 sm:px-8 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Flame size={16} className="text-gold" />
            </div>
            <NavLink to="/" className="font-serif text-3xl font-light tracking-widest uppercase text-white">
              Aura
            </NavLink>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="/reservations"
              className="hidden rounded-full border border-white/30 px-6 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:inline-flex"
            >
              Book a Table
            </NavLink>
            <button
              type="button"
              className="text-white md:hidden"
              aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setNavOpen((current) => !current)}
            >
              {navOpen ? <X size={24} className="opacity-90" /> : <Menu size={24} className="opacity-80" />}
            </button>
          </div>
        </div>

        {navOpen ? (
          <div className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-white/10 bg-black/80 px-6 py-6 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={navLinkClass}
                  onClick={() => setNavOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
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
            <div className="flex gap-6">
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
