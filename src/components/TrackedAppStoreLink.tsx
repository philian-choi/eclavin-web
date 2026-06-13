'use client';

import { usePostHog } from 'posthog-js/react';
import React from 'react';

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedAppStoreLink({ href, className, children }: Props) {
  const posthog = usePostHog();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        posthog?.capture('AppStore_Click');
      }}
    >
      {children}
    </a>
  );
}
