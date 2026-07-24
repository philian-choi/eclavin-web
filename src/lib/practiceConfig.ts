export interface ExamFact {
  value: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PracticeLevelConfig {
  slug: string; // URL segment, e.g. "wset-level-2"
  levelNum: number; // 1 | 2 (matches content folder l{n}_en)
  levelLabel: string; // "Level 2"
  bankSize: number; // total questions in the app bank for this level
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  /** Plain factual lead sentence, ends before the "sample" clause. */
  shortAnswerLead: string;
  facts: ExamFact[];
  coverage: string[];
  faqItems: FaqItem[];
}

const DISCLAIMER_FAQ: FaqItem = {
  q: 'Is Eclavin an official WSET product?',
  a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party practice tool designed to help candidates revise for the exam.',
};

export const PRACTICE_LEVELS: Record<string, PracticeLevelConfig> = {
  'wset-level-1': {
    slug: 'wset-level-1',
    levelNum: 1,
    levelLabel: 'Level 1',
    bankSize: 100,
    metaTitle: 'WSET Level 1 Practice Questions — Free Mock Exam with Answers (2026)',
    metaDescription:
      'Free WSET Level 1 practice questions with answers and clear explanations. Test yourself on wine styles, common grapes, storage and service, then master all 100 questions in the Eclavin app.',
    h1: 'WSET Level 1 Practice Questions',
    subtitle: 'A free mock exam with answers and beginner-friendly explanations. Updated 2026.',
    shortAnswerLead:
      'The WSET Level 1 Award in Wines exam is 30 multiple-choice questions in 45 minutes, with a 70% pass mark (21 correct).',
    facts: [
      { value: '30', label: 'questions' },
      { value: '45', label: 'minutes' },
      { value: '70%', label: 'to pass' },
      { value: '~6h', label: 'typical study' },
    ],
    coverage: [
      'Main types of wine (still, sparkling, fortified)',
      'Common grape varieties and their flavours',
      'How wine is stored and served',
      'Simple food-and-wine pairing',
    ],
    faqItems: [
      {
        q: 'How many questions are on the WSET Level 1 exam?',
        a: 'The WSET Level 1 Award in Wines exam has 30 multiple-choice questions to be completed in 45 minutes. You need 70% (21 correct) to pass. There is no Distinction grade at Level 1.',
      },
      {
        q: 'Is WSET Level 1 hard?',
        a: 'Level 1 is the entry point and the most approachable of the WSET wine qualifications. It is usually taught as a one-day course with around 6 hours of study. Practising real questions is the fastest way to feel ready.',
      },
      {
        q: 'Are these WSET Level 1 practice questions free?',
        a: 'Yes. The questions on this page are a free sample with full answers and explanations. The complete set of 100 Level 1 questions, plus mock exams and a wrong-answer review notebook, is in the Eclavin app.',
      },
      {
        q: 'What does WSET Level 1 cover?',
        a: 'Level 1 introduces the main types of wine, common grape varieties and their flavours, basic storage and service, and simple food pairing. It is designed for beginners and people new to wine in a professional setting.',
      },
      DISCLAIMER_FAQ,
    ],
  },

  'wset-level-2': {
    slug: 'wset-level-2',
    levelNum: 2,
    levelLabel: 'Level 2',
    bankSize: 100,
    metaTitle: 'WSET Level 2 Practice Questions — Free Mock Exam with Answers (2026)',
    metaDescription:
      'Free WSET Level 2 practice questions with answers and expert explanations. Test yourself on grape varieties, wine styles, and food pairing, then master all 100 questions in the Eclavin app.',
    h1: 'WSET Level 2 Practice Questions',
    subtitle: 'A free mock exam with answers and expert explanations. Updated 2026.',
    shortAnswerLead:
      'The WSET Level 2 Award in Wines exam is 50 multiple-choice questions in 60 minutes, with a 55% pass mark (85% for a Distinction).',
    facts: [
      { value: '50', label: 'questions' },
      { value: '60', label: 'minutes' },
      { value: '55%', label: 'to pass' },
      { value: '~28h', label: 'typical study' },
    ],
    coverage: [
      'Principal grape varieties and their characteristics',
      'Major wine regions of the world',
      'Wine styles and how they are made',
      'Sparkling, sweet and fortified wines',
      'Food-and-wine pairing principles',
    ],
    faqItems: [
      {
        q: 'How many questions are on the WSET Level 2 exam?',
        a: 'The WSET Level 2 Award in Wines exam has 50 multiple-choice questions to be completed in 60 minutes. You need 55% (28 correct) to pass and 85% (43 correct) for a Distinction.',
      },
      {
        q: 'How hard is the WSET Level 2 exam?',
        a: 'Most candidates find WSET Level 2 manageable with structured study of about 28 hours. The most-missed topics are grape-variety characteristics and food-and-wine pairing rules, which is why active recall practice matters.',
      },
      {
        q: 'Are these WSET Level 2 practice questions free?',
        a: 'Yes. The questions on this page are a free sample with full answers and explanations. The complete set of 100 Level 2 questions, plus mock exams and a wrong-answer review notebook, is available in the Eclavin app.',
      },
      {
        q: 'What topics does WSET Level 2 cover?',
        a: 'Level 2 covers the principal grape varieties, the major wine regions of the world, wine styles and how they are made, sparkling and fortified wines, wine with food, and label terminology.',
      },
      DISCLAIMER_FAQ,
    ],
  },
};

export const PRACTICE_SLUGS = Object.keys(PRACTICE_LEVELS);

export function getPracticeConfig(slug: string): PracticeLevelConfig | undefined {
  return PRACTICE_LEVELS[slug];
}
