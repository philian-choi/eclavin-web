import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllEpisodes } from '@/lib/episodes';
import {
  getPracticeConfig,
  getFacts,
  PRACTICE_SLUGS,
  PracticeLang,
} from '@/lib/practiceConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import PracticeQuiz, { PracticeQuestion, QuizLabels } from '@/components/PracticeQuiz';
import { BASE_URL, APP_STORE_URL, APP_QUESTIONS, ORG_REF, languageAlternates, resolveLang, jsonLd, ogImage } from '@/lib/site';
import styles from '../practice.module.css';

const SAMPLE_COUNT = 20;

interface UiStrings {
  home: string;
  practice: string;
  disclaimer: string;
  shortAnswer: string;
  updated: (date: string) => string;
  sample: (n: number, siteTotal: number, label: string) => string;
  allQuestions: (siteTotal: number, label: string) => string;
  tryTitle: (n: number) => string;
  tryIntro: (label: string) => string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  aboutTitle: string;
  coverageTitle: string;
  faqTitle: string;
  moreTitle: string;
  allExams: string;
  otherLevel: (label: string) => string;
  quiz: QuizLabels;
}

const UI: Record<PracticeLang, UiStrings> = {
  en: {
    home: 'Home',
    practice: 'Practice',
    disclaimer: 'Unofficial study resource · not affiliated with or endorsed by WSET®',
    shortAnswer: 'The short answer',
    updated: (date) =>
      `Updated ${new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}`,
    sample: (n, siteTotal, label) =>
      `The ${n} questions below are the first ${n} of Eclavin's ${siteTotal} free ${label} questions, each with a worked explanation so you learn from every miss.`,
    allQuestions: (siteTotal, label) => `See all ${siteTotal} ${label} questions on one page →`,
    tryTitle: (n) => `Try ${n} sample questions`,
    tryIntro: (label) =>
      `Tap an answer to check yourself instantly and read the explanation. These are WSET ${label} style questions with full worked answers.`,
    ctaTitle: 'Want more practice?',
    ctaBody: `The Eclavin iOS app has ${APP_QUESTIONS.en} questions across Levels 1, 2 and 3, realistic mock exams, and a wrong-answer notebook that brings back the questions you miss.`,
    ctaButton: 'Download Eclavin on the App Store',
    aboutTitle: 'About this exam',
    coverageTitle: 'What this level covers',
    faqTitle: 'Frequently asked questions',
    moreTitle: 'More practice',
    allExams: 'All WSET practice exams',
    otherLevel: (label) => `WSET ${label} practice`,
    quiz: { answered: 'Answered', correct: 'Correct', correctMark: '✓ Correct', answerPrefix: 'Answer:' },
  },
  ko: {
    home: '홈',
    practice: '연습문제',
    disclaimer: '비공식 학습 자료 · WSET과 무관하며 공인받지 않았습니다',
    shortAnswer: '핵심 요약',
    updated: (date) => {
      const [y, m, d] = date.split('-').map(Number);
      return `${y}년 ${m}월 ${d}일 업데이트`;
    },
    sample: (n, siteTotal, label) =>
      `아래 ${n}문제는 에클라뱅 ${label} 무료 문제 ${siteTotal}개 중 앞의 ${n}개입니다. 모든 문제에 해설이 있어 틀린 문제에서 배울 수 있습니다.`,
    allQuestions: (siteTotal, label) => `${label} 문제 ${siteTotal}개 전체 보기 →`,
    tryTitle: (n) => `샘플 ${n}문제 풀어보기`,
    tryIntro: (label) =>
      `답을 누르면 바로 채점되고 해설이 열립니다. WSET ${label} 유형의 문제이며 해설이 모두 붙어 있습니다.`,
    ctaTitle: '앱에서 더 풀기',
    ctaBody: `에클라뱅 아이폰 앱에는 1·2·3급 문제 ${APP_QUESTIONS.ko}와 실전 모의고사, 틀린 문제를 다시 보여 주는 오답 노트가 있습니다.`,
    ctaButton: '앱스토어에서 에클라뱅 받기',
    aboutTitle: '이 시험에 대해',
    coverageTitle: '이 급수에서 다루는 내용',
    faqTitle: '자주 묻는 질문',
    moreTitle: '더 풀어보기',
    allExams: '전체 WSET 연습문제',
    otherLevel: (label) => `WSET ${label} 연습문제`,
    quiz: { answered: '푼 문제', correct: '정답', correctMark: '✓ 정답', answerPrefix: '정답:' },
  },
};

export function generateStaticParams() {
  return PRACTICE_SLUGS.map((level) => ({ level }));
}

