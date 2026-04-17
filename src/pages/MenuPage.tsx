import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { menuCollections, pairingNotes } from '../site-data';

export function MenuPage() {
  const [activeCollection, setActiveCollection] = useState(menuCollections[0].id);
  const selectedCollection =
    menuCollections.find((collection) => collection.id === activeCollection) ?? menuCollections[0];

  return (
    <>
      <PageHero
        eyebrow="Menu"
        title={
          <>
            The <span className="italic luxury-text-gradient font-normal">Cuts</span>, pairings, and progression.
          </>
        }
        description="A premium menu page should feel curated and navigable. Aura now separates signature steaks, tasting formats, and supporting plates into a proper dining structure."
        image="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80"
        compact
        actions={[
          { label: 'Reserve Dinner', to: '/reservations' },
          { label: 'View Experience', to: '/experience' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12 md:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="small-caps text-gold">Daily structure</span>
            <h2 className="mt-4 font-serif text-5xl font-light sm:text-7xl">
              Built for <span className="italic">choice and pacing</span>
            </h2>
          </div>
          <p className="max-w-md text-white/55">
            Inspired by how destination venues separate signature formats, the menu now reads like distinct experiences rather than one flat grid.
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

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {selectedCollection.items.map((item, index) => (
            <motion.div
              key={`${selectedCollection.id}-${item.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden mb-6 aspect-[4/5] oval-mask">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover brightness-[0.85] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-3xl">{item.title}</h3>
                <span className="font-serif text-2xl text-gold">{item.price}</span>
              </div>
              <p className="small-caps mt-3 text-white/40">{item.region}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-light py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-20">
          <div className="grid gap-12 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="small-caps text-gold">Cellar and finish</span>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">
                The best premium menus explain how the evening should unfold.
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed">
                Burj Al Arab&apos;s strongest dining pages signal cuisine type, meal period, atmosphere, and venue identity immediately. Aura applies the same logic by treating menu content as service guidance.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {pairingNotes.map((note) => (
                <div key={note.title} className="glass-card">
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
              Reserve This Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
