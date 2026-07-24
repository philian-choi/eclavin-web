import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { PRACTICE_SLUGS, getPracticeConfig, PracticeLang } from '@/lib/practiceConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from './practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/practice`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

async function resolveLang(searchParams: Promise<{ lang?: string }>): Promise<PracticeLang> {
  const sp = await searchParams;
  if (sp.lang === 'ko' || sp.lang === 'en') return sp.lang;
  const country = (await headers()).get('x-vercel-ip-country') || 'US';
  return country === 'KR' ? 'ko' : 'en';
}

interface HubStrings {
  metaTitle: string;
  metaDescription: string;
  home: string;
  disclaimer: string;
  h1: string;
  subtitle: string;
  useTitle: string;
  useBody: string;
  cardTitle: (label: string) => string;
  cardMeta: (q: string, min: string, pass: string) => string;
  startCta: string;
  appTitle: string;
  appBody: string;
  appButton: string;
  faqTitle: string;
  faqItems: { q: string; a: string }[];
  moreTitle: string;
  allGuides: string;
  howToL2: string;
  glossary: string;
}

const UI: Record<PracticeLang, HubStrings> = {
  en: {
    metaTitle: 'Free WSET Practice Exams — Level 1 & 2 Questions with Answers (2026)',
    metaDescription:
      'Free WSET practice questions for Level 1 and Level 2, each with worked answers and expert explanations. Test yourself online, then master every question in the Eclavin app.',
    home: 'Home',
    disclaimer: 'Unofficial study resource · not affiliated with or endorsed by WSET®',
    h1: 'Free WSET Practice Exams',
    subtitle:
      'Original practice questions with worked answers and expert explanations. Pick your level and test yourself. Updated 2026.',
    useTitle: 'How to use these',
    useBody:
      'Each level below has a free set of sample questions you can answer online and check instantly. Read the explanation on every one, right or wrong. When you want the full bank, mock exams, and a notebook that keeps resurfacing your weak spots, continue in the Eclavin app.',
    cardTitle: (label) => `${label} Practice Questions`,
    cardMeta: (q, min, pass) => `${q} questions · ${min} min · ${pass} to pass`,
    startCta: 'Start practising →',
    appTitle: 'Study the whole syllabus in one app',
    appBody:
      'Eclavin combines Level 1 and Level 2 into one bilingual study app: 200 questions, expert explanations, mock exams, and a wrong-answer review notebook.',
    appButton: 'Download Eclavin on the App Store',
    faqTitle: 'Frequently asked questions',
    faqItems: [
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
    ],
    moreTitle: 'Study guides & terms',
    allGuides: 'All study guides',
    howToL2: 'How to pass Level 2',
    glossary: 'Wine & WSET glossary',
  },
  ko: {
    metaTitle: '무료 WSET 연습문제 — 1급·2급 기출 유형과 해설 (2026)',
    metaDescription:
      'WSET 1급과 2급 무료 연습문제를 정답과 해설로 풀어보세요. 온라인으로 바로 점검하고, 에클라뱅 앱에서 전 문제를 정복하세요.',
    home: '홈',
    disclaimer: '비공식 학습 자료 · WSET과 무관하며 공인받지 않았습니다',
    h1: '무료 WSET 연습문제',
    subtitle:
      '정답과 전문가 해설이 붙은 연습문제입니다. 급수를 골라 바로 풀어보세요. 2026년 최신.',
    useTitle: '이렇게 쓰세요',
    useBody:
      '아래 각 급수에는 온라인으로 바로 채점되는 무료 샘플 문제가 있습니다. 맞든 틀리든 해설을 꼭 읽어 보세요. 문제 전체와 모의고사, 약점을 반복해서 다시 보여주는 오답 노트가 필요하면 에클라뱅 앱에서 이어가세요.',
    cardTitle: (label) => `${label} 연습문제`,
    cardMeta: (q, min, pass) => `${q}문제 · ${min}분 · 합격 ${pass}`,
    startCta: '풀기 시작 →',
    appTitle: '한 앱에서 전 범위 공부',
    appBody:
      '에클라뱅은 1급과 2급을 하나의 이중언어 학습 앱에 담았습니다. 200문제, 전문가 해설, 실전 모의고사, 오답 복습 노트가 있습니다.',
    appButton: '앱스토어에서 에클라뱅 받기',
    faqTitle: '자주 묻는 질문',
    faqItems: [
      {
        q: '무료 WSET 연습문제는 어디서 풀 수 있나요?',
        a: '이 페이지에서 WSET 1급과 2급 무료 연습문제로 이동할 수 있습니다. 각 문제에는 정답과 해설이 있습니다. 급수별 100문제 전체와 모의고사, 오답 노트는 에클라뱅 앱에 있습니다.',
      },
      {
        q: 'WSET 1급과 2급은 무엇이 다른가요?',
        a: '1급은 입문 단계입니다. 30문제, 45분, 70% 합격이며 기본 와인 종류와 대표 품종을 다룹니다. 2급은 더 깊이 들어갑니다. 50문제, 60분, 55% 합격이며 품종, 산지, 스파클링·주정강화 와인, 음식 페어링을 다룹니다.',
      },
      {
        q: '연습문제가 실제 시험 문제와 같나요?',
        a: '아닙니다. 같은 4지선다 형식과 같은 시험 범위로 새로 만든 연습문제입니다. 시험이 요구하는 기억과 판단력을 길러 주지만 실제 기출을 그대로 옮긴 것은 아닙니다.',
      },
      {
        q: '에클라뱅은 WSET과 관련이 있나요?',
        a: '아닙니다. 에클라뱅은 WSET과 제휴하거나 공인받은 관계가 없는 독립 학습 앱입니다. 제3자 복습 도구입니다.',
      },
    ],
    moreTitle: '학습 안내와 용어',
    allGuides: '전체 학습 안내',
    howToL2: '2급 합격 공부법',
    glossary: '와인·WSET 용어 사전',
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = await resolveLang(searchParams);
  const t = UI[lang];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${PAGE_URL}?lang=${lang}`,
      languages: {
        'en-US': `${PAGE_URL}?lang=en`,
        'ko-KR': `${PAGE_URL}?lang=ko`,
        'x-default': PAGE_URL,
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      type: 'website',
      url: PAGE_URL,
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      images: [`${BASE_URL}/og-image.png`],
    },
    twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
  };
}

