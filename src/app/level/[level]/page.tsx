import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllEpisodes, Language } from '@/lib/episodes';
import { getPracticeConfig } from '@/lib/practiceConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import {
  BASE_URL,
  APP_STORE_URL,
  APP_QUESTIONS,
  ORGANIZATION,
  ORG_REF,
  WSET_ENTITY,
  languageAlternates,
  resolveLang,
  jsonLd,
  ogImage,
} from '@/lib/site';
import styles from '../../practice/practice.module.css';

/**
 * One page per level listing every question. Question pages used to hang off
 * the home page alone, and their breadcrumb pointed at "/?lv=2", a variant of
 * the home page rather than a real level page. This is that page.
 */
const PRACTICE_SLUG: Record<string, string> = { '1': 'wset-level-1', '2': 'wset-level-2' };

export function generateStaticParams() {
  return Object.keys(PRACTICE_SLUG).map((level) => ({ level }));
}

type Props = {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ lang?: string }>;
};

async function load({ params, searchParams }: Props) {
  const [{ level }, sp, headerList] = await Promise.all([params, searchParams, headers()]);
  const practice = PRACTICE_SLUG[level] ? getPracticeConfig(PRACTICE_SLUG[level]) : undefined;
  if (!practice) return null;
  const lang: Language = resolveLang(sp.lang, headerList.get('x-vercel-ip-country'));
  const [questions, minutes, pass] = practice.factValues;
  return { levelNum: Number(level), practice, lang, questions, minutes, pass };
}

function copy(levelNum: number, lang: Language, questions: string, minutes: string, pass: string, total: number) {
  if (lang === 'ko') {
    return {
      title: `WSET ${levelNum}급 연습문제 ${total}개 전체 목록 | 에클라뱅`,
      description: `WSET ${levelNum}급 무료 연습문제 ${total}개를 한곳에 모았습니다. 모든 문제에 정답과 해설이 있습니다. 실제 시험은 ${questions}문제, ${minutes}분이며 ${pass} 이상이면 합격입니다.`,
      h1: `WSET ${levelNum}급 연습문제 ${total}개`,
      lead: `에클라뱅의 WSET ${levelNum}급 무료 연습문제 ${total}개 전체입니다. 문제를 누르면 따로 된 페이지에서 풀고 정답과 해설을 볼 수 있습니다. 실제 ${levelNum}급 시험은 ${minutes}분 동안 4지선다 ${questions}문제를 풀고 ${pass} 이상이면 합격입니다.`,
      home: '홈',
      crumb: `WSET ${levelNum}급 문제`,
      shortAnswer: '핵심 요약',
      listTitle: `${levelNum}급 문제 ${total}개`,
      practiceLink: `${levelNum}급 모의고사 20문제 바로 채점하며 풀기`,
      otherLevel: (n: number) => `WSET ${n}급 문제 ${total}개`,
      disclaimer: '비공식 학습 자료 · WSET과 무관하며 공인받지 않았습니다',
      ctaTitle: '앱에서 더 풀기',
      ctaBody: `에클라뱅 앱에는 1·2·3급 문제가 ${APP_QUESTIONS.ko} 있고 모의고사와 오답 노트가 함께 들어 있습니다.`,
      ctaButton: '앱스토어에서 에클라뱅 받기',
      more: '더 보기',
    };
  }
  return {
    title: `WSET Level ${levelNum} Practice Questions: All ${total} Free with Answers`,
    description: `All ${total} free WSET Level ${levelNum} practice questions on one page, each with the answer and a full explanation. The real exam: ${questions} questions, ${minutes} minutes, ${pass} to pass.`,
    h1: `WSET Level ${levelNum} Practice Questions`,
    lead: `These are all ${total} of Eclavin's free WSET Level ${levelNum} practice questions. Each one opens on its own page with the answer and a full explanation. The real Level ${levelNum} exam is ${questions} multiple-choice questions in ${minutes} minutes, and you pass with ${pass}.`,
    home: 'Home',
    crumb: `WSET Level ${levelNum} questions`,
    shortAnswer: 'The short answer',
    listTitle: `All ${total} Level ${levelNum} questions`,
    practiceLink: `Take a timed 20-question Level ${levelNum} mock exam`,
    otherLevel: (n: number) => `All ${total} WSET Level ${n} questions`,
    disclaimer: 'Unofficial study resource · not affiliated with or endorsed by WSET®',
    ctaTitle: 'Want more practice?',
    ctaBody: `The Eclavin app has ${APP_QUESTIONS.en} questions across Levels 1, 2 and 3, with mock exams and a wrong-answer notebook.`,
    ctaButton: 'Download Eclavin on the App Store',
    more: 'More practice',
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const ctx = await load(props);
  if (!ctx) return {};
  const { levelNum, lang, questions, minutes, pass } = ctx;
  const total = getAllEpisodes(levelNum, lang).length;
  const t = copy(levelNum, lang, questions, minutes, pass, total);
  const url = `${BASE_URL}/level/${levelNum}`;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `${url}?lang=${lang}`, languages: languageAlternates(url) },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      url: `${url}?lang=${lang}`,
      siteName: 'Eclavin',
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      images: [ogImage(t.h1, lang === 'ko' ? `${total}문제 · 정답과 해설` : `All ${total} questions with answers`, lang)],
    },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: [ogImage(t.h1, lang === 'ko' ? `${total}문제 · 정답과 해설` : `All ${total} questions with answers`, lang)] },
  };
}

