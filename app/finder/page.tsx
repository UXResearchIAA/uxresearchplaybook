import type { Metadata } from 'next';
import FinderFlow from '@/components/finder/FinderFlow';

export const metadata: Metadata = {
  title: 'Method Finder — UX Research Playbook',
  description: 'Answer 6 questions to find the right UX research method for your situation.',
};

export default function FinderPage() {
  return (
    <main style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 0' }}>
      <div className="page-container">
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-faint)',
            marginBottom: '2rem',
          }}>
            Method Finder
          </p>
          <FinderFlow />
        </div>
      </div>
    </main>
  );
}
