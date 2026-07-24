import { Metadata } from 'next';
import Link from 'next/link';
import { getAllEpisodes } from '@/lib/episodes';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import PracticeQuiz, { PracticeQuestion } from '@/components/PracticeQuiz';
import styles from './practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/practice/wset-level-2`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';
const SAMPLE_COUNT = 12;

export const metadata: Metadata = {
  title: 'WSET Level 2 Practice Questions — Free Mock Exam with Answers (2026)',
  description:
    'Free WSET Level 2 practice questions with answers and expert explanations. Test yourself on grape varieties, wine styles, and food pairing, then master all 100 questions in the Eclavin app.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Level 2 Practice Questions — Free Mock Exam with Answers (2026)',
    description:
      'Free WSET Level 2 practice questions with answers and expert explanations. Sample from Eclavin\'s 100-question Level 2 bank.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'How many questions are on the WSET Level 2 exam?',
    a: 'The WSET Level 2 Award in Wines exam has 50 multiple-choice questions to be completed in 60 minutes. You need 55% (28 correct) to pass and 85% (43 correct) for a Distinction.',
  },
  {
    q: 'Are these WSET Level 2 practice questions free?',
    a: 'Yes. The questions on this page are a free sample with full answers and explanations. The complete set of 100 Level 2 questions, plus a wrong-answer review notebook and mock exams, is available in the Eclavin app.',
  },
  {
    q: 'How hard is the WSET Level 2 exam?',
    a: 'Most candidates find WSET Level 2 manageable with structured study. The recommended study time is about 28 hours across the syllabus. The most-missed topics are grape-variety characteristics and food-and-wine pairing rules, which is why active recall practice matters.',
  },
  {
    q: 'What topics does WSET Level 2 cover?',
    a: 'Level 2 covers the principal grape varieties, the major wine regions of the world, wine styles and how they are made, sparkling and fortified wines, wine with food, and label terminology. Every topic is represented in the Eclavin question bank.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party practice tool designed to help candidates revise for the exam.',
  },
];

function buildQuestions(): PracticeQuestion[] {
  const all = getAllEpisodes(2, 'en');
  const usable = all.filter(
    (e) =>
      e.question &&
      e.question !== 'Question not found' &&
      e.explanation &&
      ['A', 'B', 'C', 'D'].includes(e.answer) &&
      e.options.filter((o) => o.text).length === 4,
  );
  return usable.slice(0, SAMPLE_COUNT).map((e, i) => ({
    number: i + 1,
    question: e.question,
    options: e.options,
    answer: e.answer,
    explanation: e.explanation,
  }));
}

export default function WsetLevel2Practice() {
  const questions = buildQuestions();

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'WSET Level 2 Practice Questions',
    about: { '@type': 'Thing', name: 'WSET Level 2 Award in Wines' },
    educationalLevel: 'WSET Level 2',
    url: PAGE_URL,
    hasPart: questions.map((q) => ({
      '@type': 'Question',
      eduQuestionType: 'Multiple choice',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.options.find((o) => o.label === q.answer)?.text ?? q.answer,
      },
      suggestedAnswer: q.options
        .filter((o) => o.label !== q.answer)
        .map((o) => ({ '@type': 'Answer', text: o.text })),
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
      { '@type': 'ListItem', position: 2, name: 'Practice', item: `${BASE_URL}/practice` },
      { '@type': 'ListItem', position: 3, name: 'WSET Level 2', item: PAGE_URL },
    ],
  };

  const ld = JSON.stringify([quizJsonLd, faqJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      {/* Server-rendered JSON-LD (native <script> so AI/search crawlers see it without running JS) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / WSET Level 2 Practice
        </nav>

        <h1 className={styles.h1}>WSET Level 2 Practice Questions</h1>
        <p className={styles.subtitle}>
          A free mock exam with answers and expert explanations. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            The WSET Level 2 Award in Wines exam is <strong>50 multiple-choice questions</strong> in{' '}
            <strong>60 minutes</strong>, with a <strong>55% pass mark</strong> (85% for a Distinction).
            The {questions.length}{' '}questions below are a free sample from Eclavin&rsquo;s full
            100-question Level 2 bank, each with a worked explanation so you learn from every miss.
          </p>
          <div className={styles.facts}>
            <span className={styles.fact}>
              <strong>50</strong> questions
            </span>
            <span className={styles.fact}>
              <strong>60</strong> minutes
            </span>
            <span className={styles.fact}>
              <strong>55%</strong> to pass
            </span>
            <span className={styles.fact}>
              <strong>~28h</strong> recommended study
            </span>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Try {questions.length} sample questions</h2>
        <p className={styles.sectionIntro}>
          Tap an answer to check yourself instantly and read the explanation. These are real
          Level&nbsp;2 style questions covering tasting, grape varieties, and winemaking.
        </p>

        <PracticeQuiz questions={questions} />

        <section className={styles.cta}>
          <h2>Keep going with all 100 questions</h2>
          <p>
            Eclavin has the full Level&nbsp;2 bank, realistic mock exams, and a wrong-answer notebook
            that resurfaces the questions you miss until you own them. Level 1 is included too.
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
          <h2>Related study resources</h2>
          <div className={styles.relatedLinks}>
            <Link href="/?lang=en">All practice episodes</Link>
            <Link href="/level/2/episode/episode_001?lang=en">Level 2 · Episode 1</Link>
            <Link href="/level/1/episode/episode_001?lang=en">Level 1 · Episode 1</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
