'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginAction(password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'var(--bg-primary)'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'var(--bg-secondary)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid var(--border-light)',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}>Admin Login</h1>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {error && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          background: 'var(--accent-primary, #722f37)',
          color: 'white',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer'
        }}>
          Login
        </button>
      </form>
    </div>
  );
}
