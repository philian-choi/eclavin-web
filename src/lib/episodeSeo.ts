import type { Episode, Language } from './episodes';
import { bestBetween, clip, clipWidth, fitTitle, widthOf } from './site';

/**
 * Search-facing text for question pages.
 *
 * Titles used to run to ~90 characters (45-character question stub + a long
 * suffix), so search results cut them mid-sentence, and descriptions took the
 * first 60 characters of the question, so questions that open the same way
 * ("Which of the following is the most accurate description of...") shared one
 * description across a dozen pages. The question number keeps every title
 * unique; English titles aim for 50-60 characters and descriptions for 150-160.
 * Several tag and ending wordings are tried because a long word at the cut
 * point can leave one wording a few characters short.
 */
export function episodeTitle(ep: Episode, level: number, lang: Language): string {
  if (lang === 'ko') return `${clip(ep.question, 24)} | WSET ${level}급 ${ep.number}번`;
  const tags = [`WSET L${level} Q${ep.number}`, `WSET Level ${level} Q${ep.number}`, `WSET L${level} Question ${ep.number}`];
  return fitTitle([
    ...tags.map((tag) => `${clip(ep.question, 60 - tag.length - 3)} | ${tag}`),
    `${ep.question} | WSET Level ${level} Question ${ep.number}`,
    `${ep.question} | ${tags[0]} | Eclavin`,
  ]);
}

export function episodeDescription(ep: Episode, level: number, lang: Language): string {
  if (lang === 'ko') {
    // Sized by display width (Hangul counts double): 100-170, like the English 150-160.
    const tails = ['정답과 해설을 바로 확인하세요.', '네 개의 보기 중 답을 고른 뒤 정답과 해설을 바로 확인하세요.'];
    for (const tail of tails) {
      const lead = `WSET ${level}급 연습문제 ${ep.number}번:`;
      const text = `${lead} ${clipWidth(ep.question, 170 - widthOf(lead) - widthOf(tail) - 2)} ${tail}`;
      if (widthOf(text) >= 100) return text;
    }
    return `WSET ${level}급 연습문제 ${ep.number}번: ${ep.question} ${tails[1]}`;
  }
  const head = `WSET Level ${level} practice question ${ep.number}`;
  const tails = ['See the answer and a full explanation.', 'Answer and explanation included.', 'With the answer and a worked explanation.'];
  const texts: string[] = [];
  for (const tail of tails) {
    const budget = 160 - (head.length + tail.length + 3);
    texts.push(`${head}: ${clip(ep.question, budget)} ${tail}`);
  }
  // Short questions: naming the topic says what the page covers. The short
  // topic drops the subtitle ("Riesling (The Aromatic Wonder)" -> "Riesling").
  const shortTopic = ep.title.split(/\s[-–—]\s|\s\(/)[0].trim();
  for (const tail of tails) texts.push(`WSET Level ${level} question ${ep.number} on ${shortTopic}: ${ep.question} ${tail}`);
  for (const tail of tails) texts.push(`${head} (${ep.title}): ${ep.question} ${tail}`);
  return bestBetween(texts);
}

export function episodeHeading(ep: Episode, level: number, lang: Language): string {
  return lang === 'ko'
    ? `WSET ${level}급 연습문제 ${ep.number}번: ${ep.title}`
    : `WSET Level ${level} Practice Question ${ep.number}: ${ep.title}`;
}
