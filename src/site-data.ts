export const menuCollections = [
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

export const pairingNotes = [
  {
    title: 'Reserve cellar',
    text: 'Dense reds and mature vintages are positioned as part of the menu journey rather than an afterthought.',
  },
  {
    title: 'Fire first',
    text: 'Wood smoke, crust, and rendered fat drive pairing logic more than origin or prestige alone.',
  },
  {
    title: 'Measured finish',
    text: 'Dessert and digestif content is kept tight so the final part of dinner feels deliberate and clean.',
  },
];

export const experienceMoments = [
  {
    step: '01',
    title: 'Arrival and aperitif',
    text: 'Guests begin in a quieter threshold space with a hosted arrival, restrained aperitif program, and enough time to settle before the dining room sequence starts.',
  },
  {
    step: '02',
    title: 'Fire-led main service',
    text: 'The core of the evening is paced around cuts, temperature, and marbling, with tableside guidance that stays polished rather than theatrical.',
  },
  {
    step: '03',
    title: 'Cellar, dessert, digestif',
    text: 'The close of dinner shifts the energy down with reserve pours, lighter sweets, and enough time for a long, unhurried finish.',
  },
];

export const guestPolicies = [
  {
    title: 'Opening cadence',
    text: 'Tuesday to Sunday dinner service with later weekend pacing, surfaced clearly to reduce booking friction.',
  },
  {
    title: 'Dress code',
    text: 'Smart elegant guidance keeps the room polished without overplaying formality.',
  },
  {
    title: 'Service identity',
    text: 'Each route now signals whether it is tasting, a la carte, chef counter, or private dining.',
  },
  {
    title: 'Reservation conduct',
    text: 'Age guidance, dietary note collection, and private dining lead times are made explicit before booking.',
  },
];

export const privateDiningFormats = [
  {
    tag: 'Executive dinners',
    title: 'Boardroom supper',
    capacity: '8-12',
    text: 'A quieter format for leadership dinners, negotiations, and hosted investor evenings with minimal interruption and tailored pacing.',
  },
  {
    tag: 'Celebrations',
    title: 'Occasion tasting',
    capacity: '10-16',
    text: 'Designed for anniversaries, milestones, and close-group celebrations, with upgraded pairings and bespoke finishing details.',
  },
  {
    tag: 'Brand launches',
    title: 'Private reveal dinner',
    capacity: '14-16',
    text: 'A stronger-format evening for launches, press dinners, and partner gatherings that need exclusivity and discreet service control.',
  },
];

export const openingHours = [
  { label: 'Tuesday - Thursday', value: 'Dinner: 6:00 PM - 10:30 PM' },
  { label: 'Friday - Saturday', value: 'Dinner: 5:30 PM - 11:00 PM' },
  { label: 'Sunday', value: 'Dinner: 5:30 PM - 9:30 PM' },
  { label: 'Monday', value: 'Closed' },
];

export const faqItems = [
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
