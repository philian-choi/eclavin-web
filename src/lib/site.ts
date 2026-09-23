/**
 * Site-wide facts and structured-data building blocks.
 *
 * Every page used to declare its own Organization with a slightly different
 * name ("Eclavin Wine Study Center", "Eclavin Wine Academy", ...) and one page
 * pointed sameAs at the wrong Wikidata item. Search engines and AI models read
 * those as separate, contradictory entities. Keep the entity here, once, and
 * reference it by @id everywhere else.
 */

export const BASE_URL = 'https://www.eclavin.com';
export const APP_STORE_URL = 'https://apps.apple.com/app/id6757098139';
export const SUPPORT_EMAIL = 'support@eclavin.com';
export const PRIVACY_URL = 'https://eclavin.vercel.app/privacy';

export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

/**
 * Date of the last change that touched every page's structured data or links.
 * The sitemap never reports an older lastmod than this. Bump it only when such
 * a site-wide change ships; a bare redeploy is not a content change.
 */
export const SITEWIDE_UPDATED = '2026-09-23';

/** Question counts. The app figure matches the App Store listing. */
export const SITE_QUESTIONS_PER_LEVEL = 100;
export const APP_QUESTIONS = { en: '2,000+', ko: '2,000개 이상' } as const;

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Eclavin',
  alternateName: '에클라뱅',
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512x512.png`,
  email: SUPPORT_EMAIL,
  sameAs: [APP_STORE_URL],
};

/** Use for author / publisher / provider so every page names the same entity. */
export const ORG_REF = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Eclavin',
  url: BASE_URL,
};

/** The exam body the content is about. Eclavin is not affiliated with it. */
export const WSET_ENTITY = {
  '@type': 'Organization',
  name: 'Wine & Spirit Education Trust (WSET)',
  url: 'https://www.wsetglobal.com',
  sameAs: [
    'https://www.wikidata.org/wiki/Q8024881',
    'https://en.wikipedia.org/wiki/Wine_%26_Spirit_Education_Trust',
  ],
};

export const WINE_ENTITY = {
  '@type': 'Thing',
  name: 'Wine',
  sameAs: 'https://www.wikidata.org/wiki/Q282',
};

export type Lang = 'en' | 'ko';

/** Request header the proxy sets so the root layout can print <html lang>. */
export const LANG_HEADER = 'x-eclavin-lang';

/**
 * Language for bilingual pages: an explicit ?lang wins, otherwise visitors from
 * Korea get Korean and everyone else English. Pages and the proxy must agree.
 */
export function resolveLang(param: string | null | undefined, country: string | null | undefined): Lang {
  if (param === 'ko' || param === 'en') return param;
  return country === 'KR' ? 'ko' : 'en';
}

/** hreflang map for a bilingual page whose variants differ only by ?lang. */
export function languageAlternates(url: string) {
  return {
    en: `${url}?lang=en`,
    ko: `${url}?lang=ko`,
    'x-default': url,
  };
}

/** Serialise JSON-LD for a native <script> tag without breaking out of it. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "2026-07-24" → "24 July 2026". Shown next to "Updated" so readers see a real date, not just a year. */
export function formatDateEn(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Cut text to at most `max` characters at a word boundary, adding an ellipsis. */
export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.·-]+$/, '')}…`;
}
