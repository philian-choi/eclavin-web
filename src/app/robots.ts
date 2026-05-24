import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard crawlers: full access
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        // 2026: Explicitly allow major AI web crawlers for GEO/LLM indexing
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Googlebot-Extended', 'anthropic-ai', 'cohere-ai', 'YouBot', 'Diffbot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.eclavin.com/sitemap.xml',
    // 2025/2026 LLM standard: llms.txt for AI assistant knowledge base
    // https://www.eclavin.com/llms.txt
    // https://www.eclavin.com/llms-full.txt
  };
}
