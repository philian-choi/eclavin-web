import React from 'react';

export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    title: (
      <>
        와인 지식의
        <br />
        모든 것
      </>
    ),
    desc: (
      <>
        WSET 합격을 위한 가장 완벽한 준비
        <br />
        반복 학습을 통해 만점에 도전하세요.
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
    l3Desc: '더 깊이 있는 학습과 실전 문제 1,800개를 앱에서 만나보세요.',
    appStore: '앱스토어에서 보기',
    noEpisodes: '해당하는 에피소드가 없습니다',
    
    // Quiz View
    back: '뒤로',
    correct: '정답입니다!',
    incorrect: '틀렸습니다',
    expert: '핵심 이론 마스터',
    tip: '시험 함정 & 합격 팁',
    promo_sub: '더 많은 기출문제와 모의고사는?',
    promo_main: '에클라뱅 앱 스토어 다운로드',
    prev: '이전',
    next: '다음',
    swipeHint: '← 스와이프하여 이동 →',
    keyHint: '1~4 답안 선택 · ← → 이동',
    banner_badge: 'MOBILE APP',
    banner_title: '에클라뱅 앱으로 완성하는 와인 마스터',
    banner_desc: '언제 어디서나 스마트폰으로 1,800개 이상의 WSET 실전 기출문제와 상세 해설을 만나보세요.',
    banner_feature1: 'Level 1, 2, 3 전 과정 완벽 지원',
    banner_feature2: '오답 노트 및 기출 오답 패턴 분석',
    banner_feature3: '시험 적중률 높은 실전 모의고사',
    banner_download: 'App Store에서 다운로드',
  },
  en: {
    title: (
      <>
        Test your
        <br />
        wine knowledge
      </>
    ),
    desc: 'The most complete preparation for the WSET certification. Achieve a perfect score through repetitive learning.',
    // Grid View
    l1: 'Level 1',
    l2: 'Level 2',
    l3: 'Level 3',
    progress: (lv: number) => `Level ${lv} Progress`,
    reset: 'Reset Progress',
    confirm: 'Reset all progress?',
    l3Notice: 'Level 3 is exclusive to our Mobile App.',
    l3Desc: 'Get access to 1,800+ advanced questions and specialized content on mobile.',
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
    banner_desc: 'Access 1,800+ WSET practice questions and detailed explanations on your smartphone, anytime.',
    banner_feature1: 'Full support for Level 1, 2 & 3',
    banner_feature2: 'Smart study notes & error analysis',
    banner_feature3: 'High-yield mock exam simulator',
    banner_download: 'Download on the App Store',
  },
} as const;

export function getTranslations(lang: Language) {
  // @ts-ignore - Handle flexible language keys safely
  return translations[lang] || translations.ko;
}
