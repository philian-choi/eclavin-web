import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { GLOSSARY, GlossaryLang } from '@/lib/glossaryConfig';
import styles from '../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/glossary`;

interface Ui {
  metaTitle: string;
  metaDescription: string;
  home: string;
  disclaimer: string;
  h1: string;
  subtitle: string;
  tag: string;
  read: string;
  moreTitle: string;
  allExams: string;
  sat: string;
  allGuides: string;
}

const UI: Record<GlossaryLang, Ui> = {
  en: {
    metaTitle: 'Wine & WSET Glossary — Key Terms Explained (2026)',
    metaDescription:
      'A plain-language glossary of the wine terms WSET students look up most: tannin, acidity, body, terroir, malolactic fermentation, and more, each with an exam-focused explanation.',
    home: 'Home',
    disclaimer: 'Unofficial study resource · not affiliated with or endorsed by WSET®',
    h1: 'Wine & WSET Glossary',
    subtitle:
      'The terms WSET students look up most, in plain language, each with why it matters for the exam. Updated 2026.',
    tag: 'Term',
    read: 'Read definition →',
    moreTitle: 'Put the terms to work',
    allExams: 'All WSET practice exams',
    sat: 'Tasting method (SAT)',
    allGuides: 'All study guides',
  },
  ko: {
    metaTitle: '와인·WSET 용어 사전 — 핵심 용어 풀이 (2026)',
    metaDescription:
      'WSET 학습자가 가장 많이 찾는 와인 용어를 쉬운 말로 풀었습니다. 타닌, 산도, 바디, 떼루아, 젖산 발효 등 각 용어를 시험 관점에서 설명합니다.',
    home: '홈',
    disclaimer: '비공식 학습 자료 · WSET과 무관하며 공인받지 않았습니다',
    h1: '와인·WSET 용어 사전',
    subtitle:
      'WSET 학습자가 가장 많이 찾는 용어를 쉬운 말로, 시험에서 왜 중요한지와 함께 정리했습니다. 2026년 최신.',
    tag: '용어',
    read: '뜻 보기 →',
    moreTitle: '배운 용어 써먹기',
    allExams: '전체 WSET 연습문제',
    sat: '시음 방법 (SAT)',
    allGuides: '전체 학습 안내',
  },
};

async function resolveLang(searchParams: Promise<{ lang?: string }>): Promise<GlossaryLang> {
  const sp = await searchParams;
  if (sp.lang === 'ko' || sp.lang === 'en') return sp.lang;
  const country = (await headers()).get('x-vercel-ip-country') || 'US';
  return country === 'KR' ? 'ko' : 'en';
}

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

export default async function GlossaryHub({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = await resolveLang(searchParams);
  const t = UI[lang];
  const langQuery = `?lang=${lang}`;

  const definedTermSetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Eclavin Wine & WSET Glossary',
    url: PAGE_URL,
    inLanguage: lang === 'ko' ? 'ko-KR' : 'en-US',
    hasDefinedTerm: GLOSSARY.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.copy[lang].term,
      description: term.copy[lang].short,
      url: `${BASE_URL}/glossary/${term.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: PAGE_URL },
    ],
  };

  const ld = JSON.stringify([definedTermSetJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={`/${langQuery}`}>{t.home}</Link> / {t.home === '홈' ? '용어 사전' : 'Glossary'}
        </nav>

        <h1 className={styles.h1}>{t.h1}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
        <span className={styles.disclaimer}>{t.disclaimer}</span>

        <div className={styles.levelCards}>
          {GLOSSARY.map((term) => {
            const c = term.copy[lang];
            return (
              <Link key={term.slug} href={`/glossary/${term.slug}${langQuery}`} className={styles.levelCard}>
                <span className={styles.levelCardTag}>{t.tag}</span>
                <h2 className={styles.levelCardTitle}>{c.term}</h2>
                <p className={styles.levelCardMeta}>{c.short}</p>
                <span className={styles.levelCardCta}>{t.read}</span>
              </Link>
            );
          })}
        </div>

        <section className={styles.related}>
          <h2>{t.moreTitle}</h2>
          <div className={styles.relatedLinks}>
            <Link href={`/practice${langQuery}`}>{t.allExams}</Link>
            <Link href="/guide/wset-systematic-approach-to-tasting">{t.sat}</Link>
            <Link href="/guide">{t.allGuides}</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
