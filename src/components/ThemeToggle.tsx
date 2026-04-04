'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ variant = 'default' }: { variant?: 'default' | 'header' }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('eclavin-theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('eclavin-theme', newTheme);
  };

  if (!mounted) return <div style={{ width: '40px', height: '40px' }} />;

  const isHeader = variant === 'header';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: isHeader ? 'transparent' : 'var(--bg-secondary)',
        border: `1px solid ${isHeader ? 'rgba(255,255,255,0.4)' : 'var(--border-light)'}`,
        color: isHeader ? '#ffffff' : 'var(--text-primary)',
        cursor: 'pointer',
        transition: 'all var(--transition-md)',
        boxShadow: isHeader ? 'none' : 'var(--shadow-md)',
      }}
      onMouseEnter={(e) => {
        if (!isHeader) {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        } else {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isHeader) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
        } else {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
