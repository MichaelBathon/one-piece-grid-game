"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaThLarge, FaTrophy, FaQuestionCircle, FaSignInAlt, FaCalendarAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { useSession, signOut } from "next-auth/react";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Add context for date seed
export const DateSeedContext = React.createContext({
  dateSeed: '',
  setDateSeed: (d: string) => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
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
      // Start with system preference
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      setResolvedTheme(systemTheme);
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
    console.log('Theme change:', { theme, resolvedTheme });
    
    if (theme === 'dark') {
      html.classList.add('dark');
      console.log('Added dark class to html');
    } else {
      html.classList.remove('dark');
      console.log('Removed dark class from html');
    }
    
    // Only save to localStorage if user has explicitly chosen light or dark
    // Don't save system preference to avoid overriding it
    if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('theme', theme);
    }
    
    console.log('Current html classes:', html.classList.toString());
  }, [theme, resolvedTheme]);

  let icon = '☀️';
  let label = 'Light';
  if (theme === 'dark') {
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
        {/* Header: full width at top */}
        <header className="sticky top-0 z-30 w-full flex items-center justify-between px-2 sm:px-6 py-2 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-300 dark:from-slate-700 dark:via-slate-600 dark:to-slate-500 shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-lg sm:text-xl font-semibold text-white drop-shadow">Daily Game: <span className="font-mono text-slate-200">{dateSeed}</span></div>
            <button
              onClick={handleRandomize}
              className="px-2 sm:px-3 py-1 rounded-lg bg-slate-700 text-white hover:bg-slate-800 border border-slate-600 text-xs font-semibold transition shadow"
            >
              Randomize
            </button>
            <button
              ref={pastGamesBtnRef}
              onClick={handlePastGames}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg bg-slate-700 text-white hover:bg-slate-800 border border-slate-600 text-xs font-semibold transition shadow relative"
            >
              <FaCalendarAlt className="text-sm sm:text-base" />
              <span className="hidden sm:inline">Past Games</span>
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
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col items-center gap-4 w-64 sm:w-80 border border-slate-200 dark:border-slate-700">
                  <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2"><FaCalendarAlt />Select a date</div>
                  <input
                    ref={dateInputRef}
                    type="date"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 sm:px-4 py-2 rounded-lg bg-slate-600 text-white font-semibold hover:bg-slate-700 transition text-sm"
                      onClick={handleDatePick}
                    >Select</button>
                    <button
                      className="px-3 sm:px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-zinc-700 transition text-sm"
                      onClick={() => setShowDatePicker(false)}
                    >Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => {
                console.log('Theme button clicked, current theme:', theme);
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                console.log('Setting new theme to:', newTheme);
                setTheme(newTheme);
              }}
              className="rounded-full p-1.5 sm:p-2 bg-slate-600 text-white hover:bg-slate-700 transition shadow"
              aria-label="Toggle theme"
              type="button"
            >
              <span role="img" aria-label={label} className="text-sm sm:text-base">{icon}</span>
            </button>
            
            {status === "loading" ? (
              <div className="text-white font-medium drop-shadow text-sm sm:text-base hidden sm:inline">
                Loading...
              </div>
            ) : session ? (
              <div className="flex items-center gap-2">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                )}
                <span className="text-white font-medium drop-shadow text-sm sm:text-base hidden sm:inline">
                  Welcome, {session.user?.name || "User"}!
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 border border-red-500 text-xs font-semibold transition shadow"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-white font-medium drop-shadow text-sm sm:text-base hidden sm:inline">
                  Welcome, Guest!
                </span>
                <a
                  href="/auth/signin"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 text-xs font-semibold transition shadow"
                >
                  <FaSignInAlt className="text-xs" />
                  <span className="hidden sm:inline">Sign In</span>
                </a>
              </div>
            )}
          </div>
        </header>
        
        {/* Sidebar: below header */}
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 flex flex-col items-center transition-all duration-300
            bg-gradient-to-b from-slate-500 via-slate-400 to-slate-300 dark:from-slate-700 dark:via-slate-600 dark:to-slate-500 shadow-2xl
            ${sidebarOpen ? (sidebarCollapsed ? 'w-16' : 'w-64') : 'w-0 p-0'}
            p-0 md:rounded-r-[3rem]
            ${!sidebarOpen ? 'pointer-events-none' : ''}
          `}
          style={{ borderTopRightRadius: '3rem', borderBottomRightRadius: '3rem' }}
        >
          {/* Collapse/Expand button (always visible) */}
          <button
            className="absolute top-4 right-2 text-xl text-white hover:text-slate-200 z-20 bg-slate-600/70 dark:bg-slate-800/70 rounded-full p-1 border border-slate-200 dark:border-slate-700 shadow"
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
          <div className={`flex flex-col items-center w-full h-full pt-16 pb-8 transition-all duration-300 ${sidebarCollapsed ? 'px-0' : 'px-4'}`}>
            {/* Logo */}
            <div className={`mb-10 w-full flex items-center justify-center transition-all duration-300 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
              <img src="/window.svg" alt="Logo" className={`h-10 w-10 ${sidebarCollapsed ? '' : 'mr-2'}`} />
              {!sidebarCollapsed && <span className="text-2xl font-bold text-white tracking-tight">One Piece Grid</span>}
            </div>
            {/* Nav */}
            <nav className="flex flex-col gap-4 w-full">
              <button
                className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl hover:bg-slate-600/60 dark:hover:bg-slate-700/60 transition font-semibold text-white ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('My Grid clicked!')}
              >
                <FaThLarge className="text-xl" />
                {!sidebarCollapsed && <span>My Grid</span>}
              </button>
              <button
                className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl hover:bg-slate-600/60 dark:hover:bg-slate-700/60 transition font-semibold text-white ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('Leaderboard clicked!')}
              >
                <FaTrophy className="text-xl" />
                {!sidebarCollapsed && <span>Leaderboard</span>}
              </button>
              <button
                className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl hover:bg-slate-600/60 dark:hover:bg-slate-700/60 transition font-semibold text-white ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('How To Play clicked!')}
              >
                <FaQuestionCircle className="text-xl" />
                {!sidebarCollapsed && <span>How To Play</span>}
              </button>
            </nav>
            <div className="mt-auto w-full">
              <button className={`flex items-center gap-3 w-full px-2 py-3 rounded-xl bg-slate-700 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-900 text-white font-semibold transition ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}>
                <FaSignInAlt className="text-xl" />
                {!sidebarCollapsed && <span>Sign In</span>}
              </button>
            </div>
          </div>
        </aside>
        {/* Main content (with left margin on desktop) */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64 pt-16">
          <main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-4 md:px-8 py-4 md:py-8 w-full max-w-5xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </DateSeedContext.Provider>
  );
} 