import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/how-many-hours-to-study-for-wset`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'How Many Hours to Study for WSET (Level 1, 2 & 3) (2026)',
  description:
    'The recommended study hours for WSET Level 1, 2, and 3, and how to plan them into a realistic revision schedule.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How Many Hours to Study for WSET (Level 1, 2 & 3)',
    description:
      'The recommended study hours for WSET Level 1, 2, and 3, and how to plan them into a realistic revision schedule.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'How many hours to study for WSET Level 2?',
    a: 'WSET suggests around 28 hours for Level 2, including class time. Spread over three to four weeks, that is about one focused hour a day plus a longer weekend session.',
  },
  {
    q: 'How many hours to study for WSET Level 3?',
    a: 'Around 84 hours is the usual guidance for Level 3, covering both written theory and tasting practice, usually over about two months.',
  },
  {
    q: 'Can I study for WSET faster than the recommended hours?',
    a: 'Some people do, especially with focused practice questions. But tasting skill and long-term recall benefit from spacing the hours out rather than cramming.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

const rows: { level: string; study: string; timeframe: string }[] = [
  { level: 'Level 1', study: '~6 hours', timeframe: 'One day' },
  { level: 'Level 2', study: '~28 hours', timeframe: 'A few weeks' },
  { level: 'Level 3', study: '~84 hours', timeframe: 'A couple of months' },
];

export default function HowManyHoursToStudyGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Many Hours to Study for WSET',
    description:
      'The recommended study hours for WSET Level 1, 2, and 3, and how to plan them into a realistic revision schedule.',
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
      { '@type': 'ListItem', position: 3, name: 'How Many Hours to Study for WSET', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / How Many Hours to
          Study for WSET
        </nav>

        <h1 className={styles.h1}>How Many Hours to Study for WSET</h1>
        <p className={styles.subtitle}>
          The recommended hours for each level, and how to plan them. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            WSET recommends about <strong>6 hours</strong> of study for Level 1, about{' '}
            <strong>28 hours</strong> for Level 2, and about <strong>84 hours</strong> for Level 3,
            including class time. Plan steady weekly sessions rather than cramming, and spend most of
            the time on active practice.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Recommended study</th>
                <th scope="col">Typical timeframe</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.level}>
                  <th scope="row">{r.level}</th>
                  <td>{r.study}</td>
                  <td>{r.timeframe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>What the hours include</h2>
          <p>
            The figures cover both class or online time and your own study. Level 1 is usually a
            single day, Level 2 fits into a few evenings a week over a month, and Level 3 needs steady
            work over about two months, including tasting practice.
          </p>

          <h2 className={styles.sectionTitle}>How to plan them</h2>
          <p>
            Break the total into weekly blocks. For Level 2, roughly one focused hour on weekdays plus
            a longer weekend session hits 28 hours in about three to four weeks. For Level 3, plan
            theory and tasting separately across two months.
          </p>

          <h2 className={styles.sectionTitle}>Make the hours count</h2>
          <p>
            Reading fills time but active recall fixes knowledge. Spend the bulk of your hours
            answering practice questions and reviewing the explanations, not re-reading the book.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Make your study hours count</h2>
          <p>
            The fastest way to turn hours into a pass is active practice. Try free WSET questions
            here, then use the Eclavin app&apos;s full bank and wrong-answer notebook.
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
            <Link href="/guide/wset-levels-explained">WSET levels explained</Link>
            <Link href="/guide/how-to-pass-wset-level-2">How to pass Level 2</Link>
            <Link href="/practice">Free practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
