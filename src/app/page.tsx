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

  return (
    <main className="main-container">
      <Script
        id="ldjson-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(allJsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e') 
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

      <footer className="page-footer">
        <div className="footer-content">
          <p>© 2026 에클라뱅(Eclavin). Editorial Wine Education Platform.</p>
        </div>
      </footer>
    </main>
  );
}
