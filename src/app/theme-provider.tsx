"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaThLarge, FaTrophy, FaQuestionCircle, FaSignInAlt, FaCalendarAlt, FaSignOutAlt, FaUser, FaBars, FaTimes } from 'react-icons/fa';
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
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

  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
        setSidebarCollapsed(false);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
        {/* Header: full width at top */}
        <header className="sticky top-0 z-30 w-full flex items-center justify-between px-3 sm:px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-700/50">
          {/* Left side - Mobile menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/window.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 hidden sm:block">One Piece Grid</span>
            </div>
          </div>

          {/* Center - Date and controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
              <span className="hidden sm:inline">Daily Game: </span>
              <span className="font-mono text-slate-600 dark:text-slate-400">{dateSeed}</span>
            </div>
            <button
              onClick={handleRandomize}
              className="px-2 sm:px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 text-xs font-semibold transition-colors shadow-sm"
            >
              <span className="hidden sm:inline">Randomize</span>
              <span className="sm:hidden">🎲</span>
            </button>
            <button
              ref={pastGamesBtnRef}
              onClick={handlePastGames}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-slate-600 text-white hover:bg-slate-700 border border-slate-500 text-xs font-semibold transition-colors shadow-sm relative"
            >
              <FaCalendarAlt className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">Past Games</span>
            </button>
            
            {/* Date Picker Popover */}
            {showDatePicker && (
              <div className="absolute z-50 mt-2 left-0 right-0 sm:left-auto sm:right-0 sm:w-80">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col items-center gap-4 border border-slate-200 dark:border-slate-700 mx-2 sm:mx-0">
                  <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <FaCalendarAlt />Select a date
                  </div>
                  <input
                    ref={dateInputRef}
                    type="date"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <div className="flex gap-2 mt-2 w-full">
                    <button
                      className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm"
                      onClick={handleDatePick}
                    >Select</button>
                    <button
                      className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors text-sm"
                      onClick={() => setShowDatePicker(false)}
                    >Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Theme + Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => {
                console.log('Theme button clicked, current theme:', theme);
                const newTheme = theme === 'dark' ? 'light' : 'dark';
                console.log('Setting new theme to:', newTheme);
                setTheme(newTheme);
              }}
              className="rounded-full p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
              aria-label="Toggle theme"
              type="button"
            >
              <span role="img" aria-label={label} className="text-sm sm:text-base">{icon}</span>
            </button>
            
            {status === "loading" ? (
              <div className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base hidden sm:inline">
                Loading...
              </div>
            ) : session ? (
              <div className="flex items-center gap-2">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600"
                  />
                )}
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base hidden sm:inline">
                  Welcome, {session.user?.name || "User"}!
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 border border-red-500 text-xs font-semibold transition-colors shadow-sm"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm sm:text-base hidden sm:inline">
                  Welcome, Guest!
                </span>
                <a
                  href="/auth/signin"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 text-xs font-semibold transition-colors shadow-sm"
                >
                  <FaSignInAlt className="text-xs" />
                  <span className="hidden sm:inline">Sign In</span>
                </a>
              </div>
            )}
          </div>
        </header>
        
        {/* Mobile overlay for sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar: responsive design */}
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 flex flex-col items-center transition-all duration-300 ease-in-out
            bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 dark:border-slate-700/50
            ${sidebarOpen ? (sidebarCollapsed ? 'w-16' : 'w-64') : 'w-0 -translate-x-full'}
            ${sidebarCollapsed ? 'md:w-16' : 'md:w-64'}
            ${!sidebarOpen ? 'pointer-events-none' : ''}
            md:translate-x-0
          `}
        >
          {/* Collapse/Expand button (desktop only) */}
          <button
            className="absolute top-4 right-2 text-xl text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 z-20 bg-slate-100/70 dark:bg-slate-800/70 rounded-full p-1 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors hidden md:block"
            onClick={() => setSidebarCollapsed((c) => !c)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            {sidebarCollapsed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            )}
          </button>
          
          <div className={`flex flex-col items-center w-full h-full pt-16 pb-8 transition-all duration-300 ${sidebarCollapsed ? 'px-0' : 'px-4'}`}>
            {/* Logo */}
            <div className={`mb-8 w-full flex items-center justify-center transition-all duration-300 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
              <img src="/window.svg" alt="Logo" className={`h-8 w-8 ${sidebarCollapsed ? '' : 'mr-2'}`} />
              {!sidebarCollapsed && <span className="text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">One Piece Grid</span>}
            </div>
            
            {/* Nav */}
            <nav className="flex flex-col gap-3 w-full">
              <button
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('My Grid clicked!')}
              >
                <FaThLarge className="text-lg" />
                {!sidebarCollapsed && <span>My Grid</span>}
              </button>
              <button
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('Leaderboard clicked!')}
              >
                <FaTrophy className="text-lg" />
                {!sidebarCollapsed && <span>Leaderboard</span>}
              </button>
              <button
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
                onClick={() => alert('How To Play clicked!')}
              >
                <FaQuestionCircle className="text-lg" />
                {!sidebarCollapsed && <span>How To Play</span>}
              </button>
            </nav>
          </div>
        </aside>
        
        {/* Main content (responsive margin) */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen && !sidebarCollapsed ? 'md:ml-64' : sidebarCollapsed ? 'md:ml-16' : ''}`}>
          <main className="flex-1 flex flex-col items-center justify-start px-3 sm:px-6 py-4 sm:py-8 w-full max-w-6xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </DateSeedContext.Provider>
  );
} 