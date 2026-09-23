import { MetadataRoute } from 'next';
import { getAllEpisodes } from '@/lib/episodes';
import { PRACTICE_LEVELS } from '@/lib/practiceConfig';
import { GUIDES } from '@/lib/guidesConfig';
import { GLOSSARY_SLUGS } from '@/lib/glossaryConfig';
import { GRAPE_SLUGS } from '@/lib/grapeConfig';
import { REGION_SLUGS } from '@/lib/regionConfig';
import { BASE_URL, SITEWIDE_UPDATED } from '@/lib/site';

/**
 * Only canonical addresses go in here. Bilingual pages canonicalise to
 * ?lang=en / ?lang=ko, so both variants are listed (with each other as
 * alternates) and the bare address, which is only the language-picking
 * x-default, is not.
 *
 * lastmod is the later of the page's own content date and SITEWIDE_UPDATED.
 * Content dates come from the registries (guides carry their own), so a new
 * or edited page updates its entry without anyone touching this file.
 */

// Last change to the question text of the 400 question pages.
const QUESTIONS_CONTENT = '2026-07-22';
// First publication of the glossary, grape and region pages; unchanged since.
const GLOSSARY_CONTENT = '2026-07-24';
const GRAPES_CONTENT = '2026-07-24';
const REGIONS_CONTENT = '2026-07-26';
// Home, practice, level and about pages were rewritten on this date.
const HUBS_CONTENT = '2026-09-23';

function lastmod(contentDate: string): Date {
  return new Date(contentDate > SITEWIDE_UPDATED ? contentDate : SITEWIDE_UPDATED);
}

function bilingual(path: string, contentDate: string): MetadataRoute.Sitemap {
  const en = `${BASE_URL}${path}?lang=en`;
  const ko = `${BASE_URL}${path}?lang=ko`;
  const alternates = { languages: { en, ko } };
  return [
    { url: en, lastModified: lastmod(contentDate), alternates },
    { url: ko, lastModified: lastmod(contentDate), alternates },
  ];
}

function single(path: string, contentDate: string): MetadataRoute.Sitemap[number] {
  return { url: `${BASE_URL}${path}`, lastModified: lastmod(contentDate) };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const levels = Object.values(PRACTICE_LEVELS);

  const questionPages = levels.flatMap((l) =>
    getAllEpisodes(l.levelNum, 'en').flatMap((e) => bilingual(`/level/${l.levelNum}/episode/${e.id}`, QUESTIONS_CONTENT)),
  );

  return [
    ...bilingual('/', HUBS_CONTENT),
    ...bilingual('/practice', HUBS_CONTENT),
    ...levels.flatMap((l) => bilingual(`/practice/${l.slug}`, l.updated)),
    ...levels.flatMap((l) => bilingual(`/level/${l.levelNum}`, HUBS_CONTENT)),
    ...bilingual('/glossary', GLOSSARY_CONTENT),
    ...GLOSSARY_SLUGS.flatMap((slug) => bilingual(`/glossary/${slug}`, GLOSSARY_CONTENT)),
    single('/guide', GUIDES.map((g) => g.dateModified).sort().at(-1)!),
    ...GUIDES.map((g) => single(`/guide/${g.slug}`, g.dateModified)),
    single('/grape', GRAPES_CONTENT),
    ...GRAPE_SLUGS.map((slug) => single(`/grape/${slug}`, GRAPES_CONTENT)),
    single('/region', REGIONS_CONTENT),
    ...REGION_SLUGS.map((slug) => single(`/region/${slug}`, REGIONS_CONTENT)),
    single('/about', HUBS_CONTENT),
    ...questionPages,
  ];
}
