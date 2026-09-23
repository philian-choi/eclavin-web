import { NextResponse, type NextRequest } from 'next/server';
import { LANG_HEADER, resolveLang } from '@/lib/site';

/**
 * Tells the root layout which language the page is rendered in, so <html lang>
 * matches the content. The layout cannot read ?lang itself, and every page used
 * to ship lang="ko", English pages included.
 *
 * English-only sections (guides, grapes, regions, about) are left out of the
 * matcher: they are prerendered, the layout falls back to "en" for them, and
 * skipping the proxy keeps them served straight from the cache.
 */
export function proxy(request: NextRequest) {
  const lang = resolveLang(
    request.nextUrl.searchParams.get('lang'),
    request.headers.get('x-vercel-ip-country'),
  );
  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, lang);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|ingest|guide|grape|region|about|.*\\..*).*)'],
};
