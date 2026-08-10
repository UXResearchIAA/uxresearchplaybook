'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/finder', label: 'Find a method' },
  { href: '/methods', label: 'Methods' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
      </div>
    </header>
  );
}
