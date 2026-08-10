'use client';

import { useState } from 'react';
import Link from 'next/link';
import { allMethods, type MethodStub } from '@/content/methods/index';

type FilterDim = 'all' | 'attitudinal' | 'behavioral' | 'qualitative' | 'quantitative' | 'mixed';

const DIM_W = 680;
const DIM_H = 360;
const PAD = { top: 40, right: 40, bottom: 48, left: 60 };
const PLOT_W = DIM_W - PAD.left - PAD.right;
const PLOT_H = DIM_H - PAD.top - PAD.bottom;

function toX(qualQuant: number) { return PAD.left + qualQuant * PLOT_W; }
function toY(attiBeha: number) { return PAD.top + attiBeha * PLOT_H; }

const PHASE_COLORS: Record<string, string> = {
  discovery:   '#1B6CA8',
  exploratory: '#1B6CA8',
  evaluative:  '#B5651D',
  generative:  '#1E6B45',
};

function methodColor(m: MethodStub): string {
  return PHASE_COLORS[m.phases[0]] ?? '#607090';
}

export default function ResearchLandscape() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterDim>('all');

  function isVisible(m: MethodStub) {
    if (filter === 'all') return true;
    if (filter === 'attitudinal' || filter === 'behavioral') return m.axis === filter || m.axis === 'both';
    return m.scale === filter;
  }

  const hoveredMethod = allMethods.find(m => m.slug === hovered);

  const FILTERS: { id: FilterDim; label: string }[] = [
    { id: 'all', label: 'All methods' },
    { id: 'attitudinal', label: 'Attitudinal' },
    { id: 'behavioral', label: 'Behavioral' },
    { id: 'qualitative', label: 'Qualitative' },
    { id: 'quantitative', label: 'Quantitative' },
  ];

  return (
    <div>
      {/* Filter row */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }} role="group" aria-label="Filter methods by dimension">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              border: `1px solid ${filter === f.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: filter === f.id ? 'var(--color-accent-dim)' : 'var(--color-surface)',
              color: filter === f.id ? 'var(--color-accent)' : 'var(--color-ink-muted)',
              fontSize: '0.8rem',
              fontWeight: filter === f.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.12s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* SVG landscape */}
      <div style={{ overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${DIM_W} ${DIM_H}`}
          width="100%"
          style={{ maxWidth: DIM_W, display: 'block', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '10px' }}
          role="img"
          aria-label="Research method landscape: x-axis qualitative to quantitative, y-axis attitudinal to behavioral"
        >
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--color-ink-faint)" />
            </marker>
          </defs>

          {/* Quadrant background */}
          {/* Top-left: Attitudinal + Qualitative */}
          <rect x={PAD.left} y={PAD.top} width={PLOT_W/2} height={PLOT_H/2}
            fill="var(--color-accent-dim)" opacity="0.3" rx="2" />
          {/* Bottom-right: Behavioral + Quantitative */}
          <rect x={PAD.left + PLOT_W/2} y={PAD.top + PLOT_H/2} width={PLOT_W/2} height={PLOT_H/2}
            fill="var(--color-warm-dim)" opacity="0.3" rx="2" />

          {/* Axis lines */}
          {/* X axis */}
          <line
            x1={PAD.left} y1={PAD.top + PLOT_H/2}
            x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H/2}
            stroke="var(--color-border-hi)" strokeWidth="1" strokeDasharray="4 4"
          />
          {/* Y axis */}
          <line
            x1={PAD.left + PLOT_W/2} y1={PAD.top}
            x2={PAD.left + PLOT_W/2} y2={PAD.top + PLOT_H}
            stroke="var(--color-border-hi)" strokeWidth="1" strokeDasharray="4 4"
          />

          {/* Axis labels */}
          <text x={PAD.left + 4} y={PAD.top - 10} fontSize="10" fill="var(--color-ink-faint)" fontFamily="var(--font-body)">Qualitative</text>
          <text x={PAD.left + PLOT_W - 4} y={PAD.top - 10} fontSize="10" fill="var(--color-ink-faint)" fontFamily="var(--font-body)" textAnchor="end">Quantitative</text>
          <text x={PAD.left - 10} y={PAD.top + 10} fontSize="10" fill="var(--color-ink-faint)" fontFamily="var(--font-body)" textAnchor="end">Attitudinal</text>
          <text x={PAD.left - 10} y={PAD.top + PLOT_H} fontSize="10" fill="var(--color-ink-faint)" fontFamily="var(--font-body)" textAnchor="end">Behavioral</text>

          {/* Method nodes */}
          {allMethods.map(m => {
            const x = toX(m.landscape.qualQuant);
            const y = toY(m.landscape.attiBeha);
            const visible = isVisible(m);
            const isHovered = hovered === m.slug;
            const hasContent = m.status === 'prototype';
            const color = methodColor(m);

            return (
              <g key={m.slug}
                onMouseEnter={() => setHovered(m.slug)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: hasContent ? 'pointer' : 'default' }}
                opacity={visible ? 1 : 0.2}
                role="button"
                aria-label={`${m.name}: ${m.axis}, ${m.scale}, ${m.context}`}
                tabIndex={visible && hasContent ? 0 : -1}
                onKeyDown={e => { if (e.key === 'Enter' && hasContent) window.location.href = `/methods/${m.slug}`; }}
              >
                <circle cx={x} cy={y} r={isHovered ? 9 : 7}
                  fill={color}
                  stroke={isHovered ? 'var(--color-surface)' : 'transparent'}
                  strokeWidth="2"
                  style={{ transition: 'r 0.15s' }}
                  opacity={hasContent ? 1 : 0.5}
                />
                <text
                  x={x + 12}
                  y={m.landscape.attiBeha > 0.7 ? y + 4 : y - 8}
                  fontSize="10"
                  fontFamily="var(--font-body)"
                  fontWeight={isHovered ? 600 : 400}
                  fill={isHovered ? color : 'var(--color-ink-muted)'}
                  style={{ transition: 'fill 0.12s' }}
                  pointerEvents="none"
                >
                  {m.shortName}
                </text>
                {!hasContent && (
                  <text
                    x={x + 12}
                    y={m.landscape.attiBeha > 0.7 ? y + 14 : y + 2}
                    fontSize="8"
                    fill="var(--color-ink-faint)"
                    fontFamily="var(--font-body)"
                    fontStyle="italic"
                    pointerEvents="none"
                  >
                    planned
                  </text>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform={`translate(${PAD.left}, ${DIM_H - 18})`}>
            <circle cx="5" cy="4" r="5" fill="#1B6CA8" />
            <text x="14" y="8" fontSize="9" fill="var(--color-ink-faint)" fontFamily="var(--font-body)">Discovery / Exploratory</text>
            <circle cx="145" cy="4" r="5" fill="#B5651D" />
            <text x="154" y="8" fontSize="9" fill="var(--color-ink-faint)" fontFamily="var(--font-body)">Evaluative</text>
            <circle cx="225" cy="4" r="5" fill="#607090" opacity="0.5" />
            <text x="234" y="8" fontSize="9" fill="var(--color-ink-faint)" fontFamily="var(--font-body)">Planned (no content yet)</text>
          </g>
        </svg>
      </div>

      {/* Hover tooltip / method info */}
      {hoveredMethod && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem 1.25rem',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          animation: 'fadeIn 0.1s ease',
        }}>
          <div>
            <p style={{ fontWeight: 500, margin: '0 0 0.25rem', fontSize: '0.95rem' }}>{hoveredMethod.name}</p>
            <p style={{ fontSize: '0.83rem', color: 'var(--color-ink-muted)', margin: '0 0 0.35rem' }}>{hoveredMethod.tagline}</p>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span className={`tag tag-${hoveredMethod.axis}`}>{hoveredMethod.axis}</span>
              <span className={`tag tag-${hoveredMethod.scale}`}>{hoveredMethod.scale}</span>
              {hoveredMethod.phases.map(p => <span key={p} className="tag tag-phase">{p}</span>)}
            </div>
          </div>
          {hoveredMethod.status === 'prototype' && (
            <Link href={`/methods/${hoveredMethod.slug}`} className="btn btn-primary" style={{ fontSize: '0.82rem', flexShrink: 0 }}>
              View method →
            </Link>
          )}
        </div>
      )}

      {/* Accessible method list (fallback) */}
      <details style={{ marginTop: '1.25rem' }}>
        <summary style={{ fontSize: '0.83rem', color: 'var(--color-ink-muted)', cursor: 'pointer', userSelect: 'none' }}>
          View as accessible list
        </summary>
        <ul style={{ marginTop: '0.75rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {allMethods.map(m => (
            <li key={m.slug} style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
              {m.status === 'prototype'
                ? <Link href={`/methods/${m.slug}`}>{m.name}</Link>
                : m.name} — {m.axis} · {m.scale} · {m.context}
              {m.status === 'planned' && <span style={{ color: 'var(--color-ink-faint)', fontStyle: 'italic' }}> (planned)</span>}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
