import { buildLlmsTxt } from '@/lib/llms';

// Built from the page registries at build time, so it lists every page that exists.
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
