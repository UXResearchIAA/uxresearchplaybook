'use client';

import { useEffect, useState } from 'react';

export interface SectionLink {
  id: string;
  label: string;
}

const DEFAULT_SECTIONS: SectionLink[] = [
  { id: 'overview',    label: 'Overview'          },
  { id: 'at-a-glance', label: 'At a glance'       },
  { id: 'when-to-use', label: 'When to use'       },
  { id: 'prepare',     label: 'Prepare'           },
  { id: 'conduct',     label: 'Conduct'           },
  { id: 'analyze',     label: 'Analyze'           },
  { id: 'synthesize',  label: 'Synthesize'        },
  { id: 'share',       label: 'Share'             },
  { id: 'templates',   label: 'Templates & tools' },
  { id: 'related',     label: 'Related methods'   },
  { id: 'sources',     label: 'Sources'           },
];

export default function MethodSidebar({
  methodName,
  sections,
}: {
  methodName: string;
  sections?: SectionLink[];
}) {
  const SECTIONS = sections ?? DEFAULT_SECTIONS;

  // ── Scroll-based: which section is currently in view ──────────────────────
  const [active, setActive] = useState('overview');

  // ── Scroll-based: which sections have been scrolled past (for dot state) ──
  const [scrolledPast, setScrolledPast] = useState<Set<string>>(new Set());

  // Scrollspy: active section
  useEffect(() => {
    const els = SECTIONS
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      entries => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll tracking: which sections have been scrolled past (for dot indicators)
  useEffect(() => {
    function onScroll() {
      const passed = new Set<string>();
      SECTIONS.forEach(s => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().bottom < window.innerHeight * 0.4) {
          passed.add(s.id);
        }
      });
      setScrolledPast(passed);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {/* Section links */}
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {SECTIONS.map(section => {
          const isActive = active === section.id;
          const hasScrolledPast = scrolledPast.has(section.id);

          const dotColor = isActive
            ? 'var(--color-accent)'
            : hasScrolledPast
            ? 'var(--color-border-hi)'
            : 'var(--color-border)';

          const dotBorder = isActive
            ? 'none'
            : `1px solid ${hasScrolledPast ? 'var(--color-border-hi)' : 'var(--color-border-hi)'}`;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={e => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.3rem 0.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.83rem',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-ink-muted)',
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'var(--color-accent-dim)' : 'transparent',
                  transition: 'background 0.12s, color 0.12s',
                  marginBottom: '0.1rem',
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: dotColor,
                  border: dotBorder,
                  transition: 'background 0.15s, border-color 0.15s',
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
