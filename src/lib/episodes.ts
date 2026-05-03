import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export type Language = 'ko' | 'en';

export interface Episode {
  id: string;
  number: number;
  level: number;
  title: string;
  question: string;
  options: { label: string; text: string }[];
  answer: string;
  explanation: string;
  theory: string;
  tip: string;
  lang: Language;
}

export interface EpisodeLight {
  id: string;
  number: number;
  level: number;
  question: string;
}

// Durable memory cache for production
const episodeCache: Record<string, Episode[]> = {};
const lightCache: Record<string, EpisodeLight[]> = {};

/**
 * Basic sanitization to strip any HTML tags from raw markdown content
 * to ensure 100% safety during rendering.
 */
function sanitizeContent(str: string): string {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Robust parsing helper to extract sections reliably even if formatting varies slightly.
 */
function extractSection(content: string, keywords: string[] | string): string {
  const keywordList = Array.isArray(keywords) ? keywords : [keywords];
  const normalizedContent = content.normalize('NFC');
  const sections = normalizedContent.split(/##\s*/);
  
  const section = sections.find(s => {
    const firstLine = s.split('\n')[0].toLowerCase().trim().normalize('NFC');
    return keywordList.some(k => firstLine.includes(k.normalize('NFC').toLowerCase()));
  });
  
  if (!section) return "";

  // Clean strings: remove header lines and metadata tags like [Header]
  const cleaned = section.split('\n').slice(1)
    .filter(line => !line.startsWith('##') && !/^-{3,}$/.test(line.trim()))
    .join('\n')
    .replace(/\*\*/g, '')
    .trim();

  return sanitizeContent(cleaned);
}

/**
 * Extracts question and options from raw question section string.
 */
function parseQuestionData(rawSection: string) {
  // Try to find the question marked with Q.
  const questionMatch = rawSection.match(/(?:Q\.|Practice Question:)\s*(.+)/i) || 
                       rawSection.match(/\*\*(.+)\*\*/);
  
  const question = sanitizeContent(questionMatch ? questionMatch[1].replace(/\*/g, '').trim() : "Question not found");

  const getOption = (label: string) => {
    const regex = new RegExp(`${label}\\.\\s*(.+)`, 'i');
    const match = rawSection.match(regex);
    if (!match) return "";
    // Aggressively strip markdown asterisks and sanitize
    return sanitizeContent(match[1].replace(/\*/g, '').trim());
  };

  return {
    question,
    options: [
      { label: 'A', text: getOption('A') },
      { label: 'B', text: getOption('B') },
      { label: 'C', text: getOption('C') },
      { label: 'D', text: getOption('D') },
    ]
  };
}

export const getAllEpisodes = cache((level: number, lang: Language = 'ko'): Episode[] => {
  const cacheKey = `L${level}_${lang}`;
  if (process.env.NODE_ENV === 'production' && episodeCache[cacheKey]) return episodeCache[cacheKey];

  const suffix = lang === 'en' ? '_en' : '';
  const dir = path.join(process.cwd(), 'src', 'content', `l${level}${suffix}`);

  if (!fs.existsSync(dir)) return [];

  const episodes = fs.readdirSync(dir)
    .filter(fn => fn.endsWith('.md'))
    .map(fn => {
      const id = fn.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(dir, fn), 'utf8');
      
      const numMatch = fn.match(/episode_(\d+)/i);
      const titleMatch = content.match(/#\s*(?:Episode\s*\d+:\s*)?(.+)/i);
      
      const qData = parseQuestionData(content);
      const explanation = extractSection(content, ['정답', '해설', 'answer', 'explanation']);
      const theory = extractSection(content, ['핵심', '이론', 'expert', 'concept']);
      const tip = extractSection(content, ['팁', '함정', 'tip', 'trap']);

      // Robust answer extraction (A, B, C, or D)
      const answerMatch = content.match(/(?:정답|Answer):\s*([A-D])/i);
      const answer = (answerMatch ? answerMatch[1] : "A").toUpperCase();

      return {
        id,
        number: parseInt(numMatch?.[1] || "0"),
        level,
        lang,
        title: titleMatch ? titleMatch[1].trim() : `Episode ${numMatch?.[1] || id}`,
        question: qData.question,
        options: qData.options,
        answer,
        explanation,
        theory,
        tip,
      };
    })
    .sort((a, b) => a.number - b.number);

  if (process.env.NODE_ENV === 'production') episodeCache[cacheKey] = episodes;
  return episodes;
});

/**
 * High-performance version for main grid displays.
 */
export const getAllEpisodesLight = cache((level: number, lang: Language = 'ko'): EpisodeLight[] => {
  const cacheKey = `Light_L${level}_${lang}`;
  if (process.env.NODE_ENV === 'production' && lightCache[cacheKey]) return lightCache[cacheKey];

  // If full cache already exists, derive from it
  const fullKey = `L${level}_${lang}`;
  if (process.env.NODE_ENV === 'production' && episodeCache[fullKey]) {
    const derived = episodeCache[fullKey].map(e => ({
      id: e.id,
      number: e.number,
      level: e.level,
      question: e.question
    }));
    lightCache[cacheKey] = derived;
    return derived;
  }

  // Otherwise, do a partial fast-parse
  const suffix = lang === 'en' ? '_en' : '';
  const dir = path.join(process.cwd(), 'src', 'content', `l${level}${suffix}`);

  if (!fs.existsSync(dir)) return [];

  const episodes = fs.readdirSync(dir)
    .filter(fn => fn.endsWith('.md'))
    .map(fn => {
      const id = fn.replace(/\.md$/, '');
      const numMatch = fn.match(/episode_(\d+)/i);
      const content = fs.readFileSync(path.join(dir, fn), 'utf8');
      
      // Fast question match
      const qMatch = content.match(/(?:Q\.|Practice Question:)\s*(.+)/i) || content.match(/\*\*Q\. (.+)\*\*/);
      
      return {
        id,
        number: parseInt(numMatch?.[1] || "0"),
        level,
        question: (qMatch ? qMatch[1] : "").replace(/\*/g, '').trim(),
      };
    })
    .sort((a, b) => a.number - b.number);

  if (process.env.NODE_ENV === 'production') lightCache[cacheKey] = episodes;
  return episodes;
});

export function getEpisode(level: number, id: string, lang: Language = 'ko'): Episode | undefined {
  return getAllEpisodes(level, lang).find(e => e.id === id);
}

export function saveEpisode(episode: Episode) {
  const suffix = episode.lang === 'en' ? '_en' : '';
  const filePath = path.join(process.cwd(), 'src', 'content', `l${episode.level}${suffix}`, `${episode.id}.md`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const originalContent = fs.readFileSync(filePath, 'utf8');
  
  // Reconstruct the main sections
  let newContent = `# ${episode.title}\n\n`;
  
  const questionHeader = episode.lang === 'en' ? '## [WSET L2 Practice Question]' : '## [WSET L2 실전 문제]';
  newContent += `${questionHeader}\n\n`;
  newContent += `Q. ${episode.question}\n\n`;
  episode.options.forEach(opt => {
    newContent += `${opt.label}. ${opt.text}\n`;
  });
  
  newContent += `\n---\n\n`;
  
  const answerHeader = episode.lang === 'en' ? '## [Answer & Explanation]' : '## [정답 및 해설]';
  newContent += `${answerHeader}\n\n`;
  const answerLabel = episode.lang === 'en' ? 'Answer' : '정답';
  const explanationLabel = episode.lang === 'en' ? 'Explanation' : '해설';
  
  const correctOptionText = episode.options.find(o => o.label === episode.answer)?.text || "";
  newContent += `${answerLabel}: ${episode.answer}. ${correctOptionText}\n\n`;
  newContent += `${explanationLabel}: ${episode.explanation}\n\n`;
  
  newContent += `---\n\n`;
  
  const theoryHeader = episode.lang === 'en' ? '## [Core Theory Master]' : '## [핵심 이론 마스터]';
  newContent += `${theoryHeader}\n\n`;
  newContent += `${episode.theory}\n\n`;
  
  newContent += `---\n\n`;
  
  const tipHeader = episode.lang === 'en' ? '## [Exam Tip & Trap]' : '## [시험 함정 & 합격 팁]';
  newContent += `${tipHeader}\n\n`;
  newContent += `${episode.tip}\n\n`;
  
  newContent += `---\n\n`;

  // Preserve the Threads & Shorts section if it exists
  const scriptMatch = originalContent.match(/## \[Threads & Shorts Scripts\][\s\S]*/);
  if (scriptMatch) {
    newContent += scriptMatch[0];
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  
  // Clear caches
  const cacheKey = `L${episode.level}_${episode.lang}`;
  const lightKey = `Light_L${episode.level}_${episode.lang}`;
  delete episodeCache[cacheKey];
  delete lightCache[lightKey];
}
