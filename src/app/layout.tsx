import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { Suspense } from 'react';
import { PostHogProvider } from '@/providers/PostHogProvider';
import PostHogPageView from '@/providers/PostHogPageView';
import { headers } from 'next/headers';
import SiteFooter from '@/components/SiteFooter';
import { LANG_HEADER } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.eclavin.com'),
  // Defaults for pages without their own metadata (admin, 404). Every public
  // page sets its own title and description.
  title: 'Eclavin: Free WSET Practice Questions & Study Guides',
  description:
    'Free WSET Level 1 and Level 2 practice questions with answers and explanations, plus study guides and a wine glossary. An independent, unofficial study resource.',
  keywords: ['WSET', 'WSET practice questions', 'WSET Level 1', 'WSET Level 2', 'wine exam', 'Eclavin', '에클라뱅', '와인 자격증'],
  openGraph: {
    title: 'Eclavin: Free WSET Practice Questions & Study Guides',
    description:
      'Free WSET Level 1 and Level 2 practice questions with answers and explanations, plus study guides and a wine glossary.',
    url: 'https://www.eclavin.com',
    siteName: 'Eclavin',
    images: [
      {
        url: 'https://www.eclavin.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eclavin: WSET practice questions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eclavin: Free WSET Practice Questions & Study Guides',
    description:
      'Free WSET Level 1 and Level 2 practice questions with answers and explanations, plus study guides and a wine glossary.',
    images: ['https://www.eclavin.com/og-image.png'],
  },
  appleWebApp: {
    capable: true,
    title: 'Eclavin',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set by src/proxy.ts for bilingual pages. Prerendered English-only pages
  // (guides, grapes, regions, about) get no header and fall back to English.
  const lang = (await headers()).get(LANG_HEADER) === 'ko' ? 'ko' : 'en';

  return (
    <html lang={lang} suppressHydrationWarning className={inter.variable}>
      <head suppressHydrationWarning>
        {/* External Assets */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link 
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css?v=2026" 
          rel="stylesheet" 
          crossOrigin="anonymous" 
        />
        <link rel="alternate" type="application/rss+xml" title="Eclavin study guides" href="/feed.xml" />
      </head>
      <body suppressHydrationWarning>
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
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <div id="app-wrapper">
            {children}
            <SiteFooter lang={lang} />
          </div>
        </PostHogProvider>
      </body>
    </html>
  );
}
