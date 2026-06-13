'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
      
      if (phKey) {
        posthog.init(phKey, {
          api_host: phHost,
          person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
          capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        });
      }
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
