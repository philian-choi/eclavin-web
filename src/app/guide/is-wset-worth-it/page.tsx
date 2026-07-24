import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/is-wset-worth-it`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'Is WSET Worth It? An Honest Look (2026)',
  description:
    'Is the WSET wine qualification worth the cost and time? An honest look at what you get, who benefits most, and who can skip it.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Is WSET Worth It? An Honest Look',
    description:
      'Is the WSET wine qualification worth the cost and time? An honest look at what you get, who benefits most, and who can skip it.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'How much does WSET cost?',
    a: 'Fees vary widely by provider and country, so check an approved provider near you for the current price. Budget for the course, the exam, and the study materials together.',
  },
  {
    q: 'Which WSET level is worth it?',
    a: 'For most people Level 2 is the sweet spot: it covers grapes, regions, and service in useful depth and is widely recognised. Level 1 is a gentle intro; Level 3 is for serious study or the trade.',
  },
  {
    q: 'Does WSET help you get a job?',
    a: 'It is a recognised baseline in wine retail, hospitality, and the trade. It does not guarantee a job, but it signals structured knowledge to employers in those fields.',
  },
  {
    q: 'Do I need WSET to learn about wine?',
    a: 'No. You can learn a lot from free guides, tastings, and practice questions. WSET adds structure and a recognised certificate, which matter most for career goals.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin, which publishes this guide, is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

export default function IsWsetWorthItGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is WSET Worth It? An Honest Look',
    description:
      'Is the WSET wine qualification worth the cost and time? An honest look at what you get, who benefits most, and who can skip it.',
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
      { '@type': 'ListItem', position: 3, name: 'Is WSET Worth It?', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / Is WSET Worth It?
        </nav>

        <h1 className={styles.h1}>Is WSET Worth It?</h1>
        <p className={styles.subtitle}>
          An honest look at the cost, time, and payoff. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            WSET is <strong>worth it</strong> if you want a recognised, structured wine qualification
            for a career in hospitality, retail, or the wine trade, or for serious personal knowledge.
            It costs money and time, and it is <strong>not required to simply enjoy wine</strong>. For
            most people, <strong>Level 2 is the sweet spot</strong>.
          </p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>What you actually get</h2>
          <p>
            A globally recognised certificate, a structured path through grapes, regions, and
            winemaking, and a shared vocabulary used across the wine trade. Employers in wine and
            hospitality know what each level means.
          </p>

          <h2 className={styles.sectionTitle}>The costs</h2>
          <p>
            There are two: money and time. Course fees vary a lot by provider and country, so check an
            approved provider near you for the current price. Time-wise, plan about 6 hours for Level 1,
            28 for Level 2, and 84 for Level 3.
          </p>

          <h2 className={styles.sectionTitle}>Who it is worth it for</h2>
          <p>
            People working in or entering wine retail, restaurants, or the trade, and serious hobbyists
            who want structure rather than scattered facts. For them the credential and the framework
            pay off.
          </p>

          <h2 className={styles.sectionTitle}>Who might skip it</h2>
          <p>
            If you just want to enjoy wine at home, you do not need a qualification. Free guides,
            tastings, and practice quizzes can take you a long way before any exam fee.
          </p>

          <h2 className={styles.sectionTitle}>How to decide</h2>
          <p>
            Ask what you want the certificate for. If it is a job, a trade role, or a clear goal, WSET
            is worth it, usually starting at Level 2. If it is casual curiosity, start free and see how
            far your interest goes.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Try before you commit</h2>
          <p>
            Not sure yet? Try free WSET practice questions to see how the material feels, then decide
            whether a course is right for you.
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
            <Link href="/guide/wset-level-1-vs-level-2">Level 1 vs Level 2</Link>
            <Link href="/practice">Free practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
