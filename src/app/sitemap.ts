import { MetadataRoute } from 'next';
import { getAllEpisodes } from '@/lib/episodes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://winel2app.vercel.app';
  
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

  // Dynamic episode routes
  const l1_ko = getAllEpisodes(1, 'ko').map(e => ({
    url: `${baseUrl}/episode/${e.id}?lang=ko`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const l1_en = getAllEpisodes(1, 'en').map(e => ({
    url: `${baseUrl}/episode/${e.id}?lang=en`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...l1_ko, ...l1_en];
}
