'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme, type Theme } from '@/contexts/ThemeContext';

const NAV_LINKS = [
  { href: '/finder', label: 'Find a method' },
  { href: '/methods', label: 'Methods' },
];

// Theme cycle order: system → light → dark → system
const CYCLE: Theme[] = ['system', 'light', 'dark'];

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

function SystemIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3v18"/>
      <path d="M12 3C7 3 3 7 3 12s4 9 9 9"/>
    </svg>
  );
}

const THEME_META: Record<Theme, { icon: React.ReactNode; label: string; next: Theme }> = {
  system: { icon: <SystemIcon />, label: 'System theme',  next: 'light' },
  light:  { icon: <SunIcon />,    label: 'Light theme',   next: 'dark'  },
  dark:   { icon: <MoonIcon />,   label: 'Dark theme',    next: 'system' },
};

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const meta = THEME_META[theme];

  function cycleTheme() {
    setTheme(meta.next);
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

        {/* Right side: nav + theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Desktop nav */}
          <nav aria-label="Primary navigation" style={{ display: 'flex', gap: '0.25rem' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  fontWeight: pathname === link.href ? 500 : 400,
                  background: pathname.startsWith(link.href)
                    ? 'var(--color-accent-dim)'
                    : 'transparent',
                  color: pathname.startsWith(link.href)
                    ? 'var(--color-accent)'
                    : 'var(--color-ink-muted)',
                  transition: 'background 0.12s, color 0.12s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '20px',
            background: 'var(--color-border)',
            flexShrink: 0,
          }} aria-hidden="true" />

          {/* Theme toggle */}
          <button
            onClick={cycleTheme}
            aria-label={`${meta.label} — click to switch to ${THEME_META[meta.next].label}`}
            title={meta.label}
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
            {meta.icon}
          </button>
        </div>
      </div>
    </header>
  );
}
