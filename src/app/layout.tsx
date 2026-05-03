import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.eclavin.com'),
  title: '에클라뱅(Eclavin) - WSET 와인 자격증 합격을 위한 가장 완벽한 퀴즈 가이드',
  description: 'WSET Level 1, 2, 3 자격증 만점 합격을 위한 가장 완벽한 대비 플랫폼 에클라뱅. 500개 이상의 엄선된 연습 문제, 전문가 핵심 이론, 그리고 시험에 나오는 함정 팁까지 모든 와인 지식을 정복하세요.',
  keywords: ['WSET', '와인 교육', 'WSET 레벨 2', 'WSET 레벨 3', '와인 퀴즈', '에클라뱅', '와인 공부법', 'Wine Education', 'Eclavin'],
  openGraph: {
    title: '에클라뱅(Eclavin) - WSET 자격증 만점 합격의 지름길, 프리미엄 와인 퀴즈 가이드',
    description: 'WSET Level 1, 2, 3 자격증 합격을 위한 최고의 솔루션. 에클라뱅에서 엄선된 퀴즈와 전문가의 핵심 이론으로 만점에 도전하고 와인 전문가로 거듭나세요.',
    url: 'https://www.eclavin.com',
    siteName: '에클라뱅(Eclavin)',
    images: [
      {
        url: 'https://www.eclavin.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '에클라뱅 프리미엄 와인 지식 플랫폼',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '에클라뱅(Eclavin) - WSET 와인 자격증 합격을 위한 최고의 선택',
    description: '500개 이상의 엄선된 퀴즈와 전문가의 핵심 이론으로 WSET 합격을 보장하는 프리미엄 와인 플랫폼 에클라뱅입니다.',
    images: ['https://www.eclavin.com/og-image.png'],
  },
  appleWebApp: {
    capable: true,
    title: '에클라뱅(Eclavin)',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=6', type: 'image/x-icon' },
      { url: '/favicon-16x16.png?v=6', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=6', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=6', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://www.eclavin.com',
    languages: {
      'ko-KR': 'https://www.eclavin.com/?lang=ko',
      'en-US': 'https://www.eclavin.com/?lang=en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'cLzx38Y_7Wre_sKiuBdZnQzj9KZFf7X4JI9S9nQt_4I',
    other: {
      'naver-site-verification': '784865e7d742fae47c0a19a6337b28e2736cf1f0',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFCF8' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F0E' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* External Assets */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link 
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css?v=2026" 
          rel="stylesheet" 
          crossOrigin="anonymous" 
        />
      </head>
      <body>
        <Script src="/theme.js" strategy="beforeInteractive" id="theme-init" />
        {/* Speculation Rules - Keep as plain script with hydration suppression */}
        <script
          type="speculationrules"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: 'list',
                  urls: ['/'],
                  where: { href_matches: '/level/* /episode/*' },
                  eagerness: 'moderate',
                },
              ],
            }),
          }}
        />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <div id="app-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
