import { Clock3, GlassWater, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { experienceMoments, guestPolicies } from '../site-data';

export function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title={
          <>
            A dining room designed for <span className="italic luxury-text-gradient font-normal">occasion</span>, rhythm, and privacy.
          </>
        }
        description="The best evenings are remembered as sequences: the arrival, the first pour, the heat of the main course, the slowing of the room, and the last glass after midnight."
        image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80"
        compact
        actions={[
          { label: 'Reserve the Experience', to: '/reservations' },
          { label: 'Explore Private Dining', to: '/private-dining' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12 md:px-20">
        <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="small-caps text-gold">Service progression</span>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
              The evening moves in three measured acts.
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed">
              Aura is strongest when the room feels choreographed without feeling stiff. That means a slower opening, a serious centre course, and a quieter, darker finish.
            </p>
          </div>

          <div className="space-y-6">
            {experienceMoments.map((moment) => (
              <div key={moment.step} className="glass-card md:grid md:grid-cols-[90px_1fr] md:gap-6">
                <p className="font-serif text-4xl text-gold">{moment.step}</p>
                <div>
                  <h3 className="font-serif text-3xl">{moment.title}</h3>
                  <p className="mt-4 text-white/60 leading-relaxed">{moment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="small-caps text-gold">Guest policies</span>
              <h2 className="mt-4 font-serif text-4xl font-light sm:text-6xl">
                Clarity is part of the luxury.
              </h2>
            </div>
            <p className="max-w-md text-white/55">
              Guests should know the pace, dress, and expectations of the room before they arrive. Quiet confidence starts long before the host stand.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {guestPolicies.map((policy, index) => {
              const Icon = [Clock3, Star, GlassWater, Sparkles][index % 4];

              return (
                <div key={policy.title} className="glass-card">
                  <Icon size={18} className="mb-4 text-gold" />
                  <h3 className="font-serif text-2xl">{policy.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{policy.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/reservations"
              className="rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white hover:text-black"
            >
              Plan Your Evening
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
