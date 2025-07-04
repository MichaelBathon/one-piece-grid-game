"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaThLarge, FaTrophy, FaQuestionCircle, FaSignInAlt, FaCalendarAlt } from 'react-icons/fa';
import type { IconType } from 'react-icons';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const pastGamesBtnRef = useRef<HTMLButtonElement>(null);

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
    setShowDatePicker(true);
  };

  const handleDatePick = () => {
    if (dateInputRef.current && dateInputRef.current.value) {
      setDateSeed(dateInputRef.current.value);
      setShowDatePicker(false);
    }
  };

  return (
    <DateSeedContext.Provider value={{ dateSeed, setDateSeed }}>
      <div className="min-h-screen bg-transparent flex flex-col">
        {/* Sidebar: curved, collapsible */}
        <aside
          className={`fixed top-0 left-0 h-full z-40 flex flex-col items-center transition-all duration-300
            bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 shadow-2xl
            ${sidebarOpen ? (sidebarCollapsed ? 'w-16' : 'w-64') : 'w-0 p-0'}
            p-0 md:rounded-r-[3rem]
            ${!sidebarOpen ? 'pointer-events-none' : ''}
          `}
          style={{ borderTopRightRadius: '3rem', borderBottomRightRadius: '3rem' }}
        >
          {/* Collapse/Expand button (always visible) */}
          <button
            className="absolute top-4 right-2 text-xl text-white hover:text-blue-200 z-20 bg-blue-700/70 dark:bg-blue-900/70 rounded-full p-1 border border-blue-200 dark:border-blue-800 shadow"
            onClick={() => setSidebarCollapsed((c) => !c)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            {sidebarCollapsed ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            )}
          </button>
          {/* Close button for mobile */}
          <button
            className="md:hidden absolute top-4 left-2 text-2xl text-white hover:text-red-400 z-10 bg-blue-700/70 dark:bg-blue-900/70 rounded-full px-2 py-1"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            type="button"
          >✕</button>
          <div className={`flex flex-col items-center w-full h-full pt-16 pb-8 transition-all duration-300 ${sidebarCollapsed ? 'px-0' : 'px-4'}`}>
            {/* Logo */}
            <div className={`mb-10 w-full flex items-center justify-center transition-all duration-300 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
              <img src="/window.svg" alt="Logo" className={`h-10 w-10 ${sidebarCollapsed ? '' : 'mr-2'}`} />
              {!sidebarCollapsed && <span className="text-2xl font-bold text-white tracking-tight">One Piece Grid</span>}
            </div>
            {/* Nav */}
            <nav className="flex flex-col gap-4 w-full">
              <button
                className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl hover:bg-blue-700/60 dark:hover:bg-blue-800/60 transition font-semibold text-white ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('My Grid clicked!')}
              >
                <FaThLarge className="text-xl" />
                {!sidebarCollapsed && <span>My Grid</span>}
              </button>
              <button
                className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl hover:bg-blue-700/60 dark:hover:bg-blue-800/60 transition font-semibold text-white ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('Leaderboard clicked!')}
              >
                <FaTrophy className="text-xl" />
                {!sidebarCollapsed && <span>Leaderboard</span>}
              </button>
              <button
                className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl hover:bg-blue-700/60 dark:hover:bg-blue-800/60 transition font-semibold text-white ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('How To Play clicked!')}
              >
                <FaQuestionCircle className="text-xl" />
                {!sidebarCollapsed && <span>How To Play</span>}
              </button>
            </nav>
            <div className="mt-auto w-full">
              <button className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 dark:bg-blue-900 dark:hover:bg-blue-950 text-white font-semibold transition ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}>
                <FaSignInAlt className="text-xl" />
                {!sidebarCollapsed && <span>Sign In</span>}
              </button>
            </div>
          </div>
        </aside>
        {/* Main content (with left margin on desktop) */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          {/* Header (desktop) */}
          <header className="sticky top-0 z-20 w-full flex items-center justify-between px-2 sm:px-6 py-3 md:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 shadow-lg rounded-b-3xl md:rounded-b-[2.5rem] mx-auto transition-all duration-300 relative">
            <div className="flex items-center gap-4">
              {/* Hamburger for mobile */}
              <button
                className="md:hidden flex items-center justify-center p-2 rounded-full bg-blue-700/80 text-white hover:bg-blue-800 transition"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <div className="text-xl font-semibold text-white drop-shadow">Daily Game: <span className="font-mono text-blue-200">{dateSeed}</span></div>
              <button
                onClick={handleRandomize}
                className="px-3 py-1 rounded-lg bg-blue-800 text-white hover:bg-blue-900 border border-blue-900 text-xs font-semibold transition shadow"
              >
                Randomize
              </button>
              <button
                ref={pastGamesBtnRef}
                onClick={handlePastGames}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-800 text-white hover:bg-blue-900 border border-blue-900 text-xs font-semibold transition shadow relative"
              >
                <FaCalendarAlt className="text-base" />
                Past Games
              </button>
              {/* Date Picker Popover */}
              {showDatePicker && (
                <div
                  className="absolute z-50 mt-2 left-0"
                  style={{
                    top: pastGamesBtnRef.current?.offsetTop ? (pastGamesBtnRef.current.offsetTop + pastGamesBtnRef.current.offsetHeight + 8) : undefined,
                    left: pastGamesBtnRef.current?.offsetLeft ? pastGamesBtnRef.current.offsetLeft : undefined,
                  }}
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4 w-80 border border-blue-200 dark:border-blue-700">
                    <div className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2"><FaCalendarAlt />Select a date</div>
                    <input
                      ref={dateInputRef}
                      type="date"
                      className="w-full px-3 py-2 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-zinc-800 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      max={new Date().toISOString().slice(0, 10)}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
                        onClick={handleDatePick}
                      >Select</button>
                      <button
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
                        onClick={() => setShowDatePicker(false)}
                      >Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
                className="rounded-full p-2 bg-blue-700 text-white hover:bg-blue-800 transition shadow"
                aria-label="Toggle theme"
                type="button"
              >
                <span role="img" aria-label={label}>{icon}</span>
              </button>
              <span className="text-white font-medium drop-shadow">Welcome, Guest!</span>
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