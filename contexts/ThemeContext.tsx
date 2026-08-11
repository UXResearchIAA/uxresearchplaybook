'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = 'ux-playbook-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Read stored preference
    let stored: Theme = 'system';
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === 'light' || raw === 'dark') stored = raw;
    } catch {}

    setThemeState(stored);

    // Track system preference for resolvedTheme
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    function resolve(s: Theme): 'light' | 'dark' {
      if (s === 'light' || s === 'dark') return s;
      return mq.matches ? 'dark' : 'light';
    }

    setResolvedTheme(resolve(stored));

    function onSystemChange() {
      setResolvedTheme(resolve(theme));
    }
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function setTheme(t: Theme) {
    setThemeState(t);
    const html = document.documentElement;

    if (t === 'system') {
      html.removeAttribute('data-theme');
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mq.matches ? 'dark' : 'light');
    } else {
      html.setAttribute('data-theme', t);
      try { localStorage.setItem(STORAGE_KEY, t); } catch {}
      setResolvedTheme(t);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
