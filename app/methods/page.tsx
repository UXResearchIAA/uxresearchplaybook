import type { Metadata } from 'next';
import MethodGrid from '@/components/library/MethodGrid';

export const metadata: Metadata = {
  title: 'Method Library — UX Research Playbook',
  description: 'Browse all UX research methods with filters by type, scale, phase, and context.',
};

export default function MethodsPage() {
  return (
    <main style={{ padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-faint)',
            marginBottom: '0.5rem',
          }}>
            Method Library
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 400,
            marginBottom: '0.6rem',
          }}>
            UX Research Methods
          </h1>
          <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.95rem', maxWidth: '560px', lineHeight: 1.6 }}>
            7 methods in the planned MVP. 3 are content-complete in this prototype.
            Use the filters or the landscape view to find the right method for your situation.
          </p>
        </div>

        <MethodGrid />
      </div>
    </main>
  );
}
