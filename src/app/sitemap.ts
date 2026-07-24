import { MetadataRoute } from 'next';
import { getAllEpisodes } from '@/lib/episodes';
import { PRACTICE_SLUGS } from '@/lib/practiceConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.eclavin.com';
  // Date of the last real content/markup change — update when content actually changes.
  // (A fake "always now" lastModified teaches crawlers to ignore the field.)
  const contentUpdated = new Date('2026-07-22');
  const contentAdded = new Date('2026-07-24');

  // Standard routes
  const routes = [
    '',
    '/?lang=ko',
    '/?lang=en',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: contentUpdated,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  const l1_ko = getAllEpisodes(1, 'ko').map(e => ({
    url: `${baseUrl}/level/1/episode/${e.id}?lang=ko`,
    lastModified: contentUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const l1_en = getAllEpisodes(1, 'en').map(e => ({
    url: `${baseUrl}/level/1/episode/${e.id}?lang=en`,
    lastModified: contentUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const l2_ko = getAllEpisodes(2, 'ko').map(e => ({
    url: `${baseUrl}/level/2/episode/${e.id}?lang=ko`,
    lastModified: contentUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const l2_en = getAllEpisodes(2, 'en').map(e => ({
    url: `${baseUrl}/level/2/episode/${e.id}?lang=en`,
    lastModified: contentUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // English SEO content: practice hub, per-level practice pages, guides.
  const contentPages = [
    { url: `${baseUrl}/practice`, priority: 0.9 },
    ...PRACTICE_SLUGS.map((slug) => ({ url: `${baseUrl}/practice/${slug}`, priority: 0.9 })),
    { url: `${baseUrl}/guide`, priority: 0.7 },
    { url: `${baseUrl}/guide/wset-level-1-vs-level-2`, priority: 0.7 },
    { url: `${baseUrl}/guide/how-to-pass-wset-level-2`, priority: 0.7 },
  ].map((p) => ({
    url: p.url,
    lastModified: contentAdded,
    changeFrequency: 'weekly' as const,
    priority: p.priority,
  }));

  return [...routes, ...contentPages, ...l1_ko, ...l1_en, ...l2_ko, ...l2_en];
}
