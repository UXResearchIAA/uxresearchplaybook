'use client';

import Link from 'next/link';

const ENTRY_POINTS = [
  {
    verb: 'Decide',
    heading: 'Choose a research method',
    body: 'Not sure which method fits your research question? Start here. The Method Finder leads you through 6 questions and returns 2–4 methods with tradeoffs explained.',
    cta: 'Start the Method Finder',
    href: '/finder',
    accentVar: '--color-accent',
    dimVar: '--color-accent-dim',
  },
  {
    verb: 'Operate',
    heading: 'Run a study',
    body: 'You\'ve chosen your method. Find its step-by-step SOP, preparation checklists, discussion guides, and consent forms.',
    cta: 'Go to Method Library',
    href: '/methods',
    accentVar: '--color-warm',
    dimVar: '--color-warm-dim',
  },
  {
    verb: 'Retrieve',
    heading: 'Find a template',
    body: 'Need a specific resource right now? Search the method library for screeners, consent forms, discussion guides, and analysis templates.',
    cta: 'Browse methods',
    href: '/methods',
    accentVar: '--color-success',
    dimVar: '--color-success-dim',
  },
];

export default function EntryCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.25rem',
    }}>
      {ENTRY_POINTS.map(ep => (
        <Link
          key={ep.verb}
          href={ep.href}
          style={{ textDecoration: 'none', display: 'block' }}
        >
          <article
            className="entry-card"
            data-accent={ep.accentVar}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '1.75rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `var(${ep.accentVar})`;
              el.style.boxShadow = '0 4px 16px -4px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--color-border)';
              el.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: `var(${ep.accentVar})`,
                background: `var(${ep.dimVar})`,
                padding: '0.2em 0.6em',
                borderRadius: '3px',
              }}>
                {ep.verb}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--color-ink-faint)', marginTop: '2px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: 0,
            }}>
              {ep.heading}
            </h2>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--color-ink-muted)',
              lineHeight: 1.6,
              flex: 1,
              margin: 0,
            }}>
              {ep.body}
            </p>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: `var(${ep.accentVar})`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3em',
            }}>
              {ep.cta} →
            </span>
          </article>
        </Link>
      ))}
    </div>
  );
}
