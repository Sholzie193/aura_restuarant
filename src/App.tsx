import { motion, useReducedMotion } from 'motion/react';
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Flame,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  Users,
  Wine,
  X,
} from 'lucide-react';
import { FormEvent, ReactNode, useEffect, useState } from 'react';

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
  | {
      kind: 'confirmed';
      summary: string;
      code: string;
    };

const navItems = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Visit', href: '#visit' },
];

const servicePillars = [
  {
    title: 'Dry-age discipline',
    text: 'Prime cuts rest for 35 to 90 days in a humidity-controlled ageing room lined with mineral stone and cedar.',
  },
  {
    title: 'Open-fire precision',
    text: 'Every steak is finished over binchotan and white oak for a crust that is smoky, clean, and exact.',
  },
  {
    title: 'Tableside ritual',
    text: 'Sauces, finishing salts, carving, and pairing guidance arrive with a quiet dining-room cadence.',
  },
];

const tastingSequence = [
  {
    step: '01',
    title: 'Aperitif and raw opening',
    text: 'The room starts lightly with a smoked martini, beef tartare, and a restrained first pour from the cellar.',
  },
  {
    step: '02',
    title: 'Fire-led centre course',
    text: 'Signature cuts arrive in measured progression, beginning with leaner textures before richer marbling takes over.',
  },
  {
    step: '03',
    title: 'Cheese, cacao, and digestif',
    text: 'Dessert closes warm and savoury-forward with dark chocolate, burnt hay caramel, and aged spirits.',
  },
];

const faqItems = [
  {
    question: 'How far in advance should reservations be made?',
    answer:
      'Prime dinner slots typically fill 10 to 14 days ahead. Chef counter and private dining requests should be placed earlier so the kitchen can design the progression.',
  },
  {
    question: 'Do you accommodate dietary preferences?',
    answer:
      'Yes. We offer pescatarian and vegetarian tasting adaptations with advance notice, and we can work around most allergens when shared at booking time.',
  },
  {
    question: 'Is there a dress code?',
    answer:
      'The room is polished but relaxed. Smart evening wear is recommended. We ask guests to avoid athletic shorts, sleeveless gymwear, and flip-flops.',
  },
  {
    question: 'Can large groups or corporate dinners be arranged?',
    answer:
      'Yes. The private room hosts up to 16 seated guests, and full buyout requests can be discussed directly with the reservations team.',
  },
];

