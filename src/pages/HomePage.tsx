import { motion } from 'motion/react';
import { ArrowRight, ChefHat, Flame, GlassWater, ShieldCheck, Wine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { auraRituals, provenanceNotes } from '../site-data';

const venueCards = [
  {
    title: 'The dining room',
    text: 'Scenic main-room service built around open-fire steaks, polished timing, and a serious reserve cellar.',
    to: '/experience',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80',
  },
  {
    title: 'Chef counter',
    text: 'An extended tasting with smaller allocations, direct kitchen energy, and a more intimate pacing.',
    to: '/menu',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80',
  },
  {
    title: 'Private room',
    text: 'A dedicated space for launches, executive dinners, and celebrations that need privacy and ceremony.',
    to: '/private-dining',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
  },
];

export function HomePage() {
  return (
    <>
      <Seo
        title="Michelin-Calibre Steakhouse, Wagyu, and Fine Dining"
        description="Aura Steakhouse is a luxury Dubai steakhouse on Jumeirah Beach Road offering Wagyu, dry-aged cuts, private dining, and refined dinner reservations."
        path="/"
        image="/images/menu/a5-wagyu-ribeye.jpg"
      />
      <PageHero
        eyebrow="Michelin-calibre steakhouse"
        title={
          <>
            The Art of <br /> <span className="italic luxury-text-gradient font-normal">Elevating</span> Meat.
          </>
        }
        description="Dry-aged prime cuts, charcoal finish, late-night cellar pours, and a dining room in Dubai built for guests who prefer gravity over noise."
        poster="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80"
        videoSources={[
          'https://videos.pexels.com/video-files/3206894/3206894-uhd_2560_1440_25fps.mp4',
          'https://player.vimeo.com/external/462193583.sd.mp4?s=d42a98f1fbd9cbf995388cbe073cda83ca0b2f51&profile_id=164&oauth2_token_id=57447761',
        ]}
        actions={[
          { label: 'Reserve a Table', to: '/reservations' },
          { label: 'Explore the Site', to: '/menu' },
        ]}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.2 }}
          className="mt-16 grid w-full max-w-4xl gap-6 border-t border-white/10 pt-8 text-left sm:grid-cols-3"
        >
          <div>
            <p className="font-serif text-4xl text-gold">48</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">seats across the dining room, chef counter, and private room</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-gold">35-90</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">days of ageing across the house reserve selection</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-gold">3</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">house rituals that define the Aura evening from arrival to digestif</p>
          </div>
        </motion.div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-28 sm:px-12 md:px-20">
        <div className="grid gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="editorial-panel">
            <div className="small-caps text-gold">House Note</div>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] sm:text-6xl">
              Aura is built like a quiet <span className="italic text-gold">ritual</span>, not an old club steakhouse.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/62">
              The room is dark, low-spoken, and sharply paced. Guests arrive through an upper lounge, move into a main room centred on open fire, and finish with reserve pours once the evening settles. The point is not excess. The point is control.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {auraRituals.map((ritual) => (
                <div key={ritual.title} className="ritual-card">
                  <p className="font-serif text-3xl text-gold">{ritual.tag}</p>
                  <h3 className="mt-4 font-serif text-2xl">{ritual.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/58">{ritual.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-[32px] border border-white/8">
              <img
                src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80"
                alt="Chef preparing premium steak"
                className="aspect-[4/5] w-full object-cover brightness-[0.78]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="small-caps text-gold">Chef&apos;s Perspective</p>
                <p className="mt-3 max-w-sm text-white/72">
                  A steak should arrive with composure: deep crust, clear heat, and enough restraint that the room still belongs to the guest.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {provenanceNotes.map((item) => (
                <div key={item.title} className="glass-card min-h-[190px]">
                  <p className="small-caps text-gold">{item.title}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/58">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="small-caps text-gold">The House</span>
              <h2 className="mt-4 font-serif text-5xl font-light sm:text-7xl">
                Three rooms. <span className="italic">One pace.</span>
              </h2>
            </div>
            <p className="max-w-md text-white/55">
              Aura feels more distinct when each part of the house has a role: the main dining room, the counter, and the private room for long-table evenings.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {venueCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                className={index === 0 ? 'group md:col-span-2' : 'group'}
              >
                <Link to={card.to}>
                  <div className={index === 0 ? 'venue-panel venue-panel-feature' : 'venue-panel'}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className={index === 0 ? 'venue-panel-image venue-panel-image-feature' : 'venue-panel-image'}
                    />
                    <div className="venue-panel-copy">
                      <p className="small-caps text-gold">{index === 0 ? 'Signature Room' : `0${index + 1}`}</p>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-serif text-3xl">{card.title}</h3>
                        <ArrowRight size={18} className="text-gold transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-white/60">{card.text}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80"
            alt="Restaurant interior ambiance"
            className="h-full w-full object-cover brightness-[0.3]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center sm:px-12 md:px-20">
          <ChefHat className="mx-auto mb-8 text-gold" size={40} />
          <h2 className="font-serif text-4xl font-light leading-[1.08] md:text-6xl lg:text-7xl">
            The room should feel <span className="italic luxury-text-gradient">intentional</span> before the first course lands.
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg font-light text-white/70 md:text-xl">
            Dark oak, low light, sharp tailoring, restrained florals, and a service style that avoids spectacle. Aura should read as a place with standards, not just a mood board with booking buttons.
          </p>

          <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
            <div className="ritual-card">
              <Flame size={18} className="mb-4 text-gold" />
              <h3 className="font-serif text-2xl">Open fire</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                The menu is built around crust, render, smoke, and temperature control rather than novelty.
              </p>
            </div>
            <div className="ritual-card">
              <Wine size={18} className="mb-4 text-gold" />
              <h3 className="font-serif text-2xl">Late cellar</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                The wine program comes later in the evening and leans toward older reds, structured pours, and quieter luxury.
              </p>
            </div>
            <div className="ritual-card">
              <ShieldCheck size={18} className="mb-4 text-gold" />
              <h3 className="font-serif text-2xl">Room discipline</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Every page now reinforces the same standards: guest guidance, timing, privacy, and a controlled service cadence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
