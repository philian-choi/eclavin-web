import { Episode } from './episodes';

const BASE_URL = 'https://www.eclavin.com';

/**
 * Homepage JSON-LD: Organization, WebSite, Course, Breadcrumb.
 * Per-episode Quiz markup lives on each episode page, not here.
 */
export function generateSchema(lang: 'ko' | 'en', l1Full: Episode[], l2Full: Episode[]) {
  const isKo = lang === 'ko';

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Eclavin',
    'alternateName': '에클라뱅',
    'url': BASE_URL,
    'logo': `${BASE_URL}/icon-512x512.png`,
    'sameAs': [
      'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139',
      'https://www.wikidata.org/wiki/Q1812975'
    ],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Eclavin',
    'alternateName': '에클라뱅',
    'url': BASE_URL,
    'inLanguage': isKo ? 'ko-KR' : 'en-US',
  };

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': isKo ? 'WSET 와인 자격증 연습문제 코스' : 'WSET Wine Certification Practice Course',
    'description': isKo
      ? `와인 초보부터 전문가까지, WSET Level 1 & 2 대비 연습문제 ${l1Full.length + l2Full.length}개와 전문가 해설`
      : `${l1Full.length + l2Full.length} WSET Level 1 & 2 practice questions with expert explanations for wine students.`,
    'provider': {
      '@type': 'Organization',
      'name': 'Eclavin',
      'sameAs': BASE_URL,
    },
    'about': [
      { '@type': 'Thing', 'name': 'Wine & Spirit Education Trust (WSET)', 'sameAs': 'https://www.wikidata.org/wiki/Q1812975' },
      { '@type': 'Thing', 'name': 'Wine', 'sameAs': 'https://www.wikidata.org/wiki/Q282' }
    ],
    'courseCode': 'WSET-L1-L2',
    'hasCourseInstance': [
      {
        '@type': 'CourseInstance',
        'courseMode': 'online',
        'courseWorkload': 'PT20H',
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': isKo ? '홈' : 'Home',
        'item': BASE_URL,
      },
    ],
  };

  return {
    courseJsonLd,
    breadcrumbJsonLd,
    allJsonLd: [organizationJsonLd, webSiteJsonLd, courseJsonLd, breadcrumbJsonLd],
  };
}
