export interface GuideMeta {
  slug: string;
  tag: string;
  title: string;
  blurb: string;
}

// Registry of published English guides. The /guide index and sitemap read from
// this list, so adding a guide here (and its page file) wires it everywhere.
export const GUIDES: GuideMeta[] = [
  {
    slug: 'wset-levels-explained',
    tag: 'Overview',
    title: 'WSET Levels Explained (1, 2, 3 & Diploma)',
    blurb: 'What each WSET wine qualification covers, how hard it is, and who it is for.',
  },
  {
    slug: 'best-wset-study-apps',
    tag: 'Comparison',
    title: 'Best WSET Study Apps & Tools (2026)',
    blurb: 'An honest guide to the types of WSET study tools and how to pick one.',
  },
  {
    slug: 'wset-level-1-vs-level-2',
    tag: 'Comparison',
    title: 'WSET Level 1 vs Level 2',
    blurb: 'Format, difficulty, study time, and who each level is for.',
  },
  {
    slug: 'wset-level-2-vs-level-3',
    tag: 'Comparison',
    title: 'WSET Level 2 vs Level 3',
    blurb: 'The real jump between the two: theory, blind tasting, and study time.',
  },
  {
    slug: 'how-to-pass-wset-level-1',
    tag: 'Study plan',
    title: 'How to Pass WSET Level 1',
    blurb: 'A simple plan for the entry-level wine exam, in about a day of study.',
  },
  {
    slug: 'how-to-pass-wset-level-2',
    tag: 'Study plan',
    title: 'How to Pass WSET Level 2',
    blurb: 'A practical study plan and the traps that cost most candidates marks.',
  },
  {
    slug: 'how-to-pass-wset-level-3',
    tag: 'Study plan',
    title: 'How to Pass WSET Level 3',
    blurb: 'How to prepare for the two units: written theory and blind tasting.',
  },
  {
    slug: 'wset-systematic-approach-to-tasting',
    tag: 'Tasting',
    title: 'The WSET Systematic Approach to Tasting (SAT)',
    blurb: 'The step-by-step method for describing a wine, explained in plain language.',
  },
  {
    slug: 'wset-exam-facts',
    tag: 'Reference',
    title: 'WSET Exam Facts: Format, Hours & Pass Marks',
    blurb: 'Every level’s question count, time, pass mark, and study hours in one table.',
  },
  {
    slug: 'how-many-hours-to-study-for-wset',
    tag: 'Reference',
    title: 'How Many Hours to Study for WSET',
    blurb: 'The recommended study hours for Level 1, 2, and 3, and how to plan them.',
  },
  {
    slug: 'is-wset-worth-it',
    tag: 'Advice',
    title: 'Is WSET Worth It?',
    blurb: 'An honest look at the cost, time, and payoff of the WSET wine qualifications.',
  },
  {
    slug: 'wset-food-and-wine-pairing',
    tag: 'Topic',
    title: 'WSET Food & Wine Pairing Rules',
    blurb: 'How sweetness, acidity, salt, and more in food change the taste of wine.',
  },
  {
    slug: 'wset-level-3-blind-tasting-tips',
    tag: 'Tasting',
    title: 'WSET Level 3 Blind Tasting Tips',
    blurb: 'How to work the tasting method under exam pressure and reach a conclusion.',
  },
  {
    slug: 'old-world-vs-new-world-wine',
    tag: 'Topic',
    title: 'Old World vs New World Wine',
    blurb: 'The label styles, tastes, and regions behind wine’s biggest divide.',
  },
];

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
