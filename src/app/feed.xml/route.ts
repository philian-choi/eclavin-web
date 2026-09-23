import { GUIDES } from '@/lib/guidesConfig';
import { BASE_URL } from '@/lib/site';

// RSS feed of the study guides, built from the guide registry. Feed readers,
// crawlers and ping tools use it to notice new and updated guides.
export const dynamic = 'force-static';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function rfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

export function GET() {
  const guides = [...GUIDES].sort((a, b) => b.dateModified.localeCompare(a.dateModified));
  const latest = guides[0]?.dateModified ?? '2026-07-24';

  const items = guides
    .map(
      (g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${BASE_URL}/guide/${g.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/guide/${g.slug}</guid>
      <pubDate>${rfc822(g.dateModified)}</pubDate>
      <category>${escapeXml(g.tag)}</category>
      <description>${escapeXml(g.blurb)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Eclavin study guides</title>
    <link>${BASE_URL}/guide</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Plain-language guides to the WSET wine exams from Eclavin, an independent study resource.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
