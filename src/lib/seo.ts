import { Episode } from './episodes';
import { BASE_URL, ORGANIZATION, ORG_REF, WEBSITE_ID, WSET_ENTITY, WINE_ENTITY } from './site';

/**
 * Homepage JSON-LD: Organization (declared once, site-wide @id), WebSite,
 * WebPage and Breadcrumb. Per-question markup lives on each question page.
 *
 * Removed on 2026-09-23: a Course/CourseInstance block (the site is a question
 * bank, not a course with sessions) and an Organization sameAs that pointed at
 * Wikidata Q1812975, which is a windmill in Belgium, not WSET.
 */
export function generateSchema(lang: 'ko' | 'en', l1Full: Episode[], l2Full: Episode[]) {
  const isKo = lang === 'ko';
  const total = l1Full.length + l2Full.length;
  const pageUrl = `${BASE_URL}/?lang=${lang}`;

  const organizationJsonLd = { '@context': 'https://schema.org', ...ORGANIZATION };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Eclavin',
    alternateName: '에클라뱅',
    url: BASE_URL,
    inLanguage: ['en', 'ko'],
    publisher: ORG_REF,
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: isKo ? 'WSET 1급·2급 무료 연습문제와 해설' : 'Free WSET Level 1 & 2 Practice Questions with Answers',
    description: isKo
      ? `WSET 1급과 2급 연습문제 ${total}개를 정답과 해설로 무료로 풀 수 있습니다.`
      : `${total} free WSET Level 1 and Level 2 practice questions, each with the answer and a full explanation.`,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: ORG_REF,
    about: [WSET_ENTITY, WINE_ENTITY],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isKo ? '홈' : 'Home',
        item: pageUrl,
      },
    ],
  };

  return {
    breadcrumbJsonLd,
    allJsonLd: [organizationJsonLd, webSiteJsonLd, webPageJsonLd, breadcrumbJsonLd],
  };
}
