'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Header() {
  const { theme, setTheme } = useTheme();

  const isLight = theme === 'light';

  function toggleTheme() {
    setTheme(isLight ? 'dark' : 'light');
  }

  return (
    <header style={{
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="page-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        gap: '1rem',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 400,
          color: 'var(--color-ink)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          flexShrink: 0,
        }}>
          UX Research Playbook
        </Link>

        {/* Theme toggle: sun = currently light (click → dark); moon = currently dark (click → light) */}
        <button
          onClick={toggleTheme}
          aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
          title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '5px',
            border: '1px solid var(--color-border)',
            background: 'transparent',
            color: 'var(--color-ink-muted)',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.12s, color 0.12s, border-color 0.12s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.background = 'var(--color-surface-alt)';
            el.style.color = 'var(--color-ink)';
            el.style.borderColor = 'var(--color-border-hi)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.background = 'transparent';
            el.style.color = 'var(--color-ink-muted)';
            el.style.borderColor = 'var(--color-border)';
          }}
        >
          {isLight ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