export default async function PracticeHub({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(searchParams);
  const t = UI[lang];
  const langQuery = `?lang=${lang}`;
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
    mainEntity: t.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: BASE_URL },
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
          <Link href={`/${langQuery}`}>{t.home}</Link> / Practice
        </nav>

        <h1 className={styles.h1}>{t.h1}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
        <span className={styles.disclaimer}>{t.disclaimer}</span>

        <div className={styles.answerBox}>
          <h2>{t.useTitle}</h2>
          <p>{t.useBody}</p>
        </div>

        <div className={styles.levelCards}>
          {levels.map((cfg) => (
            <Link key={cfg.slug} href={`/practice/${cfg.slug}${langQuery}`} className={styles.levelCard}>
              <span className={styles.levelCardTag}>WSET {cfg.levelLabel}</span>
              <h2 className={styles.levelCardTitle}>{t.cardTitle(cfg.levelLabel)}</h2>
              <p className={styles.levelCardMeta}>
                {t.cardMeta(cfg.factValues[0], cfg.factValues[1], cfg.factValues[2])}
              </p>
              <span className={styles.levelCardCta}>{t.startCta}</span>
            </Link>
          ))}
        </div>

        <section className={styles.cta}>
          <h2>{t.appTitle}</h2>
          <p>{t.appBody}</p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>{t.appButton}</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.faq}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>
            {t.faqTitle}
          </h2>
          {t.faqItems.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className={styles.related}>
          <h2>{t.moreTitle}</h2>
          <div className={styles.relatedLinks}>
            <Link href="/guide">{t.allGuides}</Link>
            <Link href="/guide/how-to-pass-wset-level-2">{t.howToL2}</Link>
            <Link href="/glossary">{t.glossary}</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
