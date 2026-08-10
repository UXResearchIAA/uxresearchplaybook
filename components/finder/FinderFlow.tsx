'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FINDER_QUESTIONS, getRecommendations, type FinderAnswers } from '@/lib/finder';
import { allMethods } from '@/content/methods/index';

type FinderState = 'questions' | 'results';

export default function FinderFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [state, setState] = useState<FinderState>('questions');

  const totalSteps = FINDER_QUESTIONS.length;
  const current = FINDER_QUESTIONS[step];
  const selected = answers[current?.id];

  function handleSelect(optionId: string) {
    setAnswers(prev => ({ ...prev, [current.id]: optionId }));
  }

  function handleContinue() {
    if (step < totalSteps - 1) {
      setStep(s => s + 1);
    } else {
      setState('results');
    }
  }

  function handleBack() {
    if (step > 0) setStep(s => s - 1);
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setState('questions');
  }

  if (state === 'results') {
    return <ResultsView answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
        {FINDER_QUESTIONS.map((q, i) => (
          <button
            key={q.id}
            onClick={() => i < step || answers[q.id] ? setStep(i) : undefined}
            aria-label={`Question ${i + 1}${answers[q.id] ? ' (answered)' : ''}`}
            style={{
              width: i === step ? '2rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: '999px',
              border: 'none',
              cursor: i <= step || answers[q.id] ? 'pointer' : 'default',
              background: i === step
                ? 'var(--color-accent)'
                : answers[q.id]
                ? 'var(--color-border-hi)'
                : 'var(--color-border)',
              transition: 'width 0.2s, background 0.15s',
              padding: 0,
            }}
          />
        ))}
        <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-faint)', marginLeft: '0.25rem' }}>
          {step + 1} of {totalSteps}
        </span>
      </div>

      {/* Question */}
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 400,
          marginBottom: '0.75rem',
          lineHeight: 1.25,
        }}>
          {current.question}
        </h1>
        {current.subtext && (
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--color-ink-muted)',
            lineHeight: 1.65,
            marginBottom: '2rem',
            padding: '0.75rem 1rem',
            background: 'var(--color-accent-dim)',
            borderLeft: '3px solid var(--color-accent)',
            borderRadius: '0 4px 4px 0',
          }}>
            {current.subtext}
          </p>
        )}
        {!current.subtext && <div style={{ marginBottom: '1.75rem' }} />}

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {current.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              aria-pressed={selected === option.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '1rem 1.15rem',
                border: `2px solid ${selected === option.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: '8px',
                background: selected === option.id ? 'var(--color-accent-dim)' : 'var(--color-surface)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.12s, background 0.12s',
                width: '100%',
              }}
              onMouseEnter={e => {
                if (selected !== option.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-hi)';
                }
              }}
              onMouseLeave={e => {
                if (selected !== option.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                }
              }}
            >
              {/* Radio dot */}
              <span style={{
                width: '1.1rem',
                height: '1.1rem',
                borderRadius: '50%',
                border: `2px solid ${selected === option.id ? 'var(--color-accent)' : 'var(--color-border-hi)'}`,
                background: selected === option.id ? 'var(--color-accent)' : 'transparent',
                flexShrink: 0,
                marginTop: '2px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {selected === option.id && (
                  <span style={{
                    width: '0.35rem',
                    height: '0.35rem',
                    borderRadius: '50%',
                    background: 'white',
                  }} />
                )}
              </span>
              <div>
                <p style={{
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: selected === option.id ? 'var(--color-accent)' : 'var(--color-ink)',
                  margin: '0 0 0.2em',
                }}>
                  {option.label}
                </p>
                <p style={{
                  fontSize: '0.83rem',
                  color: 'var(--color-ink-muted)',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="btn btn-ghost"
            style={{ opacity: step === 0 ? 0 : 1 }}
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="btn btn-primary"
            style={{ opacity: selected ? 1 : 0.45 }}
          >
            {step === totalSteps - 1 ? 'See recommendations →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Results View ─────────────────────────────────────────────────────────────

function ResultsView({ answers, onRestart }: { answers: FinderAnswers; onRestart: () => void }) {
  const { primary, alternatives, constraints } = getRecommendations(answers);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 400,
          marginBottom: '0.5rem',
        }}>
          Based on your answers
        </h1>
        <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.9rem' }}>
          The recommendations below explain the reasoning — review them before choosing.
        </p>
      </div>

      {/* Constraint flags */}
      {constraints.length > 0 && (
        <div style={{
          background: 'var(--color-warm-dim)',
          border: '1px solid var(--color-warm)',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem',
        }}>
          <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-warm)', marginBottom: '0.4rem' }}>
            ⚠ Constraint notes
          </p>
          {constraints.map((c, i) => (
            <p key={i} style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', margin: '0.2rem 0 0' }}>
              {c}
            </p>
          ))}
        </div>
      )}

      {/* Primary recommendations */}
      {primary.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-faint)',
            marginBottom: '0.75rem',
          }}>
            ★ Best fit
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {primary.map(({ method, reasons, caveats }) => {
              const stub = allMethods.find(m => m.slug === method.slug);
              const hasContent = stub?.status === 'prototype';
              return (
                <div key={method.slug} style={{
                  background: 'var(--color-surface)',
                  border: '2px solid var(--color-accent)',
                  borderRadius: '10px',
                  padding: '1.5rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, margin: '0 0 0.3rem' }}>
                        {method.name}
                      </h2>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <span className={`tag tag-${method.axis}`}>{method.axis}</span>
                        <span className={`tag tag-${method.scale}`}>{method.scale}</span>
                        <span className="tag tag-qualitative">{method.context}</span>
                      </div>
                    </div>
                    {hasContent ? (
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <Link href={`/methods/${method.slug}`} className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
                          View method →
                        </Link>
                        <Link href={`/methods/${method.slug}#conduct`} className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
                          Start SOP →
                        </Link>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-faint)', fontStyle: 'italic' }}>Content coming soon</span>
                    )}
                  </div>
                  {reasons.length > 0 && (
                    <div style={{ marginBottom: caveats.length > 0 ? '0.75rem' : 0 }}>
                      <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-success)', marginBottom: '0.3rem' }}>Why this fits:</p>
                      {reasons.map((r, i) => (
                        <p key={i} style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', margin: '0.15rem 0' }}>✓ {r}</p>
                      ))}
                    </div>
                  )}
                  {caveats.length > 0 && (
                    <div>
                      <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-warm)', marginBottom: '0.3rem' }}>Consider:</p>
                      {caveats.map((c, i) => (
                        <p key={i} style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)', margin: '0.15rem 0' }}>△ {c}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-faint)',
            marginBottom: '0.75rem',
          }}>
            Also consider
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {alternatives.map(({ method, reasons, caveats }) => {
              const hasContent = allMethods.find(m => m.slug === method.slug)?.status === 'prototype';
              return (
                <div key={method.slug} style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <p style={{ fontWeight: 500, margin: '0 0 0.2rem', fontSize: '0.95rem' }}>{method.name}</p>
                    {reasons[0] && <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-muted)', margin: 0 }}>{reasons[0]}</p>}
                    {caveats[0] && <p style={{ fontSize: '0.82rem', color: 'var(--color-warm)', margin: '0.15rem 0 0' }}>△ {caveats[0]}</p>}
                  </div>
                  {hasContent && (
                    <Link href={`/methods/${method.slug}`} className="btn btn-secondary" style={{ fontSize: '0.82rem', flexShrink: 0 }}>
                      View →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {primary.length === 0 && alternatives.length === 0 && (
        <div style={{
          padding: '2rem',
          background: 'var(--color-surface-alt)',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'var(--color-ink-muted)',
        }}>
          <p>No strong match found for this combination. Try browsing the full method library or adjusting your answers.</p>
        </div>
      )}

      {/* Restart */}
      <div style={{
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}>
        <button onClick={onRestart} className="btn btn-secondary">
          ← Restart finder
        </button>
        <Link href="/methods" className="btn btn-ghost">
          Browse all methods →
        </Link>
      </div>
    </div>
  );
}
