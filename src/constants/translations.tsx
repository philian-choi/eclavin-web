import React from 'react';

export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    title: (
      <>
        WSET 1급·2급
        <br />
        무료 연습문제
      </>
    ),
    desc: (
      <>
        시험 유형 문제 200개, 모든 문제에 해설이 있습니다.
        <br />
        가입 없이 바로 풀 수 있습니다.
      </>
    ),
    // Grid View
    l1: '레벨 1',
    l2: '레벨 2',
    l3: '레벨 3',
    progress: (lv: number) => `Level ${lv} 학습 현황`,
    reset: '기록 초기화',
    confirm: '모든 학습 기록을 초기화하시겠습니까?',
    l3Notice: 'Level 3 문제는 모바일 앱에서만 지원합니다.',
    l3Desc: '3급 문제는 에클라뱅 앱에 있습니다. 앱에는 1·2·3급 문제가 2,000개 넘게 들어 있습니다.',
    appStore: '앱스토어에서 보기',
    noEpisodes: '해당하는 에피소드가 없습니다',
    
    // Quiz View
    back: '뒤로',
    correct: '정답입니다!',
    incorrect: '틀렸습니다',
    expert: '핵심 이론 마스터',
    tip: '시험 함정 & 합격 팁',
    promo_sub: '더 많은 문제와 모의고사는?',
    promo_main: '에클라뱅 앱 스토어 다운로드',
    prev: '이전',
    next: '다음',
    swipeHint: '← 스와이프하여 이동 →',
    keyHint: '1~4 답안 선택 · ← → 이동',
    banner_badge: 'MOBILE APP',
    banner_title: '에클라뱅 앱으로 완성하는 와인 마스터',
    banner_desc: '1·2·3급 문제 2,000개 이상과 해설, 모의고사, 오답 노트를 아이폰에서 풀 수 있습니다.',
    banner_feature1: 'Level 1·2·3 모두 지원',
    banner_feature2: '오답 노트와 약점 분석',
    banner_feature3: '실제 시험처럼 구성한 모의고사',
    banner_download: 'App Store에서 다운로드',
  },
  en: {
    title: (
      <>
        Free WSET
        <br />
        practice questions
      </>
    ),
    desc: '200 exam-style questions for Level 1 and Level 2, each with a full explanation. Free, no sign-up.',
    // Grid View
    l1: 'Level 1',
    l2: 'Level 2',
    l3: 'Level 3',
    progress: (lv: number) => `Level ${lv} Progress`,
    reset: 'Reset Progress',
    confirm: 'Reset all progress?',
    l3Notice: 'Level 3 is exclusive to our Mobile App.',
    l3Desc: 'Level 3 questions are in the Eclavin app, which has 2,000+ questions across Levels 1, 2 and 3.',
    appStore: 'View on App Store',
    noEpisodes: 'No episodes to show',

    // Quiz View
    back: 'Back',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    expert: 'Expert Concept',
    tip: 'Exam Tip',
    promo_sub: 'Want more practice questions?',
    promo_main: 'Download Eclavin on App Store',
    prev: 'Previous',
    next: 'Next',
    swipeHint: '← Swipe to navigate →',
    keyHint: 'Press 1~4 to answer · ← → to navigate',
    banner_badge: 'MOBILE APP',
    banner_title: 'Master Wine with Eclavin App',
    banner_desc: '2,000+ questions across Levels 1, 2 and 3, with explanations, mock exams and a wrong-answer notebook, on iPhone.',
    banner_feature1: 'Covers Levels 1, 2 and 3',
    banner_feature2: 'Smart study notes & error analysis',
    banner_feature3: 'Full-length mock exams',
    banner_download: 'Download on the App Store',
  },
} as const;

export function getTranslations(lang: Language) {
  // @ts-ignore - Handle flexible language keys safely
  return translations[lang] || translations.ko;
}
