import { Suspense } from 'react';
import { Metadata } from 'next';
import { getAllEpisodes } from '@/lib/episodes';
import EpisodeGridClient from '@/components/EpisodeGridClient';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { generateSchema } from '@/lib/seo';
import { getTranslations, Language } from '@/constants/translations';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const lang: Language = resolvedSearchParams.lang === 'ko' ? 'ko' : 'en';
  
  return {
    title: lang === 'ko' ? 'Eclavin - 와인 지식의 모든 것' : 'Eclavin - Wine Knowledge Master',
    description: lang === 'ko' 
      ? 'WSET 합격을 위한 가장 완벽한 준비. 500개 이상의 기출 문제와 핵심 이론을 에디토리얼 디자인으로 만나보세요.' 
      : 'The ultimate preparation for WSET. Access 500+ practice questions and expert theories in premium editorial design.',
  };
}

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const rawLang = resolvedSearchParams.lang;
  const lang: Language = rawLang === 'ko' ? 'ko' : 'en';
  
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
      <script
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
          <p>© 2026 Eclavin. Editorial Wine Education Platform.</p>
        </div>
      </footer>
    </main>
  );
}
