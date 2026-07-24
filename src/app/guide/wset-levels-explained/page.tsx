import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/wset-levels-explained`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'WSET Levels Explained: Level 1, 2, 3 & Diploma (2026)',
  description:
    'A simple overview of the WSET wine qualifications from Level 1 to the Level 4 Diploma: what each covers, how hard it is, study hours, and how to choose where to start.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Levels Explained: Level 1, 2, 3 & Diploma (2026)',
    description:
      'A simple overview of the WSET wine qualifications from Level 1 to the Level 4 Diploma: what each covers, how hard it is, study hours, and how to choose where to start.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'How many WSET wine levels are there?',
    a: 'Four: Level 1, Level 2, Level 3, and the Level 4 Diploma. WSET also offers separate Spirits and Sake qualifications.',
  },
  {
    q: 'Which WSET level should I start with?',
    a: 'Beginners usually start at Level 1 or Level 2. Both have no prerequisite, so you can begin at either.',
  },
  {
    q: 'Is WSET Level 3 hard?',
    a: 'Yes. It adds written theory and a blind tasting exam and takes around 84 hours, a clear step up from Level 2.',
  },
  {
    q: 'What is the WSET Diploma?',
    a: 'The Level 4 qualification: six units examined through papers, tastings and coursework over about two years, often a step toward the Master of Wine.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

const rows: { level: string; who: string; exam: string; study: string }[] = [
  {
    level: 'Level 1',
    who: 'Complete beginners',
    exam: '30 multiple-choice questions, 45 min, 70% pass',
    study: '~6 hours (one day)',
  },
  {
    level: 'Level 2',
    who: 'Enthusiasts, hospitality & retail',
    exam: '50 multiple-choice questions, 60 min, 55% pass',
    study: '~28 hours',
  },
  {
    level: 'Level 3',
    who: 'Serious students & trade',
    exam: 'Theory (multiple choice + written) plus a blind tasting exam; 55% on each unit',
    study: '~84 hours',
  },
  {
    level: 'Level 4 (Diploma)',
    who: 'Wine professionals',
    exam: 'Six units, exams plus coursework',
    study: 'Two years+, several hundred hours',
  },
];

export default function WsetLevelsExplainedGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'WSET Levels Explained: Level 1, 2, 3 & Diploma',
    description:
      'A simple overview of the WSET wine qualifications from Level 1 to the Level 4 Diploma: what each covers, how hard it is, study hours, and how to choose where to start.',
    author: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    mainEntityOfPage: PAGE_URL,
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    inLanguage: 'en',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guide` },
      { '@type': 'ListItem', position: 3, name: 'WSET Levels Explained', item: PAGE_URL },
    ],
  };

  const ld = JSON.stringify([articleJsonLd, faqJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / WSET Levels
          Explained
        </nav>

        <h1 className={styles.h1}>WSET Levels Explained</h1>
        <p className={styles.subtitle}>
          What each wine qualification covers and who it is for. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            WSET wine qualifications run from <strong>Level 1 (beginner)</strong> to the{' '}
            <strong>Level 4 Diploma (expert)</strong>. Level 1 is a{' '}
            <strong>one-day introduction</strong>, Level 2 covers grapes and regions in useful depth,
            Level 3 adds <strong>written theory and blind tasting</strong>, and the Diploma is a long,
            professional-level programme. Most people start at <strong>Level 1 or Level 2</strong>.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Who it&apos;s for</th>
                <th scope="col">Exam</th>
                <th scope="col">Typical study</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.level}>
                  <th scope="row">{r.level}</th>
                  <td>{r.who}</td>
                  <td>{r.exam}</td>
                  <td>{r.study}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Level 1: the introduction</h2>
          <p>
            A gentle, one-day start covering the main types of wine, a few common grapes, and basic
            storage and service. The exam is 30 multiple-choice questions and you pass at 70%.
          </p>

          <h2 className={styles.sectionTitle}>Level 2: the popular one</h2>
          <p>
            The level most people mean by &lsquo;the WSET course&rsquo;. It covers the principal grape
            varieties, the major regions, wine styles, sparkling and fortified wines, and food
            pairing. The exam is 50 multiple-choice questions at a 55% pass mark, with a Distinction at
            85%. Plan for about 28 hours.
          </p>

          <h2 className={styles.sectionTitle}>Level 3: theory and tasting</h2>
          <p>
            A clear step up. You study how and why wines are the way they are, and the exam has two
            parts: a theory unit (multiple choice plus written answers) and a blind tasting unit. You
            must pass both, at 55% each, and it takes around 84 hours.
          </p>

          <h2 className={styles.sectionTitle}>Level 4: the Diploma</h2>
          <p>
            The advanced qualification: six units spanning the wine world, examined through written
            papers, tastings and coursework over about two years. It is a major commitment and a common
            step toward the Master of Wine.
          </p>

          <h2 className={styles.sectionTitle}>Where should you start?</h2>
          <p>
            Levels 1 to 3 have no prerequisites. Beginners often start at Level 1 or jump straight to
            Level 2, and move up to Level 3 once Level 2 feels comfortable.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Start with Level 1 or 2</h2>
          <p>
            Whichever level you choose, active practice is the fastest way to pass. Try free Level 1
            and Level 2 questions here, then get the full bank in the Eclavin app.
          </p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>Download Eclavin on the App Store</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.faq}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>
            Frequently asked questions
          </h2>
          {faqItems.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className={styles.related}>
          <h2>Keep going</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">All WSET practice exams</Link>
            <Link href="/guide/wset-level-1-vs-level-2">Level 1 vs Level 2</Link>
            <Link href="/guide/wset-level-2-vs-level-3">Level 2 vs Level 3</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
