import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Eclavin - WSET Exam Mastery';
    const level = searchParams.get('level') || '2';
    const number = searchParams.get('number') || '1';
    const lang = searchParams.get('lang') || 'ko';

    const labels = lang === 'ko' 
      ? { title: 'WSET 기출문제', ep: '에피소드' }
      : { title: 'WSET Practice', ep: 'Episode' };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F8F5F2',
            padding: '40px 80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Logo element placeholder */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
             <div style={{ padding: '8px 12px', backgroundColor: '#121212', color: 'white', borderRadius: '8px', fontSize: '24px', fontWeight: 'bold' }}>
                Eclavin
             </div>
          </div>

          <div style={{ fontSize: '24px', color: '#666', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {labels.title} Level {level}
          </div>

          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#121212',
              marginBottom: '30px',
              lineHeight: 1.2,
              wordBreak: 'keep-all',
              whiteSpace: 'pre-wrap',
              maxWidth: '900px'
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: '20px',
              color: '#888',
              padding: '10px 24px',
              border: '1px solid #DDD',
              borderRadius: '100px',
              fontWeight: 500
            }}
          >
            {labels.ep} {number}
          </div>

          {/* Abstract wine-inspired background elements */}
          <div style={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, borderRadius: '50%', backgroundColor: 'rgba(122, 31, 31, 0.05)' }} />
          <div style={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', backgroundColor: 'rgba(122, 31, 31, 0.03)' }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
