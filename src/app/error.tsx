'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>무언가 문제가 발생했습니다!</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>페이지를 불러오는 중 예상치 못한 에러가 발생했습니다.</p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => reset()}
          className="pill-btn"
          style={{ padding: '0.8rem 1.5rem', border: '1px solid var(--border-light)', background: 'transparent' }}
        >
          다시 시도
        </button>
        <Link href="/">
          <button className="pill-btn active" style={{ padding: '0.8rem 1.5rem' }}>
            홈으로 이동
          </button>
        </Link>
      </div>
    </div>
  );
}
