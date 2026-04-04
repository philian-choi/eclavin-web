import { MetadataRoute } from 'next';
import { getAllEpisodes } from '@/lib/episodes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.eclavin.com';
  
  // Standard routes
  const routes = [
    '',
    '/?lang=ko',
    '/?lang=en',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  const l1_ko = getAllEpisodes(1, 'ko').map(e => ({
    url: `${baseUrl}/level/1/episode/${e.id}?lang=ko`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const l1_en = getAllEpisodes(1, 'en').map(e => ({
    url: `${baseUrl}/level/1/episode/${e.id}?lang=en`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const l2_ko = getAllEpisodes(2, 'ko').map(e => ({
    url: `${baseUrl}/level/2/episode/${e.id}?lang=ko`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const l2_en = getAllEpisodes(2, 'en').map(e => ({
    url: `${baseUrl}/level/2/episode/${e.id}?lang=en`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...l1_ko, ...l1_en, ...l2_ko, ...l2_en];
}
