import { getEpisode, getAllEpisodes, Language } from '@/lib/episodes';
import EpisodeClient from '@/components/EpisodeClient';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';

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

const BASE_URL = 'https://www.eclavin.com';

export async function generateMetadata({ params, searchParams }: EpisodePageProps): Promise<Metadata> {
  const [resolvedParams, resolvedSearchParams, headerList] = await Promise.all([params, searchParams, headers()]);
  const level = parseInt(resolvedParams.level);
  const country = headerList.get('x-vercel-ip-country') || 'US';
  
  const rawLang = resolvedSearchParams.lang;
  const lang: Language = (rawLang === 'ko' || rawLang === 'en') 
    ? rawLang 
    : (country === 'KR' ? 'ko' : 'en');
  let episode = getEpisode(level, resolvedParams.id, lang);
  if (!episode) {
    const rawId = resolvedParams.id;
    if (/^\d+$/.test(rawId)) {
      const paddedId = `episode_${rawId.padStart(3, '0')}`;
      episode = getEpisode(level, paddedId, lang);
    }
  }
  if (!episode) return { title: 'Mastery Episode | Eclavin Wine Academy' };
  
  const canonicalUrl = `${BASE_URL}/level/${level}/episode/${episode.id}`;

  const questionSnippet = episode.question.length > 45
    ? `${episode.question.substring(0, 45)}…`
    : episode.question;

  const title = lang === 'ko'
    ? `${questionSnippet} | WSET ${level}급 연습문제 ${episode.number} - 에클라뱅`
    : `${questionSnippet} | WSET Level ${level} Practice Question ${episode.number} - Eclavin`;

  const description = lang === 'ko'
    ? `WSET ${level}급 연습문제와 전문가 해설. "${episode.question.substring(0, 60)}..." 문제를 풀고 핵심 이론까지 정리하세요.`
    : `WSET Level ${level} practice question with expert explanation. Study "${episode.question.substring(0, 60)}..." and master the underlying theory.`;

  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(episode.question)}&level=${level}&number=${episode.number}&lang=${lang}`;

  return {
    title,
    description,
    keywords: [
      'WSET', `WSET Level ${level}`, 'WSET 시험', 'Wine Exam',
      'Wine Theory', 'Eclavin', '와인 자격증', 'Wine Quiz', 'WSET practice questions',
      '와인 소믈리에 시험', `WSET ${level}급 문제`, '와인 공부', '와인 교육',
      'WSET Mock Exam', 'Viticulture', 'Vinification'
    ],
    metadataBase: new URL(BASE_URL),
    other: {
      'naver-site-verification': '784865e7d742fae47c0a19a6337b28e2736cf1f0',
      'google-site-verification': 'cLzx38Y_7Wre_sKiuBdZnQzj9KZFf7X4JI9S9nQt_4I',
    },
    alternates: {
      canonical: `${canonicalUrl}?lang=${lang}`,
      languages: {
        'ko-KR': `${canonicalUrl}?lang=ko`,
        'en-US': `${canonicalUrl}?lang=en`,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${canonicalUrl}?lang=${lang}`,
      siteName: 'Eclavin',
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
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
  const [resolvedParams, resolvedSearchParams, headerList] = await Promise.all([params, searchParams, headers()]);
  const level = parseInt(resolvedParams.level);
  const country = headerList.get('x-vercel-ip-country') || 'US';
  
  const rawLang = resolvedSearchParams.lang;
  const lang: Language = (rawLang === 'ko' || rawLang === 'en') 
    ? rawLang 
    : (country === 'KR' ? 'ko' : 'en');
  let episode = getEpisode(level, resolvedParams.id, lang);
  if (!episode) {
    const rawId = resolvedParams.id;
    if (/^\d+$/.test(rawId)) {
      const paddedId = `episode_${rawId.padStart(3, '0')}`;
      episode = getEpisode(level, paddedId, lang);
    }
  }

  if (!episode) {
    notFound();
  }

  const canonicalUrl = `${BASE_URL}/level/${level}/episode/${episode.id}`;

  // 2026 Enhanced Educational Content Schema (LearningResource)
  const learningResourceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    'name': `WSET Level ${level} - ${episode.question.substring(0, 50)}...`,
    'description': episode.explanation,
    'learningResourceType': 'Practice Test',
    'educationalLevel': `WSET Level ${level}`,
    'competencyRequired': 'Wine Knowledge',
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
        answer: '정답 및 핵심 해설', theory: '핵심 이론 정리', tip: '핵심 출제 팁', question: '연습문제',
        home: '에클라뱅 홈', level: `WSET 레벨 ${level} 마스터리`, ep: `에피소드 ${episode.number}`,
        more: '이어서 풀어볼 연습문제', reveal: '정답과 해설 펼쳐보기 (문제를 먼저 풀어보세요)'
      }
    : {
        answer: 'Answer & Explanation', theory: 'Key Theory Summary', tip: 'Expert Exam Tip', question: 'Practice Question',
        home: 'Eclavin Home', level: `WSET Level ${level} Mastery`, ep: `Episode ${episode.number}`,
        more: 'Continue with Related Questions', reveal: 'Show Answer & Explanation (try the quiz first)'
      };

  // Internal linking: the next 3 episodes in the same level (wraps around at the end)
  const levelEpisodes = getAllEpisodes(level, lang);
  const currentIndex = levelEpisodes.findIndex(e => e.number === episode.number);
  const relatedEpisodes = Array.from({ length: 3 }, (_, i) =>
    levelEpisodes[(currentIndex + 1 + i) % levelEpisodes.length]
  ).filter(e => e && e.number !== episode.number);

  return (
    <main style={{ minHeight: '100vh', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      {/* Premium Header Bar */}
      <div className="animate-slide-up" style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100, 
        background: '#832d32', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0.8rem 1.2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '650px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={`/?lang=${lang}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#ffffff', fontWeight: 600 }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span style={{ fontSize: '0.9rem' }}>{lang === 'ko' ? '에클라뱅' : 'Eclavin'}</span>
          </a>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#ffffff' }}>
            <Suspense fallback={null}>
              <LanguageToggle variant="header" />
            </Suspense>
            <ThemeToggle variant="header" />
          </div>
        </div>
      </div>

      <div style={{ height: '4rem' }} /> {/* Spacer for fixed header */}

      <Script id="ldjson-learning" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceJsonLd) }} />
      <Script id="ldjson-quiz" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }} />
      <Script id="ldjson-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="ldjson-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      {/* Visible Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="animate-slide-up" style={{ maxWidth: '650px', margin: '0.5rem auto 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px' }}>
          <li><a href={`/?lang=${lang}`} style={{ color: 'inherit', textDecoration: 'none' }}>{seoLabels.home}</a></li>
          <li>/</li>
          <li><a href={`/?lv=${level}&lang=${lang}`} style={{ color: 'inherit', textDecoration: 'none' }}>Level {level}</a></li>
          <li>/</li>
          <li style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Episode {episode.number}</li>
        </ol>
      </nav>

      {/* Page heading (single h1 for the document) */}
      <h1 style={{ maxWidth: '650px', margin: '0 auto 1rem', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        {lang === 'ko'
          ? `WSET ${level}급 연습문제 · 에피소드 ${episode.number}`
          : `WSET Level ${level} Practice Question · Episode ${episode.number}`}
      </h1>

      {/* Interactive quiz UI */}
      <EpisodeClient episode={episode} initialLang={lang} />

      {/*
        Answer & explanation — collapsed by default so the quiz isn't spoiled,
        but real, user-accessible content (visible to both readers and crawlers).
      */}
      <section style={{ maxWidth: '650px', margin: '2rem auto 0' }}>
        <details style={{
          border: '1px solid rgba(131, 45, 50, 0.2)',
          borderRadius: '12px',
          padding: '1rem 1.2rem',
          backgroundColor: 'var(--bg-secondary, rgba(131, 45, 50, 0.03))',
        }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>
            {seoLabels.reveal}
          </summary>
          <div style={{ marginTop: '1rem' }}>
            <section className="speakable-content-question" itemScope itemType="https://schema.org/Question">
              <h2 itemProp="name" style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>{seoLabels.question}</h2>
              <div itemProp="text" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <p style={{ marginTop: 0 }}>{episode.question}</p>
                <ul>
                  {episode.options.map(opt => (
                    <li key={opt.label}>{opt.label}. {opt.text}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="speakable-content-explanation">
              <h2 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>{seoLabels.answer}</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                {/* Skip the bold answer prefix when the explanation text already leads with it */}
                {!/^\s*(정답|Answer)/i.test(episode.explanation) && (
                  <>
                    <strong>
                      {episode.answer}
                      {(() => {
                        const correct = episode.options.find(o => episode.answer.startsWith(o.label));
                        return correct ? `. ${correct.text}` : '';
                      })()}
                    </strong>
                    {' — '}
                  </>
                )}
                {episode.explanation}
              </p>
            </section>
            {episode.theory && (
              <section>
                <h2 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>{seoLabels.theory}</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{episode.theory}</p>
              </section>
            )}
            {episode.tip && (
              <section>
                <h2 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>{seoLabels.tip}</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{episode.tip}</p>
              </section>
            )}
          </div>
        </details>
      </section>

      {/* Related episodes — visible internal links within the same level */}
      {relatedEpisodes.length > 0 && (
        <nav aria-label={seoLabels.more} style={{ maxWidth: '650px', margin: '1.5rem auto 0' }}>
          <h2 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>{seoLabels.more}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {relatedEpisodes.map(e => (
              <li key={e.id}>
                <a
                  href={`/level/${level}/episode/${e.id}?lang=${lang}`}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.5 }}
                >
                  {lang === 'ko' ? `에피소드 ${e.number}` : `Episode ${e.number}`} · {e.question.length > 60 ? `${e.question.substring(0, 60)}…` : e.question}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </main>
  );
}
