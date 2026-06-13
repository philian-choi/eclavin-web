'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Episode } from '@/lib/episodes';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import { getTranslations, Language } from '@/constants/translations';
import { useEpisodeQuiz } from '@/hooks/useEpisodeQuiz';
import { usePostHog } from 'posthog-js/react';

import StoryShare from './StoryShare';

export default function EpisodeClient({ episode, initialLang }: { episode: Episode, initialLang?: string }) {
  const { language: storedLang } = useStore();
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || initialLang || storedLang || 'ko') as Language;
  const t = getTranslations(lang);
  const posthog = usePostHog();

  const {
    selected,
    isCorrect,
    mounted,
    explanationRef,
    hasNext,
    hasPrev,
    getUrl,
    handleSelect
  } = useEpisodeQuiz(episode, lang);

  return (
    <article className="episode-container">
      <header className="episode-header">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href={`/?lv=${episode.level}&lang=${lang}`}>
             <button className="pill-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', gap: '8px', border: 'none', backgroundColor: 'var(--bg-secondary)' }}>
               <ArrowLeft size={16} /> {t.back}
             </button>
          </Link>
          <span className="episode-badge">
             L{episode.level} • Ep {episode.number}
          </span>
        </div>
        <StoryShare episode={episode} lang={lang} t={t} />
      </header>

      <div>
        <section aria-labelledby="episode-question">
          <h2 id="episode-question" className="font-heading question-text">
            {episode.question}
          </h2>

          <div className="options-list">
            {episode.options.map((option) => {
              const isSelected = selected === option.label;
              const isCorrectOption = episode.answer.startsWith(option.label);
              let statusClass = '';
              if (selected) {
                if (isCorrectOption) statusClass = 'correct';
                else if (isSelected && !isCorrect) statusClass = 'incorrect';
              }
              return (
                <motion.button 
                  key={option.label}
                  onClick={() => handleSelect(option.label)}
                  className={`quiz-option-btn ${statusClass}`}
                  whileTap={{ scale: 0.99 }}
                  animate={isSelected && !isCorrect ? { x: [-8, 8, -8, 8, 0] } : {}} 
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                     <span className="option-key">{option.label}.</span>
                     <span style={{ flex: 1, lineHeight: '1.5', textAlign: 'left' }}>{option.text}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <AnimatePresence>
          {selected && (
            <section ref={explanationRef} className="explanation-area animate-slide-up">
              <div className="quiz-explanation unified-card" style={{ 
                backgroundColor: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                border: '1.5px solid var(--border-light)',
                borderRadius: '20px'
              }}>
                 {/* 1. Main Explanation Section */}
                 <div>
                    <h4 className="font-heading" style={{ color: isCorrect ? 'var(--success-color)' : 'var(--error-color)', fontSize: '1.4rem', marginBottom: '0.8rem' }}>
                       {isCorrect ? t.correct : t.incorrect}
                    </h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{episode.explanation}</p>
                 </div>

                 {/* 2. Theory Section (Optional) */}
                 {episode.theory && (
                    <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
                       <h4 className="font-heading" style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {t.expert}
                       </h4>
                       <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>{episode.theory}</p>
                    </div>
                 )}

                  {/* 3. Tip Section (Optional) */}
                  {episode.tip && (
                     <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
                        <h4 className="font-heading" style={{ color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                           {t.tip}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>{episode.tip}</p>
                     </div>
                  )}
              </div>
            
              <AppPromoCard t={t} />

              {/* Sticky Bottom Navigation Bar */}
              <footer className="sticky-nav-bar animate-slide-up">
                 <div className="nav-container">
                    <Link href={hasPrev ? getUrl(episode.number - 1) : '#'}>
                       <button className="pill-btn secondary" style={{ opacity: hasPrev ? 1 : 0.3, pointerEvents: hasPrev ? 'auto' : 'none', fontSize: '1.05rem' }}>
                          <ArrowLeft size={20} /> {t.prev}
                       </button>
                    </Link>
                    {hasNext && (
                      <Link href={getUrl(episode.number + 1)}>
                         <button className="pill-btn next-action-btn">
                            {t.next} <ArrowRight size={20} />
                         </button>
                      </Link>
                    )}
                 </div>
              </footer>
            </section>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

function AppPromoCard({ t }: { t: any }) {
  const posthog = usePostHog();

  return (
    <div className="app-promo-card-elegant">
      <div className="promo-content-wrapper">
        <div className="promo-text-group">
          <div className="promo-header-row">
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" className="apple-icon">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <h4>{t.promo_main}</h4>
          </div>
          <p className="promo-tagline">
            {t.promo_desc || (t.lang === 'en' 
              ? "Get 1,800+ mock exam questions, mistake analysis, and Level 3 master notes." 
              : "1,800개 이상의 적중 기출문제, 오답 분석, Level 3 완벽 지원 모의고사 수록!")}
          </p>
        </div>
        <a 
          href="https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="promo-action-link"
          onClick={() => posthog?.capture('AppStore_Click')}
        >
          <span>{t.banner_download}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>

      <style jsx>{`
        .app-promo-card-elegant {
          margin-top: 2.5rem;
          margin-bottom: 2rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .promo-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .promo-content-wrapper {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .promo-text-group {
          flex: 1;
        }
        .promo-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .apple-icon {
          color: var(--text-primary);
          opacity: 0.9;
        }
        .promo-header-row h4 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }
        .promo-tagline {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .promo-action-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          padding: 0.7rem 1.2rem;
          border-radius: 999px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          transition: all 0.2s ease;
          white-space: nowrap;
          align-self: flex-start;
        }
        .promo-action-link:hover {
          background-color: var(--text-primary);
          color: var(--bg-primary);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
