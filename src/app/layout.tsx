import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://winel2app.vercel.app'),
  title: 'Eclavin - WSET Exam Mastery & Wine Study Guide',
  description: 'The ultimate guide to mastering WSET Level 1, 2, and 3. Practice questions, expert theories, and exam traps to help you pass with distinction.',
  keywords: ['WSET', 'Wine Education', 'WSET Level 2', 'WSET Level 3', 'Wine Quiz', 'Eclavin', 'Wine Study Guide'],
  appleWebApp: {
    capable: true,
    title: 'Eclavin',
    statusBarStyle: 'black-translucent',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/?lang=ko',
      'en-US': '/?lang=en',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Accessibility: allow zoom
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('eclavin-theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var initialTheme = savedTheme || systemTheme;
                  document.documentElement.setAttribute('data-theme', initialTheme);
                } catch (e) {
                  console.warn('Theme init error', e);
                }
              })();
            `,
          }}
        />
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        
        {/* External Assets with Performance Preconnects */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css?v=2026" rel="stylesheet" />
        
        {/* Precision Performance: Speculation Rules */}
        <script
          type="speculationrules"
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
      </head>
      <body>
        <div id="app-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
