import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/how-to-pass-wset-level-2`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'How to Pass WSET Level 2: Study Plan & Tips (2026)',
  description:
    'A practical study plan for the WSET Level 2 Award in Wines: how much time you need, which topics to focus on, the most common exam traps, and how to use practice questions to pass.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How to Pass WSET Level 2: Study Plan & Tips',
    description:
      'A practical WSET Level 2 study plan: time needed, focus topics, common traps, and how to use practice questions.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'How long does it take to study for WSET Level 2?',
    a: 'WSET recommends around 28 hours of study for Level 2, including the class time. Spread over three to four weeks, that is roughly one focused hour a day plus a longer session at the weekend.',
  },
  {
    q: 'What is the pass mark for WSET Level 2?',
    a: 'You pass the WSET Level 2 exam at 55% (28 of 50 questions). A Distinction is awarded at 85% (43 of 50). The exam is closed-book, multiple choice, and 60 minutes long.',
  },
  {
    q: 'What are the hardest parts of WSET Level 2?',
    a: 'The most-missed areas are matching grape varieties to their typical flavours and regions, and applying the food-and-wine pairing rules under time pressure. Both reward repeated practice more than re-reading.',
  },
  {
    q: 'Can I pass WSET Level 2 with self-study?',
    a: 'Yes. Many candidates pass through self-study by working the syllabus topic by topic and drilling practice questions until the reasoning is automatic. A structured question bank with explanations makes self-study far more efficient.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party practice tool for Level 1 and Level 2.',
  },
];

export default function HowToPassLevel2Guide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Pass WSET Level 2: Study Plan & Tips',
    description:
      'A practical study plan for the WSET Level 2 Award in Wines: time needed, focus topics, common traps, and how to use practice questions.',
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
      { '@type': 'ListItem', position: 3, name: 'How to Pass WSET Level 2', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / How to Pass WSET
          Level 2
        </nav>

        <h1 className={styles.h1}>How to Pass WSET Level 2</h1>
        <p className={styles.subtitle}>
          A practical study plan and the traps to watch for. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            Plan about <strong>28 hours</strong> of study. Learn the syllabus topic by topic, then
            spend most of your time on <strong>practice questions</strong> with explanations until the
            reasoning is automatic. The exam is 50 multiple-choice questions in 60 minutes, and you
            pass at <strong>55%</strong>. Focus your effort on grape varieties and food pairing, where
            most marks are lost.
          </p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>1. Map the syllabus first</h2>
          <p>
            Level 2 covers the principal grape varieties, the major wine regions, how wine styles are
            made, sparkling and fortified wines, and food-and-wine pairing. Read through each area
            once so you know the shape of the exam before you start drilling. Do not aim for
            perfection on the first pass.
          </p>

          <h2 className={styles.sectionTitle}>2. Turn reading into recall</h2>
          <p>
            Re-reading feels productive but rarely sticks. The exam tests whether you can{' '}
            <strong>recall and apply</strong> facts under time pressure, so switch to active practice
            early. Answer questions, and read the explanation on every one, especially the ones you
            got right by luck. This is where a bank of questions with worked answers pays off.
          </p>

          <h2 className={styles.sectionTitle}>3. Spend extra time on the two weak spots</h2>
          <p>
            Two areas cost most candidates marks. First, matching a grape variety to its typical
            flavours, climate, and regions. Second, the food-and-wine pairing rules, such as how
            sweetness, acidity, and salt in food change the taste of wine. Drill these deliberately
            rather than hoping they come up less often.
          </p>

          <h2 className={styles.sectionTitle}>4. Simulate the real exam</h2>
          <p>
            In the last week, do full timed sets so 60 minutes for 50 questions feels comfortable. Keep
            a list of every question you miss and revisit it the day before. On exam day, answer every
            question, since there is no penalty for a wrong guess.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Drill Level 2 questions now</h2>
          <p>
            Start with free Level 2 practice questions, then get the full 100-question bank, mock
            exams, and a wrong-answer notebook that keeps resurfacing your weak spots in the Eclavin
            app.
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
            <Link href="/practice">All WSET practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
