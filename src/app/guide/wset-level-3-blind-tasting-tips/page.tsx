import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/wset-level-3-blind-tasting-tips`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'WSET Level 3 Blind Tasting Tips (2026)',
  description:
    'Practical tips for the WSET Level 3 tasting exam: work the Systematic Approach to Tasting in order, calibrate your scales, and reach a reasoned conclusion under time pressure.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Level 3 Blind Tasting Tips',
    description:
      'Practical tips for the WSET Level 3 tasting exam: work the Systematic Approach to Tasting in order, calibrate your scales, and reach a reasoned conclusion under time pressure.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'Do I have to name the grape in the WSET Level 3 tasting exam?',
    a: 'No. The marks are for accurate assessment using the tasting grid and a reasoned conclusion, not for correctly guessing the grape or region.',
  },
  {
    q: 'How many wines are in the WSET Level 3 tasting exam?',
    a: 'Two wines, which you assess blind using the Systematic Approach to Tasting.',
  },
  {
    q: 'How do I practise blind tasting on my own?',
    a: 'Taste regularly with the grid in front of you, describe each wine in the same order, and compare your notes to a model answer to calibrate your scales.',
  },
  {
    q: 'What is the Systematic Approach to Tasting?',
    a: 'It is WSET’s structured method for describing a wine in four stages: appearance, nose, palate, and conclusions.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

export default function WsetLevel3BlindTastingTipsGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'WSET Level 3 Blind Tasting Tips',
    description:
      'Practical tips for the WSET Level 3 tasting exam: work the Systematic Approach to Tasting in order, calibrate your scales, and reach a reasoned conclusion under time pressure.',
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
      { '@type': 'ListItem', position: 3, name: 'WSET Level 3 Blind Tasting Tips', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / WSET Level 3
          Blind Tasting Tips
        </nav>

        <h1 className={styles.h1}>WSET Level 3 Blind Tasting Tips</h1>
        <p className={styles.subtitle}>
          How to work the tasting method under exam pressure. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            At Level 3 you taste <strong>two wines</strong> and write structured notes using the{' '}
            <strong>Systematic Approach to Tasting</strong>. Work the grid in the{' '}
            <strong>same order every time</strong>, use only the <strong>allowed words</strong>, and
            back your conclusion with what you actually observed. The marks are for{' '}
            <strong>accurate assessment and sound reasoning</strong>, not for guessing the grape.
          </p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Trust the structure</h2>
          <p>
            Always move through appearance, then nose, then palate, then conclusions, in that order.
            A fixed routine stops you from missing marks or freezing. Under time pressure the
            structure carries you.
          </p>

          <h2 className={styles.sectionTitle}>Calibrate your scales</h2>
          <p>
            The exam wants accurate levels of acidity, tannin, alcohol, and body. Practise with
            reference wines so you know what medium acid or high tannin actually feels like, and mark
            each on the low-to-high scale with confidence.
          </p>

          <h2 className={styles.sectionTitle}>Do not over-guess the grape</h2>
          <p>
            You are not marked mainly on naming the wine. You are marked on describing it accurately
            and reaching a supported conclusion. Describe what is in the glass rather than deciding
            early what it must be.
          </p>

          <h2 className={styles.sectionTitle}>Make the conclusion follow the evidence</h2>
          <p>
            State the quality level and give reasons drawn from your notes, such as balance,
            intensity, and finish. A conclusion that matches your own description scores; a guess
            that contradicts it does not.
          </p>

          <h2 className={styles.sectionTitle}>Practise timed, with two wines</h2>
          <p>
            Recreate the exam: two wines, a timer, and the grid. Compare your notes to a model answer
            to see where your descriptions drift, then adjust.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Lock in the theory too</h2>
          <p>
            Tasting rests on knowing grapes, regions, and winemaking. Practise the theory free here,
            then use the Eclavin app to make it automatic. Tasting itself still needs real wine in
            the glass.
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
            <Link href="/guide/wset-systematic-approach-to-tasting">The tasting method (SAT)</Link>
            <Link href="/guide/how-to-pass-wset-level-3">How to pass Level 3</Link>
            <Link href="/practice">Free practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
