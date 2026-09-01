'use client';

import { useState } from 'react';
import type { SOPStep as SOPStepType } from '@/content/methods/types';

const PHASE_COLORS: Record<string, string> = {
  prepare:    '#1B6CA8',
  conduct:    '#B5651D',
  analyze:    '#1E6B45',
  synthesize: '#1E6B45',
  share:      '#607090',
};

export function SOPStepCard({ step, index }: { step: SOPStepType; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const color = PHASE_COLORS[step.phase] ?? '#607090';

  return (
    <div
      id={`step-${step.id}`}
      style={{
        border: '1px solid var(--color-border)',
        borderLeft: `4px solid ${color}`,
        borderRadius: '8px',
        background: 'var(--color-surface)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {/* Step number */}
        <div style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.78rem',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          flexShrink: 0,
          background: color,
          color: '#fff',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 400,
            margin: '0 0 0.5rem',
            lineHeight: 1.3,
            color: 'var(--color-ink)',
          }}>
            {step.title}
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--color-ink-muted)',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {step.description}
          </p>
        </div>
      </div>

      {/* Checklist — visual only, no interactivity */}
      {step.checklist.length > 0 && (
        <div style={{
          padding: '0 1.5rem 1rem 4.5rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <ul style={{ listStyle: 'none', padding: '0.75rem 0 0', margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
            {step.checklist.map((item, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                padding: '0.4rem 0',
                borderBottom: i < step.checklist.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                {/* Hollow square indicator */}
                <span style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  border: '1.5px solid var(--color-border-hi)',
                  borderRadius: '2px',
                  flexShrink: 0,
                  marginTop: '3px',
                }} aria-hidden="true" />
                <div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-ink)',
                    lineHeight: 1.5,
                  }}>
                    {item.text}
                  </span>
                  {item.note && (
                    <p style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-ink-faint)',
                      fontStyle: 'italic',
                      margin: '0.15rem 0 0',
                      lineHeight: 1.45,
                    }}>
                      {item.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expandable: example + mistakes + output */}
      {(step.example || step.commonMistakes || step.expectedOutput) && (
        <div style={{ padding: '0 1.5rem 1.25rem', paddingLeft: '4.5rem' }}>
          <button
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-accent)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              padding: '0.4rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 500,
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.15s',
              transform: expanded ? 'rotate(90deg)' : 'none',
            }}>▶</span>
            {expanded ? 'Hide details' : 'Show example, common mistakes & output'}
          </button>

          {expanded && (
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {step.example && (
                <div style={{
                  padding: '0.85rem 1rem',
                  background: 'var(--color-accent-dim)',
                  borderRadius: '6px',
                  borderLeft: '3px solid var(--color-accent)',
                }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.4rem' }}>
                    Example
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.6, margin: 0 }}>
                    {step.example}
                  </p>
                </div>
              )}

              {step.commonMistakes && step.commonMistakes.length > 0 && (
                <div style={{
                  padding: '0.85rem 1rem',
                  background: 'var(--color-warm-dim)',
                  borderRadius: '6px',
                  borderLeft: '3px solid var(--color-warm)',
                }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-warm)', marginBottom: '0.4rem' }}>
                    Common mistakes
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {step.commonMistakes.map((m, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {step.expectedOutput && (
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-success)', marginBottom: '0.3rem' }}>
                    Expected output
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.6, margin: 0 }}>
                    {step.expectedOutput}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
