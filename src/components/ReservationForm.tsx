import { motion } from 'motion/react';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

type ReservationFormProps = {
  initialService?: string;
  compact?: boolean;
};

type ReservationFormState = {
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

export function ReservationForm({ initialService = 'Dining room tasting', compact = false }: ReservationFormProps) {
  const [status, setStatus] = useState<ReservationStatus>({ kind: 'idle' });
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormState, string>>>({});
  const [form, setForm] = useState<ReservationFormState>({
    name: '',
    email: '',
    date: getDefaultDate(),
    time: '19:30',
    guests: '2',
    service: initialService,
    notes: '',
  });

  const availableTimes = useMemo(() => getTimeSlots(form.date), [form.date]);

  useEffect(() => {
    setForm((current) => ({ ...current, service: initialService }));
  }, [initialService]);

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

  function updateField(field: keyof ReservationFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus({ kind: 'idle' });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof ReservationFormState, string>> = {};

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
    <div className={compact ? 'reservation-panel compact-reservation-panel' : 'reservation-panel'}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-12">
          <label className="reservation-field 2xl:col-span-3">
            <span className="small-caps text-gold">Date</span>
            <input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
            {errors.date ? <small>{errors.date}</small> : null}
          </label>
          <label className="reservation-field 2xl:col-span-3">
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
          <label className="reservation-field 2xl:col-span-2">
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
          <label className="reservation-field md:col-span-2 2xl:col-span-4">
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
            rows={compact ? 3 : 4}
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Anniversary, allergies, wine pairing preference, or private dining details."
          />
        </label>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="small-caps text-gold">Selected Seating</p>
            <p className="mt-2 text-white/60">
              {form.date && form.time ? `${formatDate(form.date)} at ${form.time}` : 'Choose a date and time'}
            </p>
          </div>
          <button
            type="submit"
            className="rounded-sm bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-white hover:text-black"
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
          <p className="mt-3 font-serif text-3xl">{status.summary}</p>
          <p className="mt-3 text-white/60">
            Reference {status.code}. A confirmation email will be sent to {form.email} after the reservations team reviews availability.
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}
