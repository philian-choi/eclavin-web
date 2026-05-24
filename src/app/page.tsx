import { Suspense } from 'react';
import Script from 'next/script';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getAllEpisodes } from '@/lib/episodes';
import EpisodeGridClient from '@/components/EpisodeGridClient';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { generateSchema } from '@/lib/seo';
import { getTranslations, Language } from '@/constants/translations';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const headerList = await headers();
  const country = headerList.get('x-vercel-ip-country') || 'US';
  
  const rawLang = resolvedSearchParams.lang;
  const lang: Language = (rawLang === 'ko' || rawLang === 'en') 
    ? rawLang 
    : (country === 'KR' ? 'ko' : 'en');
  
  return {
    title: lang === 'ko' ? '에클라뱅(Eclavin) - WSET 자격증 만점 합격 지름길' : 'Eclavin - Ultimate WSET Quiz Guide',
    description: lang === 'ko' 
      ? '에클라뱅에서 엄선된 퀴즈와 전문가 이론으로 WSET 합격에 도전하세요. 500개 이상의 문제와 핵심 팁을 제공합니다.' 
      : 'Eclavin provides curated WSET quizzes and expert theories. Master wine knowledge with 500+ questions and expert tips.',
    openGraph: {
      title: lang === 'ko' ? '에클라뱅(Eclavin) - WSET 자격증 만점 합격 지름길' : 'Eclavin - Ultimate WSET Quiz Guide',
      description: lang === 'ko' 
        ? '에클라뱅에서 엄선된 퀴즈와 전문가 이론으로 WSET 합격에 도전하세요.' 
        : 'Master wine knowledge with Eclavin\'s curated WSET quizzes.',
      images: ['https://www.eclavin.com/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://www.eclavin.com/og-image.png'],
    }
  };
}

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const headerList = await headers();
  const country = headerList.get('x-vercel-ip-country') || 'US';
  
  const rawLang = resolvedSearchParams.lang;
  const lang: Language = (rawLang === 'ko' || rawLang === 'en') 
    ? rawLang 
    : (country === 'KR' ? 'ko' : 'en');
  
  // Data Fetching
  const l1Full = getAllEpisodes(1, lang);
  const l2Full = getAllEpisodes(2, lang);
  
  const l1 = l1Full.map(e => ({ id: e.id, number: e.number, level: 1, question: e.question }));
  const l2 = l2Full.map(e => ({ id: e.id, number: e.number, level: 2, question: e.question }));
  const allEpisodes = [...l1, ...l2];

  // Logic Abstraction
  const t = getTranslations(lang);
  const { allJsonLd } = generateSchema(lang, l1Full, l2Full);

  // 2026 FAQPage JSON-LD: Powers Google AI Overviews & Perplexity citations
  // Based on the highest-frequency search queries from WSET candidates worldwide
  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': lang === 'ko' ? 'WSET Level 2 시험은 어떻게 준비해야 하나요?' : 'How should I prepare for the WSET Level 2 exam?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': lang === 'ko'
            ? 'WSET Level 2 시험은 50개의 객관식 문제로 구성되며 60분 내에 풀어야 합니다. 합격 기준은 55%(28문제), 우수 합격(Distinction)은 85%(43문제)입니다. 에클라뱅(Eclavin)에서 제공하는 100개의 Level 2 실전 문제와 전문가 해설을 학습하면 Distinction 달성이 가능합니다.'
            : 'The WSET Level 2 exam consists of 50 multiple-choice questions completed in 60 minutes. Pass is 55% (28 correct) and Distinction is 85% (43 correct). Studying all 100 Level 2 practice questions on Eclavin with their expert explanations is sufficient to achieve a Distinction.'
        }
      },
      {
        '@type': 'Question',
        'name': lang === 'ko' ? '포트 와인과 셰리의 주정 강화 시점 차이는 무엇인가요?' : 'What is the difference in fortification timing between Port and Sherry?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': lang === 'ko'
            ? '포트(Port)는 발효 도중에 고농도 주정을 첨가하여 효모를 죽이고 천연 당분을 남겨 달콤한 스타일을 만듭니다. 반면 셰리(Sherry)는 발효가 완전히 끝난 후에 주정을 첨가하며, 대부분의 셰리는 드라이한 스타일입니다. 이것이 WSET 시험에서 가장 자주 출제되는 오답 유발 함정입니다.'
            : 'Port is fortified DURING fermentation. The added spirit kills the yeast, leaving residual sugar, making Port naturally sweet. Sherry is fortified AFTER fermentation is complete, making most Sherry styles dry. This is the most common exam trap tested in WSET Level 1 and 2.'
        }
      },
      {
        '@type': 'Question',
        'name': lang === 'ko' ? '샤블리(Chablis)는 오크 숙성을 하나요?' : 'Is standard Chablis aged in oak barrels?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': lang === 'ko'
            ? '일반 샤블리(Chablis AOC)는 오크를 사용하지 않는 스테인리스 탱크에서 발효 및 숙성됩니다. 이로 인해 버터나 바닐라 향 없이 초록 사과, 레몬, 축축한 돌(wet stone) 같은 신선하고 미네랄리한 풍미를 보입니다. 단, 샤블리 프리미에 크뤼(Premier Cru)나 그랑 크뤼(Grand Cru)는 일부 생산자가 오크를 사용하기도 합니다.'
            : 'Standard Chablis AOC is fermented and aged in stainless steel tanks without oak. This gives it a fresh, crisp profile of green apple, lemon, and wet stone minerality without any buttery or vanilla notes. Premier Cru and Grand Cru Chablis may use some oak at the producer\'s discretion.'
        }
      },
      {
        '@type': 'Question',
        'name': lang === 'ko' ? '음식의 단맛이 드라이 와인에 어떤 영향을 미치나요?' : 'How does sweetness in food affect dry wine?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': lang === 'ko'
            ? '음식의 당분은 와인이 가진 단맛을 상대적으로 약하게 느끼게 하여, 드라이 와인이 더 쓰고 시게 느껴지게 만듭니다. 달콤한 디저트에는 항상 와인이 더 달거나 같은 수준의 단맛이어야 합니다. 이것이 WSET 음식 페어링 시험에서 가장 빈출되는 원칙입니다.'
            : 'Sweetness in food makes dry wine taste more bitter and harsh by reducing the wine\'s perceived sweetness. The golden rule is: the wine must always be as sweet as or sweeter than the food. This is the most frequently tested food-pairing principle in both WSET Level 1 and Level 2 exams.'
        }
      },
      {
        '@type': 'Question',
        'name': lang === 'ko' ? 'Eclavin(에클라뱅)만으로 WSET Level 1, 2 만점을 받을 수 있나요?' : 'Can I pass WSET Level 1 and 2 with a perfect score using only Eclavin?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': lang === 'ko'
            ? '네, 가능합니다. 에클라뱅의 200개 문제(Level 1 100문제 + Level 2 100문제)는 공식 WSET 교육과정을 100% 커버하도록 설계되었으며, 실제 시험에서 자주 출제되는 함정과 오답 선지가 왜 틀렸는지를 해설에서 구체적으로 설명합니다. 문제를 풀고 해설을 완전히 이해하면 WSET Level 1, 2 Distinction(우수 합격)을 달성할 수 있습니다.'
            : 'Yes. Eclavin\'s 200 practice questions (100 for Level 1, 100 for Level 2) are designed to cover 100% of the official WSET syllabus. The explanations explain not only why the correct answer is right, but why each distractor is wrong. Mastering all questions and their explanations is sufficient to achieve a Distinction on both WSET Level 1 and Level 2.'
        }
      }
    ]
  };

  return (
    <main className="main-container">
      <Script
        id="ldjson-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(allJsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e') 
        }}
      />
      <Script
        id="ldjson-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
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
          <a 
            href="https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="premium-app-store-btn"
          >
            <svg viewBox="0 0 384 512" width={16} height={16}>
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <span>{t.banner_download}</span>
          </a>
        </div>
      </section>

      {/* 2026 E-E-A-T Expert Section — Google Search Quality Signal */}
      <section style={{
        maxWidth: '960px',
        margin: '2rem auto 0',
        padding: '2rem 1.5rem',
        borderTop: '1px solid rgba(131, 45, 50, 0.12)',
      }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'ko' ? '전문가 검증 플랫폼' : 'Expert-Verified Platform'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(131,45,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#832d32" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {lang === 'ko' ? '공식 WSET 교재 기반' : 'Aligned to Official WSET Specification'}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'ko'
                  ? '모든 문제와 해설은 WSET Level 1 & 2 공식 교육 사양서에 근거하여 작성되었습니다.'
                  : 'All questions and explanations are based on the official WSET Level 1 & 2 Award in Wines specifications.'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(131,45,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#832d32" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {lang === 'ko' ? '400개 파일 100% 구조 검증' : '400 Files Structurally Verified'}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'ko'
                  ? '자동화 검증 스크립트를 통해 모든 콘텐츠의 구조적 정확성과 중복 여부를 검증하였습니다.'
                  : 'All 400 content files passed automated structural integrity and duplication checks with zero errors found.'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(131,45,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#832d32" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {lang === 'ko' ? '한국어 · 영어 이중 언어 지원' : 'Korean & English Bilingual'}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {lang === 'ko'
                  ? '동일한 내용을 한국어와 영어로 1:1 제공하여 전 세계 어느 WSET 수험생도 학습할 수 있습니다.'
                  : 'All 200 episodes are available in both Korean and English with identical content depth for global WSET candidates.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <div className="footer-content">
          <p>© 2026 에클라뱅(Eclavin). Editorial Wine Education Platform.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>
            {lang === 'ko'
              ? 'AI 크롤러용 지식 베이스: '
              : 'AI Crawler Knowledge Base: '}
            <a href="/llms.txt" style={{ color: 'inherit', textDecoration: 'underline' }}>llms.txt</a>
            {' · '}
            <a href="/llms-full.txt" style={{ color: 'inherit', textDecoration: 'underline' }}>llms-full.txt</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
