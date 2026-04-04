import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Episode } from '@/lib/episodes';

export function useEpisodeQuiz(episode: Episode, lang: string) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);

  const hasNext = (episode.level === 1 && episode.number < 50) || (episode.level === 2 && episode.number < 100);
  const hasPrev = episode.number > 1;

  const getUrl = useCallback((num: number) =>
    `/level/${episode.level}/episode/episode_${num.toString().padStart(3, '0')}?lang=${lang}`,
    [episode.level, lang]
  );

  const navigateNext = useCallback(() => {
    if (hasNext) router.push(getUrl(episode.number + 1));
  }, [hasNext, router, getUrl, episode.number]);

  const navigatePrev = useCallback(() => {
    if (hasPrev) router.push(getUrl(episode.number - 1));
  }, [hasPrev, router, getUrl, episode.number]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = useCallback((label: string) => {
    if (selected) return;
    setSelected(label);
    const correctAns = episode.answer.split('.')[0].trim();
    const correct = correctAns === label.trim();
    setIsCorrect(correct);

    try {
      const saved = window.localStorage.getItem('wset_completed');
      const completedMap = saved ? JSON.parse(saved) : {};
      const key = `L${episode.level}_${episode.id}`;
      if (!completedMap[key] || (completedMap[key] === 'incorrect' && correct)) {
        completedMap[key] = correct ? 'correct' : 'incorrect';
        window.localStorage.setItem('wset_completed', JSON.stringify(completedMap));
      }
    } catch (e) { }

    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }, [selected, episode]);

  // Keyboard shortcuts
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    
    if (!selected) {
      const idx = { '1': 0, '2': 1, '3': 2, '4': 3 }[e.key] as number | undefined;
      if (idx !== undefined && episode.options[idx]) { 
        e.preventDefault(); 
        handleSelect(episode.options[idx].label); 
      }
    }
  }, [selected, episode, handleSelect]);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  return {
    selected,
    isCorrect,
    mounted,
    explanationRef,
    hasNext,
    hasPrev,
    getUrl,
    handleSelect
  };
}
