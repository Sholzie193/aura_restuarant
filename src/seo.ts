export const SITE_NAME = 'Aura Steakhouse';
export const SITE_URL = 'https://aurasteakhouse.com';
export const DEFAULT_OG_IMAGE = '/images/menu/reserve-tasting-flight.jpg';

export const DEFAULT_KEYWORDS = [
  'Dubai steakhouse',
  'luxury steakhouse Dubai',
  'fine dining Dubai',
  'Michelin steakhouse Dubai',
  'Wagyu steak Dubai',
  'dry-aged steak Dubai',
  'private dining Dubai',
  'Jumeirah restaurant',
  'premium steak restaurant Dubai',
  'Dubai reservations restaurant',
];

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

