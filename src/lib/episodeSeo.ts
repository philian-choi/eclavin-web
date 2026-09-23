import type { Episode, Language } from './episodes';
import { clip } from './site';

/**
 * Search-facing text for question pages.
 *
 * Titles used to run to ~90 characters (45-character question stub + a long
 * suffix), so search results cut them mid-sentence, and descriptions took the
 * first 60 characters of the question, so questions that open the same way
 * ("Which of the following is the most accurate description of...") shared one
 * description across a dozen pages. The question number keeps every title
 * unique; the budgets keep them inside what a result line shows.
 */
export function episodeTitle(ep: Episode, level: number, lang: Language): string {
  return lang === 'ko'
    ? `${clip(ep.question, 24)} | WSET ${level}급 ${ep.number}번`
    : `${clip(ep.question, 47)} | WSET L${level} Q${ep.number}`;
}

export function episodeDescription(ep: Episode, level: number, lang: Language): string {
  return lang === 'ko'
    ? `WSET ${level}급 연습문제 ${ep.number}번: ${clip(ep.question, 64)} 정답과 해설을 바로 확인하세요.`
    : `WSET Level ${level} practice question ${ep.number}: ${clip(ep.question, 86)} See the answer and a full explanation.`;
}

export function episodeHeading(ep: Episode, level: number, lang: Language): string {
  return lang === 'ko'
    ? `WSET ${level}급 연습문제 ${ep.number}번: ${ep.title}`
    : `WSET Level ${level} Practice Question ${ep.number}: ${ep.title}`;
}
