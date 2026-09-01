import EntryCards from '@/components/home/EntryCards';

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
            Internal tool · IAA&apos;s User Research Ops
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
            A decision-support and operational tool for UX research.
          </p>
        </div>
      </section>

      {/* Entry Points */}
      <section aria-label="Primary entry points" style={{ padding: '2.5rem 0' }}>
        <div className="page-container">
          <EntryCards />
        </div>
      </section>
    </main>
  );
}
