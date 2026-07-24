import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/how-to-pass-wset-level-3`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'How to Pass WSET Level 3: Theory & Tasting Study Plan (2026)',
  description:
    'How to prepare for both parts of WSET Level 3 in Wines: the written theory unit and the blind tasting unit. Study hours, what changes from Level 2, and how to practise each part.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How to Pass WSET Level 3: Theory & Tasting Study Plan',
    description:
      'Prepare for both WSET Level 3 units: written theory and blind tasting. Study hours, what changes from Level 2, and how to practise.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'What is the pass mark for WSET Level 3?',
    a: 'WSET Level 3 has two units, a theory unit and a tasting unit, and you need at least 55% on each. You must pass both to earn the qualification. If you pass one and fail the other, you resit only the unit you failed.',
  },
  {
    q: 'How is WSET Level 3 different from Level 2?',
    a: 'Level 2 is a single 50-question multiple-choice paper. Level 3 adds written short-answer theory questions and a blind tasting exam where you assess two wines using the Systematic Approach to Tasting. It also demands far more study, around 84 hours versus about 28.',
  },
  {
    q: 'How many hours should I study for WSET Level 3?',
    a: 'WSET suggests around 84 hours of study for Level 3, including class time. Most candidates spread this over a couple of months of steady work on theory and regular tasting practice.',
  },
  {
    q: 'Can I pass WSET Level 3 by self-study?',
    a: 'The theory can be self-studied with a good question bank and steady revision. The tasting unit is harder to do alone because you need real wines to practise on and, ideally, feedback from others calibrating to the same standard.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party practice tool.',
  },
];

export default function HowToPassLevel3Guide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Pass WSET Level 3: Theory & Tasting Study Plan',
    description:
      'How to prepare for both parts of WSET Level 3 in Wines: the written theory unit and the blind tasting unit.',
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
      { '@type': 'ListItem', position: 3, name: 'How to Pass WSET Level 3', item: PAGE_URL },
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
          Level 3
        </nav>

        <h1 className={styles.h1}>How to Pass WSET Level 3</h1>
        <p className={styles.subtitle}>
          A plan for both parts: written theory and blind tasting. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            Level 3 has <strong>two units</strong>: a written theory unit and a blind tasting unit,
            and you must pass <strong>both at 55%</strong>. Plan for about <strong>84 hours</strong> of
            study. Build theory with active recall, and practise the tasting method on real wines until
            the structure is automatic.
          </p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>1. Know the two units</h2>
          <p>
            The theory unit is not just multiple choice. It adds written short-answer questions that
            ask you to explain how and why choices in the vineyard and winery shape a wine&rsquo;s
            style, quality and price. The tasting unit is a separate exam: you taste two wines blind and
            write structured notes using the Systematic Approach to Tasting. You must pass both units.
          </p>

          <h2 className={styles.sectionTitle}>2. Theory: explain, don&rsquo;t just recognise</h2>
          <p>
            At Level 2 you recognise facts. At Level 3 you explain them in writing. Practise answering
            &ldquo;why&rdquo; out loud or on paper, not just picking the right option. Use active recall:
            answer questions, then read the explanation and fill the gaps. Cover the major regions in
            depth, since that is where most written marks sit.
          </p>

          <h2 className={styles.sectionTitle}>3. Tasting: practise the method on real wine</h2>
          <p>
            The tasting exam rewards a consistent method more than a lucky guess. Taste regularly with
            the grid in front of you, describe each wine in the same order every time, and reach a
            conclusion backed by what you observed. Tasting with others, or against a model note, helps
            you calibrate to the standard the exam expects.
          </p>

          <h2 className={styles.sectionTitle}>4. Plan the hours and simulate</h2>
          <p>
            Spread the roughly 84 hours over a couple of months rather than cramming. Keep a running
            list of what you miss and revisit it. In the final weeks, do timed theory sets and full
            tasting run-throughs so both feel routine on exam day.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Drill the theory recall</h2>
          <p>
            Level 3 theory rests on the grapes, regions, and winemaking you first met at Level 2.
            Practise those free here, then use the Eclavin app&rsquo;s full bank and wrong-answer
            notebook to make the recall automatic. Tasting still needs real wine in the glass.
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
            <Link href="/guide/wset-level-2-vs-level-3">Level 2 vs Level 3</Link>
            <Link href="/guide/wset-systematic-approach-to-tasting">Tasting method (SAT)</Link>
            <Link href="/practice/wset-level-2">Level 2 practice questions</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
