// Publish gate: checks every page in the sitemap the way a crawler sees it.
//
//   node scripts/seo-check.mjs                     # the live site
//   node scripts/seo-check.mjs http://localhost:3999   # a local production build
//
// Fails (exit 1) on anything the fire-your-seo-agency checklist treats as a
// blocker: a page that does not answer 200, a noindex, a canonical or <html lang>
// that does not match the page, JSON-LD that does not parse, FAQ markup that
// differs from the text on screen, duplicate titles or descriptions, an English
// title outside 50-60 characters or description outside 150-160, a missing
// share image or not-affiliated notice, or an internal link that is broken.
// Korean lengths are measured with Hangul counted double and only warned about.

const PUBLIC = 'https://www.eclavin.com';
const base = (process.argv[2] || PUBLIC).replace(/\/$/, '');
const EN_ONLY = ['/guide', '/grape', '/region', '/about'];
const CONCURRENCY = 8;

const fails = [];
const warns = [];
const fail = (url, msg) => fails.push(`${url.replace(PUBLIC, '')}: ${msg}`);
const warn = (url, msg) => warns.push(`${url.replace(PUBLIC, '')}: ${msg}`);

const local = (u) => u.replace(PUBLIC, base);

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function visibleText(html) {
  return decode(
    html
      .replace(/<(script|style|noscript|template)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

const width = (s) => [...s].reduce((w, c) => w + (/[ᄀ-ᇿ㄰-㆏가-힣]/.test(c) ? 2 : 1), 0);

async function pool(items, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await fn(items[k]);
      }
    }),
  );
  return out;
}

async function get(url) {
  try {
    const res = await fetch(local(url), { headers: { 'User-Agent': 'eclavin-seo-check' }, redirect: 'follow' });
    return { status: res.status, body: await res.text() };
  } catch (e) {
    return { status: -1, body: String(e) };
  }
}

function expectedLang(url) {
  const path = url.replace(PUBLIC, '') || '/';
  if (EN_ONLY.some((p) => path === p || path.startsWith(`${p}/`))) return 'en';
  const m = url.match(/[?&]lang=(en|ko)/);
  return m ? m[1] : null;
}

function faqMismatches(ldBlocks, text) {
  let bad = 0;
  const walk = (x) => {
    if (Array.isArray(x)) return x.forEach(walk);
    if (!x || typeof x !== 'object') return;
    if (x['@type'] === 'FAQPage') {
      for (const q of x.mainEntity ?? []) {
        const qn = String(q.name).replace(/\s+/g, ' ').trim();
        const an = String(q.acceptedAnswer?.text ?? '').replace(/\s+/g, ' ').trim();
        if (!text.includes(qn) || !text.includes(an)) bad++;
      }
    }
    Object.values(x).forEach((v) => typeof v === 'object' && walk(v));
  };
  ldBlocks.forEach(walk);
  return bad;
}

const sitemap = await get(`${PUBLIC}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.error(`sitemap.xml -> ${sitemap.status}`);
  process.exit(1);
}
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));

const pages = await pool(urls, async (url) => {
  const { status, body } = await get(url);
  if (status !== 200) {
    fail(url, `HTTP ${status}`);
    return null;
  }
  const attr = (re) => {
    const m = body.match(re);
    return m ? decode(m[1]) : null;
  };
  const title = attr(/<title[^>]*>([^<]*)<\/title>/);
  const desc = attr(/<meta name="description" content="([^"]*)"/);
  const canonical = attr(/<link rel="canonical" href="([^"]*)"/);
  const lang = attr(/<html[^>]*\blang="([a-z]+)"/);
  const robots = attr(/<meta name="robots" content="([^"]*)"/) ?? '';
  const ogImage = attr(/<meta property="og:image" content="([^"]*)"/);
  const text = visibleText(body);

  if (robots.includes('noindex')) fail(url, 'noindex');
  if ((canonical ?? '').replace(/\/$/, '') !== url.replace(/\/$/, '')) fail(url, `canonical is ${canonical}`);
  const want = expectedLang(url);
  if (want && lang !== want) fail(url, `<html lang="${lang}"> but the page is ${want}`);
  if (!ogImage) fail(url, 'no share image');
  if (!/not affiliated|비공식|무관/i.test(text)) fail(url, 'no not-affiliated notice');

  const blocks = [];
  for (const m of body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      fail(url, 'JSON-LD does not parse');
    }
  }
  const faqBad = faqMismatches(blocks, text);
  if (faqBad) fail(url, `${faqBad} FAQ answers differ from the text on screen`);

  if (lang === 'en') {
    if (!title || title.length < 50 || title.length > 60) fail(url, `title ${title?.length ?? 0} chars (want 50-60): ${title}`);
    if (!desc || desc.length < 150 || desc.length > 160) fail(url, `description ${desc?.length ?? 0} chars (want 150-160)`);
  } else {
    if (!title || width(title) > 70) warn(url, `Korean title width ${width(title ?? '')} (want <= 70)`);
    if (!desc || width(desc) < 100 || width(desc) > 170) warn(url, `Korean description width ${width(desc ?? '')} (want 100-170)`);
  }

  const links = [...body.matchAll(/<a\b[^>]*href="([^"]+)"/g)]
    .map((m) => decode(m[1]).split('#')[0])
    .filter((h) => h.startsWith('/') || h.startsWith(PUBLIC))
    .map((h) => (h.startsWith('/') ? `${PUBLIC}${h}` : h));
  return { url, title, desc, links };
});

const ok = pages.filter(Boolean);
for (const [key, label] of [['title', 'title'], ['desc', 'description']]) {
  const seen = new Map();
  for (const p of ok) {
    if (!p[key]) continue;
    if (seen.has(p[key])) fail(p.url, `same ${label} as ${seen.get(p[key]).replace(PUBLIC, '')}`);
    else seen.set(p[key], p.url);
  }
}

const targets = [...new Set(ok.flatMap((p) => p.links))];
const statuses = await pool(targets, async (t) => (await get(t)).status);
targets.forEach((t, i) => statuses[i] !== 200 && fail(t, `internal link answers HTTP ${statuses[i]}`));

console.log(`Checked ${urls.length} pages and ${targets.length} internal link targets on ${base}.`);
if (warns.length) console.log(`\n${warns.length} warning(s):\n  ${warns.slice(0, 20).join('\n  ')}`);
if (fails.length) {
  console.log(`\n${fails.length} problem(s):\n  ${fails.slice(0, 40).join('\n  ')}`);
  process.exit(1);
}
console.log('All checks passed.');
