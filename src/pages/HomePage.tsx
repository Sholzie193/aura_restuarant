import { motion } from 'motion/react';
import { ArrowRight, ChefHat, Clock3, GlassWater, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

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
      <PageHero
        eyebrow="Michelin-calibre steakhouse"
        title={
          <>
            The Art of <br /> <span className="italic luxury-text-gradient font-normal">Elevating</span> Meat.
          </>
        }
        description="A modern steakhouse in Dubai shaped around destination dining, venue-specific experiences, and a quieter, more exacting version of luxury."
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
            <p className="font-serif text-4xl text-gold">5</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">dedicated site sections instead of one long landing page</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-gold">3</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">dining formats inspired by destination-restaurant presentation</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-gold">1</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">clear booking layer with real service context and guest details</p>
          </div>
        </motion.div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-28 sm:px-12 md:px-20">
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[80px]" />
            <img
              src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80"
              alt="Chef preparing premium steak"
              className="relative z-10 aspect-[3/4] w-full max-w-md rounded-[32px] border border-white/5 object-cover shadow-2xl brightness-90"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Star className="text-gold" size={18} />
              <span className="small-caps text-gold">What applies from Burj Al Arab research</span>
            </div>
            <h2 className="font-serif text-4xl font-light leading-[1.05] sm:text-6xl">
              Premium restaurants sell <span className="italic text-gold">experiences</span>, not just dishes.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-white/60">
              The strongest pattern across Burj Al Arab&apos;s premium venues is structural rather than decorative:
              separate venue pages, distinct dining identities, clearer policies, stronger chef framing, and a reservation path
              that reflects the specific experience a guest is choosing.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="font-serif text-3xl text-gold">27th</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">floor-level viewpoint storytelling inspired clearer spatial cues for Aura</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-gold">3</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">venue types influenced the way Aura now separates dining moments</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-gold">1</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">shared premium booking flow ties the entire site together</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="small-caps text-gold">Venue Pages</span>
              <h2 className="mt-4 font-serif text-5xl font-light sm:text-7xl">
                Built Like a <span className="italic">Dining Destination</span>
              </h2>
            </div>
            <p className="max-w-md text-white/55">
              Instead of asking one page to do everything, the site now splits story, menu, experience, private dining,
              and reservations into dedicated routes.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {venueCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                className="group"
              >
                <Link to={card.to}>
                  <div className="overflow-hidden rounded-[30px] border border-white/10 bg-black/20">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="aspect-[4/5] w-full object-cover brightness-[0.82] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
                    />
                    <div className="border-t border-white/10 p-6">
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
            A restaurant site should feel like a <span className="italic luxury-text-gradient">place</span>, not a pitch deck.
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-lg font-light text-white/70 md:text-xl">
            That is the main shift here. The site now carries distinct rooms, policies, timings, chef perspective, and booking intent,
            which is what premium hospitality sites do when they want to feel credible.
          </p>

          <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
            <div className="glass-card">
              <GlassWater size={18} className="mb-4 text-gold" />
              <h3 className="font-serif text-2xl">Chef framing</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Premium venues present cuisine through personalities, rituals, and house signatures, not just item lists.
              </p>
            </div>
            <div className="glass-card">
              <Clock3 size={18} className="mb-4 text-gold" />
              <h3 className="font-serif text-2xl">Policy clarity</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Hours, dress code, age guidance, and reservation notes are surfaced cleanly so the experience feels managed.
              </p>
            </div>
            <div className="glass-card">
              <Users size={18} className="mb-4 text-gold" />
              <h3 className="font-serif text-2xl">Private pathways</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Serious hospitality brands separate intimate dining, group occasions, and core dinner service instead of burying them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
