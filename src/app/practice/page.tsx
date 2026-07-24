import { Metadata } from 'next';
import Link from 'next/link';
import { PRACTICE_SLUGS, getPracticeConfig } from '@/lib/practiceConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from './practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/practice`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'Free WSET Practice Exams — Level 1 & 2 Questions with Answers (2026)',
  description:
    'Free WSET practice questions for Level 1 and Level 2, each with worked answers and expert explanations. Test yourself online, then master every question in the Eclavin app.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free WSET Practice Exams — Level 1 & 2 Questions with Answers (2026)',
    description:
      'Free WSET Level 1 and Level 2 practice questions with worked answers and expert explanations.',
    type: 'website',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'Where can I find free WSET practice questions?',
    a: 'This page links to free WSET Level 1 and Level 2 practice exams. Each question comes with the correct answer and a worked explanation. The full 100-question banks per level, mock exams, and a wrong-answer notebook are in the Eclavin app.',
  },
  {
    q: 'What is the difference between WSET Level 1 and Level 2?',
    a: 'Level 1 is the beginner entry point: 30 questions, 45 minutes, 70% to pass, covering the main wine styles and common grapes. Level 2 goes deeper: 50 questions, 60 minutes, 55% to pass, covering grape varieties, wine regions, sparkling and fortified wines, and food pairing.',
  },
  {
    q: 'Are the practice questions the same as the real WSET exam?',
    a: 'No. These are original practice questions written in the same multiple-choice style and covering the same syllabus topics, so they build the recall and reasoning the exam tests. They are not copies of official exam papers.',
  },
  {
    q: 'Is Eclavin affiliated with WSET?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party revision tool.',
  },
];

export default function PracticeHub() {
  const levels = PRACTICE_SLUGS.map((slug) => getPracticeConfig(slug)!);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free WSET Practice Exams',
    itemListElement: levels.map((cfg, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `WSET ${cfg.levelLabel} Practice Questions`,
      url: `${BASE_URL}/practice/${cfg.slug}`,
    })),
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
      { '@type': 'ListItem', position: 2, name: 'Practice', item: PAGE_URL },
    ],
  };

  const ld = JSON.stringify([itemListJsonLd, faqJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / Practice
        </nav>

        <h1 className={styles.h1}>Free WSET Practice Exams</h1>
        <p className={styles.subtitle}>
          Original practice questions with worked answers and expert explanations. Pick your level
          and test yourself. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>How to use these</h2>
          <p>
            Each level below has a free set of sample questions you can answer online and check
            instantly. Read the explanation on every one, right or wrong. When you want the full
            bank, mock exams, and a notebook that keeps resurfacing your weak spots, continue in the
            Eclavin app.
          </p>
        </div>

        <div className={styles.levelCards}>
          {levels.map((cfg) => (
            <Link key={cfg.slug} href={`/practice/${cfg.slug}`} className={styles.levelCard}>
              <span className={styles.levelCardTag}>WSET {cfg.levelLabel}</span>
              <h2 className={styles.levelCardTitle}>{cfg.levelLabel} Practice Questions</h2>
              <p className={styles.levelCardMeta}>
                {cfg.facts[0].value} questions · {cfg.facts[1].value} min ·{' '}
                {cfg.facts[2].value} to pass
              </p>
              <span className={styles.levelCardCta}>Start practising →</span>
            </Link>
          ))}
        </div>

        <section className={styles.cta}>
          <h2>Study the whole syllabus in one app</h2>
          <p>
            Eclavin combines Level 1 and Level 2 into one bilingual study app: 200 questions, expert
            explanations, mock exams, and a wrong-answer review notebook.
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
          <h2>Study guides &amp; terms</h2>
          <div className={styles.relatedLinks}>
            <Link href="/guide">All study guides</Link>
            <Link href="/guide/how-to-pass-wset-level-2">How to pass Level 2</Link>
            <Link href="/glossary">Wine &amp; WSET glossary</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
