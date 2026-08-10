'use client';

import { useEffect, useState, useRef } from 'react';

interface SectionLink {
  id: string;
  label: string;
  level?: 'primary' | 'sub';
}

const SECTIONS: SectionLink[] = [
  { id: 'overview',    label: 'Overview',           level: 'primary' },
  { id: 'at-a-glance', label: 'At a glance',        level: 'primary' },
  { id: 'when-to-use', label: 'When to use',        level: 'primary' },
  { id: 'prepare',     label: 'Prepare',            level: 'primary' },
  { id: 'conduct',     label: 'Conduct',            level: 'primary' },
  { id: 'analyze',     label: 'Analyze',            level: 'primary' },
  { id: 'synthesize',  label: 'Synthesize',         level: 'primary' },
  { id: 'share',       label: 'Share',              level: 'primary' },
  { id: 'templates',   label: 'Templates & tools',  level: 'primary' },
  { id: 'related',     label: 'Related methods',    level: 'primary' },
  { id: 'sources',     label: 'Sources',            level: 'primary' },
];

export default function MethodSidebar({ methodName }: { methodName: string }) {
  const [active, setActive] = useState('overview');
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const els = SECTIONS
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      entries => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          // Pick the topmost intersecting
          const topmost = intersecting.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(topmost.target.id);
        }
      },
      { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Scroll-based progress (which sections have been scrolled past)
  useEffect(() => {
    function onScroll() {
      const passed = new Set<string>();
      SECTIONS.forEach(s => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().bottom < window.innerHeight * 0.4) {
          passed.add(s.id);
        }
      });
      setCompleted(passed);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sopSections = ['prepare', 'conduct', 'analyze', 'synthesize', 'share'];
  const sopCompleted = sopSections.filter(s => completed.has(s)).length;
  const sopProgress = Math.round((sopCompleted / sopSections.length) * 100);

  return (
    <nav
      aria-label="Method sections"
      style={{
        position: 'sticky',
        top: '72px',
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        paddingRight: '1rem',
      }}
    >
      {/* Method name */}
      <p style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-ink-faint)',
        marginBottom: '0.85rem',
      }}>
        {methodName}
      </p>

      {/* SOP progress bar */}
      {sopCompleted > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-faint)' }}>SOP progress</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-faint)' }}>{sopProgress}%</span>
          </div>
          <div style={{
            height: '4px',
            background: 'var(--color-border)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${sopProgress}%`,
              background: 'var(--color-success)',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      )}

      {/* Section links */}
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {SECTIONS.map(section => {
          const isActive = active === section.id;
          const isCompleted = completed.has(section.id);
          const isSop = sopSections.includes(section.id);

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.83rem',
                  color: isActive
                    ? 'var(--color-accent)'
                    : isCompleted
                    ? 'var(--color-ink-muted)'
                    : 'var(--color-ink-muted)',
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'var(--color-accent-dim)' : 'transparent',
                  transition: 'background 0.12s, color 0.12s',
                  marginBottom: '0.1rem',
                }}
              >
                {/* Completion indicator */}
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: isActive
                    ? 'var(--color-accent)'
                    : isCompleted && isSop
                    ? 'var(--color-success)'
                    : 'var(--color-border)',
                  border: isActive ? 'none' : `1px solid ${isCompleted && isSop ? 'var(--color-success)' : 'var(--color-border-hi)'}`,
                  transition: 'background 0.15s',
                }} />
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
