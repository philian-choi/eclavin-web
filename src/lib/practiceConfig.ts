export type PracticeLang = 'en' | 'ko';

export interface ExamFact {
  value: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LevelCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  /** Plain factual lead sentence, ends before the "sample" clause. */
  shortAnswerLead: string;
  factLabels: string[]; // labels for the shared fact values, in order
  /** 2-3 paragraphs of unique supporting copy about the exam (SEO depth). */
  about: string[];
  coverage: string[];
  faqItems: FaqItem[];
}

export interface PracticeLevelConfig {
  slug: string; // URL segment, e.g. "wset-level-2"
  levelNum: number; // 1 | 2 (matches content folder l{n} / l{n}_en)
  levelLabel: string; // "Level 2"
  bankSize: number; // total questions in the app bank for this level
  factValues: string[]; // shared across languages, in order
  copy: Record<PracticeLang, LevelCopy>;
}

const DISCLAIMER_FAQ: Record<PracticeLang, FaqItem> = {
  en: {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET. It is a third-party practice tool designed to help candidates revise for the exam.',
  },
  ko: {
    q: '에클라뱅은 WSET 공식 앱인가요?',
    a: '아닙니다. 에클라뱅은 독립적으로 만든 학습 앱이며 WSET과 제휴하거나 공인받은 관계가 없습니다. 시험 복습을 돕는 제3자 연습 도구입니다.',
  },
};

