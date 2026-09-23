import { Suspense } from 'react';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getAllEpisodes } from '@/lib/episodes';
import EpisodeGridClient from '@/components/EpisodeGridClient';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import { generateSchema } from '@/lib/seo';
import { getTranslations, Language } from '@/constants/translations';
import { BASE_URL, APP_STORE_URL, languageAlternates, resolveLang, jsonLd, ogImage } from '@/lib/site';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const headerList = await headers();
  const lang: Language = resolveLang(resolvedSearchParams.lang, headerList.get('x-vercel-ip-country'));

  const title = lang === 'ko'
    ? 'WSET 1급·2급 무료 연습문제와 해설 | 에클라뱅(Eclavin)'
    : 'WSET Level 1 & 2 Practice Questions with Answers | Eclavin';
  const description = lang === 'ko'
    ? 'WSET 1급과 2급 연습문제 200개를 정답과 해설로 무료로 풀어 보세요. 가입은 필요 없습니다. 공부 안내 글과 와인 용어 사전도 함께 볼 수 있습니다.'
    : '200 free WSET Level 1 and Level 2 practice questions, each with the answer and a full explanation. No sign-up. Plus free study guides and a wine glossary.';

  const image = ogImage(
    lang === 'ko' ? 'WSET 1급·2급 무료 연습문제' : 'Free WSET Level 1 & 2 practice questions',
    lang === 'ko' ? '문제 200개 · 정답과 해설' : '200 questions with answers and explanations',
    lang,
  );

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/?lang=${lang}`,
      languages: languageAlternates(`${BASE_URL}/`),
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/?lang=${lang}`,
      siteName: 'Eclavin',
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    }
  };
}

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const headerList = await headers();
  const lang: Language = resolveLang(resolvedSearchParams.lang, headerList.get('x-vercel-ip-country'));

  // Data Fetching
  const l1Full = getAllEpisodes(1, lang);
  const l2Full = getAllEpisodes(2, lang);
  
  const l1 = l1Full.map(e => ({ id: e.id, number: e.number, level: 1, question: e.question }));
  const l2 = l2Full.map(e => ({ id: e.id, number: e.number, level: 2, question: e.question }));
  const allEpisodes = [...l1, ...l2];

  // Logic Abstraction
  const t = getTranslations(lang);
  const { allJsonLd } = generateSchema(lang, l1Full, l2Full);

  // FAQ content: rendered visibly below AND mirrored into FAQPage JSON-LD.
  // (Google requires FAQ markup to match content that is actually on the page.)
  const faqItems = lang === 'ko'
    ? [
        {
          q: 'WSET Level 2 시험은 어떻게 준비해야 하나요?',
          a: 'WSET Level 2 시험은 50개의 객관식 문제로 구성되며 60분 내에 풀어야 합니다. 합격 기준은 55%(28문제), 우수 합격(Distinction)은 85%(43문제)입니다. 에클라뱅에는 해설이 달린 Level 2 무료 연습문제 100개가 있어 시험 전에 주제별로 점검할 수 있습니다.',
        },
        {
          q: '포트 와인과 셰리의 주정 강화 시점 차이는 무엇인가요?',
          a: '포트(Port)는 발효 도중에 고농도 주정을 첨가하여 효모를 죽이고 천연 당분을 남겨 달콤한 스타일을 만듭니다. 반면 셰리(Sherry)는 발효가 완전히 끝난 후에 주정을 첨가하며, 대부분의 셰리는 드라이한 스타일입니다. WSET 시험에서 자주 출제되는 대표적인 함정 포인트입니다.',
        },
        {
          q: '샤블리(Chablis)는 오크 숙성을 하나요?',
          a: '일반 샤블리(Chablis AOC)는 오크를 사용하지 않는 스테인리스 탱크에서 발효 및 숙성됩니다. 이로 인해 버터나 바닐라 향 없이 초록 사과, 레몬, 축축한 돌(wet stone) 같은 신선하고 미네랄리한 풍미를 보입니다. 단, 샤블리 프리미에 크뤼(Premier Cru)나 그랑 크뤼(Grand Cru)는 일부 생산자가 오크를 사용하기도 합니다.',
        },
        {
          q: '음식의 단맛이 드라이 와인에 어떤 영향을 미치나요?',
          a: '음식의 당분은 와인이 가진 단맛을 상대적으로 약하게 느끼게 하여, 드라이 와인이 더 쓰고 시게 느껴지게 만듭니다. 달콤한 디저트에는 와인이 더 달거나 같은 수준의 단맛이어야 합니다. WSET 음식 페어링에서 가장 자주 다뤄지는 원칙입니다.',
        },
        {
          q: '에클라뱅(Eclavin)만으로 WSET Level 1, 2를 준비할 수 있나요?',
          a: '에클라뱅의 무료 문제 200개(Level 1 100문제, Level 2 100문제)는 시험의 주요 주제를 다룹니다. 해설은 정답의 근거와 오답이 틀린 이유를 함께 설명합니다. 다만 공식 교재를 대신하지는 않습니다. 교재로 공부하고 문제로 확인하는 방식이 가장 좋습니다.',
        },
      ]
    : [
        {
          q: 'How should I prepare for the WSET Level 2 exam?',
          a: 'The WSET Level 2 exam consists of 50 multiple-choice questions completed in 60 minutes. Pass is 55% (28 correct) and Distinction is 85% (43 correct). Eclavin has 100 free Level 2 practice questions, each with a full explanation, so you can check every topic before the exam.',
        },
        {
          q: 'What is the difference in fortification timing between Port and Sherry?',
          a: 'Port is fortified DURING fermentation. The added spirit kills the yeast, leaving residual sugar, making Port naturally sweet. Sherry is fortified AFTER fermentation is complete, making most Sherry styles dry. This is one of the most common exam traps in WSET Level 1 and 2.',
        },
        {
          q: 'Is standard Chablis aged in oak barrels?',
          a: 'Standard Chablis AOC is fermented and aged in stainless steel tanks without oak. This gives it a fresh, crisp profile of green apple, lemon, and wet stone minerality without any buttery or vanilla notes. Premier Cru and Grand Cru Chablis may use some oak at the producer\'s discretion.',
        },
        {
          q: 'How does sweetness in food affect dry wine?',
          a: 'Sweetness in food makes dry wine taste more bitter and harsh by reducing the wine\'s perceived sweetness. The golden rule is: the wine should be as sweet as or sweeter than the food. This is a frequently tested food-pairing principle in WSET Level 1 and Level 2.',
        },
        {
          q: 'Can I prepare for WSET Level 1 and 2 using only Eclavin?',
          a: 'Eclavin\'s 200 free questions (100 for Level 1, 100 for Level 2) cover the main topics of both exams, and each explanation says why the right answer is right and why the others are wrong. They are not a replacement for the official study materials: study the topic, then use the questions to check yourself.',
        },
      ];

  const q = `?lang=${lang}`;
  const hubLinks = lang === 'ko'
    ? [
        { href: `/level/1${q}`, label: 'WSET 1급 문제 100개', desc: '1급 연습문제 전체 목록. 모든 문제에 정답과 해설이 있습니다.' },
        { href: `/level/2${q}`, label: 'WSET 2급 문제 100개', desc: '2급 연습문제 전체 목록. 모든 문제에 정답과 해설이 있습니다.' },
        { href: `/practice${q}`, label: '무료 모의고사', desc: '급수별 20문제를 바로 채점하며 풀어 봅니다.' },
        { href: `/glossary${q}`, label: '와인 용어 사전', desc: '타닌, 산도, 바디 같은 시험 용어를 쉬운 말로 풀었습니다.' },
        { href: '/guide', label: '공부 안내 글 (영어)', desc: '급수 비교, 합격 공부법, 시험 형식과 합격 기준.' },
        { href: '/grape', label: '포도 품종 (영어)', desc: '주요 품종 12가지의 맛, 산지, 시험 포인트.' },
        { href: '/region', label: '와인 산지 (영어)', desc: '보르도, 부르고뉴 등 주요 산지 12곳의 특징.' },
      ]
    : [
        { href: `/level/1${q}`, label: 'All 100 WSET Level 1 questions', desc: 'Every Level 1 practice question on one page, each with the answer and explanation.' },
        { href: `/level/2${q}`, label: 'All 100 WSET Level 2 questions', desc: 'Every Level 2 practice question on one page, each with the answer and explanation.' },
        { href: `/practice${q}`, label: 'Free WSET mock exams', desc: 'A 20-question sample for each level with instant marking.' },
        { href: `/glossary${q}`, label: 'Wine & WSET glossary', desc: 'Tannin, acidity, body and other exam terms in plain English.' },
        { href: '/guide', label: 'Study guides', desc: 'Level comparisons, study plans, exam format and pass marks.' },
        { href: '/grape', label: 'Grape varieties', desc: 'How 12 key grapes taste, where they grow, and what to pair.' },
        { href: '/region', label: 'Wine regions', desc: 'Bordeaux, Burgundy and 10 more regions, with exam-relevant facts.' },
      ];

  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a },
    })),
  };

  return (
    <main className="main-container">
      {/* Server-rendered JSON-LD (native <script> so AI/search crawlers see it without running JS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([...allJsonLd, faqPageJsonLd]),
        }}
      />

      <header className="page-header animate-slide-up">
        <div className="header-top-row">
          <h1 className="font-heading main-title">
            {t.title}
          </h1>
          <div className="header-controls">
            <Suspense fallback={null}>
              <LanguageToggle />
            </Suspense>
            <ThemeToggle />
          </div>
        </div>
        <p className="main-description">
          {t.desc}
        </p>
        <p style={{ marginTop: '0.9rem' }}>
          <a
            href={`/practice?lang=${lang}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#832d32',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(131,45,50,0.4)',
              paddingBottom: '2px',
            }}
          >
            {lang === 'ko' ? '무료 WSET 연습문제 풀기 →' : 'Try free WSET practice exams →'}
          </a>
        </p>
      </header>

      <EpisodeGridClient allEpisodes={allEpisodes} initialLang={lang} />

      {/* Premium Eclavin App Promotion Banner */}
      <section className="premium-app-banner animate-slide-up">
        <div className="premium-banner-content">
          <span className="premium-banner-badge">{t.banner_badge}</span>
          <h2 className="premium-banner-title">{t.banner_title}</h2>
          <p className="premium-banner-desc">{t.banner_desc}</p>
        </div>
        <div className="premium-banner-actions">
          <TrackedAppStoreLink 
            href={APP_STORE_URL}
            className="premium-app-store-btn"
          >
            <svg viewBox="0 0 384 512" width={16} height={16}>
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <span>{t.banner_download}</span>
          </TrackedAppStoreLink>
        </div>
      </section>

      {/* Where to go next: crawlable links to every content hub */}
      <section style={{
        maxWidth: '960px',
        margin: '2rem auto 0',
        padding: '2rem 1.5rem',
        borderTop: '1px solid rgba(131, 45, 50, 0.12)',
      }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'ko' ? '무엇을 볼 수 있나요' : 'Study resources'}
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.9rem 1.5rem' }}>
          {hubLinks.map((h) => (
            <li key={h.href}>
              <a href={h.href} style={{ fontWeight: 600, fontSize: '0.95rem', color: '#832d32', textDecoration: 'none' }}>{h.label}</a>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{h.desc}</p>
            </li>
          ))}
        </ul>
        <p style={{ margin: '1.5rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {lang === 'ko'
            ? '문제는 WSET 1급·2급 공개 교육과정의 주제에 맞춰 만들었고 모든 문제에 해설이 있습니다. 1급과 2급 문제 200개는 한국어와 영어로 같은 내용을 제공합니다. 에클라뱅은 WSET과 무관한 비공식 학습 자료입니다.'
            : 'Questions follow the topics of the published WSET Level 1 and Level 2 syllabuses, and every question has a full explanation. All 200 questions are available in English and Korean. Eclavin is an independent study resource, not affiliated with WSET.'}
        </p>
      </section>

      {/* FAQ — visible content backing the FAQPage JSON-LD above */}
      <section style={{
        maxWidth: '960px',
        margin: '2rem auto 0',
        padding: '2rem 1.5rem',
        borderTop: '1px solid rgba(131, 45, 50, 0.12)',
      }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqItems.map((item, i) => (
            <details key={i} style={{
              border: '1px solid rgba(131, 45, 50, 0.15)',
              borderRadius: '10px',
              padding: '0.9rem 1.1rem',
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {item.q}
              </summary>
              <p style={{ margin: '0.8rem 0 0', fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

    </main>
  );
}
