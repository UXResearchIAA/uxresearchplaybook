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
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState(false);

  const allChecked = step.checklist.length > 0 && checked.size === step.checklist.length;
  const color = PHASE_COLORS[step.phase] ?? '#607090';

  function toggleItem(i: number) {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }

  return (
    <div
      id={`step-${step.id}`}
      style={{
        border: `1px solid ${allChecked ? 'var(--color-success)' : 'var(--color-border)'}`,
        borderLeft: `4px solid ${allChecked ? 'var(--color-success)' : color}`,
        borderRadius: '8px',
        background: allChecked ? 'var(--color-success-dim)' : 'var(--color-surface)',
        overflow: 'hidden',
        transition: 'border-color 0.2s, background 0.2s',
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
          background: allChecked ? 'var(--color-success)' : color,
          color: '#fff',
          transition: 'background 0.2s',
        }}>
          {allChecked ? '✓' : String(index + 1).padStart(2, '0')}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 400,
            margin: '0 0 0.5rem',
            lineHeight: 1.3,
            color: allChecked ? 'var(--color-success)' : 'var(--color-ink)',
            transition: 'color 0.2s',
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

      {/* Checklist */}
      {step.checklist.length > 0 && (
        <div style={{
          padding: '0 1.5rem 0 4.5rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <fieldset style={{ border: 'none', padding: '1rem 0', margin: 0 }}>
            <legend className="sr-only">Step {step.id} checklist</legend>
            {step.checklist.map((item, i) => (
              <label key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.7rem',
                padding: '0.45rem 0',
                cursor: 'pointer',
                borderBottom: i < step.checklist.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <input
                  type="checkbox"
                  checked={checked.has(i)}
                  onChange={() => toggleItem(i)}
                  style={{
                    width: '1rem',
                    height: '1rem',
                    marginTop: '2px',
                    flexShrink: 0,
                    accentColor: color,
                    cursor: 'pointer',
                  }}
                  aria-label={item.text}
                />
                <div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: checked.has(i) ? 'var(--color-ink-faint)' : 'var(--color-ink)',
                    textDecoration: checked.has(i) ? 'line-through' : 'none',
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
              </label>
            ))}
          </fieldset>
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
