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

/**
 * Exam formats (question counts, length, pass marks, study hours) were last
 * checked against these official WSET pages on this date.
 */
export const EXAM_FACTS_CHECKED = '2026-09-23';
export const WSET_QUALIFICATION_PAGES: Record<number, string> = {
  1: 'https://www.wsetglobal.com/qualifications/wset-level-1-award-in-wines/',
  2: 'https://www.wsetglobal.com/qualifications/wset-level-2-award-in-wines/',
  3: 'https://www.wsetglobal.com/qualifications/wset-level-3-award-in-wines/',
};
/** The official specification PDFs (grade bands, pass rules, resits), linked from those pages. */
export const WSET_SPECIFICATIONS: Record<number, { url: string; issue: string }> = {
  1: { url: 'https://www.wsetglobal.com/media/11682/wset_l1wines_spec_en_jun2022_issue12.pdf', issue: 'Issue 1.2, 2022' },
  2: { url: 'https://www.wsetglobal.com/media/19132/wset_l2wines_specification_en_april2026_issue21.pdf', issue: 'Issue 2.1, 2026' },
  3: { url: 'https://www.wsetglobal.com/media/11731/wset_l3wines_specification_en_highres_may2022_issue2.pdf', issue: 'Issue 2, 2022' },
};

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

/**
 * hreflang map for a bilingual page whose variants differ only by ?lang.
 * x-default is the English page: the bare address picks a language by country
 * and canonicalises to one of the two, so it is not a page of its own and an
 * annotation pointing at it can be ignored.
 */
export function languageAlternates(url: string) {
  return {
    en: `${url}?lang=en`,
    ko: `${url}?lang=ko`,
    'x-default': `${url}?lang=en`,
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

/** "2026-07-24" → "2026년 7월 24일". */
export function formatDateKo(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}년 ${m}월 ${d}일`;
}

/**
 * Display width with Hangul counted double, which is roughly how much room it
 * takes in a search result next to Latin text. Korean titles and descriptions
 * are sized with this instead of a plain character count.
 */
export function widthOf(text: string): number {
  let w = 0;
  for (const ch of text) w += /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3]/.test(ch) ? 2 : 1;
  return w;
}

/** Cut text to at most `maxWidth` display width (see widthOf) at a word boundary. */
export function clipWidth(text: string, maxWidth: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (widthOf(clean) <= maxWidth) return clean;
  let out = '';
  for (const word of clean.split(' ')) {
    const next = out ? `${out} ${word}` : word;
    if (widthOf(next) + 1 > maxWidth) break;
    out = next;
  }
  return `${out.replace(/[\s,;:.·-]+$/, '')}…`;
}

/**
 * Share image showing this page's own title. 96 pages used to share one
 * generic picture, so every shared link looked the same.
 */
export function ogImage(title: string, kicker: string, lang: Lang = 'en') {
  const q = new URLSearchParams({ title, kicker, lang });
  return { url: `${BASE_URL}/api/og?${q.toString()}`, width: 1200, height: 630, alt: title };
}

/**
 * First candidate whose length is inside [min, max] (the checklist's 50-60
 * characters for titles). Otherwise the longest candidate that still fits
 * under max, and as a last resort the first one cut down to max.
 */
export function fitTitle(candidates: string[], min = 50, max = 60): string {
  const exact = candidates.find((c) => c.length >= min && c.length <= max);
  if (exact) return exact;
  const under = candidates.filter((c) => c.length <= max).sort((a, b) => b.length - a.length)[0];
  return under ?? clip(candidates[0], max);
}

/**
 * Description of 150-160 characters where the text allows: cut at the last
 * word boundary that still leaves at least `min` characters. Text shorter than
 * `min` is returned whole.
 */
export function clipBetween(text: string, min = 150, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const window = clean.slice(0, max - 1);
  // Prefer ending on a full sentence if one ends inside the range.
  const sentence = window.lastIndexOf('. ');
  if (sentence + 1 >= min) return clean.slice(0, sentence + 1);
  const cut = window.lastIndexOf(' ');
  // Never end on a dangling little word ("...a quick clue to…").
  const trimmed = clean
    .slice(0, cut)
    .replace(/(\s+(a|an|the|and|or|of|to|for|with|in|on|at|by|as|is|its|their|from))+$/i, '')
    .replace(/[\s,;:.·-]+$/, '');
  return `${trimmed}…`;
}

/**
 * clipBetween() over several wordings of the same description; the first one
 * that lands inside [min, max] wins. A long word straddling the cut point can
 * leave one wording a few characters short, and a different lead-in or ending
 * moves the cut to another word boundary.
 */
export function bestBetween(texts: string[], min = 150, max = 160): string {
  // A wording that fits whole beats one that has to be cut mid-sentence.
  const whole = texts.map((t) => t.replace(/\s+/g, ' ').trim()).find((t) => t.length >= min && t.length <= max);
  if (whole) return whole;
  const cut = texts.map((t) => clipBetween(t, min, max));
  return cut.find((c) => c.length >= min && c.length <= max) ?? cut.filter((c) => c.length <= max).sort((a, b) => b.length - a.length)[0] ?? cut[0];
}

/** Cut text to at most `max` characters at a word boundary, adding an ellipsis. */
export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  const kept = (space > max * 0.6 ? cut.slice(0, space) : cut)
    .replace(/(\s+(a|an|the|and|or|of|to|for|with|in|on|at|by|as|is|its|their|from))+$/i, '')
    .replace(/[\s,;:.·-]+$/, '');
  return `${kept}…`;
}
