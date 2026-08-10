'use client';

import { useState, useMemo } from 'react';
import { allMethods, type MethodStub } from '@/content/methods/index';
import MethodCard from './MethodCard';
import ResearchLandscape from '@/components/landscape/ResearchLandscape';

type ViewMode = 'grid' | 'landscape';
type AxisFilter = 'all' | 'attitudinal' | 'behavioral';
type ScaleFilter = 'all' | 'qualitative' | 'quantitative' | 'mixed';
type PhaseFilter = 'all' | 'discovery' | 'exploratory' | 'evaluative' | 'generative';
type ContextFilter = 'all' | 'moderated' | 'unmoderated' | 'naturalistic';

export default function MethodGrid({ initialView = 'grid' }: { initialView?: ViewMode }) {
  const [view, setView] = useState<ViewMode>(initialView);
  const [search, setSearch] = useState('');
  const [axisFilter, setAxisFilter] = useState<AxisFilter>('all');
  const [scaleFilter, setScaleFilter] = useState<ScaleFilter>('all');
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('all');
  const [contextFilter, setContextFilter] = useState<ContextFilter>('all');

  const filtered = useMemo(() => {
    return allMethods.filter(m => {
      if (search) {
        const q = search.toLowerCase();
        if (!m.name.toLowerCase().includes(q) &&
            !m.tagline.toLowerCase().includes(q) &&
            !m.axis.includes(q) &&
            !m.scale.includes(q)) return false;
      }
      if (axisFilter !== 'all' && m.axis !== axisFilter && m.axis !== 'both') return false;
      if (scaleFilter !== 'all' && m.scale !== scaleFilter) return false;
      if (phaseFilter !== 'all' && !m.phases.includes(phaseFilter)) return false;
      if (contextFilter !== 'all' && m.context !== contextFilter) return false;
      return true;
    });
  }, [search, axisFilter, scaleFilter, phaseFilter, contextFilter]);

  const hasFilters = search || axisFilter !== 'all' || scaleFilter !== 'all' || phaseFilter !== 'all' || contextFilter !== 'all';

  function clearFilters() {
    setSearch('');
    setAxisFilter('all');
    setScaleFilter('all');
    setPhaseFilter('all');
    setContextFilter('all');
  }

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
          <svg style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-ink-faint)' }}
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            placeholder="Search methods…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search methods"
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2.2rem',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              background: 'var(--color-surface)',
              color: 'var(--color-ink)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>

        {/* View toggle */}
        <div style={{
          display: 'flex',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          overflow: 'hidden',
        }} role="group" aria-label="View mode">
          {([['grid', 'Grid'], ['landscape', 'Landscape']] as [ViewMode, string][]).map(([v, label]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              style={{
                padding: '0.4rem 0.85rem',
                border: 'none',
                borderRight: v === 'grid' ? '1px solid var(--color-border)' : 'none',
                background: view === v ? 'var(--color-accent-dim)' : 'var(--color-surface)',
                color: view === v ? 'var(--color-accent)' : 'var(--color-ink-muted)',
                fontSize: '0.8rem',
                fontWeight: view === v ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-faint)', marginLeft: 'auto' }}>
          {filtered.length} of {allMethods.length} methods
        </span>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        padding: '1rem 1.25rem',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
      }}>
        <FilterGroup label="Type" value={axisFilter} onChange={v => setAxisFilter(v as AxisFilter)}
          options={[['all','All'], ['attitudinal','Attitudinal'], ['behavioral','Behavioral']]} />
        <FilterGroup label="Scale" value={scaleFilter} onChange={v => setScaleFilter(v as ScaleFilter)}
          options={[['all','All'], ['qualitative','Qualitative'], ['quantitative','Quantitative'], ['mixed','Mixed']]} />
        <FilterGroup label="Phase" value={phaseFilter} onChange={v => setPhaseFilter(v as PhaseFilter)}
          options={[['all','All'], ['discovery','Discovery'], ['exploratory','Exploratory'], ['evaluative','Evaluative'], ['generative','Generative']]} />
        <FilterGroup label="Context" value={contextFilter} onChange={v => setContextFilter(v as ContextFilter)}
          options={[['all','All'], ['moderated','Moderated'], ['unmoderated','Unmoderated'], ['naturalistic','Naturalistic']]} />
        {hasFilters && (
          <button onClick={clearFilters} style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            color: 'var(--color-accent)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            padding: '0.2rem 0',
            textDecoration: 'underline',
          }}>
            Clear filters
          </button>
        )}
      </div>

      {/* Content */}
      {view === 'landscape' ? (
        <ResearchLandscape />
      ) : (
        <>
          {filtered.length === 0 ? (
            <div style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              color: 'var(--color-ink-muted)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
            }}>
              <p style={{ marginBottom: '0.5rem' }}>No methods match these filters.</p>
              <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1rem',
            }}>
              {filtered.map(m => (
                <MethodCard key={m.slug} method={m} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterGroup({
  label, value, options, onChange
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-ink-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
        {label}
      </legend>
      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
        {options.map(([id, display]) => (
          <label key={id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.2rem 0.55rem',
            borderRadius: '999px',
            border: `1px solid ${value === id ? 'var(--color-accent)' : 'var(--color-border)'}`,
            background: value === id ? 'var(--color-accent-dim)' : 'transparent',
            color: value === id ? 'var(--color-accent)' : 'var(--color-ink-muted)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            fontWeight: value === id ? 600 : 400,
            userSelect: 'none',
          }}>
            <input
              type="radio"
              name={label}
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            {display}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
