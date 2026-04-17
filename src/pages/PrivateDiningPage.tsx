import { CalendarDays, ShieldCheck, Users, Wine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { privateDiningFormats } from '../site-data';

export function PrivateDiningPage() {
  return (
    <>
      <Seo
        title="Private Dining and Executive Dinner Bookings"
        description="Book private dining at Aura Steakhouse in Dubai for executive dinners, celebrations, launch events, and bespoke tasting menus."
        path="/private-dining"
        image="/images/menu/chef-counter-prelude.jpg"
        keywords={[
          'private dining Dubai',
          'executive dinner Dubai',
          'group dining Dubai',
          'celebration dinner Dubai',
          'luxury private room Dubai',
        ]}
      />
      <PageHero
        eyebrow="Private dining"
        title={
          <>
            A room for <span className="italic luxury-text-gradient font-normal">serious dinners</span> and private celebration.
          </>
        }
        description="Aura's private room is designed for executives, hosts, and celebratory tables who want the full service language of the house with more privacy and more control."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
        compact
        actions={[
          { label: 'Enquire Now', to: '/reservations' },
          { label: 'View Experience', to: '/experience' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12 md:px-20">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="small-caps text-gold">Dedicated pathway</span>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
              Private dining should feel like a different room, not a larger booking.
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed">
              The Mercer Room is built for dinners that need privacy, clearer control, and a menu designed around the host rather than the main floor.
            </p>
            <div className="mt-10 space-y-5 text-white/60">
              <p className="flex items-start gap-3">
                <Users size={18} className="mt-1 text-gold" />
                Up to 16 seated guests with custom pacing and a dedicated captain
              </p>
              <p className="flex items-start gap-3">
                <Wine size={18} className="mt-1 text-gold" />
                Sommelier-led pairings and reserve bottle options selected around the menu
              </p>
              <p className="flex items-start gap-3">
                <CalendarDays size={18} className="mt-1 text-gold" />
                72-hour lead time recommended for bespoke tasting design and dietary coordination
              </p>
              <p className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-1 text-gold" />
                Discreet service routing for executive dinners, launches, and confidential gatherings
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-black/20">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80"
              alt="Aura private dining room"
              className="aspect-[16/9] w-full object-cover brightness-[0.68]"
            />
            <div className="grid gap-6 p-6 md:p-8">
            {privateDiningFormats.map((format) => (
              <div key={format.title} className="private-format-row">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="small-caps text-gold">{format.tag}</p>
                    <h3 className="mt-3 font-serif text-3xl">{format.title}</h3>
                  </div>
                  <p className="font-serif text-2xl text-gold">{format.capacity}</p>
                </div>
                <p className="mt-5 text-white/60 leading-relaxed">{format.text}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6 text-center sm:px-12 md:px-20">
          <span className="small-caps text-gold">Next step</span>
          <h2 className="mt-4 font-serif text-4xl font-light sm:text-6xl">
            Move from invitation to <span className="italic">host control</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-white/60 leading-relaxed">
            Private dining works best when the guest understands the room, the format, and the cadence before they enquire.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/reservations"
              className="rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white hover:text-black"
            >
              Start a Private Dining Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
