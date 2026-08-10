import Link from 'next/link';
import type { MethodStub } from '@/content/methods/index';

export default function MethodCard({ method }: { method: MethodStub }) {
  const hasContent = method.status === 'prototype';

  return (
    <article style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      opacity: hasContent ? 1 : 0.72,
      transition: 'border-color 0.12s',
      height: '100%',
    }}>
      {/* Status */}
      {!hasContent && (
        <span style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-faint)',
        }}>
          Planned — content coming
        </span>
      )}

      {/* Name */}
      {hasContent ? (
        <Link href={`/methods/${method.slug}`} style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          fontWeight: 400,
          color: 'var(--color-ink)',
          textDecoration: 'none',
          lineHeight: 1.3,
        }}>
          {method.name}
        </Link>
      ) : (
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          fontWeight: 400,
          color: 'var(--color-ink)',
          margin: 0,
          lineHeight: 1.3,
        }}>
          {method.name}
        </p>
      )}

      {/* Tagline */}
      <p style={{
        fontSize: '0.83rem',
        color: 'var(--color-ink-muted)',
        lineHeight: 1.5,
        margin: 0,
        flex: 1,
      }}>
        {method.tagline}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
        <span className={`tag tag-${method.axis}`}>{method.axis}</span>
        <span className={`tag tag-${method.scale}`}>{method.scale}</span>
        {method.phases.slice(0, 2).map(p => (
          <span key={p} className="tag tag-phase">{p}</span>
        ))}
      </div>

      {/* CTA */}
      {hasContent && (
        <Link href={`/methods/${method.slug}`} style={{
          fontSize: '0.82rem',
          color: 'var(--color-accent)',
          textDecoration: 'none',
          fontWeight: 500,
          marginTop: '0.15rem',
        }}>
          View method →
        </Link>
      )}
    </article>
  );
}
