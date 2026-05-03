'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logEvent } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track if it's not local development
    // (Optional: remove this if you want to track locally)
    const track = async () => {
      await logEvent({ 
        type: 'page_view', 
        payload: { 
          path: pathname,
          search: searchParams.toString()
        } 
      });
    };
    
    track();
  }, [pathname, searchParams]);

  return null;
}
