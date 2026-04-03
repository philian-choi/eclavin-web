'use client';

import React, { useMemo, useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import { getTranslations, Language } from '@/constants/translations';

interface Episode {
  id: string;
  number: number;
  level: number;
  question?: string;
}

const EpisodeBox = React.memo(({ 
  episode, 
  currentLevel, 
  lang, 
  status 
}: { 
  episode: Episode; 
  currentLevel: number; 
  lang: string; 
  status: string | boolean | undefined 
}) => {
  const isCompleted = status === true || status === 'correct';
  const isIncorrect = status === 'incorrect';
  const decodedQuestion = episode.question ? episode.question : '';

  return (
    <Link href={`/level/${currentLevel}/episode/${episode.id}?lang=${lang}`}>
      <div
        className={`episode-box ${isCompleted ? 'completed-box' : ''} ${isIncorrect ? 'incorrect-box' : ''}`}
        title={decodedQuestion ? `Ep ${episode.number}: ${decodedQuestion.slice(0, 80)}${decodedQuestion.length > 80 ? '...' : ''}` : undefined}
      >
        {episode.number}
      </div>
    </Link>
  );
});

EpisodeBox.displayName = 'EpisodeBox';

export default function EpisodeGridClient({ allEpisodes, initialLang }: { allEpisodes: Episode[], initialLang?: string }) {
  const { language: storedLang } = useStore();
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') || initialLang || storedLang || 'ko') as Language;
  const t = getTranslations(lang);

  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedMap, setCompletedMap] = useState<Record<string, string | boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('lv') === '1') setCurrentLevel(1);
      else if (p.get('lv') === '2') setCurrentLevel(2);
      else if (p.get('lv') === '3') setCurrentLevel(3);
      
      const saved = window.localStorage.getItem('wset_completed');
      if (saved) {
        try { setCompletedMap(JSON.parse(saved)); } catch (e) {}
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm(t.confirm)) {
      setCompletedMap({});
      window.localStorage.removeItem('wset_completed');
    }
  }, [t.confirm]);

  const handleTabClick = useCallback((lv: number) => {
    setCurrentLevel(lv);
    if (typeof window !== 'undefined') {
       const params = new URLSearchParams(window.location.search);
       params.set('lv', lv.toString());
       window.history.replaceState(null, '', `/?${params.toString()}`);
    }
  }, []);

  const levelEpisodes = useMemo(() => allEpisodes.filter(e => e.level === currentLevel), [allEpisodes, currentLevel]);

  const stats = useMemo(() => {
    if (!mounted) return { completed: 0, percent: 0 };
    const comps = levelEpisodes.filter(e => completedMap[`L${e.level}_${e.id}`]);
    return {
      completed: comps.length,
      percent: Math.round((comps.length / levelEpisodes.length) * 100) || 0
    };
  }, [levelEpisodes, completedMap, mounted]);

  return (
    <div className="animate-slide-up">
      <nav className="grid-tabs">
        {[1, 2, 3].map(lv => (
          <button 
            key={lv}
            onClick={() => handleTabClick(lv)} 
            className={`pill-btn ${currentLevel === lv ? 'active' : ''}`} 
            style={{ flex: 1, minWidth: '100px' }}
          >
            {lv === 1 ? t.l1 : lv === 2 ? t.l2 : t.l3}
          </button>
        ))}
      </nav>

      {currentLevel === 3 ? (
        <Level3Notice t={t} />
      ) : (
        <>
          <section className="progress-container">
            <div className="progress-info">
              <span>{t.progress(currentLevel)}</span>
              <span>{stats.completed} / {levelEpisodes.length}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${stats.percent}%` }} />
            </div>
          </section>

          <div className="episode-grid">
            {levelEpisodes.map((episode) => (
              <EpisodeBox 
                key={episode.id} 
                episode={episode} 
                currentLevel={currentLevel} 
                lang={lang} 
                status={mounted ? completedMap[`L${episode.level}_${episode.id}`] : undefined}
              />
            ))}

            {levelEpisodes.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                {t.noEpisodes}
              </div>
            )}
          </div>

          {mounted && stats.completed > 0 && (
            <div className="reset-wrapper">
              <button onClick={handleReset} className="reset-btn">
                {t.reset}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Level3Notice({ t }: { t: any }) {
  return (
    <div className="glass-notice animate-slide-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <div className="l3-notice-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      </div>
      <h3 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>{t.l3Notice}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, maxWidth: '300px' }}>
        {t.l3Desc}
      </p>
      <a href="https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139" target="_blank" rel="noopener noreferrer" className="app-store-btn-custom">
        <svg viewBox="0 0 384 512" width={18} height={18} fill="currentColor">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
        </svg>
        {t.appStore}
      </a>
    </div>
  );
}
