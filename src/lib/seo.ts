import { Episode } from './episodes';

/**
 * 2026 Semantic SEO Engine for Eclavin Platform
 * Generates Course and Quiz JSON-LD for maximum search visibility
 */
export function generateSchema(lang: 'ko' | 'en', l1Full: Episode[], l2Full: Episode[]) {
  const isKo = lang === 'ko';
  
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': isKo ? 'WSET 와인 자격증 마스터 클래스' : 'WSET Wine Certification Masterclass',
    'description': isKo 
      ? '와인 초보부터 전문가까지, WSET L1 & L2 레벨을 위한 완벽한 기출 문제 및 해설 강의'
      : 'Complete WSET L1 & L2 practice questions and expert explanations for wine students.',
    'provider': {
      '@type': 'Organization',
      'name': 'Eclavin Education',
      'sameAs': 'https://winel2app.vercel.app'
    },
    'courseCode': 'WSET-L1-L2',
    'hasCourseInstance': [
      {
        '@type': 'CourseInstance',
        'courseMode': 'online',
        'courseWorkload': 'PT20H',
        'instructor': {
          '@type': 'Person',
          'name': 'Eclavin Expert Team'
        }
      }
    ]
  };

  const l1Quiz = l1Full.map(e => ({
    '@type': 'Quiz',
    'name': isKo ? `WSET Level 1 - 에피소드 ${e.number}` : `WSET Level 1 - Episode ${e.number}`,
    'about': {
      '@type': 'Thing',
      'name': e.question
    },
    'hasPart': {
      '@type': 'Question',
      'name': e.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': '전문가 해설 및 정답은 상세 페이지에서 확인 가능합니다.'
      }
    }
  }));

  const l2Quiz = l2Full.map(e => ({
    '@type': 'Quiz',
    'name': isKo ? `WSET Level 2 - 에피소드 ${e.number}` : `WSET Level 2 - Episode ${e.number}`,
    'about': {
      '@type': 'Thing',
      'name': e.question
    },
    'hasPart': {
      '@type': 'Question',
      'name': e.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': '전문가 해설 및 정답은 상세 페이지에서 확인 가능합니다.'
      }
    }
  }));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': isKo ? '홈' : 'Home',
        'item': 'https://winel2app.vercel.app'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'WSET Tutorials',
        'item': 'https://winel2app.vercel.app'
      }
    ]
  };

  return {
    courseJsonLd,
    l1Quiz,
    l2Quiz,
    breadcrumbJsonLd,
    allJsonLd: [courseJsonLd, ...l1Quiz, ...l2Quiz, breadcrumbJsonLd]
  };
}
