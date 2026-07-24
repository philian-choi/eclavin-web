import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/wset-exam-facts`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';
const UPDATED = '2026-07-24';

export const metadata: Metadata = {
  title: 'WSET Exam Facts: Format, Time, Pass Marks & Study Hours (2026)',
  description:
    'A single reference table of the WSET wine exam facts for every level: number of questions, time limit, pass mark, distinction, and recommended study hours. Free to cite with attribution.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Exam Facts: Format, Time, Pass Marks & Study Hours (2026)',
    description:
      'Every WSET wine level’s question count, time, pass mark, and study hours in one reference table.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'What is the pass mark for each WSET wine level?',
    a: 'WSET Level 1 requires 70% to pass, Level 2 requires 55% (with a Distinction at 85%), and Level 3 requires 55% on each of its two units, the theory unit and the tasting unit, with both needed to pass.',
  },
  {
    q: 'How many questions are on the WSET exams?',
    a: 'Level 1 has 30 multiple-choice questions in 45 minutes. Level 2 has 50 multiple-choice questions in 60 minutes. Level 3 has a theory unit (multiple-choice plus written short-answer questions) and a separate blind tasting exam of two wines.',
  },
  {
    q: 'How many hours should I study for each WSET level?',
    a: 'The usual guidance is about 6 hours for Level 1, about 28 hours for Level 2, and about 84 hours for Level 3, including class or online time.',
  },
  {
    q: 'Can I cite these WSET exam facts?',
    a: 'Yes. You are welcome to cite the figures on this page with a link back to Eclavin. The numbers reflect the standard WSET Award in Wines exam formats; always confirm the current details with an approved WSET provider before you book.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

const rows: { level: string; format: string; time: string; pass: string; distinction: string; hours: string }[] = [
  {
    level: 'Level 1',
    format: '30 multiple-choice questions',
    time: '45 minutes',
    pass: '70%',
    distinction: 'Not offered',
    hours: '~6 hours',
  },
  {
    level: 'Level 2',
    format: '50 multiple-choice questions',
    time: '60 minutes',
    pass: '55%',
    distinction: '85%',
    hours: '~28 hours',
  },
  {
    level: 'Level 3',
    format: 'Theory (multiple-choice + written) + blind tasting of 2 wines',
    time: 'Split across two units',
    pass: '55% on each unit, both required',
    distinction: 'Merit & Distinction bands',
    hours: '~84 hours',
  },
  {
    level: 'Level 4 (Diploma)',
    format: 'Six units, written exams + coursework',
    time: 'Across the programme',
    pass: '55% to pass',
    distinction: 'Merit & Distinction bands',
    hours: 'Several hundred hours over ~2 years',
  },
];

export default function WsetExamFactsPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'WSET Exam Facts: Format, Time, Pass Marks & Study Hours',
    description:
      'A reference table of WSET wine exam facts for every level: questions, time, pass mark, distinction, and study hours.',
    author: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    mainEntityOfPage: PAGE_URL,
    datePublished: UPDATED,
    dateModified: UPDATED,
    inLanguage: 'en',
    isAccessibleForFree: true,
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
      { '@type': 'ListItem', position: 3, name: 'WSET Exam Facts', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / WSET Exam Facts
        </nav>

        <h1 className={styles.h1}>WSET Exam Facts</h1>
        <p className={styles.subtitle}>
          Every level’s format, time, pass mark, and study hours in one table. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            The WSET Award in Wines runs from Level 1 to the Level 4 Diploma. Level 1 is{' '}
            <strong>30 questions in 45 minutes</strong> at a 70% pass. Level 2 is{' '}
            <strong>50 questions in 60 minutes</strong> at 55% (85% for Distinction). Level 3 adds{' '}
            <strong>written theory and a blind tasting</strong> of two wines, needing 55% on each unit.
            The table below has the full breakdown.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Format</th>
                <th scope="col">Time</th>
                <th scope="col">Pass</th>
                <th scope="col">Distinction</th>
                <th scope="col">Study</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.level}>
                  <th scope="row">{r.level}</th>
                  <td>{r.format}</td>
                  <td>{r.time}</td>
                  <td>{r.pass}</td>
                  <td>{r.distinction}</td>
                  <td>{r.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            You may cite this table with a link back to this page. The figures reflect the standard
            WSET Award in Wines exam formats; always confirm current details with an approved WSET
            provider before booking.
          </p>

          <h2 className={styles.sectionTitle}>How to read this</h2>
          <p>
            Levels 1 and 2 are single closed-book, multiple-choice papers. Level 3 is a bigger step: it
            has two parts, a theory unit that adds written answers to the multiple choice, and a blind
            tasting exam of two wines, and you must pass both. The Diploma is a professional-level
            programme of six units taken over about two years.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Practise for your level</h2>
          <p>
            Facts are the start; recall is what passes the exam. Try free WSET practice questions with
            explanations, then get the full bank in the Eclavin app.
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
          <h2>Related</h2>
          <div className={styles.relatedLinks}>
            <Link href="/guide/wset-levels-explained">WSET levels explained</Link>
            <Link href="/guide/how-many-hours-to-study-for-wset">How many hours to study</Link>
            <Link href="/practice">Free WSET practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
