import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getMethod, allMethods } from '@/content/methods/index';
import MethodSidebar, { type SectionLink } from '@/components/method/MethodSidebar';
import { SOPStepCard } from '@/components/method/SOPStep';
import type { MethodContent, ResearchPhase, Template } from '@/content/methods/types';

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

// Sidebar sections for methods that have a Synthesize phase
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

// Sidebar sections for User Interviews (no Synthesize)
const USER_INTERVIEWS_SECTIONS: SectionLink[] = [
  { id: 'overview',    label: 'Overview'          },
  { id: 'at-a-glance', label: 'At a glance'       },
  { id: 'when-to-use', label: 'When to use'       },
  { id: 'prepare',     label: 'Prepare'           },
  { id: 'conduct',     label: 'Conduct'           },
  { id: 'analyze',     label: 'Analyze'           },
  { id: 'share',       label: 'Share'             },
  { id: 'templates',   label: 'Templates & tools' },
  { id: 'related',     label: 'Related methods'   },
  { id: 'sources',     label: 'Sources'           },
];

export default async function MethodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const method = getMethod(slug);
  if (!method) notFound();

  const isUserInterviews = slug === 'user-interviews';

  const sopSteps = method.sopSteps;
  const prepareSteps    = sopSteps.filter(s => s.phase === 'prepare');
  const conductSteps    = sopSteps.filter(s => s.phase === 'conduct');
  const analyzeSteps    = sopSteps.filter(s => s.phase === 'analyze');
  const synthesizeSteps = sopSteps.filter(s => s.phase === 'synthesize');
  const shareSteps      = sopSteps.filter(s => s.phase === 'share');

  const hasSynthesize = synthesizeSteps.length > 0;

  // Section number labels shift when Synthesize is absent
  const analyzeLabel   = '06';
  const synthesizeLabel = '07';
  const shareLabel     = hasSynthesize ? '08' : '07';
  const templatesLabel = hasSynthesize ? '09' : '08';
  const relatedLabel   = hasSynthesize ? '10' : '09';
  const sourcesLabel   = hasSynthesize ? '11' : '10';

  // Section title labels (user-interviews uses simpler names)
  const analyzeTitle = isUserInterviews ? 'Analyze' : 'Analyze';
  const shareTitle   = isUserInterviews ? 'Share'   : 'Share';

  // Whether all templates carry a phase — enables the grid layout
  const hasPhaseGroupedTemplates = method.templates.some(t => t.phase);

  // Sidebar section list
  const sidebarSections = isUserInterviews ? USER_INTERVIEWS_SECTIONS : DEFAULT_SECTIONS;

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
            maxWidth: '620px',
          }}>
            {method.tagline}
          </p>
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
          {/* Sidebar — alignSelf:stretch makes this grid cell as tall as the article,
               giving the position:sticky nav inside a valid tall containing block */}
          <div className="method-sidebar-col" style={{ alignSelf: 'stretch' }}>
            <MethodSidebar methodName={method.shortName} sections={sidebarSections} />
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
                  { label: 'Participants',     value: method.typicalParticipants },
                  { label: 'Session duration', value: method.typicalSessionDuration },
                  { label: 'Study timeline',   value: method.typicalStudyTimeline },
                  { label: 'Type',             value: `${method.axis} · ${method.scale}` },
                  { label: 'Context',          value: CONTEXT_LABEL[method.context] },
                  { label: 'Best for',         value: method.phases.map(p => PHASE_LABEL[p]).join(' · ') },
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
            <SOPPhaseSection id="analyze" label={analyzeLabel} title={analyzeTitle} color="#1E6B45" steps={analyzeSteps} stepOffset={prepareSteps.length + conductSteps.length} />

            {/* ── SOP: Synthesize — only rendered when steps exist ── */}
            {hasSynthesize && (
              <SOPPhaseSection id="synthesize" label={synthesizeLabel} title="Synthesize" color="#1E6B45" steps={synthesizeSteps} stepOffset={prepareSteps.length + conductSteps.length + analyzeSteps.length}>
                <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', background: 'var(--color-surface-alt)', borderRadius: '7px', border: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', lineHeight: 1.65, margin: 0 }}>
                    {method.synthesisApproach}
                  </p>
                </div>
              </SOPPhaseSection>
            )}

            {/* ── Share ── */}
            <SOPPhaseSection id="share" label={shareLabel} title={shareTitle} color="#607090" steps={shareSteps} stepOffset={sopSteps.length - shareSteps.length}>
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
              <SectionHeader label={templatesLabel} title="Templates & tools" />
              {hasPhaseGroupedTemplates ? (
                <TemplatePhaseGrid templates={method.templates} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {method.templates.map((t, i) => (
                    <TemplateRow key={i} template={t} />
                  ))}
                </div>
              )}
            </section>

            {/* ── Related methods ── */}
            <section id="related" style={{ scrollMarginTop: '80px', marginBottom: '3rem' }}>
              <SectionHeader label={relatedLabel} title="Related methods" />
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
              <SectionHeader label={sourcesLabel} title="Sources" />
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
          .method-sidebar-col { display: none; }
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
        borderBottom: `2px solid ${color}`,
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
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, margin: 0, color: 'var(--color-ink)' }}>
          {title}
        </h2>
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

