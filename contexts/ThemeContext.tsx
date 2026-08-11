'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'ux-playbook-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default is 'light'; the anti-flicker script in layout.tsx ensures this
  // is applied before first paint even before this component hydrates.
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'dark') setThemeState('dark');
      // Any other value (including null / 'system' from old storage) → light
    } catch {}
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
