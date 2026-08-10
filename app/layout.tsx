import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'UX Research Playbook',
  description: 'Decision-support and operational tool for the UX research and design team.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <footer style={{
          borderTop: '1px solid var(--color-border)',
          padding: '1.5rem 0',
          marginTop: '4rem',
        }}>
          <div className="page-container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-faint)' }}>
              UX Research Playbook · Internal tool · Pre-release prototype
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-faint)' }}>
              Methods based on NN/g, Holtzblatt &amp; Beyer, and practitioner synthesis
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
