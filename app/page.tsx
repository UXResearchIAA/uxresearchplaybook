import Link from 'next/link';
import { allMethods } from '@/content/methods/index';
import EntryCards from '@/components/home/EntryCards';
import MethodQuickLinks from '@/components/home/MethodQuickLinks';

const protoMethods = allMethods
  .filter(m => m.status === 'prototype')
  .map(m => ({ slug: m.slug, name: m.name, axis: m.axis, scale: m.scale }));

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 5rem) 0 2.5rem',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="page-container">
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-faint)',
            marginBottom: '0.75rem',
          }}>
            Internal tool · Prototype
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            maxWidth: '620px',
          }}>
            What do you need to do?
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-ink-muted)',
            maxWidth: '540px',
            lineHeight: 1.65,
          }}>
            A decision-support and operational tool for experienced UX researchers.
            Start from &ldquo;What do I need to learn?&rdquo; — not &ldquo;What method do I want to use?&rdquo;
          </p>
        </div>
      </section>

      {/* Entry Points */}
      <section aria-label="Primary entry points" style={{ padding: '2.5rem 0' }}>
        <div className="page-container">
          <EntryCards />
        </div>
      </section>

      {/* Method Library Quick Access */}
      <section style={{
        padding: '2rem 0 3rem',
        borderTop: '1px solid var(--color-border)',
      }}>
        <div className="page-container">
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 400,
              color: 'var(--color-ink-muted)',
            }}>
              Prototype methods
            </h2>
            <Link href="/methods" style={{ fontSize: '0.85rem', color: 'var(--color-accent)' }}>
              View all methods →
            </Link>
          </div>
          <MethodQuickLinks methods={protoMethods} />
        </div>
      </section>
    </main>
  );
}
