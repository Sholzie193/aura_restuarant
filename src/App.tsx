import { motion, useScroll, useTransform } from 'motion/react';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  ChevronDown,
  Clock3,
  Flame,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Users,
  X,
} from 'lucide-react';

type ReservationForm = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  service: string;
  notes: string;
};

type ReservationStatus =
  | { kind: 'idle' }
  | { kind: 'confirmed'; code: string; summary: string };

const menuCollections = [
  {
    id: 'signature',
    label: 'Signature',
    blurb:
      'Curated daily by our Executive Chef. Availability is highly limited due to strict aging and sourcing standards.',
    items: [
      {
        title: 'A5 Wagyu Ribeye',
        region: 'Kagoshima, Japan',
        desc: 'BMS 12+. Exceptionally rich, buttery texture that dissolves on the palate.',
        price: '$280',
        img: 'https://images.unsplash.com/photo-1603360946369-dc902bf507f0?auto=format&fit=crop&q=80',
      },
      {
        title: 'Dry-Aged Bone-In',
        region: 'Tasmania, Australia',
        desc: 'Aged 65 days in our salt cavern. Nutty, intense, and deeply savory.',
        price: '$195',
        img: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&q=80',
      },
      {
        title: 'Olive Wagyu Striploin',
        region: 'Kagawa, Japan',
        desc: 'The rarest steak in the world. Ethereal lightness with subtle olive notes.',
        price: '$420',
        img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'tasting',
    label: 'Tasting',
    blurb:
      'A composed progression for guests who want the full Aura experience, from raw opening to reserve cut finale.',
    items: [
      {
        title: 'Chef Counter Prelude',
        region: 'Eight seats nightly',
        desc: 'Tableside tartare, smoked broth, and the first cellar pairing before the main fire course.',
        price: '$110',
        img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
      },
      {
        title: 'Reserve Tasting Flight',
        region: 'Three cuts, three temperatures',
        desc: 'A guided sequence designed to compare marbling, smoke, and texture across the kitchen’s finest allocations.',
        price: '$240',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80',
      },
      {
        title: 'Cellar Pairing',
        region: 'Old-world pours',
        desc: 'Structured reds and rare bottles selected to match fat, crust, and finish rather than simple region pairings.',
        price: '$135',
        img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    blurb:
      'The supporting plates stay disciplined: rich enough for a steakhouse, light enough to preserve the pacing of dinner.',
    items: [
      {
        title: 'Coal-Roasted Onion',
        region: 'Brown butter, thyme ash',
        desc: 'Silky layers finished with cultured cream and a restrained smoke profile from the embers.',
        price: '$24',
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
      },
      {
        title: 'Potato Pavé',
        region: 'Rosemary, aged comté',
        desc: 'Crisp-edged, deeply savory, and balanced to complement richer cuts without overpowering them.',
        price: '$22',
        img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80',
      },
      {
        title: 'Burnt Vanilla Tart',
        region: 'Dark cacao finish',
        desc: 'A clean, slightly bitter close to dinner with warm vanilla cream and caramelized sugar crust.',
        price: '$19',
        img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80',
      },
    ],
  },
];

const faqItems = [
  {
    question: 'How far in advance should reservations be made?',
    answer:
      'Prime Friday and Saturday seatings usually book 10 to 14 days in advance. The chef counter and private dining room should be requested earlier.',
  },
  {
    question: 'Do you accommodate dietary restrictions?',
    answer:
      'Yes. We can adapt tasting formats for allergies and most dietary needs when shared at booking time. Private dining menus are fully customized.',
  },
  {
    question: 'What is the private dining capacity?',
    answer:
      'The private room seats up to 16 guests and includes a dedicated captain, sommelier support, and custom menu pacing for the table.',
  },
];

function getDefaultDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().slice(0, 10);
}

function getTimeSlots(dateValue: string) {
  if (!dateValue) {
    return ['18:00', '18:30', '19:00', '19:30', '20:30', '21:00'];
  }

  const day = new Date(`${dateValue}T12:00:00`).getDay();

  if (day === 1) {
    return [];
  }

  if (day === 5 || day === 6) {
    return ['17:30', '18:00', '18:45', '19:30', '20:15', '21:15', '22:00'];
  }

  return ['18:00', '18:30', '19:15', '20:00', '20:45', '21:15'];
}

function formatDate(dateValue: string) {
  if (!dateValue) {
    return '';
  }

  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${dateValue}T12:00:00`));
}

function buildReservationCode(name: string) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
      .slice(0, 2) || 'AU';

  return `AR-${initials}${Math.floor(1000 + Math.random() * 9000)}`;
}

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [navOpen, setNavOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(menuCollections[0].id);
  const [activeFaq, setActiveFaq] = useState(0);
  const [status, setStatus] = useState<ReservationStatus>({ kind: 'idle' });
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationForm, string>>>({});
  const [form, setForm] = useState<ReservationForm>({
    name: '',
    email: '',
    date: getDefaultDate(),
    time: '19:30',
    guests: '2',
    service: 'Dining room tasting',
    notes: '',
  });

  const availableTimes = useMemo(() => getTimeSlots(form.date), [form.date]);
  const selectedCollection =
    menuCollections.find((collection) => collection.id === activeCollection) ?? menuCollections[0];

  useEffect(() => {
    if (!availableTimes.length) {
      if (form.time !== '') {
        setForm((current) => ({ ...current, time: '' }));
      }
      return;
    }

    if (!availableTimes.includes(form.time)) {
      setForm((current) => ({ ...current, time: availableTimes[0] }));
    }
  }, [availableTimes, form.time]);

  function updateField(field: keyof ReservationForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus({ kind: 'idle' });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof ReservationForm, string>> = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Guest name is required.';
    }

    if (!isEmailValid(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!form.date) {
      nextErrors.date = 'Select a date.';
    } else {
      const selectedDate = new Date(`${form.date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        nextErrors.date = 'Reservation date cannot be in the past.';
      }

      if (selectedDate.getDay() === 1) {
        nextErrors.date = 'Aura is closed on Mondays.';
      }
    }

    if (!form.time) {
      nextErrors.time = 'Choose an available seating time.';
    }

    if (!form.guests) {
      nextErrors.guests = 'Select a party size.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ kind: 'idle' });
      return;
    }

    setStatus({
      kind: 'confirmed',
      code: buildReservationCode(form.name),
      summary: `${formatDate(form.date)} at ${form.time} for ${form.guests} guest${form.guests === '1' ? '' : 's'}`,
    });
  }

  return (
    <div className="bg-ink min-h-screen text-off-white selection:bg-gold selection:text-ink">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 sm:px-8 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-12">
            <a href="#top" className="font-serif text-3xl font-light tracking-widest uppercase text-white">
              Aura
            </a>
            <div className="hidden md:flex gap-8 small-caps">
              <a href="#philosophy" className="hover:text-gold transition-colors">
                Philosophy
              </a>
              <a href="#menu" className="hover:text-gold transition-colors">
                The Cuts
              </a>
              <a href="#experience" className="hover:text-gold transition-colors">
                Experience
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#reservations"
              className="hidden sm:inline-flex border border-white/30 rounded-full px-6 py-2 small-caps hover:bg-white hover:text-black transition-all duration-300"
            >
              Reserve a Table
            </a>
            <button
              type="button"
              className="md:hidden text-white"
              aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setNavOpen((current) => !current)}
            >
              {navOpen ? <X size={24} className="opacity-90" /> : <Menu size={24} className="opacity-80" />}
            </button>
          </div>
        </div>

        {navOpen ? (
          <div className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-white/10 bg-black/80 px-6 py-6 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-4 small-caps">
              <a href="#philosophy" className="hover:text-gold transition-colors" onClick={() => setNavOpen(false)}>
                Philosophy
              </a>
              <a href="#menu" className="hover:text-gold transition-colors" onClick={() => setNavOpen(false)}>
                The Cuts
              </a>
              <a href="#experience" className="hover:text-gold transition-colors" onClick={() => setNavOpen(false)}>
                Experience
              </a>
              <a href="#reservations" className="hover:text-gold transition-colors" onClick={() => setNavOpen(false)}>
                Reserve a Table
              </a>
            </div>
          </div>
        ) : null}
      </nav>

      <section
        id="top"
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-ink z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
          >
            <source
              src="https://videos.pexels.com/video-files/3206894/3206894-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
            <source
              src="https://player.vimeo.com/external/462193583.sd.mp4?s=d42a98f1fbd9cbf995388cbe073cda83ca0b2f51&profile_id=164&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
        </motion.div>

        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[1px] w-12 bg-gold" />
            <span className="small-caps text-gold">Three Michelin Stars</span>
            <span className="h-[1px] w-12 bg-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl font-light leading-[0.85] tracking-tight mb-8"
          >
            The Art of <br /> <span className="italic luxury-text-gradient font-normal">Elevating</span> Meat.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="max-w-lg text-lg sm:text-xl font-light text-white/70"
          >
            A sensory journey through the world&apos;s most exclusive cuts, dry-aged to perfection and kissed by open
            fire.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute bottom-12 z-20 flex flex-col items-center gap-4 animate-bounce"
        >
          <span className="small-caps">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      <section
        id="philosophy"
        className="relative py-32 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center"
      >
        <div className="md:w-1/2 flex justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
          <img
            src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80"
            alt="Chef preparing premium steak"
            className="w-full max-w-md aspect-[3/4] object-cover rounded-[32px] border border-white/5 shadow-2xl relative z-10 brightness-90"
          />
        </div>

        <div className="md:w-1/2 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="text-gold" size={20} />
            <span className="small-caps text-gold">Our Philosophy</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
            Respect the <span className="italic text-gold">Source.</span>
            <br />
            Master the <span className="italic text-gold">Fire.</span>
          </h2>

          <p className="text-white/60 text-lg leading-relaxed mb-6 font-light">
            We believe that true luxury lies in simplicity and uncompromising quality. Our beef is exclusively sourced
            from boutique ranches in Hokkaido, Kagoshima, and heritage farms across the globe.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10 font-light">
            Each cut undergoes a proprietary dry-aging process in our Himalayan salt chamber before being seared over
            binchotan charcoal and white oak, delivering an unparalleled depth of flavor.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-10">
            <div>
              <p className="font-serif text-3xl text-gold">48</p>
              <p className="text-white/50 text-sm leading-relaxed">seats across dining room and chef counter</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold">65</p>
              <p className="text-white/50 text-sm leading-relaxed">days of reserve dry-aging in the salt chamber</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold">1,800</p>
              <p className="text-white/50 text-sm leading-relaxed">bottles selected for steak and tasting pairings</p>
            </div>
          </div>

          <a href="#reservations" className="flex items-center gap-4 text-sm font-medium uppercase tracking-[0.2em] group">
            <span className="group-hover:text-gold transition-colors">Plan Your Evening</span>
            <div className="w-10 h-[1px] bg-white group-hover:bg-gold group-hover:w-16 transition-all duration-300" />
          </a>
        </div>
      </section>

      <section id="menu" className="py-24 bg-ink-light relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <span className="small-caps text-gold block mb-4">Signature Selection</span>
              <h2 className="font-serif text-5xl sm:text-7xl font-light">
                The <span className="italic">Cuts</span>
              </h2>
            </div>
            <p className="max-w-sm text-white/50 text-sm md:text-base leading-relaxed">{selectedCollection.blurb}</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {selectedCollection.items.map((cut, index) => (
              <motion.div
                key={`${selectedCollection.id}-${cut.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 aspect-[4/5] oval-mask">
                  <img
                    src={cut.img}
                    alt={cut.title}
                    className="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="font-serif text-2xl font-medium">{cut.title}</h3>
                  <span className="font-serif text-xl text-gold shrink-0">{cut.price}</span>
                </div>
                <span className="small-caps block mb-3 text-white/40">{cut.region}</span>
                <p className="text-white/60 text-sm leading-relaxed">{cut.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <a
              href="#reservations"
              className="border border-white/20 rounded-full px-8 py-4 small-caps hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Reserve This Experience
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80"
            alt="Restaurant Interior"
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-ink via-transparent to-ink" />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <ChefHat className="mx-auto text-gold mb-8 stroke-[1.5]" size={40} />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] mb-10">
            An Intimate Sanctuary for the <span className="italic luxury-text-gradient">Epicurean.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto mb-12">
            Dimly lit by amber accents, wrapped in dark oak, and soundscaped for absolute privacy. AURA presents an
            atmosphere as refined as the cuisine itself.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="glass-card">
              <CalendarDays size={18} className="text-gold mb-4" />
              <h3 className="font-serif text-2xl mb-3">Chef Counter</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Eight seats nightly for an extended tasting with direct access to the rhythm of the kitchen.
              </p>
            </div>
            <div className="glass-card">
              <Users size={18} className="text-gold mb-4" />
              <h3 className="font-serif text-2xl mb-3">Private Dining</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                A dedicated room for up to 16 guests with bespoke pacing, pairings, and service choreography.
              </p>
            </div>
            <div className="glass-card">
              <Clock3 size={18} className="text-gold mb-4" />
              <h3 className="font-serif text-2xl mb-3">Late Seating</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Weekends stretch later for guests who want a full steakhouse evening without being rushed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer id="reservations" className="bg-ink pt-24 pb-12 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-white/10 pb-20">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-5xl md:text-6xl font-light mb-6">
                Reserve Your <br />
                <span className="italic text-gold">Table</span>
              </h2>
              <p className="text-white/50 mb-8 max-w-md">
                Reservations open 30 days in advance. For private dining and parties of 6+, please contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => updateField('service', 'Dining room tasting')}
                  className="bg-gold text-ink px-8 py-4 small-caps font-bold hover:bg-white hover:text-black transition-colors rounded-sm"
                >
                  Find a Table
                </button>
                <button
                  type="button"
                  onClick={() => updateField('service', 'Private dining enquiry')}
                  className="border border-white/20 px-8 py-4 small-caps hover:bg-white/5 transition-colors rounded-sm flex items-center justify-center gap-2 group"
                >
                  Private Dining <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="reservation-panel">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="reservation-field">
                    <span className="small-caps text-gold">Name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder="Amina Rahman"
                    />
                    {errors.name ? <small>{errors.name}</small> : null}
                  </label>
                  <label className="reservation-field">
                    <span className="small-caps text-gold">Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      placeholder="amina@example.com"
                    />
                    {errors.email ? <small>{errors.email}</small> : null}
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <label className="reservation-field">
                    <span className="small-caps text-gold">Date</span>
                    <input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
                    {errors.date ? <small>{errors.date}</small> : null}
                  </label>
                  <label className="reservation-field">
                    <span className="small-caps text-gold">Time</span>
                    <select value={form.time} onChange={(event) => updateField('time', event.target.value)}>
                      {availableTimes.length ? (
                        availableTimes.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))
                      ) : (
                        <option value="">No seatings available</option>
                      )}
                    </select>
                    {errors.time ? <small>{errors.time}</small> : null}
                  </label>
                  <label className="reservation-field">
                    <span className="small-caps text-gold">Guests</span>
                    <select value={form.guests} onChange={(event) => updateField('guests', event.target.value)}>
                      {['1', '2', '3', '4', '5', '6', '7', '8'].map((guestCount) => (
                        <option key={guestCount} value={guestCount}>
                          {guestCount} guest{guestCount === '1' ? '' : 's'}
                        </option>
                      ))}
                    </select>
                    {errors.guests ? <small>{errors.guests}</small> : null}
                  </label>
                  <label className="reservation-field">
                    <span className="small-caps text-gold">Service</span>
                    <select value={form.service} onChange={(event) => updateField('service', event.target.value)}>
                      <option>Dining room tasting</option>
                      <option>A la carte dinner</option>
                      <option>Chef counter</option>
                      <option>Private dining enquiry</option>
                    </select>
                  </label>
                </div>

                <label className="reservation-field mt-4">
                  <span className="small-caps text-gold">Notes</span>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    placeholder="Anniversary, allergies, wine pairing preference, or private dining details."
                  />
                </label>

                <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <p className="small-caps text-gold">Selected Seating</p>
                    <p className="text-white/60 mt-2">
                      {form.date && form.time ? `${formatDate(form.date)} at ${form.time}` : 'Choose a date and time'}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="bg-gold text-ink px-8 py-4 small-caps font-bold hover:bg-white hover:text-black transition-colors rounded-sm"
                  >
                    Confirm Request
                  </button>
                </div>
              </form>

              {status.kind === 'confirmed' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 rounded-[24px] border border-gold/30 bg-gold/10 p-6"
                >
                  <p className="small-caps text-gold">Reservation request received</p>
                  <p className="font-serif text-3xl mt-3">{status.summary}</p>
                  <p className="text-white/60 mt-3">
                    Reference {status.code}. A confirmation email will be sent to {form.email} after the reservations team
                    reviews availability.
                  </p>
                </motion.div>
              ) : null}
            </div>

            <div>
              <span className="small-caps text-gold block mb-6">Contact</span>
              <ul className="space-y-4 text-white/70 font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-white/40" />
                  <span>17 Mercer Street, SoHo<br />New York, NY 10013</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-white/40" />
                  <span>+1 (212) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram size={18} className="text-white/40" />
                  <span>@aura.steak</span>
                </li>
              </ul>
            </div>

            <div>
              <span className="small-caps text-gold block mb-6">Hours</span>
              <ul className="space-y-4 text-white/70 font-light">
                <li>
                  <span className="block text-white/40 text-sm mb-1">Tuesday - Thursday</span>
                  Dinner: 6:00 PM - 10:30 PM
                </li>
                <li>
                  <span className="block text-white/40 text-sm mb-1">Friday - Saturday</span>
                  Dinner: 5:30 PM - 11:00 PM
                </li>
                <li>
                  <span className="block text-white/40 text-sm mb-1">Sunday</span>
                  Dinner: 5:30 PM - 9:30 PM
                </li>
                <li>
                  <span className="block text-white/40 text-sm mb-1">Monday</span>
                  Closed
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <span className="small-caps text-gold block mb-6">Guest Details</span>
              <div className="space-y-3">
                {faqItems.map((item, index) => {
                  const open = index === activeFaq;

                  return (
                    <div key={item.question} className="rounded-[20px] border border-white/10 bg-white/[0.02]">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between gap-6 px-5 py-4 text-left"
                        aria-expanded={open}
                        onClick={() => setActiveFaq(open ? -1 : index)}
                      >
                        <span className="font-serif text-2xl">{item.question}</span>
                        <ChevronDown
                          size={18}
                          className={open ? 'text-gold rotate-180 transition-transform' : 'text-gold transition-transform'}
                        />
                      </button>
                      {open ? <p className="px-5 pb-5 text-white/60 leading-relaxed">{item.answer}</p> : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <span className="small-caps text-gold block mb-5">Private Dining</span>
              <h3 className="font-serif text-4xl font-light mb-5">A room designed for serious dinners.</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Corporate hosting, launch dinners, and intimate celebrations are handled with custom pacing, private
                staffing, and menu planning in advance with the kitchen and cellar team.
              </p>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-start gap-3">
                  <Users size={18} className="mt-1 text-gold" />
                  Seated capacity for up to 16 guests
                </li>
                <li className="flex items-start gap-3">
                  <CalendarDays size={18} className="mt-1 text-gold" />
                  Recommended lead time of 72 hours for bespoke service design
                </li>
                <li className="flex items-start gap-3">
                  <Clock3 size={18} className="mt-1 text-gold" />
                  Later weekend pacing available for long-format tastings and speeches
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 small-caps">
            <p>&copy; {new Date().getFullYear()} AURA STEAKHOUSE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Press
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
