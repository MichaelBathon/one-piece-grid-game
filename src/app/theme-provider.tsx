"use client";
import React, { useState, useRef } from "react";
import { FaBars, FaTimes, FaCalendarAlt, FaTrophy, FaQuestionCircle, FaSignInAlt, FaSignOutAlt, FaDice } from 'react-icons/fa';
import { useSession, signOut } from "next-auth/react";

export const DateSeedContext = React.createContext({
  dateSeed: '',
  setDateSeed: (d: string) => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateSeed, setDateSeed] = useState<string>(new Date().toISOString().slice(0, 10));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Theme toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  // Randomize date
  const handleRandomize = () => {
    const start = new Date(+(new Date()) - 1000 * 60 * 60 * 24 * 365 * 5);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    setDateSeed(randomDate.toISOString().slice(0, 10));
    setDrawerOpen(false);
  };

  // Date picker
  const handleDatePick = () => {
    if (dateInputRef.current && dateInputRef.current.value) {
      setDateSeed(dateInputRef.current.value);
      setShowDatePicker(false);
      setDrawerOpen(false);
    }
  };

  return (
    <DateSeedContext.Provider value={{ dateSeed, setDateSeed }}>
      {/* Header */}
      <header className="sticky top-0 z-30 w-full flex items-center justify-between px-3 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow border-b border-slate-200/50 dark:border-slate-700/50">
        {/* Hamburger menu */}
        <button
          className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <FaBars className="w-5 h-5" />
        </button>
        {/* Logo and date */}
        <div className="flex items-center gap-2">
          <img src="/one-piece-jolly-roger.png" alt="Straw Hat Jolly Roger Logo" className="h-8 w-8" />
          <span className="text-lg font-bold text-slate-800 dark:text-slate-200 hidden sm:block">One Piece Grid</span>
          <span className="ml-2 text-sm font-mono text-slate-600 dark:text-slate-400">{dateSeed}</span>
        </div>
        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
            type="button"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          {status === "loading" ? (
            <div className="text-slate-700 dark:text-slate-300 font-medium text-sm hidden sm:inline">Loading...</div>
          ) : session ? (
            <div className="flex items-center gap-2">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-600"
                />
              )}
              <span className="text-slate-700 dark:text-slate-300 font-medium text-sm hidden sm:inline">
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
            <a
              href="/auth/signin"
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 text-xs font-semibold transition-colors shadow-sm"
            >
              <FaSignInAlt className="text-xs" />
              <span className="hidden sm:inline">Sign In</span>
            </a>
          )}
        </div>
      </header>
      {/* Drawer overlay */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setDrawerOpen(false)} />
          <nav className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg z-50 flex flex-col p-6 gap-4 animate-slide-in">
            <button
              className="absolute top-4 right-4 text-2xl text-slate-700 dark:text-slate-300 hover:text-red-500"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
            <div className="flex flex-col gap-4 mt-8">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                onClick={handleRandomize}
              >
                <FaDice /> Randomize
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setShowDatePicker(true)}
              >
                <FaCalendarAlt /> Pick Date
              </button>
              {showDatePicker && (
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    ref={dateInputRef}
                    type="date"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <div className="flex gap-2 mt-2 w-full">
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm"
                      onClick={handleDatePick}
                    >Select</button>
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors text-sm"
                      onClick={() => setShowDatePicker(false)}
                    >Cancel</button>
                  </div>
                </div>
              )}
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => alert('Leaderboard clicked!')}
              >
                <FaTrophy /> Leaderboard
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => alert('How To Play clicked!')}
              >
                <FaQuestionCircle /> How To Play
              </button>
            </div>
          </nav>
        </>
      )}
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {children}
      </main>
    </DateSeedContext.Provider>
  );
} 