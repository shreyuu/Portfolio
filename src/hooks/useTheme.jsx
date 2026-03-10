import { useState, useEffect } from 'react';

const THEMES = ['light', 'dark', 'ocean', 'forest', 'sunset', 'rose'];

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && THEMES.includes(savedTheme)) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    THEMES.forEach(t => root.classList.remove(t));
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light'),
    setTheme,
  };
};

export default useTheme;
