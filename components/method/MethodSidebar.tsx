'use client';

import { useEffect, useState } from 'react';
import { useSOPProgress } from '@/contexts/SOPProgressContext';

interface SectionLink {
  id: string;
  label: string;
}

const SECTIONS: SectionLink[] = [
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

const SOP_SECTION_IDS = new Set(['prepare', 'conduct', 'analyze', 'synthesize', 'share']);

export default function MethodSidebar({ methodName }: { methodName: string }) {
  // ── Scroll-based: which section is currently in view ──────────────────────
  const [active, setActive] = useState('overview');

  // ── Scroll-based: which sections have been scrolled past (for dot state) ──
  const [scrolledPast, setScrolledPast] = useState<Set<string>>(new Set());

  // ── Whether the user has reached the Prepare section ──────────────────────
  const [sopVisible, setSopVisible] = useState(false);

  // ── Checklist-based progress from context ─────────────────────────────────
  const { completedItems, totalItems } = useSOPProgress();
  const sopProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

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
  }, []);

  // One-shot: show SOP progress panel once user reaches #prepare
  useEffect(() => {
    const el = document.getElementById('prepare');
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSopVisible(true);
          obs.disconnect();
        }
      },
      // Trigger when the top of #prepare enters the bottom 40% of the viewport
      { rootMargin: '0px 0px -40% 0px', threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
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

      {/* SOP checklist progress — only visible once user reaches Prepare */}
      {sopVisible && totalItems > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-ink-faint)' }}>SOP progress</span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: sopProgress === 100 ? 700 : 400,
              color: sopProgress === 100 ? 'var(--color-success)' : 'var(--color-ink-faint)',
            }}>
              {sopProgress}%
            </span>
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
              transition: 'width 0.25s ease',
            }} />
          </div>
          <p style={{
            fontSize: '0.68rem',
            color: 'var(--color-ink-faint)',
            margin: '0.3rem 0 0',
            lineHeight: 1.3,
          }}>
            {completedItems} of {totalItems} tasks
          </p>
        </div>
      )}

      {/* Section links */}
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {SECTIONS.map(section => {
          const isActive = active === section.id;
          const hasScrolledPast = scrolledPast.has(section.id);
          const isSop = SOP_SECTION_IDS.has(section.id);

          // Dot color:
          // - Active: accent
          // - SOP section that has been scrolled past: success green
          // - Other scrolled-past sections: border (neutral)
          // - Not yet visited: border (neutral)
          const dotColor = isActive
            ? 'var(--color-accent)'
            : hasScrolledPast && isSop
            ? 'var(--color-success)'
            : 'var(--color-border)';

          const dotBorder = isActive
            ? 'none'
            : `1px solid ${hasScrolledPast && isSop ? 'var(--color-success)' : 'var(--color-border-hi)'}`;

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
