'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Episode } from '@/lib/episodes';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import { getTranslations, Language } from '@/constants/translations';
import { useEpisodeQuiz } from '@/hooks/useEpisodeQuiz';

import StoryShare from './StoryShare';

export default function EpisodeClient({ episode, initialLang }: { episode: Episode, initialLang?: string }) {
  const { language: storedLang } = useStore();
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || initialLang || storedLang || 'ko') as Language;
  const t = getTranslations(lang);

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

              <div style={{ paddingBottom: '2rem', marginTop: '2rem' }}>
                <AppPromoCard t={t} />
              </div>
            </section>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

function AppPromoCard({ t }: { t: any }) {
  return (
    <div className="app-promo-card">
      <a 
        href="https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: 'var(--text-primary)', textDecoration: 'none', width: '100%', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 384 512" width={24} height={24} fill="currentColor">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.7, marginBottom: '2px' }}>{t.promo_sub}</span>
          <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>{t.promo_main}</span>
        </div>
      </a>
    </div>
  );
}