export const PRACTICE_LEVELS: Record<string, PracticeLevelConfig> = {
  'wset-level-1': {
    slug: 'wset-level-1',
    levelNum: 1,
    levelLabel: 'Level 1',
    bankSize: 100,
    factValues: ['30', '45', '70%', '~6h'],
    copy: {
      en: {
        metaTitle: 'WSET Level 1 Practice Questions — Free Mock Exam with Answers (2026)',
        metaDescription:
          'Free WSET Level 1 practice questions with answers and clear explanations. Test yourself on wine styles, common grapes, storage and service, then master all 100 questions in the Eclavin app.',
        h1: 'WSET Level 1 Practice Questions',
        subtitle: 'A free mock exam with answers and beginner-friendly explanations. Updated 2026.',
        shortAnswerLead:
          'The WSET Level 1 Award in Wines exam is 30 multiple-choice questions in 45 minutes, with a 70% pass mark (21 correct).',
        factLabels: ['questions', 'minutes', 'to pass', 'typical study'],
        about: [
          'The WSET Level 1 Award in Wines is the entry point to formal wine study. The exam is a single closed-book paper of 30 multiple-choice questions in 45 minutes, and you pass at 70%. It is usually taught in one day, so it rewards a clear grasp of the basics rather than deep detail.',
          'The questions test the main types of wine, a handful of common grape varieties and their flavours, how wine is stored and served, and simple food-and-wine pairing. If you can recognise these confidently, you are ready.',
          'Use this page to practise under real conditions. Answer each question before you reveal the explanation, and read the explanation even when you are right, so the reasoning sticks.',
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
            a: 'Level 1 is the entry point and the most approachable of the WSET wine qualifications. It is usually taught as a one-day course with around 6 hours of study.',
          },
          {
            q: 'Are these WSET Level 1 practice questions free?',
            a: 'Yes. The questions on this page are a free sample with full answers and explanations. The complete set of 100 Level 1 questions, plus mock exams and a wrong-answer review notebook, is in the Eclavin app.',
          },
          {
            q: 'What does WSET Level 1 cover?',
            a: 'Level 1 introduces the main types of wine, common grape varieties and their flavours, basic storage and service, and simple food pairing. It is designed for beginners.',
          },
          DISCLAIMER_FAQ.en,
        ],
      },
      ko: {
        metaTitle: 'WSET 1급(Level 1) 기출·연습문제 — 무료 모의고사와 해설 (2026)',
        metaDescription:
          'WSET 1급(Level 1) 무료 연습문제를 해설과 함께 풀어보세요. 와인 종류, 대표 품종, 보관과 서비스를 점검하고, 에클라뱅 앱에서 100문제 전체를 정복하세요.',
        h1: 'WSET 1급 연습문제',
        subtitle: '무료 모의고사와 초보자용 해설. 2026년 최신.',
        shortAnswerLead:
          'WSET 1급(Level 1) 시험은 45분 동안 4지선다 30문제를 풉니다. 합격 기준은 70%(21문제)입니다.',
        factLabels: ['문제', '분', '합격 기준', '권장 학습'],
        about: [
          'WSET 1급(Level 1)은 와인 공부의 입문 단계입니다. 시험은 45분 동안 4지선다 30문제를 푸는 한 장짜리 시험이고, 70%를 맞히면 합격입니다. 보통 하루 과정이라 깊은 지식보다 기본을 또렷이 아는 것이 중요합니다.',
          '문제는 와인의 기본 종류, 대표 품종 몇 가지와 그 향미, 보관과 서비스, 간단한 음식 페어링을 다룹니다. 이것들을 자신 있게 알아보면 준비가 된 것입니다.',
          '이 페이지에서 실제처럼 연습하세요. 해설을 열기 전에 먼저 답하고, 맞았을 때도 해설을 읽어 근거를 몸에 익히세요.',
        ],
        coverage: [
          '와인의 기본 종류(스틸·스파클링·주정강화)',
          '대표 포도 품종과 향미',
          '와인 보관과 서비스',
          '간단한 음식 페어링',
        ],
        faqItems: [
          {
            q: 'WSET 1급 시험은 몇 문제인가요?',
            a: 'WSET 1급(Level 1) 시험은 45분 동안 4지선다 30문제를 풉니다. 70%(21문제)를 맞히면 합격입니다. 1급에는 우수 합격(Distinction) 등급이 없습니다.',
          },
          {
            q: 'WSET 1급은 어렵나요?',
            a: '1급은 입문 단계로 WSET 와인 자격증 중 가장 쉽습니다. 보통 하루 과정으로 진행되며 약 6시간 정도 공부합니다.',
          },
          {
            q: '이 1급 연습문제는 무료인가요?',
            a: '네. 이 페이지의 문제는 해설이 포함된 무료 샘플입니다. 1급 100문제 전체와 모의고사, 오답 복습 노트는 에클라뱅 앱에 있습니다.',
          },
          {
            q: 'WSET 1급은 무엇을 다루나요?',
            a: '1급은 와인의 기본 종류, 대표 품종과 향미, 기본 보관과 서비스, 간단한 음식 페어링을 다룹니다. 초보자를 위한 과정입니다.',
          },
          DISCLAIMER_FAQ.ko,
        ],
      },
    },
  },

  'wset-level-2': {
    slug: 'wset-level-2',
    levelNum: 2,
    levelLabel: 'Level 2',
    bankSize: 100,
    factValues: ['50', '60', '55%', '~28h'],
    copy: {
      en: {
        metaTitle: 'WSET Level 2 Practice Questions — Free Mock Exam with Answers (2026)',
        metaDescription:
          'Free WSET Level 2 practice questions with answers and expert explanations. Test yourself on grape varieties, wine styles, and food pairing, then master all 100 questions in the Eclavin app.',
        h1: 'WSET Level 2 Practice Questions',
        subtitle: 'A free mock exam with answers and expert explanations. Updated 2026.',
        shortAnswerLead:
          'The WSET Level 2 Award in Wines exam is 50 multiple-choice questions in 60 minutes, with a 55% pass mark (85% for a Distinction).',
        factLabels: ['questions', 'minutes', 'to pass', 'typical study'],
        about: [
          'The WSET Level 2 Award in Wines goes deeper than Level 1. The exam is 50 multiple-choice questions in 60 minutes, closed book, and you pass at 55%, with a Distinction at 85%. Most candidates study around 28 hours.',
          'It tests the principal grape varieties and why they taste as they do, the major wine regions, how wine styles are made, sparkling and fortified wines, and food-and-wine pairing. The most-missed areas are grape characteristics and pairing rules.',
          'Use this page for active recall. Work through the questions, read every explanation, and note the ones you miss so you can come back to them. That habit, repeated, is what turns study hours into a pass.',
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
          DISCLAIMER_FAQ.en,
        ],
      },
      ko: {
        metaTitle: 'WSET 2급(Level 2) 기출·연습문제 — 무료 모의고사와 해설 (2026)',
        metaDescription:
          'WSET 2급(Level 2) 무료 연습문제를 전문가 해설과 함께 풀어보세요. 포도 품종, 와인 스타일, 음식 페어링을 점검하고, 에클라뱅 앱에서 100문제 전체를 정복하세요.',
        h1: 'WSET 2급 연습문제',
        subtitle: '무료 모의고사와 전문가 해설. 2026년 최신.',
        shortAnswerLead:
          'WSET 2급(Level 2) 시험은 60분 동안 4지선다 50문제를 풉니다. 합격 기준은 55%(28문제), 우수 합격(Distinction)은 85%(43문제)입니다.',
        factLabels: ['문제', '분', '합격 기준', '권장 학습'],
        about: [
          'WSET 2급(Level 2)은 1급보다 깊이 들어갑니다. 시험은 60분 동안 4지선다 50문제이고, 책을 보지 않고 풉니다. 55%면 합격, 85%면 우수 합격입니다. 대개 약 28시간을 공부합니다.',
          '대표 품종과 그 맛의 이유, 주요 산지, 와인 스타일을 만드는 법, 스파클링·주정강화 와인, 음식 페어링을 다룹니다. 가장 많이 틀리는 곳은 품종 특징과 페어링 규칙입니다.',
          '이 페이지로 인출 연습을 하세요. 문제를 풀고 해설을 다 읽고, 틀린 것은 표시해 다시 보세요. 이 습관을 반복하는 것이 공부 시간을 합격으로 바꿉니다.',
        ],
        coverage: [
          '대표 포도 품종과 특징',
          '세계 주요 와인 산지',
          '와인 스타일과 만드는 방법',
          '스파클링·스위트·주정강화 와인',
          '음식 페어링 원칙',
        ],
        faqItems: [
          {
            q: 'WSET 2급 시험은 몇 문제인가요?',
            a: 'WSET 2급(Level 2) 시험은 60분 동안 4지선다 50문제를 풉니다. 55%(28문제)를 맞히면 합격이고, 85%(43문제)면 우수 합격(Distinction)입니다.',
          },
          {
            q: 'WSET 2급은 얼마나 어렵나요?',
            a: '대부분 약 28시간을 체계적으로 공부하면 합격할 수 있습니다. 가장 많이 틀리는 부분은 품종별 특징과 음식 페어링 규칙이라, 반복해서 문제로 익히는 것이 중요합니다.',
          },
          {
            q: '이 2급 연습문제는 무료인가요?',
            a: '네. 이 페이지의 문제는 해설이 포함된 무료 샘플입니다. 2급 100문제 전체와 모의고사, 오답 복습 노트는 에클라뱅 앱에 있습니다.',
          },
          {
            q: 'WSET 2급은 무엇을 다루나요?',
            a: '2급은 대표 품종, 세계 주요 산지, 와인 스타일과 제조법, 스파클링·주정강화 와인, 음식 페어링, 라벨 용어를 다룹니다.',
          },
          DISCLAIMER_FAQ.ko,
        ],
      },
    },
  },
};

export const PRACTICE_SLUGS = Object.keys(PRACTICE_LEVELS);

export function getPracticeConfig(slug: string): PracticeLevelConfig | undefined {
  return PRACTICE_LEVELS[slug];
}

export function getFacts(cfg: PracticeLevelConfig, lang: PracticeLang): ExamFact[] {
  return cfg.factValues.map((value, i) => ({ value, label: cfg.copy[lang].factLabels[i] }));
}
