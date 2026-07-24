import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/wset-level-2-vs-level-3`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'WSET Level 2 vs Level 3: How Big Is the Jump? (2026)',
  description:
    'A clear comparison of WSET Level 2 and Level 3 in Wines: exam format, blind tasting, study hours, and difficulty, so you know what you are stepping up to.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Level 2 vs Level 3: How Big Is the Jump?',
    description:
      'A clear comparison of WSET Level 2 and Level 3 in Wines: exam format, blind tasting, study hours, and difficulty, so you know what you are stepping up to.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'Can I skip Level 2 and go straight to Level 3?',
    a: 'There is no formal prerequisite, but WSET recommends Level 2 knowledge first. Level 3 assumes the Level 2 foundation in grapes and regions.',
  },
  {
    q: 'Is there a tasting exam at Level 2?',
    a: 'No. Blind tasting is introduced as a formal exam at Level 3, where you assess two wines using the Systematic Approach to Tasting.',
  },
  {
    q: 'How long does it take to study for Level 3?',
    a: "Around 84 hours is the usual guidance, far more than Level 2's roughly 28 hours.",
  },
  {
    q: 'What is the Level 3 pass mark?',
    a: 'You need 55% on each unit, theory and tasting, and you must pass both to earn the qualification.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

const rows: { label: string; level2: string; level3: string }[] = [
  {
    label: 'Exam format',
    level2: '50 multiple-choice questions',
    level3: 'Theory unit (multiple choice + written short answers) plus a separate tasting exam',
  },
  {
    label: 'Blind tasting',
    level2: 'None',
    level3: 'Taste 2 wines and write structured notes using the SAT',
  },
  {
    label: 'Pass mark',
    level2: '55% overall',
    level3: '55% on each unit; you must pass both',
  },
  {
    label: 'Written answers',
    level2: 'None',
    level3: 'Short written answers plus tasting notes',
  },
  { label: 'Typical study', level2: '~28 hours', level3: '~84 hours' },
  { label: 'Level', level2: 'Intermediate', level3: 'Advanced' },
];

export default function Level2VsLevel3Guide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'WSET Level 2 vs Level 3: How Big Is the Jump?',
    description:
      'A clear comparison of WSET Level 2 and Level 3 in Wines: exam format, blind tasting, study hours, and difficulty, so you know what you are stepping up to.',
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
      { '@type': 'ListItem', position: 3, name: 'WSET Level 2 vs Level 3', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / Guides / WSET Level 2 vs Level 3
        </nav>

        <h1 className={styles.h1}>WSET Level 2 vs Level 3</h1>
        <p className={styles.subtitle}>
          The real difference between the two, and how to prepare. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            <strong>Level 3 is a big step up from Level 2.</strong> Level 2 is{' '}
            <strong>50 multiple-choice questions in 60 minutes at a 55% pass mark</strong>. Level 3
            adds <strong>written answers and a blind tasting exam</strong>, needs about{' '}
            <strong>84 hours of study</strong>, and you must{' '}
            <strong>pass both a theory unit and a tasting unit</strong>. If you can pass Level 2
            comfortably, plan for a much larger commitment at Level 3.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">WSET Level 2</th>
                <th scope="col">WSET Level 3</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.level2}</td>
                  <td>{r.level3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>What changes at Level 3</h2>
          <p>
            The theory goes far deeper: as well as multiple choice, you answer written short-answer
            questions on how and why choices in the vineyard and winery shape a wine&rsquo;s style,
            quality and price across the world&rsquo;s major regions. It is about explaining, not
            just recognising.
          </p>

          <h2 className={styles.sectionTitle}>The two-unit structure</h2>
          <p>
            Level 3 has two parts: a theory unit and a tasting unit, and you must pass both. If you
            fail one, you resit that unit. Level 2, by contrast, is a single multiple-choice paper
            with no tasting exam.
          </p>

          <h2 className={styles.sectionTitle}>How much harder is it</h2>
          <p>
            Plan for roughly three times the study of Level 2 (about 84 hours versus 28) and a shift
            from recognising facts to explaining them and tasting wine blind. Most people take a
            course and prepare over several weeks.
          </p>

          <h2 className={styles.sectionTitle}>How to prepare</h2>
          <p>
            Get comfortable with Level 2 first. Keep drilling theory with practice questions and
            explanations to build recall, and practise the tasting method on real wines so the
            structure becomes second nature.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Build your Level 2 base first</h2>
          <p>
            The fastest route to Level 3 is a rock-solid Level 2 foundation. Practise free Level 2
            questions here, then get the full bank and mock exams in the Eclavin app.
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
            <Link href="/practice/wset-level-2">Level 2 practice questions</Link>
            <Link href="/guide/wset-level-1-vs-level-2">Level 1 vs Level 2</Link>
            <Link href="/guide/wset-levels-explained">WSET levels explained</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
