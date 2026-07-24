import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/how-to-pass-wset-level-1`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'How to Pass WSET Level 1: Study Tips for the Wine Exam (2026)',
  description:
    'A simple study plan for the WSET Level 1 Award in Wines: what the exam looks like, what to focus on, and how a day of practice questions gets you a confident pass.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How to Pass WSET Level 1: Study Tips for the Wine Exam (2026)',
    description:
      'A simple study plan for the WSET Level 1 Award in Wines: what the exam looks like, what to focus on, and how a day of practice questions gets you a confident pass.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'How many questions are on the WSET Level 1 exam?',
    a: 'The WSET Level 1 Award in Wines exam has 30 multiple-choice questions in 45 minutes. You pass at 70% (21 correct). There is no Distinction grade at Level 1.',
  },
  {
    q: 'Is WSET Level 1 hard?',
    a: 'It is the most approachable WSET wine qualification, usually a one-day course with around 6 hours of study. Most people pass with light practice.',
  },
  {
    q: 'Do I need Level 1 before Level 2?',
    a: 'No. There is no prerequisite, so you can start at Level 2. Level 1 is optional and aimed at complete beginners.',
  },
  {
    q: 'How should I study for WSET Level 1?',
    a: 'Learn the basics once, then drill practice questions with explanations. A day or two of focused practice is enough for most people.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party practice tool for Level 1 and Level 2.',
  },
];

export default function HowToPassLevel1Guide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Pass WSET Level 1: Study Tips',
    description:
      'A simple study plan for the WSET Level 1 Award in Wines: what the exam looks like, what to focus on, and how a day of practice questions gets you a confident pass.',
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
      { '@type': 'ListItem', position: 3, name: 'How to Pass WSET Level 1', item: PAGE_URL },
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
          Level 1
        </nav>

        <h1 className={styles.h1}>How to Pass WSET Level 1</h1>
        <p className={styles.subtitle}>
          A simple plan for the entry-level wine exam. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            The WSET Level 1 exam is <strong>30 multiple-choice questions in 45 minutes</strong>, and
            you pass at <strong>70% (21 correct)</strong>. It is usually a one-day course with about{' '}
            <strong>6 hours of study</strong>. Learn the main wine styles and common grapes, then
            answer practice questions until the basics feel automatic.
          </p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Know the exam format</h2>
          <p>
            30 multiple-choice questions, 45 minutes, closed-book, pass at 70% (21 correct). There is
            no Distinction grade at Level 1. It is the beginner qualification, usually taught in a
            single day.
          </p>

          <h2 className={styles.sectionTitle}>Focus on the basics that repeat</h2>
          <p>
            The main types of wine (still, sparkling, fortified), a handful of common grape varieties
            and their typical flavours, how wine is stored and served, and simple food-and-wine
            pairing. These few topics cover most of the questions.
          </p>

          <h2 className={styles.sectionTitle}>Practise, don&apos;t just read</h2>
          <p>
            Because the exam is short, a few focused sessions of practice questions cover most of what
            is tested. Answer questions and read the explanation each time, so the reasoning sticks.
          </p>

          <h2 className={styles.sectionTitle}>On exam day</h2>
          <p>
            Answer every question, since there is no penalty for a wrong guess. Level 1 rewards the
            straightforward answer, so don&apos;t overthink it.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Practise Level 1 questions free</h2>
          <p>
            Start with free Level 1 practice questions, then get the full 100-question bank and mock
            exams in the Eclavin app.
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
            <Link href="/practice/wset-level-1">Level 1 practice questions</Link>
            <Link href="/guide/wset-level-1-vs-level-2">Level 1 vs Level 2</Link>
            <Link href="/practice">All WSET practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
