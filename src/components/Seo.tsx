import { useEffect } from 'react';
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '../seo';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

function setMetaTag(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function setLinkTag(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function setJsonLdScript(id: string, payload: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.setAttribute('data-seo-id', id);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(payload);
}

export function Seo({ title, description, path, image = DEFAULT_OG_IMAGE, keywords = DEFAULT_KEYWORDS }: SeoProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const imageUrl = absoluteUrl(image);
    const pageTitle = `${title} | ${SITE_NAME} Dubai`;

    document.title = pageTitle;

    setMetaTag('meta[name="description"]', { name: 'description', content: description });
    setMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    setMetaTag('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large' });
    setMetaTag('meta[name="theme-color"]', { name: 'theme-color', content: '#050505' });

    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: pageTitle });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    setMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMetaTag('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    setMetaTag('meta[property="og:locale"]', { property: 'og:locale', content: 'en_AE' });

    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    setLinkTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const restaurantSchema = {
      '@context': 'https://schema.org',
      '@type': 'SteakHouse',
      name: SITE_NAME,
      image: imageUrl,
      url: canonicalUrl,
      telephone: '+97145550199',
      email: 'reservations@aurasteakhouse.com',
      servesCuisine: ['Steakhouse', 'Fine Dining', 'Japanese Wagyu'],
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jumeirah Beach Road',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      areaServed: 'Dubai',
      hasMenu: absoluteUrl('/menu'),
      acceptsReservations: 'True',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
          opens: '18:00',
          closes: '22:30',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday'],
          opens: '17:30',
          closes: '23:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '17:30',
          closes: '21:30',
        },
      ],
      sameAs: ['https://www.instagram.com/aura.steak'],
    };

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      description,
      url: canonicalUrl,
      primaryImageOfPage: imageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: absoluteUrl('/'),
      },
    };

    setJsonLdScript('restaurant', restaurantSchema);
    setJsonLdScript('webpage', webPageSchema);
  }, [description, image, keywords, path, title]);

  return null;
}