const menuCollections = [
  {
    id: 'signature',
    label: 'Signature Cuts',
    blurb: 'A concise line-up of the house steaks, sourced in small allocations and prepared to order over live fire.',
    items: [
      {
        name: 'House Ribeye',
        details: '42-day dry-aged, bone-in, carved for two.',
        accent: 'white oak jus, confit shallot',
        price: '$172',
      },
      {
        name: 'A5 Striploin',
        details: 'Kagoshima prefecture, served in three measured passes.',
        accent: 'fresh wasabi, smoked soy, citrus salt',
        price: '$240',
      },
      {
        name: 'Heritage Tenderloin',
        details: 'Grass-fed centre cut with black pepper bark.',
        accent: 'bordelaise, roasted garlic cream',
        price: '$128',
      },
    ],
  },
  {
    id: 'tasting',
    label: 'Tasting Journey',
    blurb: 'A choreographed service designed for guests who want the full narrative of the kitchen and cellar.',
    items: [
      {
        name: 'Five-course tasting',
        details: 'Seasonal opening bites, dry-aged centre course, dessert.',
        accent: 'optional wine pairing',
        price: '$195',
      },
      {
        name: 'Chef counter',
        details: 'Interactive kitchen-side seating with off-menu tastings.',
        accent: 'limited to eight guests nightly',
        price: '$260',
      },
      {
        name: 'Reserve pairing',
        details: 'Old-world reds and rare pours selected cellar-side.',
        accent: 'sommelier-led progression',
        price: '$110',
      },
    ],
  },
  {
    id: 'sides',
    label: 'Sides and Finish',
    blurb: 'A supporting cast built for steakhouse indulgence without turning the table heavy or predictable.',
    items: [
      {
        name: 'Coal-roasted onion',
        details: 'Brown butter, thyme ash, cultured cream.',
        accent: 'shared side',
        price: '$24',
      },
      {
        name: 'Potato pavé',
        details: 'Layered Yukon Gold, rosemary, aged comté.',
        accent: 'crisp exterior, soft centre',
        price: '$22',
      },
      {
        name: 'Burnt vanilla tart',
        details: 'Dark cacao shell with crème fraiche.',
        accent: 'dessert finish',
        price: '$19',
      },
    ],
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

function SectionReveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  key?: string | number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="section-eyebrow">
      <span className="section-eyebrow-line" />
      <span>{children}</span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const availableTimes = getTimeSlots(form.date);
  const selectedCollection = menuCollections.find((collection) => collection.id === activeCollection) ?? menuCollections[0];

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

    const summary = `${formatDate(form.date)} at ${form.time} for ${form.guests} guest${form.guests === '1' ? '' : 's'}`;

    setStatus({
      kind: 'confirmed',
      summary,
      code: buildReservationCode(form.name),
    });
  }

  return (
    <div className="shell">
      <div className="background-orbit background-orbit-a" />
      <div className="background-orbit background-orbit-b" />
      <div className="background-grid" />

      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:rgba(14,10,8,0.84)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:rgba(255,255,255,0.03)]">
              <Flame size={18} className="text-[color:var(--accent)]" />
            </div>
            <div>
              <p className="font-serif text-2xl uppercase tracking-[0.28em] text-[color:var(--text)]">Aura</p>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted)]">Steakhouse</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href="tel:+12125550199" className="nav-link">
              +1 212 555 0199
            </a>
            <a href="#reservation" className="button-primary">
              Reserve
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--text)] lg:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-[color:var(--line)] bg-[color:rgba(14,10,8,0.96)] px-5 py-5 sm:px-8 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#reservation" className="button-primary mt-2 text-center" onClick={() => setMenuOpen(false)}>
                Reserve
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-16 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:px-10 lg:py-20">
          <SectionReveal className="max-w-3xl">
            <Eyebrow>Michelin-calibre fire dining</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-serif text-6xl leading-[0.92] text-[color:var(--text)] sm:text-7xl lg:text-[7.2rem]">
              A steakhouse shaped by charcoal, cellar depth, and exacting service.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              Aura is a dark-room dining experience devoted to precise ageing, open-fire cooking, and a service rhythm that feels intimate from the first pour to the final course.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#reservation" className="button-primary">
                Book dinner
              </a>
              <a href="#menu" className="button-secondary">
                Explore the menu
              </a>
            </div>

            <div className="mt-14 grid gap-8 border-t border-[color:var(--line)] pt-8 sm:grid-cols-3">
              <div>
                <p className="metric-value">48</p>
                <p className="metric-label">Seats across dining room and chef counter</p>
              </div>
              <div>
                <p className="metric-value">1,800</p>
                <p className="metric-label">Bottles curated for classic and modern pairings</p>
              </div>
              <div>
                <p className="metric-value">90</p>
                <p className="metric-label">Maximum ageing days for reserve allocations</p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="hero-panel">
            <div className="hero-stage">
              <div className="hero-stage-ring" />
              <div className="hero-stage-core">
                <div className="hero-ember hero-ember-large" />
                <div className="hero-ember hero-ember-small" />
                <div className="hero-stage-copy">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent-soft)]">Tonight at Aura</p>
                  <h2 className="mt-4 font-serif text-4xl leading-none text-[color:var(--text)]">Wood-fire tasting</h2>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-[color:var(--muted)]">
                    Dry-aged ribeye, coal-roasted onion, reserve Bordeaux, and a dessert finished with dark cacao smoke.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 border-t border-[color:var(--line)] pt-6">
              <div className="flex items-start gap-4">
                <Star size={18} className="mt-1 text-[color:var(--accent)]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">Signature service</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-soft)]">
                    Three distinct steak temperatures are plated and explained tableside to show how texture and fat evolve.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Wine size={18} className="mt-1 text-[color:var(--accent)]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">Cellar focus</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-soft)]">
                    Old-world reds dominate the list, supported by grower champagne and low-intervention by-the-glass pours.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </section>

        <section id="story" className="mx-auto grid max-w-7xl gap-16 border-t border-[color:var(--line)] px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-28">
          <SectionReveal>
            <Eyebrow>House philosophy</Eyebrow>
            <h2 className="mt-6 max-w-xl font-serif text-4xl leading-tight text-[color:var(--text)] sm:text-5xl">
              Serious steakhouse energy without the old theatre.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              The room is built around restraint: low light, dark timber, brushed metal, and a kitchen that prefers detail over spectacle. The result is formal enough for occasion dining and relaxed enough to return every week.
            </p>
          </SectionReveal>

          <div className="grid gap-10">
            {servicePillars.map((pillar) => (
              <SectionReveal
                key={pillar.title}
                className="border-b border-[color:var(--line)] pb-8 last:border-b-0 last:pb-0"
              >
                <h3 className="font-serif text-3xl text-[color:var(--text)]">{pillar.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">{pillar.text}</p>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <SectionReveal className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Menu direction</Eyebrow>
              <h2 className="mt-6 max-w-lg font-serif text-4xl leading-tight text-[color:var(--text)] sm:text-5xl">
                The menu stays tight so every plate earns its place.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-[color:var(--muted)]">
                Rather than overextending into steakhouse clichés, Aura keeps the offering concise: a handful of exceptional cuts, a controlled tasting format, and supporting plates calibrated for richness and pace.
              </p>
              <div className="menu-note mt-10">
                <Sparkles size={18} className="text-[color:var(--accent)]" />
                <p className="text-sm leading-7 text-[color:var(--text-soft)]">
                  Menu allocations shift nightly based on ageing room yield, marbling quality, and cellar pairing availability.
                </p>
              </div>
            </div>

            <div className="menu-panel">
              <div className="flex flex-wrap gap-3">
                {menuCollections.map((collection) => (
                  <button
                    key={collection.id}
                    type="button"
                    className={collection.id === activeCollection ? 'menu-tab menu-tab-active' : 'menu-tab'}
                    onClick={() => setActiveCollection(collection.id)}
                  >
                    {collection.label}
                  </button>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--muted)]">{selectedCollection.blurb}</p>

              <div className="mt-10 grid gap-6">
                {selectedCollection.items.map((item) => (
                  <div key={item.name} className="menu-item">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-serif text-3xl text-[color:var(--text)]">{item.name}</h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[color:var(--accent-soft)]">{item.details}</p>
                      </div>
                      <p className="font-serif text-3xl text-[color:var(--accent)]">{item.price}</p>
                    </div>
                    <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">{item.accent}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </section>

        <section id="experience" className="mx-auto grid max-w-7xl gap-12 border-t border-[color:var(--line)] px-5 py-20 sm:px-8 lg:grid-cols-[1fr_380px] lg:px-10 lg:py-28">
          <div>
            <SectionReveal>
              <Eyebrow>Dining progression</Eyebrow>
              <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-[color:var(--text)] sm:text-5xl">
                Service is paced like a tasting room, but the appetite is unmistakably steakhouse.
              </h2>
            </SectionReveal>

            <div className="mt-12 grid gap-8">
              {tastingSequence.map((item) => (
                <SectionReveal key={item.step} className="experience-row">
                  <p className="experience-step">{item.step}</p>
                  <div>
                    <h3 className="font-serif text-3xl text-[color:var(--text)]">{item.title}</h3>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">{item.text}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          <SectionReveal className="info-panel">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent-soft)]">Private dining</p>
            <h3 className="mt-5 font-serif text-4xl text-[color:var(--text)]">Chef-led room for 16 guests.</h3>
            <p className="mt-5 text-base leading-8 text-[color:var(--muted)]">
              For launches, executive dinners, and intimate celebrations, the private room offers a custom tasting, dedicated sommelier, and discreet arrival route.
            </p>

            <div className="mt-8 space-y-5 border-t border-[color:var(--line)] pt-6 text-sm leading-7 text-[color:var(--text-soft)]">
              <div className="flex items-start gap-4">
                <Users size={18} className="mt-1 text-[color:var(--accent)]" />
                <p>Seated format for 8 to 16 guests with custom place settings and menu printing.</p>
              </div>
              <div className="flex items-start gap-4">
                <Wine size={18} className="mt-1 text-[color:var(--accent)]" />
                <p>Sommelier-designed pairing paths with rare bottle upgrades from the reserve cellar.</p>
              </div>
              <div className="flex items-start gap-4">
                <CalendarDays size={18} className="mt-1 text-[color:var(--accent)]" />
                <p>Lead time of 72 hours recommended for bespoke tasting design and dietary coordination.</p>
              </div>
            </div>

            <a href="#reservation" className="button-secondary mt-8 inline-flex">
              Enquire about private dining
            </a>
          </SectionReveal>
        </section>

        <section id="visit" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-28">
          <SectionReveal className="visit-panel">
            <Eyebrow>Visit Aura</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[color:var(--text)] sm:text-5xl">
              Lower Manhattan address. Quiet room. Late service.
            </h2>

            <div className="mt-10 grid gap-6 text-base leading-8 text-[color:var(--muted)]">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="mt-2 text-[color:var(--accent)]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Address</p>
                  <p className="mt-2">17 Mercer Street, New York, NY 10013</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock3 size={18} className="mt-2 text-[color:var(--accent)]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Opening hours</p>
                  <p className="mt-2">Tuesday to Thursday, 6:00 PM to 10:30 PM</p>
                  <p>Friday to Saturday, 5:30 PM to 11:00 PM</p>
                  <p>Sunday, 5:30 PM to 9:30 PM</p>
                  <p>Monday, closed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} className="mt-2 text-[color:var(--accent)]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Reservations desk</p>
                  <a href="tel:+12125550199" className="mt-2 block transition-colors hover:text-[color:var(--text)]">
                    +1 212 555 0199
                  </a>
                  <a
                    href="mailto:reservations@aurasteakhouse.com"
                    className="block transition-colors hover:text-[color:var(--text)]"
                  >
                    reservations@aurasteakhouse.com
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="faq-panel">
            <Eyebrow>Guest details</Eyebrow>
            <div className="mt-8 divide-y divide-[color:var(--line)]">
              {faqItems.map((item, index) => {
                const open = index === activeFaq;

                return (
                  <div key={item.question} className="py-5">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-6 text-left"
                      aria-expanded={open}
                      onClick={() => setActiveFaq(open ? -1 : index)}
                    >
                      <span className="font-serif text-2xl text-[color:var(--text)]">{item.question}</span>
                      <ChevronDown
                        size={20}
                        className={open ? 'shrink-0 rotate-180 text-[color:var(--accent)] transition-transform' : 'shrink-0 text-[color:var(--accent)] transition-transform'}
                      />
                    </button>
                    {open ? <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">{item.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </section>

        <section id="reservation" className="mx-auto max-w-7xl border-t border-[color:var(--line)] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <SectionReveal className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>Reservations</Eyebrow>
              <h2 className="mt-6 max-w-lg font-serif text-4xl leading-tight text-[color:var(--text)] sm:text-5xl">
                Reserve a table with a booking form that actually works.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-[color:var(--muted)]">
                Choose your date, party size, and service style below. Monday closures and unavailable seatings are handled directly in the form so guests are not sent into dead ends.
              </p>
            </div>

            <div className="booking-panel">
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="field">
                    <span>Guest name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder="Amina Rahman"
                    />
                    {errors.name ? <small>{errors.name}</small> : null}
                  </label>

                  <label className="field">
                    <span>Email address</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      placeholder="amina@example.com"
                    />
                    {errors.email ? <small>{errors.email}</small> : null}
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <label className="field">
                    <span>Date</span>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) => updateField('date', event.target.value)}
                    />
                    {errors.date ? <small>{errors.date}</small> : null}
                  </label>

                  <label className="field">
                    <span>Time</span>
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

                  <label className="field">
                    <span>Guests</span>
                    <select value={form.guests} onChange={(event) => updateField('guests', event.target.value)}>
                      {['1', '2', '3', '4', '5', '6', '7', '8'].map((guestCount) => (
                        <option key={guestCount} value={guestCount}>
                          {guestCount} guest{guestCount === '1' ? '' : 's'}
                        </option>
                      ))}
                    </select>
                    {errors.guests ? <small>{errors.guests}</small> : null}
                  </label>
                </div>

                <label className="field">
                  <span>Service style</span>
                  <select value={form.service} onChange={(event) => updateField('service', event.target.value)}>
                    <option>Dining room tasting</option>
                    <option>A la carte dinner</option>
                    <option>Chef counter</option>
                    <option>Private dining enquiry</option>
                  </select>
                </label>

                <label className="field">
                  <span>Notes</span>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    placeholder="Anniversary, allergies, pairing preference, or private room details."
                  />
                </label>

                <div className="flex flex-col gap-4 border-t border-[color:var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Selected seating</p>
                    <p className="mt-2 text-base text-[color:var(--text-soft)]">
                      {form.date && form.time ? `${formatDate(form.date)} at ${form.time}` : 'Choose a date and time'}
                    </p>
                  </div>
                  <button type="submit" className="button-primary">
                    Confirm request
                  </button>
                </div>
              </form>

              {status.kind === 'confirmed' ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="confirmation-panel"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Reservation request received</p>
                  <h3 className="mt-3 font-serif text-3xl text-[color:var(--text)]">{status.summary}</h3>
                  <p className="mt-3 text-base leading-8 text-[color:var(--muted)]">
                    Reference {status.code}. A confirmation email will be sent to {form.email} after the reservations team reviews availability.
                  </p>
                </motion.div>
              ) : null}
            </div>
          </SectionReveal>
        </section>
      </main>

      <footer className="border-t border-[color:var(--line)] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Aura Steakhouse. Fire-led dining, reserve cellar, private room.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#menu" className="transition-colors hover:text-[color:var(--text)]">
              Menu
            </a>
            <a href="#visit" className="transition-colors hover:text-[color:var(--text)]">
              Visit
            </a>
            <a href="#reservation" className="transition-colors hover:text-[color:var(--text)]">
              Reservations
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
