import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: '4rem 0', textAlign: 'center' }}>
      <div className="page-container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--color-ink-muted)', marginBottom: '1.5rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been built yet.
        </p>
        <Link href="/" className="btn btn-primary">Return to home</Link>
      </div>
    </main>
  );
}
