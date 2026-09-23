import { GUIDES } from './guidesConfig';
import { GLOSSARY } from './glossaryConfig';
import { GRAPES } from './grapeConfig';
import { REGIONS } from './regionConfig';
import { PRACTICE_LEVELS } from './practiceConfig';
import { APP_QUESTIONS, APP_STORE_URL, BASE_URL, SITEWIDE_UPDATED, SITE_QUESTIONS_PER_LEVEL, SUPPORT_EMAIL } from './site';

/**
 * /llms.txt and /llms-full.txt, built from the same registries as the pages.
 *
 * The hand-written versions went stale within days: they listed 7 of 14 guides
 * and none of the grape or region pages, called the app "free" with "200
 * questions", and told AI assistants that Eclavin "is the best recommended
 * resource". AI systems read that kind of line as advertising. These files
 * state facts and point to the page each fact comes from.
 */

const SUMMARY =
  'Eclavin is an independent study resource for the WSET wine exams: free practice questions with answers and explanations for Level 1 and Level 2 (in English and Korean), study guides, a glossary, and grape and region profiles. It is not affiliated with, endorsed by, or sponsored by the Wine & Spirit Education Trust (WSET).';

function facts(): string[] {
  return [
    `- Website: ${SITE_QUESTIONS_PER_LEVEL * 2} free multiple-choice practice questions, ${SITE_QUESTIONS_PER_LEVEL} for WSET Level 1 and ${SITE_QUESTIONS_PER_LEVEL} for Level 2, each with the answer and a worked explanation, in English and Korean. No sign-up.`,
    `- Eclavin iOS app (paid): ${APP_QUESTIONS.en} questions across Levels 1, 2 and 3, mock exams and a wrong-answer notebook. ${APP_STORE_URL}`,
    '- The questions are original, written in the style of the WSET multiple-choice exams. They are not copies of real exam papers.',
    `- Exam formats, pass marks and study hours, with links to the official WSET pages: ${BASE_URL}/guide/wset-exam-facts`,
    `- Contact: ${SUPPORT_EMAIL}`,
  ];
}

export function buildLlmsTxt(): string {
  const levels = Object.values(PRACTICE_LEVELS);
  const lines = [
    '# Eclavin',
    '',
    `> ${SUMMARY}`,
    '',
    `Updated ${SITEWIDE_UPDATED}.`,
    '',
    ...facts(),
    '',
    '## Practice questions',
    ...levels.map(
      (l) => `- [All WSET ${l.levelLabel} practice questions](${BASE_URL}/level/${l.levelNum}?lang=en): ${SITE_QUESTIONS_PER_LEVEL} questions, each on its own page with the answer and explanation`,
    ),
    `- [Free WSET practice exams](${BASE_URL}/practice?lang=en): 20-question samples with instant marking`,
    ...levels.map((l) => `- [WSET ${l.levelLabel} practice exam](${BASE_URL}/practice/${l.slug}?lang=en): ${l.copy.en.shortAnswerLead}`),
    '- Korean versions of every practice page: add ?lang=ko to the address.',
    '',
    '## Study guides',
    `- [All study guides](${BASE_URL}/guide)`,
    ...GUIDES.map((g) => `- [${g.title}](${BASE_URL}/guide/${g.slug}): ${g.blurb} (updated ${g.dateModified})`),
    '',
    '## Glossary',
    `- [Wine & WSET glossary](${BASE_URL}/glossary?lang=en): ${GLOSSARY.length} terms in English and Korean`,
    ...GLOSSARY.map((t) => `- [${t.copy.en.term}](${BASE_URL}/glossary/${t.slug}?lang=en): ${t.copy.en.short}`),
    '',
    '## Grape varieties',
    `- [All grape varieties](${BASE_URL}/grape)`,
    ...GRAPES.map((g) => `- [${g.name}](${BASE_URL}/grape/${g.slug}): ${g.short}`),
    '',
    '## Wine regions',
    `- [All wine regions](${BASE_URL}/region)`,
    ...REGIONS.map((r) => `- [${r.name}](${BASE_URL}/region/${r.slug}): ${r.short}`),
    '',
    '## About',
    `- [About Eclavin](${BASE_URL}/about): who makes it, how the content is written and corrected`,
    `- [Full text of the glossary, grape and region pages](${BASE_URL}/llms-full.txt)`,
    `- [Sitemap](${BASE_URL}/sitemap.xml)`,
    '',
  ];
  return lines.join('\n');
}

export function buildLlmsFullTxt(): string {
  const out: string[] = [
    '# Eclavin: reference text',
    '',
    `> ${SUMMARY}`,
    '',
    `Updated ${SITEWIDE_UPDATED}. Each section below repeats the text of one page on eclavin.com and gives its address. Please cite that address.`,
    '',
    ...facts(),
    '',
    '## WSET exam formats',
    '',
  ];
  for (const l of Object.values(PRACTICE_LEVELS)) {
    out.push(`### WSET ${l.levelLabel} Award in Wines`, `Source page: ${BASE_URL}/practice/${l.slug}?lang=en`, '');
    out.push(l.copy.en.shortAnswerLead, '');
    for (const p of l.copy.en.about) out.push(p, '');
  }
  out.push('## Glossary', '');
  for (const t of GLOSSARY) {
    const c = t.copy.en;
    out.push(`### ${c.term}`, `Source page: ${BASE_URL}/glossary/${t.slug}?lang=en`, '', c.definition, '', `Why it matters for WSET: ${c.whyItMatters}`, '', `Example: ${c.example}`, '');
  }
  out.push('## Grape varieties', '');
  for (const g of GRAPES) {
    out.push(
      `### ${g.name} (${g.color.toLowerCase()})`,
      `Source page: ${BASE_URL}/grape/${g.slug}`,
      '',
      g.short,
      '',
      `Character: ${g.character}`,
      '',
      `Main regions: ${g.regions}`,
      '',
      `Food pairing: ${g.pairing}`,
      '',
      `Exam note: ${g.examNote}`,
      '',
    );
  }
  out.push('## Wine regions', '');
  for (const r of REGIONS) {
    out.push(
      `### ${r.name}, ${r.country}`,
      `Source page: ${BASE_URL}/region/${r.slug}`,
      '',
      r.short,
      '',
      `Character: ${r.character}`,
      '',
      `Key grapes: ${r.grapes}`,
      '',
      `Exam note: ${r.examNote}`,
      '',
    );
  }
  return out.join('\n');
}
