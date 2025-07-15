"use client";
import React, { useState, useEffect, useRef } from "react";
import { getSimpleGridGameData, getOnePieceCharacters } from "./game-data";
import { FaEye } from "react-icons/fa";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import * as emoji from 'node-emoji';

export default function OnePieceGrid() {
  const [hardMode, setHardMode] = useState(false);
  const [emojiMode, setEmojiMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gameData, setGameData] = useState<any>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [revealedHints, setRevealedHints] = useState<boolean[][]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [hasGuessed, setHasGuessed] = useState<boolean[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [videoEnabled, setVideoEnabled] = useState(true);
  
  // Autocomplete state
  const [suggestions, setSuggestions] = useState<string[][]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean[]>([]);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Add state for tries and revealed answers
  const [tries, setTries] = useState<number[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>([]);

  const videoIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [playerReady, setPlayerReady] = useState(false);

  // Auto-close video modal when video ends
  useEffect(() => {
    if (!showVideoModal || !currentVideo) return;
    let ytPlayer: any = null;
    function onPlayerStateChange(event: any) {
      // 0 = ended
      if (event.data === 0) {
        setShowVideoModal(false);
      }
    }
    function onYouTubeIframeAPIReady() {
      if (document.getElementById('yt-player')) {
        ytPlayer = new (window as any).YT.Player('yt-player', {
          height: '100%',
          width: '100%',
          videoId: currentVideo.split('/embed/')[1]?.split('?')[0],
          playerVars: { autoplay: 1 },
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
      }
    }
    // Load YouTube Iframe API if not already loaded
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
    return () => {
      if (ytPlayer && ytPlayer.destroy) ytPlayer.destroy();
    };
  }, [showVideoModal, currentVideo]);

  // Initialize game data
  useEffect(() => {
    try {
      const data = getSimpleGridGameData(selectedDate, hardMode);
      setGameData(data);
    } catch (error) {
      console.error("Error loading game data:", error);
      // Only use fallback if there's a real error, not just empty data
      setGameData({
        cells: [
          { answer: "Monkey D. Luffy", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Captain", hints: ["Rubber powers", "Wants to be Pirate King"] },
          { answer: "Roronoa Zoro", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Swordsman", hints: ["Three swords", "Green hair"] },
          { answer: "Nami", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Navigator", hints: ["Loves money", "Orange hair"] },
          { answer: "Usopp", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Sniper", hints: ["Long nose", "Slingshot"] },
          { answer: "Sanji", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Cook", hints: ["Kicks only", "Curly eyebrow"] },
          { answer: "Tony Tony Chopper", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Doctor", hints: ["Reindeer", "Blue nose"] },
          { answer: "Nico Robin", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Archaeologist", hints: ["Poneglyphs", "Ohara survivor"] },
          { answer: "Franky", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Shipwright", hints: ["Cyborg", "Cola-powered"] },
          { answer: "Brook", attr1: "affiliation", value1: "Straw Hat Pirates", attr2: "role", value2: "Musician", hints: ["Skeleton", "Yomi Yomi no Mi"] },
        ]
      });
    }
  }, [hardMode, selectedDate]);

  // Initialize state when game data changes
  useEffect(() => {
    if (gameData && gameData.cells) {
      setAnswers(Array(gameData.cells.length).fill(""));
      setRevealedHints(gameData.cells.map(() => [false, false, false, false, false]));
      setCorrectAnswers(Array(gameData.cells.length).fill(false));
      setHasGuessed(Array(gameData.cells.length).fill(false));
      setSuggestions(Array(gameData.cells.length).fill([]));
      setSelectedSuggestion(Array(gameData.cells.length).fill(0));
      setShowSuggestions(Array(gameData.cells.length).fill(false));
      setPoints(0);
      setStreak(0);
      setTotalCorrect(0);
      setTries(Array(gameData.cells.length).fill(0));
      setRevealedAnswers(Array(gameData.cells.length).fill(false));
    }
  }, [gameData]);

  // Get all character names for autocomplete
  const allCharacters = getOnePieceCharacters(hardMode);
  const getAllCharacterNames = () => allCharacters.map((char: any) => char.name);

  // Generate suggestions based on input
  const generateSuggestions = (input: string, index: number) => {
    if (!input.trim()) {
      setSuggestions(prev => {
        const newSuggestions = [...prev];
        newSuggestions[index] = [];
        return newSuggestions;
      });
      setShowSuggestions(prev => {
        const newShow = [...prev];
        newShow[index] = false;
        return newShow;
      });
      return;
    }
    const allNames = getAllCharacterNames();
    const filtered = allNames.filter((name: string) => 
      name.toLowerCase().includes(input.toLowerCase()) && 
      name.toLowerCase() !== input.toLowerCase()
    ).slice(0, 5);
    setSuggestions(prev => {
      const newSuggestions = [...prev];
      newSuggestions[index] = filtered;
      return newSuggestions;
    });
    setSelectedSuggestion(prev => {
      const newSelected = [...prev];
      newSelected[index] = 0;
      return newSelected;
    });
    setShowSuggestions(prev => {
      const newShow = [...prev];
      newShow[index] = filtered.length > 0;
      return newShow;
    });
  };

  const toggleHardMode = () => {
    setHardMode(!hardMode);
  };

  const toggleEmojiMode = () => {
    setEmojiMode(!emojiMode);
  };

  const randomizeGrid = () => {
    try {
      // Add a random offset (up to ~11 days) to the current time
      const randomSeed = new Date(Date.now() + Math.floor(Math.random() * 1e9));
      const data = getSimpleGridGameData(randomSeed, hardMode);
      setSelectedDate(randomSeed); // Update the date picker
      setGameData(data);
    } catch (error) {
      console.error("Error randomizing grid:", error);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Add a new function to handle guess submission
  const submitGuess = (index: number, value: string) => {
    if (!gameData || !gameData.cells) return;
    const cell = gameData.cells[index];
    const isCorrect = value.toLowerCase().trim() === cell.answer.toLowerCase();
    if (isCorrect && !correctAnswers[index]) {
      const newCorrectAnswers = [...correctAnswers];
      newCorrectAnswers[index] = true;
      setCorrectAnswers(newCorrectAnswers);
      const hintsUsed = revealedHints[index] ? revealedHints[index].filter(hint => hint).length : 0;
      const basePoints = 100;
      const hintPenalty = hintsUsed * 20;
      const earnedPoints = Math.max(basePoints - hintPenalty, 10);
      setPoints(prev => prev + earnedPoints);
      setStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
      // Show video modal if enabled and video exists
      if (videoEnabled && cell.video) {
        setCurrentCharacter(cell.answer);
        setCurrentVideo(cell.video);
        setShowVideoModal(true);
      }
    } else if (!isCorrect && !correctAnswers[index] && tries[index] < 3) {
      // Increment tries
      const newTries = [...tries];
      newTries[index] = Math.min(3, newTries[index] + 1);
      setTries(newTries);
    }
    // Mark as guessed
    if (!hasGuessed[index]) {
      const newHasGuessed = [...hasGuessed];
      newHasGuessed[index] = true;
      setHasGuessed(newHasGuessed);
    }
  };

  // Update handleAnswerChange to only update the input value and suggestions
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    generateSuggestions(value, index);
  };

  // Update handleKeyDown to submit guess on Enter
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (!showSuggestions[index] || suggestions[index].length === 0) {
      if (e.key === 'Enter' && !correctAnswers[index] && tries[index] < 3 && !revealedAnswers[index]) {
        submitGuess(index, answers[index]);
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => {
          const newSelected = [...prev];
          newSelected[index] = Math.min(newSelected[index] + 1, suggestions[index].length - 1);
          return newSelected;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => {
          const newSelected = [...prev];
          newSelected[index] = Math.max(newSelected[index] - 1, 0);
          return newSelected;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions[index][selectedSuggestion[index]]) {
          // Submit guess with suggestion
          submitGuess(index, suggestions[index][selectedSuggestion[index]]);
          setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = suggestions[index][selectedSuggestion[index]];
            return newAnswers;
          });
          setShowSuggestions(prev => {
            const newShow = [...prev];
            newShow[index] = false;
            return newShow;
          });
        } else {
          // Submit guess with current input
          submitGuess(index, answers[index]);
        }
        break;
      case 'Escape':
        setShowSuggestions(prev => {
          const newShow = [...prev];
          newShow[index] = false;
          return newShow;
        });
        break;
    }
  };

  // Update selectSuggestion to submit guess
  const selectSuggestion = (index: number, suggestion: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = suggestion;
      return newAnswers;
    });
    submitGuess(index, suggestion);
    setShowSuggestions(prev => {
      const newShow = [...prev];
      newShow[index] = false;
      return newShow;
    });
  };

  const revealHint = (cellIndex: number, hintIndex: number) => {
    if (revealedHints[cellIndex] && revealedHints[cellIndex][hintIndex] !== undefined) {
      const newRevealedHints = [...revealedHints];
      newRevealedHints[cellIndex][hintIndex] = true;
      setRevealedHints(newRevealedHints);
    }
  };

  const getHintButtonText = (cellIndex: number, hintIndex: number) => {
    if (revealedHints[cellIndex] && revealedHints[cellIndex][hintIndex] && gameData && gameData.cells) {
      return gameData.cells[cellIndex].hints[hintIndex];
    }
    return `Hint ${hintIndex + 1}`;
  };

  const getProgressPercentage = () => {
    if (!gameData || !gameData.cells) return 0;
    return Math.round((totalCorrect / gameData.cells.length) * 100);
  };

  // Emoji mapping for One Piece characters
  const getEmojiForCharacter = (characterName: string): string => {
    const emojiMap: { [key: string]: string } = {
      "Monkey D. Luffy": "🟡👒",
      "Roronoa Zoro": "🗡️💚",
      "Nami": "🍊🧭",
      "Usopp": "👃🎯",
      "Sanji": "🍳🦵",
      "Tony Tony Chopper": "🦌💊",
      "Nico Robin": "🌺📚",
      "Franky": "🤖🥤",
      "Brook": "💀🎻",
      "Jinbe": "🐋👊",
      "Trafalgar Law": "⚡🏴‍☠️",
      "Eustass Kid": "🧲🔴",
      "Portgas D. Ace": "🔥👑",
      "Sabo": "🔥🎭",
      "Edward Newgate": "🏴‍☠️💀",
      "Marco": "🔥🦅",
      "Shanks": "🍷🗡️",
      "Dracule Mihawk": "🗡️👁️",
      "Boa Hancock": "💕🐍",
      "Crocodile": "🏜️💨",
      "Donquixote Doflamingo": "🕶️🕷️",
      "Charlotte Linlin": "🍰👑",
      "Kaido": "🐉🍶",
      "Big Mom": "🍰👑",
      "Whitebeard": "🏴‍☠️💀",
      "Gol D. Roger": "🏴‍☠️👑",
      "Dragon": "🐉🌪️",
      "Akainu": "🌋🐕",
      "Aokiji": "❄️🚴",
      "Kizaru": "⚡👴",
      "Fujitora": "🌪️👨‍🦯",
      "Green Bull": "🌱🐂",
      "Smoker": "💨🚬",
      "Tashigi": "🗡️👓",
      "Coby": "👨‍⚖️💗",
      "Helmeppo": "👨‍⚖️💛",
      "Garp": "👊👴",
      "Sengoku": "🐘👨‍⚖️",
      "Tsuru": "👵🧺",
      "Vergo": "🕶️🥋",
      "Monet": "❄️🦅",
      "Sugar": "🍇👧",
      "Baby 5": "🔫💕",
      "Buffalo": "🪖💨",
      "Jora": "🎨👵",
      "Lao G": "🥋👴",
      "Dellinger": "🐟👶",
      "Machvise": "⚖️👨",
      "Senor Pink": "👶🍼",
      "Gladius": "💣💥",
      "Diamante": "♦️🗡️",
      "Trebol": "🟢👃",
      "Pica": "🗿🗿",
      "Viola": "👁️🌺",
      "Rebecca": "🗡️👑",
      "Kyros": "🗡️🦵",
      "Leo": "🛡️👶",
      "Mansherry": "💊👸",
      "Gancho": "🛡️👶",
      "Kabu": "🛡️👶",
      "Bian": "🛡️👶",
      "Boo": "🛡️👶",
      "Hajrudin": "🛡️👶",
      "Orlumbus": "🛡️👶",
      "Cavendish": "🗡️👑",
      "Bartolomeo": "🛡️👶",
      "Ideo": "🥊👶",
      "Blue Gilly": "🥊👶",
      "Abdullah": "🥊👶",
      "Jeet": "🥊👶",
      "Sai": "🥊👶",
      "Chinjao": "🥊👶"
    };
    return emojiMap[characterName] || "❓";
  };

  // Convert text clues to emojis
  const getEmojiClues = (cell: any, hintIndex: number): string => {
    if (Array.isArray(cell.emojiClue) && cell.emojiClue.length > hintIndex) {
      console.log(`[EMOJI CLUE] Using emojiClue for "${cell.answer}" at index ${hintIndex}:`, cell.emojiClue[hintIndex]);
      return cell.emojiClue[hintIndex];
    }
    // Fallback to hardcoded mapping if emojiClue is not available
    const emojiMap: { [key: string]: string[] } = {
      "Monkey D. Luffy": ["🟡👒", "🍎", "🏴‍☠️", "🟡", "👁️"],
      "Roronoa Zoro": ["🗡️🗡️🗡️", "🍶", "💚", "🗺️", "⚔️"],
      "Nami": ["🍊", "🧭", "🌪️", "💰", "🌧️"],
      "Usopp": ["📖", "🎯", "👃", "🏴‍☠️", "🎭"],
      "Sanji": ["🦵", "🍳", "💫", "💕", "👑"],
      "Tony Tony Chopper": ["🦌", "💊", "🔵", "🔄", "🍭"],
      "Nico Robin": ["🌸", "📚", "🏛️", "📜", "🖐️"],
      "Franky": ["🤖", "🚢", "🥤", "👨‍👩‍👧‍👦", "💪"],
      "Brook": ["💀", "🎻", "🦴", "☕", "🎵"],
      "Jinbe": ["🐋", "👊", "🌊", "🐟", "🟦"],
      "Trafalgar Law": ["⚡", "🏴‍☠️", "🔪", "💀", "🟨"],
      "Eustass Kid": ["🧲", "🔴", "⚙️", "🗡️", "💀"],
      "Portgas D. Ace": ["🔥", "👑", "🍖", "⚡", "🟠"],
      "Sabo": ["🔥", "🎭", "🥊", "🎩", "🟠"],
      "Edward Newgate": ["🏴‍☠️", "💀", "🗡️", "👴", "⚡"],
      "Marco": ["🔥", "🦅", "💊", "🟦", "⚡"],
      "Shanks": ["🍷", "🗡️", "🔴", "🏴‍☠️", "⚡"],
      "Dracule Mihawk": ["🗡️", "👁️", "🟨", "🏴‍☠️", "⚔️"],
      "Boa Hancock": ["💕", "🐍", "👑", "💎", "🟣"],
      "Crocodile": ["🏜️", "💨", "🟤", "💎", "🌪️"],
      "Donquixote Doflamingo": ["🕶️", "🕷️", "🟥", "👑", "🕸️"],
      "Charlotte Linlin": ["🍰", "👑", "💕", "🟣", "⚡"],
      "Kaido": ["🐉", "🍶", "🟦", "💀", "⚡"],
      "Big Mom": ["🍰", "👑", "💕", "🟣", "⚡"],
      "Whitebeard": ["🏴‍☠️", "💀", "🗡️", "👴", "⚡"],
      "Gol D. Roger": ["🏴‍☠️", "👑", "🗡️", "💀", "⚡"],
      "Dragon": ["🐉", "🌪️", "🟢", "👑", "⚡"],
      "Akainu": ["🌋", "🐕", "🟥", "🔥", "⚡"],
      "Aokiji": ["❄️", "🚴", "🟦", "🧊", "⚡"],
      "Kizaru": ["⚡", "👴", "🟨", "💡", "⚡"],
      "Fujitora": ["🌪️", "👨‍🦯", "🟤", "🗡️", "⚡"],
      "Green Bull": ["🌱", "🐂", "🟢", "🌿", "⚡"],
      "Smoker": ["💨", "🚬", "⚪", "🌫️", "⚡"],
      "Tashigi": ["🗡️", "👓", "🟦", "⚔️", "⚡"],
      "Coby": ["👨‍⚖️", "💗", "🟦", "⚖️", "⚡"],
      "Helmeppo": ["👨‍⚖️", "💛", "🟦", "⚖️", "⚡"],
      "Garp": ["👊", "👴", "🟦", "⚖️", "⚡"],
      "Sengoku": ["🐘", "👨‍⚖️", "🟦", "⚖️", "⚡"],
      "Tsuru": ["👵", "🧺", "🟦", "⚖️", "⚡"],
      "Vergo": ["🕶️", "🥋", "🟦", "⚖️", "⚡"],
      "Monet": ["❄️", "🦅", "🟦", "⚖️", "⚡"],
      "Sugar": ["🍇", "👧", "🟦", "⚖️", "⚡"],
      "Baby 5": ["🔫", "💕", "🟦", "⚖️", "⚡"],
      "Buffalo": ["🪖", "💨", "🟦", "⚖️", "⚡"],
      "Jora": ["🎨", "👵", "🟦", "⚖️", "⚡"],
      "Lao G": ["🥋", "👴", "🟦", "⚖️", "⚡"],
      "Dellinger": ["🐟", "👶", "🟦", "⚖️", "⚡"],
      "Machvise": ["⚖️", "👨", "🟦", "⚖️", "⚡"],
      "Senor Pink": ["👶", "🍼", "🟦", "⚖️", "⚡"],
      "Gladius": ["💣", "💥", "🟦", "⚖️", "⚡"],
      "Diamante": ["♦️", "🗡️", "🟦", "⚖️", "⚡"],
      "Trebol": ["🟢", "👃", "🟦", "⚖️", "⚡"],
      "Pica": ["🗿", "🗿", "🟦", "⚖️", "⚡"],
      "Viola": ["👁️", "🌺", "🟦", "⚖️", "⚡"],
      "Rebecca": ["🗡️", "👑", "🟦", "⚖️", "⚡"],
      "Kyros": ["🗡️", "🦵", "🟦", "⚖️", "⚡"],
      "Leo": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Mansherry": ["💊", "👸", "🟦", "⚖️", "⚡"],
      "Gancho": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Kabu": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Bian": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Boo": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Hajrudin": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Orlumbus": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Cavendish": ["🗡️", "👑", "🟦", "⚖️", "⚡"],
      "Bartolomeo": ["🛡️", "👶", "🟦", "⚖️", "⚡"],
      "Ideo": ["🥊", "👶", "🟦", "⚖️", "⚡"],
      "Blue Gilly": ["🥊", "👶", "🟦", "⚖️", "⚡"],
      "Abdullah": ["🥊", "👶", "🟦", "⚖️", "⚡"],
      "Jeet": ["🥊", "👶", "🟦", "⚖️", "⚡"],
      "Sai": ["🥊", "👶", "🟦", "⚖️", "⚡"],
      "Chinjao": ["🥊", "👶", "🟦", "⚖️", "⚡"]
    };
    const fallbackEmojis = emojiMap[cell.answer] || ["❓", "❓", "❓", "❓", "❓"];
    console.warn(`[EMOJI CLUE] Fallback for "${cell.answer}" at index ${hintIndex}:`, fallbackEmojis[hintIndex]);
    return fallbackEmojis[hintIndex] || "❓";
  };

  // Progressive hint logic
  const handleHint = (cellIndex: number) => {
    // Reveal next unrevealed hint
    const cellHints = revealedHints[cellIndex];
    const nextHintIdx = cellHints.findIndex(h => !h);
    if (nextHintIdx !== -1) {
      const newRevealedHints = [...revealedHints];
      newRevealedHints[cellIndex][nextHintIdx] = true;
      setRevealedHints(newRevealedHints);
    }
  };

  // Reveal answer logic
  const handleReveal = (cellIndex: number) => {
    const newRevealedAnswers = [...revealedAnswers];
    newRevealedAnswers[cellIndex] = true;
    setRevealedAnswers(newRevealedAnswers);
  };

  // Helper to get emoji for a clue value using node-emoji
  const getClueEmoji = (value: string) => {
    // Try to emojify the value, fallback to a default emoji if not found
    const emojified = emoji.find(value.toLowerCase());
    if (emojified) return emojified.emoji;
    // Try to split and emojify each word, join if any found
    const words = value.split(/\s|,|-/).map(w => emoji.find(w.toLowerCase())?.emoji).filter(Boolean);
    if (words.length > 0) return words.join(' ');
    // Fallbacks for common One Piece terms
    if (/bounty|\d{3,}/i.test(value)) return '💰';
    if (/devil ?fruit/i.test(value)) return '🍎';
    if (/pirate/i.test(value)) return '🏴‍☠️';
    if (/arc/i.test(value)) return '📖';
    if (/god/i.test(value)) return '👑';
    if (/blue/i.test(value)) return '🌊';
    if (/male/i.test(value)) return '♂️';
    if (/female/i.test(value)) return '♀️';
    return '❓';
  };

  // Show loading state if game data is not ready
  if (!gameData || !gameData.cells) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 py-6">
        <div className="text-lg text-slate-600 dark:text-slate-400">Loading game...</div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 py-6">
        {/* Stats Bar */}
        <div className="w-full max-w-3xl mx-auto mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{points}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{streak}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalCorrect}/{gameData.cells.length}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Correct</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Only show on md+ screens */}
                <div className="hidden md:flex items-center gap-2">
                  <label htmlFor="date-picker" className="text-sm font-medium text-slate-600 dark:text-slate-300">Date:</label>
                  <input id="date-picker" type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => handleDateChange(new Date(e.target.value))} className="px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <button onClick={toggleHardMode} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${hardMode ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600'}`}>{hardMode ? 'Hard Mode' : 'Normal Mode'}</button>
                <button onClick={toggleEmojiMode} className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${emojiMode ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600'}`}>{emojiMode ? 'Emoji Mode' : 'Text Mode'}</button>
                <button onClick={randomizeGrid} className="px-2 py-1 rounded-lg text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors whitespace-nowrap min-w-[0] max-w-[90px] overflow-hidden text-ellipsis">Randomize</button>
                <button
                  onClick={() => setVideoEnabled(v => !v)}
                  className="flex items-center justify-center px-3 py-1 rounded-lg text-sm font-medium border transition-colors ml-2"
                  title={videoEnabled ? "Disable videos" : "Enable videos"}
                  aria-label={videoEnabled ? "Disable videos" : "Enable videos"}
                >
                  {videoEnabled ? (
                    <FaVideo className="text-green-600" />
                  ) : (
                    <FaVideoSlash className="text-red-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {gameData.cells.map((cell: any, idx: number) => (
              <div key={idx} className="rounded-xl shadow-none p-4 flex flex-col items-center min-h-[120px]">
                <div className="w-full flex flex-col items-center justify-center gap-1 mb-2">
                  {emojiMode ? (
                    <>
                      <span className="text-2xl text-center">{cell.emojiClue?.[0] || "❓"}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-black">+</span>
                      <span className="text-2xl text-center">{cell.emojiClue?.[1] || "❓"}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-slate-900 dark:text-white text-center text-base break-words">{cell.value1}</span>
                      <span className="text-slate-400 dark:text-slate-500 font-black">+</span>
                      <span className="font-bold text-slate-900 dark:text-white text-center text-base break-words">{cell.value2}</span>
                    </>
                  )}
                </div>
                <div className="w-full relative">
                  <input
                    ref={(el) => { inputRefs.current[idx] = el; }}
                    type="text"
                    className={`w-full mt-2 px-3 py-2 rounded-lg border text-center text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${correctAnswers[idx] ? 'border-green-800 bg-green-700 text-green-50 dark:bg-green-900 dark:border-green-600 dark:text-green-50' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400'} select-text`}
                    placeholder="Type your answer..."
                    value={answers[idx] || ""}
                    onChange={e => handleAnswerChange(idx, e.target.value)}
                    onKeyDown={e => handleKeyDown(idx, e)}
                    onFocus={() => setFocusedInput(idx)}
                    onBlur={() => { setTimeout(() => setFocusedInput(null), 150); }}
                    disabled={correctAnswers[idx] || tries[idx] >= 3 || revealedAnswers[idx]}
                    style={{ touchAction: 'manipulation', overflowX: 'hidden' }}
                  />
                  {/* Autocomplete Dropdown */}
                  {showSuggestions[idx] && suggestions[idx].length > 0 && focusedInput === idx && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {suggestions[idx].map((suggestion, suggestionIdx) => (
                        <button
                          key={suggestionIdx}
                          className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${suggestionIdx === selectedSuggestion[idx] ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' : 'text-slate-900 dark:text-white'}`}
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => selectSuggestion(idx, suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Hints Section - Only show after first guess and hide if correct */}
                {!correctAnswers[idx] && hasGuessed[idx] && (
                  <div className="w-full mt-3 space-y-1 flex flex-col items-center">
                    {/* Try counter (red dots) */}
                    <div className="flex gap-1 mb-1">
                      {[0,1,2].map(dot => (
                        <span key={dot} className={`w-3 h-3 rounded-full border border-red-400 ${tries[idx] > dot ? 'bg-red-500' : 'bg-transparent'}`}></span>
                      ))}
                    </div>
                    {/* Progressive hints */}
                    {revealedHints[idx].map((revealed, hintIdx) =>
                      revealed ? (
                        <div key={hintIdx} className="w-full text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 mb-1">
                          {emojiMode
                            ? (cell.emojiClue?.[hintIdx + 2] || "❓")
                            : gameData.cells[idx].hints[hintIdx]}
                        </div>
                      ) : null
                    )}
                    {/* Hint/Reveal button logic */}
                    {!revealedAnswers[idx] && tries[idx] < 3 && (
                      <button
                        onClick={() => handleHint(idx)}
                        className="w-full text-xs px-2 py-1 rounded bg-blue-600 text-white font-bold mt-1"
                        disabled={revealedHints[idx].every(h => h)}
                      >
                        Hint
                      </button>
                    )}
                    {!revealedAnswers[idx] && tries[idx] >= 3 && (
                      <button
                        onClick={() => handleReveal(idx)}
                        className="w-full text-xs px-2 py-1 rounded bg-red-600 text-white font-bold mt-1"
                      >
                        Reveal
                      </button>
                    )}
                    {/* Show answer and message if revealed */}
                    {revealedAnswers[idx] && !correctAnswers[idx] && (
                      <div className="w-full flex flex-col items-center mt-2">
                        <div className="px-3 py-2 rounded-lg border-2 border-red-500 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 font-bold text-lg mb-1">
                          {gameData.cells[idx].answer}
                        </div>
                        <div className="text-red-600 dark:text-red-300 font-semibold">Better luck next time!</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Disclaimer Footer */}
      <footer className="w-full bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800 py-3 mt-8 flex justify-center">
        <div className="max-w-3xl w-full px-4 text-center">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            <strong>Disclaimer:</strong> This is a fan-made game and is not affiliated with One Piece, Eiichiro Oda, Toei Animation, or any official One Piece entities. All characters and content belong to their respective owners.
          </p>
        </div>
      </footer>
      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-2 pointer-events-none">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 max-w-md w-full max-h-[60vh] overflow-y-auto shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentCharacter}
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0">
              <div id="yt-player" className="absolute top-0 left-0 w-full h-full rounded-lg" />
            </div>
          </div>
    </div>
      )}
    </>
  );
}