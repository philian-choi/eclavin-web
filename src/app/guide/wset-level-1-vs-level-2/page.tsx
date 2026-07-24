import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/wset-level-1-vs-level-2`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'WSET Level 1 vs Level 2: Which Wine Course Should You Take? (2026)',
  description:
    'A clear comparison of WSET Level 1 and Level 2 in Wines: exam format, difficulty, study time, cost, and who each level is for, so you can pick the right starting point.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Level 1 vs Level 2: Which Should You Take?',
    description:
      'Compare WSET Level 1 and Level 2 in Wines: format, difficulty, study time, and who each is for.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'Can I skip WSET Level 1 and start at Level 2?',
    a: 'Yes. There is no prerequisite for WSET Level 2 in Wines, so you can start there directly. Level 1 is optional and aimed at complete beginners or people who want a gentle introduction before committing to Level 2.',
  },
  {
    q: 'Is WSET Level 2 much harder than Level 1?',
    a: 'It is a clear step up. Level 1 is around 6 hours of study with a 70% pass mark on 30 questions; Level 2 is around 28 hours with a 55% pass mark on 50 questions and adds grape varieties, regions, and food pairing in real depth. Most motivated beginners still manage Level 2 with structured practice.',
  },
  {
    q: 'Which WSET level is worth it for a career in wine?',
    a: 'For hospitality or retail roles, Level 2 is the common baseline because it covers grape varieties, regions, and service knowledge employers expect. Level 1 is a useful confidence-builder but is rarely required on its own.',
  },
  {
    q: 'How long does each level take to study?',
    a: 'WSET suggests roughly 6 hours of study for Level 1 and around 28 hours for Level 2, including the exam. Active recall with practice questions is the most efficient way to use that time.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party practice tool for both Level 1 and Level 2.',
  },
];

const rows: { label: string; l1: string; l2: string }[] = [
  { label: 'Exam format', l1: '30 multiple-choice questions', l2: '50 multiple-choice questions' },
  { label: 'Time limit', l1: '45 minutes', l2: '60 minutes' },
  { label: 'Pass mark', l1: '70% (21 correct)', l2: '55% (28 correct)' },
  { label: 'Distinction', l1: 'Not offered', l2: '85% (43 correct)' },
  { label: 'Typical study', l1: '~6 hours (one day)', l2: '~28 hours' },
  { label: 'Best for', l1: 'Complete beginners', l2: 'Enthusiasts & hospitality/retail' },
  {
    label: 'Main topics',
    l1: 'Wine styles, common grapes, storage & service, simple pairing',
    l2: 'Grape varieties, world regions, sparkling & fortified, food pairing, labels',
  },
];

export default function Level1VsLevel2Guide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'WSET Level 1 vs Level 2: Which Wine Course Should You Take?',
    description:
      'A comparison of WSET Level 1 and Level 2 in Wines: exam format, difficulty, study time, and who each level is for.',
    author: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    mainEntityOfPage: PAGE_URL,
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
      { '@type': 'ListItem', position: 3, name: 'WSET Level 1 vs Level 2', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / Guides / WSET Level 1 vs Level 2
        </nav>

        <h1 className={styles.h1}>WSET Level 1 vs Level 2: Which Should You Take?</h1>
        <p className={styles.subtitle}>
          A plain comparison of the two entry-level WSET wine qualifications. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            Choose <strong>Level 1</strong> if you are new to wine and want a gentle, one-day
            introduction. Choose <strong>Level 2</strong> if you want the qualification most
            employers recognise and are ready for about 28 hours of study on grape varieties,
            regions, and food pairing. There is <strong>no prerequisite</strong>, so you can start at
            Level 2 directly.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">WSET Level 1</th>
                <th scope="col">WSET Level 2</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.l1}</td>
                  <td>{r.l2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Who should take Level 1</h2>
          <p>
            Level 1 is built for people who are new to wine, whether for personal interest or a first
            hospitality job. It covers the main styles of wine, a handful of common grape varieties,
            and the basics of storing and serving. The exam is 30 multiple-choice questions in 45
            minutes, and you pass at 70%. Because it is usually taught in a single day, it is a
            low-pressure way to find out whether you enjoy studying wine formally.
          </p>

          <h2 className={styles.sectionTitle}>Who should take Level 2</h2>
          <p>
            Level 2 is the qualification most people mean when they say &ldquo;the WSET course.&rdquo;
            It goes into the principal grape varieties and why they taste the way they do, the major
            wine regions, sparkling and fortified wines, and the rules of food-and-wine pairing. The
            exam is 50 multiple-choice questions in 60 minutes, you pass at 55%, and a Distinction is
            awarded at 85%. Plan for roughly 28 hours of study.
          </p>

          <h2 className={styles.sectionTitle}>How to decide</h2>
          <p>
            If wine is a brand-new subject and you want to ease in, start with Level 1. If you already
            enjoy wine and want a recognised credential, go straight to Level 2. Either way, the most
            efficient preparation is answering practice questions and reading the explanation on every
            one, so the reasoning sticks under exam conditions.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Practise for either level, free</h2>
          <p>
            Try free sample questions for both levels, then get the full 200-question bank, mock
            exams, and a wrong-answer notebook in the Eclavin app.
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
          <h2>Start practising</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">All WSET practice exams</Link>
            <Link href="/practice/wset-level-1">Level 1 practice questions</Link>
            <Link href="/practice/wset-level-2">Level 2 practice questions</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
