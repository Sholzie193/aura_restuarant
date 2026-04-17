import { CalendarDays, Clock3, MapPin, Phone } from 'lucide-react';
import { ReservationForm } from '../components/ReservationForm';
import { PageHero } from '../components/PageHero';
import { faqItems, openingHours } from '../site-data';

export function ReservationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title={
          <>
            Book with <span className="italic luxury-text-gradient font-normal">context</span>, not guesswork.
          </>
        }
        description="Choose the room, the pace, and the type of evening you want. The booking layer should feel as considered as the dining room itself."
        image="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80"
        compact
      />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12 md:px-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-8">
              <span className="small-caps text-gold">Reserve a table</span>
              <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
                Reservations should feel calm, precise, and expected.
              </h2>
              <p className="mt-6 max-w-2xl text-white/60 leading-relaxed">
                Guests can book the dining room, request the chef counter, or signal private dining directly, with timings and house guidance surfaced beside the form.
              </p>
            </div>
            <ReservationForm />
          </div>

          <div className="space-y-6">
            <div className="glass-card">
              <div className="flex items-center gap-3">
                <Clock3 size={18} className="text-gold" />
                <span className="small-caps text-gold">Opening hours</span>
              </div>
              <div className="mt-5 space-y-4 text-white/65">
                {openingHours.map((entry) => (
                  <div key={entry.label}>
                    <p className="text-sm uppercase tracking-[0.16em] text-white/35">{entry.label}</p>
                    <p className="mt-1">{entry.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gold" />
                <span className="small-caps text-gold">Location</span>
              </div>
              <p className="mt-5 text-white/65">Jumeirah Beach Road, Dubai, United Arab Emirates</p>
              <p className="mt-3 text-white/45">
                Valet arrival, upper-level lounge check-in, and hosted access to the dining room from 6:00 PM.
              </p>
            </div>

            <div className="glass-card">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gold" />
                <span className="small-caps text-gold">Reservation desk</span>
              </div>
              <p className="mt-5 text-white/65">+971 4 555 0199</p>
              <p className="mt-2 text-white/65">reservations@aurasteakhouse.com</p>
              <p className="mt-4 text-white/45">
                Smart elegant dress code. Children aged 8 and above are welcome in the main dining room.
              </p>
            </div>

            <div className="glass-card">
              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-gold" />
                <span className="small-caps text-gold">Guest details</span>
              </div>
              <div className="mt-5 space-y-4">
                {faqItems.map((item) => (
                  <div key={item.question}>
                    <p className="font-serif text-2xl">{item.question}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
