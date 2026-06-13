'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  // Use reverse proxy path to bypass adblockers
  const phHost = '/ingest';
  
  if (phKey) {
    posthog.init(phKey, {
      api_host: phHost,
      ui_host: 'https://us.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
