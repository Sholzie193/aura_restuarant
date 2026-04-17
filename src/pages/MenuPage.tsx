import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { menuCollections, pairingNotes } from '../site-data';

export function MenuPage() {
  const [activeCollection, setActiveCollection] = useState(menuCollections[0].id);
  const selectedCollection =
    menuCollections.find((collection) => collection.id === activeCollection) ?? menuCollections[0];

  return (
    <>
      <Seo
        title="Steakhouse Menu, Wagyu, and Dry-Aged Cuts"
        description="Explore Aura Steakhouse's Dubai menu of A5 Wagyu, dry-aged bone-in steaks, tasting flights, sides, and cellar pairings."
        path="/menu"
        image="/images/menu/reserve-tasting-flight.jpg"
        keywords={[
          'Dubai steak menu',
          'A5 Wagyu Dubai',
          'dry-aged steak Dubai',
          'steakhouse menu Dubai',
          'fine dining menu Dubai',
          'Wagyu ribeye Dubai',
        ]}
      />
      <PageHero
        eyebrow="Menu"
        title={
          <>
            The <span className="italic luxury-text-gradient font-normal">Cuts</span>, pairings, and progression.
          </>
        }
        description="The menu is designed like the evening itself: reserve cuts first, a measured tasting path for guests who want the full house rhythm, and side dishes that sharpen rather than soften the table."
        image="/images/menu/reserve-tasting-flight.jpg"
        compact
        actions={[
          { label: 'Reserve Dinner', to: '/reservations' },
          { label: 'View Experience', to: '/experience' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12 md:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="small-caps text-gold">House Selection</span>
            <h2 className="mt-4 font-serif text-5xl font-light sm:text-7xl">
              Built for <span className="italic">crust, marbling, and pace</span>
            </h2>
          </div>
          <p className="max-w-md text-white/55">
            The strongest tables choose with intent. Aura keeps the menu concise so every cut, pairing, and finish feels deliberate.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {menuCollections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              onClick={() => setActiveCollection(collection.id)}
              className={collection.id === activeCollection ? 'menu-chip menu-chip-active' : 'menu-chip'}
            >
              {collection.label}
            </button>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">{selectedCollection.blurb}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[34px] border border-white/10">
              <img
                src={selectedCollection.items[0].img}
                alt={selectedCollection.items[0].title}
                className="aspect-[4/5] w-full object-cover brightness-[0.8]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-7">
                <p className="small-caps text-gold">{selectedCollection.label}</p>
                <h3 className="mt-3 font-serif text-4xl">{selectedCollection.items[0].title}</h3>
                <p className="mt-3 max-w-sm text-white/70">{selectedCollection.items[0].desc}</p>
              </div>
            </div>
            <div className="editorial-panel">
              <p className="small-caps text-gold">House Rule</p>
              <p className="mt-4 max-w-md text-white/60 leading-relaxed">
                The menu is short by design. Once a cut fails texture or marbling checks, it leaves the board for the night.
              </p>
            </div>
          </div>

          <div className="menu-ledger">
            {selectedCollection.items.map((item, index) => (
              <motion.div
                key={`${selectedCollection.id}-${item.title}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="menu-ledger-row"
              >
                <div className="menu-ledger-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="menu-ledger-main">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="pr-4">
                      <h3 className="font-serif text-3xl">{item.title}</h3>
                      <p className="small-caps mt-2 text-white/40">{item.region}</p>
                    </div>
                    <span className="font-serif text-3xl text-gold">{item.price}</span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="editorial-panel">
              <span className="small-caps text-gold">Cellar and finish</span>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                The menu should read like a house with habits.
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed">
                At Aura, the kitchen stays tight on purpose. A heavier cut is followed by a cleaner plate. Sauces are restrained. The wine list turns denser as the room darkens.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pairingNotes.map((note) => (
                <div key={note.title} className="ritual-card">
                  <h3 className="font-serif text-2xl">{note.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/reservations"
              className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-all hover:bg-white hover:text-black hover:border-white"
            >
              Reserve This Table
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
