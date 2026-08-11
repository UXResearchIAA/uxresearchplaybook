'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

// stepId → Set of checked item indices
type CheckedState = Record<number, Set<number>>;

interface SOPProgressContextType {
  checked: CheckedState;
  toggleItem: (stepId: number, itemIndex: number) => void;
  totalItems: number;
  completedItems: number;
}

const SOPProgressContext = createContext<SOPProgressContextType | null>(null);

interface SOPProgressProviderProps {
  slug: string;
  /** stepId → number of checklist items for that step */
  stepChecklistCounts: Record<number, number>;
  children: ReactNode;
}

function buildEmptyState(counts: Record<number, number>): CheckedState {
  return Object.fromEntries(
    Object.keys(counts).map(id => [Number(id), new Set<number>()])
  );
}

export function SOPProgressProvider({
  slug,
  stepChecklistCounts,
  children,
}: SOPProgressProviderProps) {
  const storageKey = `sop-progress-${slug}`;
  const totalItems = Object.values(stepChecklistCounts).reduce((a, b) => a + b, 0);

  const [checked, setChecked] = useState<CheckedState>(() =>
    buildEmptyState(stepChecklistCounts)
  );

  // Load persisted state from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, number[]>;
      const restored: CheckedState = buildEmptyState(stepChecklistCounts);
      for (const [id, items] of Object.entries(parsed)) {
        const stepId = Number(id);
        const maxIndex = stepChecklistCounts[stepId];
        if (maxIndex !== undefined) {
          restored[stepId] = new Set(items.filter(i => i >= 0 && i < maxIndex));
        }
      }
      setChecked(restored);
    } catch {}
  }, [slug]); // intentionally only on mount per-slug

  // Persist to localStorage whenever checked changes
  useEffect(() => {
    try {
      const toStore: Record<string, number[]> = {};
      for (const [id, items] of Object.entries(checked)) {
        toStore[id] = Array.from(items);
      }
      localStorage.setItem(storageKey, JSON.stringify(toStore));
    } catch {}
  }, [checked, storageKey]);

  const toggleItem = useCallback((stepId: number, itemIndex: number) => {
    setChecked(prev => {
      const current = new Set(prev[stepId] ?? []);
      if (current.has(itemIndex)) current.delete(itemIndex);
      else current.add(itemIndex);
      return { ...prev, [stepId]: current };
    });
  }, []);

  const completedItems = Object.values(checked).reduce(
    (sum, items) => sum + items.size,
    0
  );

  return (
    <SOPProgressContext.Provider
      value={{ checked, toggleItem, totalItems, completedItems }}
    >
      {children}
    </SOPProgressContext.Provider>
  );
}

export function useSOPProgress() {
  const ctx = useContext(SOPProgressContext);
  if (!ctx) throw new Error('useSOPProgress must be used within SOPProgressProvider');
  return ctx;
}
