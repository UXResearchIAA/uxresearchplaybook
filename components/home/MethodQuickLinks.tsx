'use client';

import Link from 'next/link';
import type { MethodStub } from '@/content/methods/index';

export default function MethodQuickLinks({ methods }: { methods: Pick<MethodStub, 'slug' | 'name' | 'axis' | 'scale'>[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '0.75rem',
    }}>
      {methods.map(method => (
        <Link key={method.slug} href={`/methods/${method.slug}`} style={{ textDecoration: 'none' }}>
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '7px',
              padding: '1rem 1.15rem',
              transition: 'border-color 0.12s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-hi)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'}
          >
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              color: 'var(--color-ink)',
              marginBottom: '0.35rem',
              fontWeight: 400,
            }}>
              {method.name}
            </p>
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--color-ink-muted)',
              lineHeight: 1.4,
              margin: 0,
            }}>
              {method.axis} · {method.scale}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
