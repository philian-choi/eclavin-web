import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Eclavin - WSET Exam Mastery',
    short_name: 'Eclavin',
    description: 'The ultimate WSET exam preparation guide for Level 1, 2, and 3. Practice questions and expert theories.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5F2',
    theme_color: '#121212',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
