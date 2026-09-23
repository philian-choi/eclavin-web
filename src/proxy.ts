import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { LANG_HEADER, resolveLang } from '@/lib/site';

/**
 * Two jobs, both before the page renders:
 *
 * 1. Tell the root layout which language the page is rendered in, so
 *    <html lang> matches the content. The layout cannot read ?lang itself.
 *    English-only sections (guides, grapes, regions, about) are prerendered and
 *    fall back to "en" on their own, so for people they skip the proxy.
 *
 * 2. Count visits from AI and search crawlers. Crawls come before citations,
 *    so the crawl count is the earliest sign that AI search is picking the site
 *    up. Each crawler request sends one "crawler_visit" event to PostHog in the
 *    background (waitUntil), without delaying the response. People are never
 *    tracked here.
 */

const CRAWLERS: { name: string; kind: 'ai' | 'search'; pattern: RegExp }[] = [
  { name: 'GPTBot', kind: 'ai', pattern: /GPTBot/ },
  { name: 'OAI-SearchBot', kind: 'ai', pattern: /OAI-SearchBot/ },
  { name: 'ChatGPT-User', kind: 'ai', pattern: /ChatGPT-User/ },
  { name: 'ClaudeBot', kind: 'ai', pattern: /ClaudeBot/ },
  { name: 'Claude-SearchBot', kind: 'ai', pattern: /Claude-SearchBot/ },
  { name: 'Claude-User', kind: 'ai', pattern: /Claude-User/ },
  { name: 'PerplexityBot', kind: 'ai', pattern: /PerplexityBot/ },
  { name: 'Perplexity-User', kind: 'ai', pattern: /Perplexity-User/ },
  { name: 'Google-Extended', kind: 'ai', pattern: /Google-Extended/ },
  { name: 'Applebot', kind: 'ai', pattern: /Applebot/ },
  { name: 'Meta-ExternalAgent', kind: 'ai', pattern: /meta-externalagent/i },
  { name: 'Amazonbot', kind: 'ai', pattern: /Amazonbot/ },
  { name: 'Bytespider', kind: 'ai', pattern: /Bytespider/i },
  { name: 'CCBot', kind: 'ai', pattern: /CCBot/ },
  { name: 'Googlebot', kind: 'search', pattern: /Googlebot/ },
  { name: 'Bingbot', kind: 'search', pattern: /bingbot/i },
  { name: 'Yeti', kind: 'search', pattern: /Yeti\// },
];

/**
 * Returns the crawler's name (also sent back as an x-crawler response header,
 * handy for checking the matcher with curl). A user agent containing
 * "eclavin-selftest" is recognised but not counted, so checks leave no trace.
 */
function countCrawler(request: NextRequest, event: NextFetchEvent): string | null {
  const ua = request.headers.get('user-agent') ?? '';
  const bot = CRAWLERS.find((c) => c.pattern.test(ua));
  if (!bot) return null;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || ua.includes('eclavin-selftest')) return bot.name;
  event.waitUntil(
    fetch('https://us.i.posthog.com/i/v0/e/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: key,
        event: 'crawler_visit',
        distinct_id: `crawler:${bot.name}`,
        properties: {
          bot: bot.name,
          kind: bot.kind,
          path: request.nextUrl.pathname,
          lang: request.nextUrl.searchParams.get('lang') ?? '',
          $process_person_profile: false,
        },
      }),
    }).catch(() => undefined),
  );
  return bot.name;
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const crawler = countCrawler(request, event);
  const lang = resolveLang(
    request.nextUrl.searchParams.get('lang'),
    request.headers.get('x-vercel-ip-country'),
  );
  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, lang);
  const response = NextResponse.next({ request: { headers } });
  if (crawler) response.headers.set('x-crawler', crawler);
  return response;
}

export const config = {
  matcher: [
    // Pages whose language depends on ?lang or the visitor's country.
    '/((?!api|_next/static|_next/image|ingest|guide|grape|region|about|.*\\..*).*)',
    // Every page and file (robots.txt, sitemap.xml, llms.txt included), but only
    // when the visitor is a known crawler.
    {
      source: '/((?!api|_next/static|_next/image|ingest).*)',
      has: [
        {
          type: 'header',
          key: 'user-agent',
          value:
            '.*(GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|Google-Extended|Applebot|meta-externalagent|Amazonbot|Bytespider|CCBot|Googlebot|bingbot|Yeti/).*',
        },
      ],
    },
  ],
};
