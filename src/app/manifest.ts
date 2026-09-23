import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    // Same name and facts as everywhere else on the site (see src/lib/site.ts).
    name: 'Eclavin',
    short_name: 'Eclavin',
    description:
      'Free WSET Level 1 and Level 2 practice questions with answers and explanations. An independent, unofficial study resource.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5F2',
    theme_color: '#121212',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
