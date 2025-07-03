"use client";
import React, { useEffect, useState } from "react";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Add context for date seed
export const DateSeedContext = React.createContext({
  dateSeed: '',
  setDateSeed: (d: string) => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>("system");
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>("light");
  const [dateSeed, setDateSeed] = useState<string>(new Date().toISOString().slice(0, 10));

  // Set theme on mount
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      setResolvedTheme(saved);
    } else {
      setTheme('system');
      setResolvedTheme(getSystemTheme());
    }
  }, []);

  // Listen for system theme changes if in system mode
  useEffect(() => {
    if (theme !== 'system') return;
    const handler = () => setResolvedTheme(getSystemTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handler);
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handler);
  }, [theme]);

  // Apply theme to <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark')) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }, [theme, resolvedTheme]);

  let icon = '🌗';
  let label = 'System';
  if (theme === 'light') {
    icon = '☀️';
    label = 'Light';
  } else if (theme === 'dark') {
    icon = '🌙';
    label = 'Dark';
  }

  // Handler for randomize button
  const handleRandomize = () => {
    // Pick a random date in the last 5 years
    const start = new Date(+(new Date()) - 1000 * 60 * 60 * 24 * 365 * 5);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    setDateSeed(randomDate.toISOString().slice(0, 10));
  };

  // Handler for past games button (placeholder: just prompt for a date)
  const handlePastGames = () => {
    const input = prompt('Enter a date (YYYY-MM-DD) for a past game:');
    if (input && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
      setDateSeed(input);
    }
  };

  return (
    <DateSeedContext.Provider value={{ dateSeed, setDateSeed }}>
      <div className="min-h-screen bg-transparent flex flex-col">
        {/* Sidebar: always visible, overlays content on mobile, fixed on desktop */}
        <aside className="fixed top-0 left-0 h-full w-64 z-40 bg-white/90 dark:bg-zinc-900/90 shadow-lg flex flex-col p-6 gap-6 border-r border-zinc-200 dark:border-zinc-800 transition-transform md:translate-x-0 translate-x-0">
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-8 tracking-tight">One Piece Grid</div>
          <nav className="flex flex-col gap-4 text-blue-800 dark:text-blue-200 font-medium">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">My Grid</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Leaderboard</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">How To Play</a>
          </nav>
          <div className="mt-auto">
            <button className="w-full py-2 px-4 bg-blue-600 dark:bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-900 transition">Sign In</button>
          </div>
        </aside>
        {/* Main content (with left margin on desktop) */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          {/* Header (desktop) */}
          <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-zinc-900/80 shadow items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-lg flex">
            <div className="flex items-center gap-4">
              <div className="text-xl font-semibold text-blue-900 dark:text-blue-200">Daily Game: <span className="font-mono text-blue-700 dark:text-blue-300">{dateSeed}</span></div>
              <button
                onClick={handleRandomize}
                className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 border border-blue-200 dark:border-blue-700 text-xs font-semibold transition"
              >
                Randomize
              </button>
              <button
                onClick={handlePastGames}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700 text-xs font-semibold transition"
              >
                Past Games
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
                className="rounded-full p-2 bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-zinc-700 transition"
                aria-label="Toggle theme"
                type="button"
              >
                <span role="img" aria-label={label}>{icon}</span>
              </button>
              <span className="text-blue-700 dark:text-blue-200 font-medium">Welcome, Guest!</span>
            </div>
          </header>
          <main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-4 md:px-8 py-4 md:py-8 w-full max-w-5xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </DateSeedContext.Provider>
  );
} 