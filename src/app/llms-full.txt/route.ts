import { buildLlmsFullTxt } from '@/lib/llms';

// Built from the page registries at build time, so it matches what the pages say.
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
