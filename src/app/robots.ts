import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/site';

// Admin screens are never for crawlers. /api/og is allowed because it serves the
// share images for question pages; crawlers that honour robots.txt (X's card
// fetcher, for one) could not load them while all of /api/ was blocked.
const ALLOW = ['/', '/api/og'];
const DISALLOW = ['/api/', '/admin'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ALLOW,
        disallow: DISALLOW,
      },
      {
        // Search, answer and training crawlers of AI companies: allowed on
        // purpose, so answers can cite the site. Listed explicitly so the
        // policy is a decision rather than a default.
        userAgent: [
          'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
          'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'anthropic-ai',
          'PerplexityBot', 'Perplexity-User',
          'Google-Extended', 'Applebot-Extended',
          'Meta-ExternalAgent', 'Amazonbot', 'cohere-ai', 'YouBot', 'Diffbot', 'ByteSpider',
        ],
        allow: ALLOW,
        disallow: DISALLOW,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
