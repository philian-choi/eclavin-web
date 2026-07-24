import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEpisodes } from '@/lib/episodes';
import { getPracticeConfig, PRACTICE_SLUGS } from '@/lib/practiceConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import PracticeQuiz, { PracticeQuestion } from '@/components/PracticeQuiz';
import styles from '../practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';
const SAMPLE_COUNT = 12;

export function generateStaticParams() {
  return PRACTICE_SLUGS.map((level) => ({ level }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const cfg = getPracticeConfig(level);
  if (!cfg) return {};
  const url = `${BASE_URL}/practice/${cfg.slug}`;
  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      type: 'article',
      url,
      images: [`${BASE_URL}/og-image.png`],
    },
    twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
  };
}

function buildQuestions(levelNum: number): PracticeQuestion[] {
  const all = getAllEpisodes(levelNum, 'en');
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

export default async function PracticeLevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const cfg = getPracticeConfig(level);
  if (!cfg) notFound();

  const pageUrl = `${BASE_URL}/practice/${cfg.slug}`;
  const questions = buildQuestions(cfg.levelNum);
  const otherLevel = PRACTICE_SLUGS.filter((s) => s !== cfg.slug);

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `WSET ${cfg.levelLabel} Practice Questions`,
    about: { '@type': 'Thing', name: `WSET ${cfg.levelLabel} Award in Wines` },
    educationalLevel: `WSET ${cfg.levelLabel}`,
    url: pageUrl,
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
    mainEntity: cfg.faqItems.map((item) => ({
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
      { '@type': 'ListItem', position: 3, name: `WSET ${cfg.levelLabel}`, item: pageUrl },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/practice">Practice</Link> /{' '}
          WSET {cfg.levelLabel}
        </nav>

        <h1 className={styles.h1}>{cfg.h1}</h1>
        <p className={styles.subtitle}>{cfg.subtitle}</p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            {cfg.shortAnswerLead} The {questions.length}{' '}questions below are a free sample from
            Eclavin&rsquo;s full {cfg.bankSize}-question {cfg.levelLabel} bank, each with a worked
            explanation so you learn from every miss.
          </p>
          <div className={styles.facts}>
            {cfg.facts.map((f) => (
              <span key={f.label} className={styles.fact}>
                <strong>{f.value}</strong> {f.label}
              </span>
            ))}
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Try {questions.length} sample questions</h2>
        <p className={styles.sectionIntro}>
          Tap an answer to check yourself instantly and read the explanation. These are real WSET{' '}
          {cfg.levelLabel} style questions with full worked answers.
        </p>

        <PracticeQuiz questions={questions} />

        <section className={styles.cta}>
          <h2>Keep going with all {cfg.bankSize} questions</h2>
          <p>
            Eclavin has the full {cfg.levelLabel} bank, realistic mock exams, and a wrong-answer
            notebook that resurfaces the questions you miss until you own them.
          </p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>Download Eclavin on the App Store</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.related}>
          <h2>What this level covers</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.92rem' }}>
            {cfg.coverage.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className={styles.faq}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>
            Frequently asked questions
          </h2>
          {cfg.faqItems.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className={styles.related}>
          <h2>More practice</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">All WSET practice exams</Link>
            {otherLevel.map((slug) => {
              const other = getPracticeConfig(slug)!;
              return (
                <Link key={slug} href={`/practice/${slug}`}>
                  WSET {other.levelLabel} practice
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </main>
  );
}
