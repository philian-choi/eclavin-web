export interface GuideMeta {
  slug: string;
  tag: string;
  title: string;
  blurb: string;
  /** ISO date. The page's Article markup, the RSS feed and the sitemap read these. */
  datePublished: string;
  /** Change only when the page's content changes, never for a redeploy. */
  dateModified: string;
  /**
   * What changed and when, newest first, shown at the foot of the guide. Add
   * an entry whenever dateModified moves, so readers can see why.
   */
  changes?: { date: string; note: string }[];
}

// Registry of published English guides. The /guide index and sitemap read from
// this list, so adding a guide here (and its page file) wires it everywhere.
export const GUIDES: GuideMeta[] = [
  {
    slug: 'sweet-or-dry-wine-chart',
    tag: 'Reference',
    title: 'Sweet or Dry? Wine Sweetness Chart by Grape',
    blurb: 'How sweet, full-bodied, acidic and tannic the 12 principal grapes usually are, and the label words for sweetness.',
    datePublished: '2026-09-23',
    dateModified: '2026-09-23',
  },
  {
    slug: 'wset-levels-explained',
    tag: 'Overview',
    title: 'WSET Levels Explained (1, 2, 3 & Diploma)',
    blurb: 'What each WSET wine qualification covers, how hard it is, and who it is for.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'best-wset-study-apps',
    tag: 'Comparison',
    title: 'Best WSET Study Apps & Tools (2026)',
    blurb: 'An honest guide to the types of WSET study tools and how to pick one.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'wset-level-1-vs-level-2',
    tag: 'Comparison',
    title: 'WSET Level 1 vs Level 2',
    blurb: 'Format, difficulty, study time, and who each level is for.',
    datePublished: '2026-07-24',
    dateModified: '2026-09-23',
    changes: [{ date: '2026-09-23', note: 'Corrected the number of questions in the Eclavin app: 2,000+ across Levels 1, 2 and 3, not 200.' }],
  },
  {
    slug: 'wset-level-2-vs-level-3',
    tag: 'Comparison',
    title: 'WSET Level 2 vs Level 3',
    blurb: 'The real jump between the two: theory, blind tasting, and study time.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'how-to-pass-wset-level-1',
    tag: 'Study plan',
    title: 'How to Pass WSET Level 1',
    blurb: 'A simple plan for the entry-level wine exam, in about a day of study.',
    datePublished: '2026-07-24',
    dateModified: '2026-09-23',
    changes: [{ date: '2026-09-23', note: 'Corrected the number of questions in the Eclavin app: 2,000+ across Levels 1, 2 and 3, not 100.' }],
  },
  {
    slug: 'how-to-pass-wset-level-2',
    tag: 'Study plan',
    title: 'How to Pass WSET Level 2',
    blurb: 'A practical study plan and the traps that cost most candidates marks.',
    datePublished: '2026-07-24',
    dateModified: '2026-09-23',
    changes: [{ date: '2026-09-23', note: 'Corrected the number of questions in the Eclavin app: 2,000+ across Levels 1, 2 and 3, not 100.' }],
  },
  {
    slug: 'how-to-pass-wset-level-3',
    tag: 'Study plan',
    title: 'How to Pass WSET Level 3',
    blurb: 'How to prepare for the two units: written theory and blind tasting.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'wset-systematic-approach-to-tasting',
    tag: 'Tasting',
    title: 'The WSET Systematic Approach to Tasting (SAT)',
    blurb: 'The step-by-step method for describing a wine, explained in plain language.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'wset-exam-facts',
    tag: 'Reference',
    title: 'WSET Exam Facts: Format, Hours & Pass Marks',
    blurb: 'Every level’s question count, time, pass mark, and study hours in one table.',
    datePublished: '2026-07-24',
    dateModified: '2026-09-23',
    changes: [{ date: '2026-09-23', note: 'Added links to the official WSET qualification pages the figures come from.' }],
  },
  {
    slug: 'how-many-hours-to-study-for-wset',
    tag: 'Reference',
    title: 'How Many Hours to Study for WSET',
    blurb: 'The recommended study hours for Level 1, 2, and 3, and how to plan them.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'is-wset-worth-it',
    tag: 'Advice',
    title: 'Is WSET Worth It?',
    blurb: 'An honest look at the cost, time, and payoff of the WSET wine qualifications.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'wset-food-and-wine-pairing',
    tag: 'Topic',
    title: 'WSET Food & Wine Pairing Rules',
    blurb: 'How sweetness, acidity, salt, and more in food change the taste of wine.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'wset-level-3-blind-tasting-tips',
    tag: 'Tasting',
    title: 'WSET Level 3 Blind Tasting Tips',
    blurb: 'How to work the tasting method under exam pressure and reach a conclusion.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
  {
    slug: 'old-world-vs-new-world-wine',
    tag: 'Topic',
    title: 'Old World vs New World Wine',
    blurb: 'The label styles, tastes, and regions behind wine’s biggest divide.',
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
  },
];

export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
