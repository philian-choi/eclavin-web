import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Share image for any page: /api/og?title=...&kicker=...&lang=en|ko
 * Old question-page links (title + level + number) still work.
 *
 * Two bugs made every image go out as an empty 200 response until 2026-09-23:
 * - Satori refuses a <div> with more than one child unless it is display:flex,
 *   and labels like "Level {level}" render as several text children, so the
 *   render threw after the headers were sent.
 * - The default font has no Hangul, so Korean titles could not be drawn.
 * Every element below holds a single string, and the font is Noto Sans KR,
 * fetched as a subset of just the characters on the card.
 */

async function loadFont(text: string, weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

function clip(text: string, max: number): string {
  // Noto Sans KR draws curly quotes full-width, which reads like a stray space.
  const clean = text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.·-]+$/, '')}…`;
}

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const lang = sp.get('lang') === 'ko' ? 'ko' : 'en';
  const level = sp.get('level');
  const number = sp.get('number');

  const title = clip(sp.get('title') || 'Free WSET practice questions', 150);
  const fallbackKicker = level && number
    ? lang === 'ko'
      ? `WSET ${level}급 연습문제 ${number}번`
      : `WSET Level ${level} · Question ${number}`
    : 'Eclavin';
  const kicker = clip(sp.get('kicker') || fallbackKicker, 60);
  const footer = lang === 'ko' ? 'www.eclavin.com · 비공식 학습 자료' : 'www.eclavin.com · Unofficial study resource';
  const titleSize = title.length > 110 ? 40 : title.length > 70 ? 48 : 58;

  const glyphs = `Eclavin${kicker}${title}${footer}`;
  const [regular, bold] = await Promise.all([loadFont(glyphs, 400), loadFont(glyphs, 700)]);
  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[] = [];
  if (regular) fonts.push({ name: 'Noto Sans KR', data: regular, weight: 400, style: 'normal' });
  if (bold) fonts.push({ name: 'Noto Sans KR', data: bold, weight: 700, style: 'normal' });

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F8F5F2',
          padding: '64px 80px',
          fontFamily: fonts.length ? 'Noto Sans KR' : 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: 9999,
            backgroundColor: 'rgba(131, 45, 50, 0.07)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              padding: '8px 18px',
              backgroundColor: '#832d32',
              color: '#FFFFFF',
              borderRadius: 10,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Eclavin
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 28, color: '#832d32', fontWeight: 700, marginBottom: 18 }}>
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.25,
              maxWidth: 1040,
              wordBreak: lang === 'ko' ? 'keep-all' : 'normal',
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#605E5A' }}>{footer}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        // The image depends only on the query string, so the CDN can keep it.
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
  );
}
