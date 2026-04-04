'use client';

import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function LanguageToggle({ variant = 'default' }: { variant?: 'default' | 'header' }) {
  const { language, toggleLanguage, setLanguage } = useStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    // Auto-detect browser language on first visit
    try {
      if (!localStorage.getItem('wset_lang_auto_detected')) {
        localStorage.setItem('wset_lang_auto_detected', 'true');
        const browserLang = navigator.language || '';
        if (browserLang.startsWith('en') && language === 'ko') {
          setLanguage('en');
          const params = new URLSearchParams(searchParams.toString());
          params.set('lang', 'en');
          router.push(`${pathname}?${params.toString()}`);
        }
      }
    } catch (e) { console.warn('Auto-detect language error', e); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = () => {
    const newLang = language === 'ko' ? 'en' : 'ko';
    toggleLanguage();
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);
    router.push(`${pathname}?${params.toString()}`);
  };

  const rawLang = searchParams.get('lang') || language;
  const lang = (rawLang === 'en' || rawLang === 'ko') ? rawLang : 'ko';

  if (!mounted) return <div style={{ width: '80px', height: '36px' }} />;

  const isHeader = variant === 'header';

  return (
    <button
      onClick={handleToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '20px',
        border: `1px solid ${isHeader ? 'rgba(255,255,255,0.4)' : 'var(--border-light)'}`,
        background: isHeader ? 'transparent' : 'var(--bg-primary)',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: isHeader ? '#ffffff' : 'var(--text-primary)',
        transition: 'all 0.2s'
      }}
    >
      <span style={{ opacity: lang === 'ko' ? 1 : 0.4 }}>KO</span>
      <span style={{ width: '1px', height: '12px', background: isHeader ? 'rgba(255,255,255,0.4)' : 'var(--border-light)' }} />
      <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
    </button>
  );
}
