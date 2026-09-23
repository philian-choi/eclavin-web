import { getEpisode, getAllEpisodes, Language } from '@/lib/episodes';
import EpisodeClient from '@/components/EpisodeClient';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import {
  BASE_URL,
  ORGANIZATION,
  ORG_REF,
  WSET_ENTITY,
  WINE_ENTITY,
  languageAlternates,
  resolveLang,
  jsonLd,
  ogImage,
} from '@/lib/site';
import { episodeTitle, episodeDescription, episodeHeading } from '@/lib/episodeSeo';

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


export async function generateMetadata({ params, searchParams }: EpisodePageProps): Promise<Metadata> {
  const [resolvedParams, resolvedSearchParams, headerList] = await Promise.all([params, searchParams, headers()]);
  const level = parseInt(resolvedParams.level);
  const lang: Language = resolveLang(resolvedSearchParams.lang, headerList.get('x-vercel-ip-country'));
  let episode = getEpisode(level, resolvedParams.id, lang);
  if (!episode) {
    const rawId = resolvedParams.id;
    if (/^\d+$/.test(rawId)) {
      const paddedId = `episode_${rawId.padStart(3, '0')}`;
      episode = getEpisode(level, paddedId, lang);
    }
  }
  if (!episode) return { title: 'WSET practice question | Eclavin' };

  const canonicalUrl = `${BASE_URL}/level/${level}/episode/${episode.id}`;
  const title = episodeTitle(episode, level, lang);
  const description = episodeDescription(episode, level, lang);
  const image = ogImage(
    episode.question,
    lang === 'ko' ? `WSET ${level}급 연습문제 ${episode.number}번` : `WSET Level ${level} · Question ${episode.number}`,
    lang,
  );

  return {
    title,
    description,
    alternates: {
      canonical: `${canonicalUrl}?lang=${lang}`,
      languages: languageAlternates(canonicalUrl),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${canonicalUrl}?lang=${lang}`,
      siteName: 'Eclavin',
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function EpisodePage({ params, searchParams }: EpisodePageProps) {
  const [resolvedParams, resolvedSearchParams, headerList] = await Promise.all([params, searchParams, headers()]);
  const level = parseInt(resolvedParams.level);
  const lang: Language = resolveLang(resolvedSearchParams.lang, headerList.get('x-vercel-ip-country'));
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

  const pageUrl = `${canonicalUrl}?lang=${lang}`;
  const levelHubUrl = `${BASE_URL}/level/${level}?lang=${lang}`;
  const heading = episodeHeading(episode, level, lang);

  // One Quiz node (Quiz is itself a LearningResource) with the question, the
  // correct answer and the other options, all of which are on the page.
  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    '@id': pageUrl,
    name: heading,
    url: pageUrl,
    inLanguage: lang,
    educationalLevel: `WSET Level ${level}`,
    learningResourceType: 'Practice question',
    about: [WSET_ENTITY, WINE_ENTITY],
    isPartOf: { '@id': levelHubUrl },
    provider: ORG_REF,
    publisher: ORG_REF,
    hasPart: {
      '@type': 'Question',
      eduQuestionType: 'Multiple choice',
      name: episode.question,
      text: episode.question,
      answerCount: episode.options.length,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${episode.answer}. ${episode.explanation}`,
      },
      suggestedAnswer: episode.options.map(opt => ({
        '@type': 'Answer',
        text: `${opt.label}. ${opt.text}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ko' ? '홈' : 'Home', item: `${BASE_URL}/?lang=${lang}` },
      { '@type': 'ListItem', position: 2, name: lang === 'ko' ? `WSET ${level}급 문제` : `WSET Level ${level} questions`, item: levelHubUrl },
      { '@type': 'ListItem', position: 3, name: lang === 'ko' ? `${episode.number}번 문제` : `Question ${episode.number}`, item: pageUrl },
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

      {/* Server-rendered JSON-LD (native <script> so AI/search crawlers see it without running JS) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            quizJsonLd,
            breadcrumbJsonLd,
            { '@context': 'https://schema.org', ...ORGANIZATION },
          ]),
        }}
      />

      {/* Visible Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="animate-slide-up" style={{ maxWidth: '650px', margin: '0.5rem auto 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px' }}>
          <li><a href={`/?lang=${lang}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'ko' ? '홈' : 'Home'}</a></li>
          <li>/</li>
          <li><a href={`/level/${level}?lang=${lang}`} style={{ color: 'inherit', textDecoration: 'none' }}>{lang === 'ko' ? `${level}급 문제` : `Level ${level} questions`}</a></li>
          <li>/</li>
          <li style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lang === 'ko' ? `${episode.number}번 문제` : `Question ${episode.number}`}</li>
        </ol>
      </nav>

      {/* Page heading (single h1 for the document) */}
      <h1 style={{ maxWidth: '650px', margin: '0 auto 1rem', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        {heading}
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
