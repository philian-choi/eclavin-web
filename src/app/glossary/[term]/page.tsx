import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getGlossaryTerm, GLOSSARY, GLOSSARY_SLUGS, GlossaryLang } from '@/lib/glossaryConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

interface Ui {
  home: string;
  glossary: string;
  disclaimer: string;
  definition: string;
  why: string;
  example: string;
  testTitle: string;
  testBody: string;
  ctaButton: string;
  moreTitle: string;
  fullGlossary: string;
  practiseTitle: string;
  l2: string;
  l1: string;
  sat: string;
}

const UI: Record<GlossaryLang, Ui> = {
  en: {
    home: 'Home',
    glossary: 'Glossary',
    disclaimer: 'Unofficial study resource · not affiliated with or endorsed by WSET®',
    definition: 'Definition',
    why: 'Why it matters for WSET',
    example: 'Example',
    testTitle: 'Test yourself on this',
    testBody:
      'Reading a definition is one thing; recalling it in the exam is another. Practise free WSET questions, then get the full bank and a wrong-answer notebook in the Eclavin app.',
    ctaButton: 'Download Eclavin on the App Store',
    moreTitle: 'More wine terms',
    fullGlossary: 'Full glossary',
    practiseTitle: 'Practise',
    l2: 'Level 2 practice questions',
    l1: 'Level 1 practice questions',
    sat: 'Tasting method (SAT)',
  },
  ko: {
    home: '홈',
    glossary: '용어 사전',
    disclaimer: '비공식 학습 자료 · WSET과 무관하며 공인받지 않았습니다',
    definition: '뜻',
    why: 'WSET에서 중요한 이유',
    example: '예시',
    testTitle: '직접 풀어보기',
    testBody:
      '뜻을 읽는 것과 시험에서 떠올리는 것은 다릅니다. 무료 WSET 문제를 풀어보고, 에클라뱅 앱에서 문제 전체와 오답 노트를 받으세요.',
    ctaButton: '앱스토어에서 에클라뱅 받기',
    moreTitle: '다른 와인 용어',
    fullGlossary: '전체 용어 사전',
    practiseTitle: '연습하기',
    l2: 'WSET 2급 연습문제',
    l1: 'WSET 1급 연습문제',
    sat: '시음 방법 (SAT)',
  },
};

export function generateStaticParams() {
  return GLOSSARY_SLUGS.map((term) => ({ term }));
}

async function resolveLang(searchParams: Promise<{ lang?: string }>): Promise<GlossaryLang> {
  const sp = await searchParams;
  if (sp.lang === 'ko' || sp.lang === 'en') return sp.lang;
  const country = (await headers()).get('x-vercel-ip-country') || 'US';
  return country === 'KR' ? 'ko' : 'en';
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ term: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) return {};
  const lang = await resolveLang(searchParams);
  const c = t.copy[lang];
  const url = `${BASE_URL}/glossary/${t.slug}`;
  const title = lang === 'ko' ? `${c.term} 뜻 — 와인·WSET 용어` : `${c.term} — Wine & WSET Glossary`;
  return {
    title: `${title} | Eclavin`,
    description: c.short,
    alternates: {
      canonical: `${url}?lang=${lang}`,
      languages: {
        'en-US': `${url}?lang=en`,
        'ko-KR': `${url}?lang=ko`,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description: c.short,
      type: 'article',
      url,
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      images: [`${BASE_URL}/og-image.png`],
    },
    twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
  };
}

export default async function GlossaryTermPage({
  params,
  searchParams,
}: {
  params: Promise<{ term: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) notFound();

  const lang = await resolveLang(searchParams);
  const ui = UI[lang];
  const c = t.copy[lang];
  const langQuery = `?lang=${lang}`;
  const pageUrl = `${BASE_URL}/glossary/${t.slug}`;
  const others = GLOSSARY.filter((g) => g.slug !== t.slug).slice(0, 6);

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: c.term,
    description: c.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Eclavin Wine & WSET Glossary',
      url: `${BASE_URL}/glossary`,
    },
    inLanguage: lang === 'ko' ? 'ko-KR' : 'en-US',
    url: pageUrl,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: ui.glossary, item: `${BASE_URL}/glossary` },
      { '@type': 'ListItem', position: 3, name: c.term, item: pageUrl },
    ],
  };

  const ld = JSON.stringify([definedTermJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={`/${langQuery}`}>{ui.home}</Link> /{' '}
          <Link href={`/glossary${langQuery}`}>{ui.glossary}</Link> / {c.term}
        </nav>

        <h1 className={styles.h1}>{c.term}</h1>
        <p className={styles.subtitle}>{c.short}</p>
        <span className={styles.disclaimer}>{ui.disclaimer}</span>

        <div className={styles.answerBox}>
          <h2>{ui.definition}</h2>
          <p>{c.definition}</p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>{ui.why}</h2>
          <p>{c.whyItMatters}</p>
          <h2 className={styles.sectionTitle}>{ui.example}</h2>
          <p>{c.example}</p>
        </div>

        <section className={styles.cta}>
          <h2>{ui.testTitle}</h2>
          <p>{ui.testBody}</p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>{ui.ctaButton}</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.related}>
          <h2>{ui.moreTitle}</h2>
          <div className={styles.relatedLinks}>
            <Link href={`/glossary${langQuery}`}>{ui.fullGlossary}</Link>
            {others.map((g) => (
              <Link key={g.slug} href={`/glossary/${g.slug}${langQuery}`}>
                {g.copy[lang].term}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.related}>
          <h2>{ui.practiseTitle}</h2>
          <div className={styles.relatedLinks}>
            <Link href={`/practice/wset-level-2${langQuery}`}>{ui.l2}</Link>
            <Link href={`/practice/wset-level-1${langQuery}`}>{ui.l1}</Link>
            <Link href="/guide/wset-systematic-approach-to-tasting">{ui.sat}</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