export default async function LevelPage(props: Props) {
  const ctx = await load(props);
  if (!ctx) notFound();
  const { levelNum, practice, lang, questions, minutes, pass } = ctx;
  const episodes = getAllEpisodes(levelNum, lang);
  const t = copy(levelNum, lang, questions, minutes, pass, episodes.length);
  const q = `?lang=${lang}`;
  const pageUrl = `${BASE_URL}/level/${levelNum}${q}`;
  const otherLevels = Object.keys(PRACTICE_SLUG).map(Number).filter((n) => n !== levelNum);

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': pageUrl,
      url: pageUrl,
      name: t.h1,
      description: t.description,
      inLanguage: lang,
      about: WSET_ENTITY,
      publisher: ORG_REF,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: episodes.length,
        itemListElement: episodes.map((e, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${BASE_URL}/level/${levelNum}/episode/${e.id}${q}`,
          name: e.question,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.home, item: `${BASE_URL}/${q}` },
        { '@type': 'ListItem', position: 2, name: t.crumb, item: pageUrl },
      ],
    },
    { '@context': 'https://schema.org', ...ORGANIZATION },
  ];

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={`/${q}`}>{t.home}</Link> / {t.crumb}
        </nav>

        <h1 className={styles.h1}>{t.h1}</h1>
        <span className={styles.disclaimer}>{t.disclaimer}</span>

        <div className={styles.answerBox}>
          <h2>{t.shortAnswer}</h2>
          <p>{t.lead}</p>
        </div>

        <p className={styles.sectionIntro}>
          <Link href={`/practice/${practice.slug}${q}`}>{t.practiceLink} →</Link>
        </p>

        <h2 className={styles.sectionTitle}>{t.listTitle}</h2>
        <ol style={{ paddingLeft: '1.4rem', margin: 0, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          {episodes.map((e) => (
            <li key={e.id} style={{ marginBottom: '0.55rem' }}>
              <a
                href={`/level/${levelNum}/episode/${e.id}${q}`}
                style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
              >
                {e.question}
              </a>
            </li>
          ))}
        </ol>

        <section className={styles.cta}>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaBody}</p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <span>{t.ctaButton}</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.related}>
          <h2>{t.more}</h2>
          <div className={styles.relatedLinks}>
            {otherLevels.map((n) => (
              <Link key={n} href={`/level/${n}${q}`}>
                {t.otherLevel(n)}
              </Link>
            ))}
            <Link href={`/practice${q}`}>{lang === 'ko' ? '전체 WSET 연습문제' : 'All WSET practice exams'}</Link>
            <Link href={`/glossary${q}`}>{lang === 'ko' ? '와인 용어 사전' : 'Wine & WSET glossary'}</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