// Phase-grouped template grid — used when templates carry a `phase` field
const TEMPLATE_PHASES: Array<{ id: 'prepare' | 'conduct' | 'analyze' | 'share'; label: string; color: string }> = [
  { id: 'prepare', label: 'Prepare', color: '#1B6CA8' },
  { id: 'conduct', label: 'Conduct', color: '#B5651D' },
  { id: 'analyze', label: 'Analyze', color: '#1E6B45' },
  { id: 'share',   label: 'Share',   color: '#607090' },
];

function TemplatePhaseGrid({ templates }: { templates: Template[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      alignItems: 'start',
    }}>
      {TEMPLATE_PHASES.map(phase => {
        const phaseTemplates = templates.filter(t => t.phase === phase.id);
        return (
          <div key={phase.id}>
            {/* Phase column header */}
            <div style={{
              background: phase.color,
              padding: '0.6rem 0.9rem',
              borderRadius: '6px',
              marginBottom: '0.65rem',
            }}>
              <p style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
                letterSpacing: '0.04em',
              }}>
                {phase.label}
              </p>
            </div>

            {/* Template cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {phaseTemplates.length === 0 ? (
                <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-faint)', fontStyle: 'italic', padding: '0.5rem 0' }}>
                  No templates yet
                </p>
              ) : (
                phaseTemplates.map((t, i) => (
                  <div key={i} style={{
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    opacity: t.url ? 1 : 0.85,
                  }}>
                    <p style={{
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      margin: '0 0 0.2rem',
                      color: 'var(--color-ink)',
                      lineHeight: 1.3,
                    }}>
                      {t.url ? (
                        <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>
                          {t.name}
                        </a>
                      ) : t.name}
                    </p>
                    <p style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-ink-faint)',
                      margin: 0,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      → {t.format}
                    </p>
                    {!t.url && (
                      <span style={{
                        display: 'inline-block',
                        marginTop: '0.4rem',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'var(--color-ink-faint)',
                        padding: '0.1em 0.4em',
                        background: 'var(--color-surface-alt)',
                        border: '1px dashed var(--color-border-hi)',
                        borderRadius: '3px',
                      }}>
                        Planned
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Flat template row — used for methods without phase-grouped templates
function TemplateRow({
  template,
}: {
  template: MethodContent['templates'][number];
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '7px',
      gap: '1rem',
      flexWrap: 'wrap',
      opacity: template.url ? 1 : 0.85,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
          <p style={{ fontWeight: 500, fontSize: '0.9rem', margin: 0 }}>{template.name}</p>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            color: 'var(--color-ink-faint)',
            padding: '0.1em 0.45em',
            background: 'var(--color-surface-alt)',
            border: '1px solid var(--color-border)',
            borderRadius: '3px',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap',
          }}>
            {template.format}
          </span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-muted)', margin: 0, lineHeight: 1.5 }}>
          {template.description}
        </p>
      </div>

      {template.url ? (
        <a
          href={template.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ fontSize: '0.82rem', flexShrink: 0 }}
        >
          Open →
        </a>
      ) : (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4em',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-faint)',
          padding: '0.3em 0.65em',
          background: 'var(--color-surface-alt)',
          border: '1px dashed var(--color-border-hi)',
          borderRadius: '4px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 3v3l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Planned
        </span>
      )}
    </div>
  );
}
