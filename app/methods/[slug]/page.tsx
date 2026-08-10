import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getMethod, allMethods } from '@/content/methods/index';
import MethodSidebar from '@/components/method/MethodSidebar';
import { SOPStepCard } from '@/components/method/SOPStep';
import type { MethodContent, ResearchPhase } from '@/content/methods/types';

export async function generateStaticParams() {
  return allMethods
    .filter(m => m.status === 'prototype')
    .map(m => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const method = getMethod(slug);
  if (!method) return { title: 'Not Found' };
  return {
    title: `${method.name} — UX Research Playbook`,
    description: method.tagline,
  };
}

const PHASE_LABEL: Record<ResearchPhase, string> = {
  discovery: 'Discovery',
  exploratory: 'Exploratory',
  evaluative: 'Evaluative',
  generative: 'Generative',
};

const CONTEXT_LABEL: Record<string, string> = {
  moderated: 'Moderated',
  unmoderated: 'Unmoderated',
  naturalistic: 'Naturalistic field',
};

export default async function MethodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const method = getMethod(slug);
  if (!method) notFound();

  const sopSteps = method.sopSteps;
  const prepareSteps = sopSteps.filter(s => s.phase === 'prepare');
  const conductSteps = sopSteps.filter(s => s.phase === 'conduct');
  const analyzeSteps = sopSteps.filter(s => s.phase === 'analyze');
  const synthesizeSteps = sopSteps.filter(s => s.phase === 'synthesize');
  const shareSteps = sopSteps.filter(s => s.phase === 'share');

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="page-container" style={{ padding: '0.75rem clamp(1rem, 4vw, 2rem)' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--color-ink-faint)' }}>
            <Link href="/" style={{ color: 'var(--color-ink-faint)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/methods" style={{ color: 'var(--color-ink-faint)', textDecoration: 'none' }}>Methods</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-ink-muted)' }}>{method.name}</span>
          </nav>
        </div>
      </div>

      {/* Method Header */}
      <header style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem) 0',
      }}>
        <div className="page-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div style={{ maxWidth: '620px' }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <span className={`tag tag-${method.axis}`}>{method.axis}</span>
                <span className={`tag tag-${method.scale}`}>{method.scale}</span>
                <span className="tag tag-qualitative">{CONTEXT_LABEL[method.context]}</span>
                {method.phases.map(p => (
                  <span key={p} className="tag tag-phase">{PHASE_LABEL[p]}</span>
                ))}
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: '0.6rem',
              }}>
                {method.name}
              </h1>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.6,
              }}>
                {method.tagline}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <a href="#conduct" className="btn btn-primary">
                Start SOP →
              </a>
              <a href="#templates" className="btn btn-secondary">
                Templates
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main: sidebar + content */}
      <div className="page-container" style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(180px, 220px, 240px) 1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }}>
          {/* Sidebar */}
          <div className="method-sidebar-col" style={{ display: 'contents' }}>
            <MethodSidebar methodName={method.shortName} />
          </div>

          {/* Content */}
          <article style={{ minWidth: 0 }}>
            {/* ── Overview ── */}
            <section id="overview" style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
              <SectionHeader label="01" title="Overview" />
              <div style={{ whiteSpace: 'pre-line', color: 'var(--color-ink-muted)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                {method.overview}
              </div>
            </section>

            {/* ── At a Glance ── */}
            <section id="at-a-glance" style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
              <SectionHeader label="02" title="At a glance" />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '0.75rem',
              }}>
                {[
                  { label: 'Participants', value: method.typicalParticipants },
                  { label: 'Session duration', value: method.typicalSessionDuration },
                  { label: 'Study timeline', value: method.typicalStudyTimeline },
                  { label: 'Type', value: `${method.axis} · ${method.scale}` },
                  { label: 'Context', value: CONTEXT_LABEL[method.context] },
                  { label: 'Best for', value: method.phases.map(p => PHASE_LABEL[p]).join(' · ') },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: 'var(--color-surface-alt)',
                    borderRadius: '7px',
                    padding: '1rem',
                    border: '1px solid var(--color-border)',
                  }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-ink-faint)', marginBottom: '0.35rem' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-ink)', fontWeight: 500, margin: 0 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── When to use / Not to use ── */}
            <section id="when-to-use" style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
              <SectionHeader label="03" title="When to use" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {/* When to use */}
                <div style={{
                  background: 'var(--color-success-dim)',
                  border: '1px solid var(--color-success)',
                  borderRadius: '8px',
                  padding: '1.25rem',
                }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-success)', marginBottom: '0.75rem' }}>
                    ✓ Use when
                  </p>
                  <ul style={{ margin: 0, padding: '0 0 0 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {method.whenToUse.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* When not to use */}
                <div style={{
                  background: 'var(--color-warm-dim)',
                  border: '1px solid var(--color-warm)',
                  borderRadius: '8px',
                  padding: '1.25rem',
                }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-warm)', marginBottom: '0.75rem' }}>
                    ✗ Do not use when
                  </p>
                  <ul style={{ margin: 0, padding: '0 0 0 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {method.whenNotToUse.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Research questions */}
              {method.whatItAnswers && method.whatItAnswers.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-ink-faint)', marginBottom: '0.6rem' }}>
                    Research questions this method can answer
                  </p>
                  <ul style={{ margin: 0, padding: '0 0 0 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {method.whatItAnswers.map((q, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* ── SOP: Prepare ── */}
            <SOPPhaseSection id="prepare" label="04" title="Prepare" color="#1B6CA8" steps={prepareSteps} stepOffset={0} />

            {/* ── SOP: Conduct ── */}
            <SOPPhaseSection id="conduct" label="05" title="Conduct" color="#B5651D" steps={conductSteps} stepOffset={prepareSteps.length} />

            {/* ── SOP: Analyze ── */}
            <SOPPhaseSection id="analyze" label="06" title="Analyze" color="#1E6B45" steps={analyzeSteps} stepOffset={prepareSteps.length + conductSteps.length} />

            {/* ── SOP: Synthesize ── */}
            <SOPPhaseSection id="synthesize" label="07" title="Synthesize" color="#1E6B45" steps={synthesizeSteps} stepOffset={prepareSteps.length + conductSteps.length + analyzeSteps.length}>
              <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', background: 'var(--color-surface-alt)', borderRadius: '7px', border: '1px solid var(--color-border)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.65, margin: 0 }}>
                  {method.synthesisApproach}
                </p>
              </div>
            </SOPPhaseSection>

            {/* ── Share ── */}
            <SOPPhaseSection id="share" label="08" title="Share" color="#607090" steps={shareSteps} stepOffset={sopSteps.length - shareSteps.length}>
              {method.typicalOutputs && method.typicalOutputs.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-ink-faint)', marginBottom: '0.5rem' }}>
                    Typical outputs
                  </p>
                  <ul style={{ margin: 0, padding: '0 0 0 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {method.typicalOutputs.map((o, i) => (
                      <li key={i} style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.5 }}>{o}</li>
                    ))}
                  </ul>
                </div>
              )}
            </SOPPhaseSection>

            {/* ── Templates ── */}
            <section id="templates" style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
              <SectionHeader label="09" title="Templates & tools" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {method.templates.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '7px',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: '0.9rem', margin: '0 0 0.2rem' }}>{t.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', margin: 0 }}>{t.description}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-faint)', margin: '0.15rem 0 0', fontFamily: 'var(--font-mono)' }}>{t.format}</p>
                    </div>
                    {t.url ? (
                      <a href={t.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.82rem', flexShrink: 0 }}>
                        Download →
                      </a>
                    ) : (
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-ink-faint)',
                        fontStyle: 'italic',
                        flexShrink: 0,
                        padding: '0.4rem 0.75rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: '5px',
                      }}>
                        [TEMPLATE TO BE ADDED]
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ── Related methods ── */}
            <section id="related" style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
              <SectionHeader label="10" title="Related methods" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {method.relatedMethods.map(r => {
                  const rel = allMethods.find(m => m.slug === r.slug);
                  const hasContent = rel?.status === 'prototype';
                  return (
                    <div key={r.slug} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '7px',
                      flexWrap: 'wrap',
                    }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                          <p style={{ fontWeight: 500, fontSize: '0.9rem', margin: 0 }}>{r.name}</p>
                          <span style={{
                            fontSize: '0.68rem',
                            padding: '0.15em 0.5em',
                            borderRadius: '3px',
                            background: 'var(--color-surface-alt)',
                            color: 'var(--color-ink-faint)',
                            border: '1px solid var(--color-border)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}>
                            {r.relationship}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.83rem', color: 'var(--color-ink-muted)', margin: 0, lineHeight: 1.5 }}>{r.reason}</p>
                      </div>
                      {hasContent && (
                        <Link href={`/methods/${r.slug}`} className="btn btn-ghost" style={{ fontSize: '0.82rem', flexShrink: 0 }}>
                          View →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Sources ── */}
            <section id="sources" style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
              <SectionHeader label="11" title="Sources" />
              <p style={{ fontSize: '0.83rem', color: 'var(--color-ink-muted)', marginBottom: '1rem', padding: '0.65rem 1rem', background: 'var(--color-accent-dim)', borderRadius: '5px', lineHeight: 1.5 }}>
                <strong>Source transparency:</strong> NN/g articles were inaccessible during prototype authorship. Content marked "training data" is synthesized from training knowledge of published NN/g frameworks — not verified against current article text. Verify before citing externally.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {method.sources.map(s => (
                  <div key={s.id} style={{
                    padding: '0.85rem 1rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                  }}>
                    <p style={{ fontWeight: 500, fontSize: '0.875rem', margin: '0 0 0.2rem' }}>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
                      ) : s.title}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', margin: '0 0 0.3rem' }}>
                      {s.author}{s.year ? ` (${s.year})` : ''}{s.publisher ? ` — ${s.publisher}` : ''}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', margin: 0, lineHeight: 1.5 }}>
                      <strong>Used for:</strong> {s.usedFor}
                    </p>
                    {s.note && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-faint)', fontStyle: 'italic', margin: '0.3rem 0 0' }}>
                        ⓘ {s.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* Sidebar responsive: hide on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .method-sidebar-col > nav { display: none !important; }
          .page-container > div[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.75rem',
      marginBottom: '1.25rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <span style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        color: 'var(--color-ink-faint)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
      }}>
        {label}
      </span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, margin: 0 }}>
        {title}
      </h2>
    </div>
  );
}

function SOPPhaseSection({
  id, label, title, color, steps, stepOffset, children
}: {
  id: string;
  label: string;
  title: string;
  color: string;
  steps: MethodContent['sopSteps'];
  stepOffset: number;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.75rem',
        marginBottom: '1.25rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--color-ink-faint)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
        }}>
          {label}
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, margin: 0 }}>
          {title}
        </h2>
        <span style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color,
          background: 'var(--color-surface-alt)',
          border: '1px solid var(--color-border)',
          padding: '0.15em 0.55em',
          borderRadius: '3px',
        }}>
          {title} phase
        </span>
      </div>

      {steps.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {steps.map((step, i) => (
            <SOPStepCard key={step.id} step={step} index={stepOffset + i} />
          ))}
        </div>
      )}

      {children}
    </section>
  );
}
