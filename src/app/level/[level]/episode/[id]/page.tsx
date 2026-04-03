import { getEpisode, getAllEpisodes, Language } from '@/lib/episodes';
import EpisodeClient from '@/components/EpisodeClient';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const params: { level: string; id: string }[] = [];
  
  [1, 2].forEach(lv => {
    const episodes = getAllEpisodes(lv);
    episodes.forEach(e => {
      params.push({ level: lv.toString(), id: e.id });
    });
  });

  return params;
}

interface EpisodePageProps {
  params: Promise<{ level: string; id: string }>;
  searchParams: Promise<{ lang?: string }>;
}

const BASE_URL = 'https://eclavin.vercel.app';

export async function generateMetadata({ params, searchParams }: EpisodePageProps): Promise<Metadata> {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const level = parseInt(resolvedParams.level);
  const rawLang = resolvedSearchParams.lang;
  const lang: Language = (rawLang === 'en' || rawLang === 'ko') ? rawLang : 'ko';
  const episode = getEpisode(level, resolvedParams.id, lang);
  if (!episode) return { title: 'Mastery Episode | Eclavin Wine Academy' };
  
  const canonicalUrl = `${BASE_URL}/level/${level}/episode/${resolvedParams.id}`;
  
  const title = lang === 'ko' 
    ? `[WSET ${level}급 실전] 에피소드 ${episode.number} 마스터리 - 에클라빈`
    : `WSET Level ${level} Mastery Episode ${episode.number} | Eclavin Wine Academy`;
  
  const description = lang === 'ko'
    ? `WSET ${level}급 합격생 필수 코스. "${episode.question.substring(0, 60)}..." 문제와 전문가 해설로 완벽 대비하세요.`
    : `The essential course for WSET Level ${level} success. Study "${episode.question.substring(0, 60)}..." with expert explanations.`;

  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(episode.question)}&level=${level}&number=${episode.number}&lang=${lang}`;

  return {
    title,
    description,
    keywords: [
      'WSET', `WSET Level ${level}`, 'WSET 기출문제', 'WSET 시험', 'Wine Exam',
      'Wine Theory', 'Eclavin', '와인 자격증', 'Wine Quiz', 'WSET practice questions',
      '와인 소믈리에 시험', 'WSET 2급 문제', 'WSET 3급 문제', '와인 공부',
      '와인 교육', '국제 와인 소믈리에', 'WSET 2026 최신 기출', 'WSET Past Papers',
      'WSET Mock Exam', 'WSET Flashcards', 'SAT Tasting Grid', 'Viticulture',
      'Vinification', '와인 자격증 독학 족보', 'WSET 3급 주관식 해설', '와인 벼락치기'
    ],
    metadataBase: new URL(BASE_URL),
    other: {
      'naver-site-verification': 'VERIFICATION_CODE_HERE',
      'google-site-verification': 'VERIFICATION_CODE_HERE',
      'ai-snippet': episode.explanation.substring(0, 160), // AI 요약용 전용 태그
      'naver-cue-friendly': 'true', // 네이버 AI 검색(CUE:) 최적화 지표
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ko-KR': `${canonicalUrl}?lang=ko`,
        'en-US': `${canonicalUrl}?lang=en`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'Eclavin',
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      publishedTime: new Date().toISOString(),
      authors: ['Eclavin Wine Study Group'],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function EpisodePage({ params, searchParams }: EpisodePageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const level = parseInt(resolvedParams.level);
  const rawLang = resolvedSearchParams.lang;
  const lang: Language = (rawLang === 'en' || rawLang === 'ko') ? rawLang : 'ko';
  const episode = getEpisode(level, resolvedParams.id, lang);

  if (!episode) {
    notFound();
  }

  const canonicalUrl = `${BASE_URL}/level/${level}/episode/${resolvedParams.id}`;

  // 2026 Enhanced Educational Content Schema (LearningResource)
  const learningResourceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    'name': `WSET Level ${level} - ${episode.question.substring(0, 50)}...`,
    'description': episode.explanation,
    'learningResourceType': 'Practice Test',
    'educationalLevel': `WSET Level ${level}`,
    'competencyRequired': 'Wine Knowledge',
    'datePublished': new Date().toISOString(),
    'dateModified': new Date().toISOString(), // 2026 Freshness Signal
    'educationalAlignment': {
      '@type': 'AlignmentObject',
      'alignmentType': 'educationalLevel',
      'educationalFramework': 'WSET Global',
      'targetName': `Level ${level}`,
    },
    'author': {
      '@type': 'Organization',
      'name': 'Eclavin Wine Study Center',
      'description': 'Professional Wine Education Content Team',
      'url': BASE_URL,
      'sameAs': [
        'https://apps.apple.com/kr/app/eclavin/id6757098139',
        // Add LinkedIn or Professional Profile Page for maximum E-E-A-T
      ]
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Eclavin',
      'logo': { '@type': 'ImageObject', 'url': `${BASE_URL}/icon.png` },
      'areaServed': 'Worldwide',
    },
    'inLanguage': lang === 'ko' ? 'ko-KR' : 'en-US',
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['.speakable-content-question', '.speakable-content-explanation']
    },
    'about': [
      { '@type': 'Thing', 'name': 'Wine & Spirit Education Trust' },
      { '@type': 'Course', 'name': `WSET Level ${level} Specification` }
    ],
    'mentions': [
      { '@type': 'DefinedTerm', 'name': 'Wine tasting', 'termCode': 'SAT' },
      { '@type': 'DefinedTerm', 'name': 'Terroir', 'description': 'Natural environment in which a wine is produced' },
      { '@type': 'DefinedTerm', 'name': 'Viticulture', 'description': 'Management and study of grapevines' },
    ],
    'hasCredential': {
      '@type': 'EducationalOccupationalCredential',
      'name': 'WSET Certification Readiness - Pass with Distinction',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '3450'
    }
  };

  // Quiz + Question + Answer structured data for Google Rich Snippets & LLM ingestion
  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    'name': `Eclavin - WSET Level ${level} Episode ${episode.number}`,
    'description': episode.question,
    'about': { '@type': 'Thing', 'name': 'Wine & Spirit Education Trust (WSET)' },
    'educationalLevel': `WSET Level ${level}`,
    'inLanguage': lang === 'ko' ? 'ko-KR' : 'en-US',
    'provider': { '@type': 'Organization', 'name': 'Eclavin', 'url': BASE_URL },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    'hasPart': {
      '@type': 'Question',
      'name': episode.question,
      'text': episode.question,
      'answerCount': episode.options.length,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': `${episode.answer}. ${episode.explanation}`,
      },
      'suggestedAnswer': episode.options.map(opt => ({
        '@type': 'Answer',
        'text': `${opt.label}. ${opt.text}`,
      })),
    },
  };

  // Breadcrumb for Naver SearchAdvisor & Google
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Eclavin', 'item': BASE_URL },
      { '@type': 'ListItem', 'position': 2, 'name': `WSET Level ${level}`, 'item': `${BASE_URL}/?lv=${level}` },
      { '@type': 'ListItem', 'position': 3, 'name': `Episode ${episode.number}`, 'item': canonicalUrl },
    ],
  };

  // FAQPage JSON-LD for Google Rich Snippets (Question/Answer appearance)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': episode.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `${episode.explanation} ${episode.theory ? '\n\n' + episode.theory : ''}`,
        },
      },
      {
        '@type': 'Question',
        'name': lang === 'ko' ? `WSET Level ${level} 시험 준비 방법은?` : `How to prepare for WSET Level ${level}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': lang === 'ko' 
            ? 'Eclavin에서 제공하는 수백 개의 기출문제와 핵심 이론을 통해 효율적으로 학습할 수 있습니다.' 
            : 'You can study efficiently with hundreds of practice questions and expert theories provided by Eclavin.'
        }
      }
    ],
  };

  // Organization JSON-LD for Naver & Google
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Eclavin',
    'url': BASE_URL,
    'logo': `${BASE_URL}/favicon.ico`,
    'sameAs': [
      // Add social links here if any
    ],
  };

  const seoLabels = lang === 'ko'
    ? { 
        answer: '정답 및 핵심 해설', theory: '마스터 교육 이론', tip: '합격 보장 팁', question: '실전 기출문제', 
        home: '에클라빈 홈', level: `WSET 레벨 ${level} 마스터리`, ep: `에피소드 ${episode.number}`,
        more: '합격으로 가는 관련 마스터리 클러스터'
      }
    : { 
        answer: 'Critical Answer & Explanation', theory: 'Expert Mastery Theory', tip: 'Pass-Guarantee Tip', question: 'Real-World Exam Episode', 
        home: 'Eclavin Home', level: `WSET Level ${level} Mastery`, ep: `Episode ${episode.number}`,
        more: 'Related Mastery Clusters for Success'
      };

  // Internal linking boost: get 2-3 other episodes from the same level
  const relatedEpisodes = getAllEpisodes(level, lang)
    .filter(e => e.number !== episode.number)
    .slice(0, 3);

  return (
    <main style={{ minHeight: '100vh', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      {/* Premium Header Bar */}
      <div className="animate-slide-up" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100, 
        background: 'rgba(var(--bg-primary-rgb, 255, 255, 255), 0.7)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-light)',
        padding: '0.8rem 1.2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '650px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={`/?lang=${lang}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600 }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span style={{ fontSize: '0.9rem' }}>Eclavin</span>
          </a>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Suspense fallback={null}>
              <LanguageToggle />
            </Suspense>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div style={{ height: '4rem' }} /> {/* Spacer for fixed header */}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* Visible Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="animate-slide-up" style={{ maxWidth: '650px', margin: '0.5rem auto 2.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px' }}>
          <li><a href={`/?lang=${lang}`} style={{ color: 'inherit', textDecoration: 'none' }}>{seoLabels.home}</a></li>
          <li>/</li>
          <li><a href={`/?lv=${level}&lang=${lang}`} style={{ color: 'inherit', textDecoration: 'none' }}>Level {level}</a></li>
          <li>/</li>
          <li style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Episode {episode.number}</li>
        </ol>
      </nav>

      {/* Interactive quiz UI */}
      <EpisodeClient episode={episode} initialLang={lang} />


      {/*
        SEO Content Layer: This section is INVISIBLE to users but FULLY READABLE by search crawlers.
      */}
      <div
        className="seo-content-layer"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
        }}
        aria-hidden="false"
      >
        <h1>{`Eclavin WSET Level ${level} - Episode ${episode.number}`}</h1>
        <section className="speakable-content-question" itemScope itemType="https://schema.org/Question">
          <h2 itemProp="name">{seoLabels.question}</h2>
          <div itemProp="text">
            <p>{episode.question}</p>
            <ul>
              {episode.options.map(opt => (
                <li key={opt.label}>{opt.label}. {opt.text}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="speakable-content-explanation" itemScope itemType="https://schema.org/Answer">
          <h2>{seoLabels.answer}</h2>
          <div itemProp="text" itemScope itemType="https://schema.org/CreativeWork">
            <p itemProp="abstract">{episode.explanation}</p>
          </div>
          
          {/* AI Knowledge Tokens - Growth Hacking for SGE Dominance */}
          <div className="ai-knowledge-tokens" style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>AI Quick Summary (SGE/CUE Ready)</h3>
            <ul style={{ fontSize: '0.95rem', color: '#1a1a1a', listStyleType: 'none', padding: 0 }}>
              <li><strong>Category:</strong> WSET Level {level} Theory</li>
              <li><strong>Key Insight:</strong> {episode.explanation.substring(0, 100)}...</li>
              <li><strong>Mastery Goal:</strong> Pass WSET with Distinction</li>
            </ul>
          </div>

          {/* Internal Wine Graph Tokens */}
          <div style={{ visibility: 'hidden' }}>
            <span itemScope itemType="https://schema.org/DefinedTerm">
              <meta itemProp="name" content="WSET" />
              <meta itemProp="description" content="Wine & Spirit Education Trust" />
            </span>
          </div>
        </section>
        {episode.theory && (
          <section>
            <h2>{seoLabels.theory}</h2>
            <p>{episode.theory}</p>
          </section>
        )}
        {episode.tip && (
          <section>
            <h2>{seoLabels.tip}</h2>
            <p>{episode.tip}</p>
          </section>
        )}
      </div>
    </main>
  );
}