async function pageLang(searchParams: Promise<{ lang?: string }>): Promise<PracticeLang> {
  const sp = await searchParams;
  return resolveLang(sp.lang, (await headers()).get('x-vercel-ip-country'));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const cfg = getPracticeConfig(level);
  if (!cfg) return {};
  const lang = await pageLang(searchParams);
  const copy = cfg.copy[lang];
  const url = `${BASE_URL}/practice/${cfg.slug}`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `${url}?lang=${lang}`,
      languages: languageAlternates(url),
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: 'article',
      url: `${url}?lang=${lang}`,
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      images: [ogImage(copy.h1, lang === 'ko' ? `무료 모의고사 · ${cfg.levelNum}급` : `Free mock exam · WSET ${cfg.levelLabel}`, lang)],
    },
    twitter: { card: 'summary_large_image', images: [ogImage(copy.h1, lang === 'ko' ? `무료 모의고사 · ${cfg.levelNum}급` : `Free mock exam · WSET ${cfg.levelLabel}`, lang)] },
  };
}

function buildQuestions(levelNum: number, lang: PracticeLang): PracticeQuestion[] {
  const all = getAllEpisodes(levelNum, lang);
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
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { level } = await params;
  const cfg = getPracticeConfig(level);
  if (!cfg) notFound();

  const lang = await pageLang(searchParams);
  const t = UI[lang];
  const copy = cfg.copy[lang];
  const facts = getFacts(cfg, lang);
  const langQuery = `?lang=${lang}`;

  const pageUrl = `${BASE_URL}/practice/${cfg.slug}${langQuery}`;
  const siteTotal = getAllEpisodes(cfg.levelNum, lang).length;
  const questions = buildQuestions(cfg.levelNum, lang);
  const otherLevel = PRACTICE_SLUGS.filter((s) => s !== cfg.slug);

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `WSET ${cfg.levelLabel} Practice Questions`,
    about: { '@type': 'Thing', name: `WSET ${cfg.levelLabel} Award in Wines` },
    educationalLevel: `WSET ${cfg.levelLabel}`,
    inLanguage: lang,
    url: pageUrl,
    dateModified: cfg.updated,
    provider: ORG_REF,
    publisher: ORG_REF,
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
    mainEntity: copy.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: `${BASE_URL}/${langQuery}` },
      { '@type': 'ListItem', position: 2, name: t.practice, item: `${BASE_URL}/practice${langQuery}` },
      { '@type': 'ListItem', position: 3, name: `WSET ${cfg.levelLabel}`, item: pageUrl },
    ],
  };

  const ld = jsonLd([quizJsonLd, faqJsonLd, breadcrumbJsonLd]);

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={`/${langQuery}`}>{t.home}</Link> /{' '}
          <Link href={`/practice${langQuery}`}>{t.practice}</Link> / WSET {cfg.levelLabel}
        </nav>

        <h1 className={styles.h1}>{copy.h1}</h1>
        <p className={styles.subtitle}>
          {copy.subtitle} {t.updated(cfg.updated)}.
        </p>
        <span className={styles.disclaimer}>{t.disclaimer}</span>

        <div className={styles.answerBox}>
          <h2>{t.shortAnswer}</h2>
          <p>
            {copy.shortAnswerLead} {t.sample(questions.length, siteTotal, cfg.levelLabel)}
          </p>
          <p style={{ marginTop: '0.6rem' }}>
            <Link href={`/level/${cfg.levelNum}${langQuery}`}>{t.allQuestions(siteTotal, cfg.levelLabel)}</Link>
          </p>
          <div className={styles.facts}>
            {facts.map((f) => (
              <span key={f.label} className={styles.fact}>
                <strong>{f.value}</strong> {f.label}
              </span>
            ))}
          </div>
        </div>

        <h2 className={styles.sectionTitle}>{t.tryTitle(questions.length)}</h2>
        <p className={styles.sectionIntro}>{t.tryIntro(cfg.levelLabel)}</p>

        <PracticeQuiz questions={questions} labels={t.quiz} />

        <section className={styles.cta}>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaBody}</p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>{t.ctaButton}</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.prose} style={{ marginTop: '2.5rem' }}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>{t.aboutTitle}</h2>
          {copy.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        <section className={styles.related}>
          <h2>{t.coverageTitle}</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.92rem' }}>
            {copy.coverage.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className={styles.faq}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>
            {t.faqTitle}
          </h2>
          {copy.faqItems.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className={styles.related}>
          <h2>{t.moreTitle}</h2>
          <div className={styles.relatedLinks}>
            <Link href={`/practice${langQuery}`}>{t.allExams}</Link>
            {otherLevel.map((slug) => {
              const other = getPracticeConfig(slug)!;
              return (
                <Link key={slug} href={`/practice/${slug}${langQuery}`}>
                  {t.otherLevel(other.levelLabel)}
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </main>
  );
}
