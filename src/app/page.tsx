"use client";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { DateSeedContext } from "./theme-provider";

const allAffiliations = [
  "Straw Hat Pirates",
  "Marines",
  "Warlords",
  "Yonko",
  "Revolutionaries",
  "Villains",
  "Allies",
  "World Government",
  "Pirate Crews",
  "Minks",
  "Fish-Men",
  "Samurai",
  "Giants",
  "Civilians",
  "Scientists",
  "Royalty",
];

const allAttributes = [
  "Captain",
  "Swordsman",
  "Navigator",
  "Sniper",
  "Doctor",
  "Cook",
  "Shipwright",
  "Archaeologist",
  "Musician",
  "Devil Fruit User",
  "Haki User",
  "Zoan User",
  "Logia User",
  "Paramecia User",
  "Ancient Weapon",
  "Bounty Hunter",
  "Inventor",
  "Villain",
];

// Deterministic shuffle using a seed (date string)
function seededShuffle<T>(array: T[], seed: string): T[] {
  let arr = array.slice();
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) % 4294967296;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 9301 + 49297) % 233280;
    const j = Math.floor((h / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Expanded correctAnswers with more variety and less repetition
const correctAnswers: Record<string, string> = {
  // Straw Hat Pirates
  "Straw Hat Pirates|Captain": "Monkey D. Luffy",
  "Straw Hat Pirates|Swordsman": "Roronoa Zoro",
  "Straw Hat Pirates|Navigator": "Nami",
  "Straw Hat Pirates|Sniper": "Usopp",
  "Straw Hat Pirates|Doctor": "Tony Tony Chopper",
  "Straw Hat Pirates|Cook": "Sanji",
  "Straw Hat Pirates|Shipwright": "Franky",
  "Straw Hat Pirates|Archaeologist": "Nico Robin",
  "Straw Hat Pirates|Musician": "Brook",
  "Straw Hat Pirates|Devil Fruit User": "Luffy",
  "Straw Hat Pirates|Haki User": "Zoro",
  // Marines
  "Marines|Captain": "Smoker",
  "Marines|Swordsman": "Tashigi",
  "Marines|Navigator": "Brannew",
  "Marines|Sniper": "Fullbody",
  "Marines|Doctor": "Doc Q",
  "Marines|Cook": "Fullbody",
  "Marines|Devil Fruit User": "Kizaru",
  "Marines|Logia User": "Kizaru",
  "Marines|Bounty Hunter": "Hina",
  // Warlords
  "Warlords|Captain": "Crocodile",
  "Warlords|Swordsman": "Dracule Mihawk",
  "Warlords|Navigator": "Boa Hancock",
  "Warlords|Sniper": "Buggy",
  "Warlords|Doctor": "Trafalgar Law",
  "Warlords|Devil Fruit User": "Crocodile",
  "Warlords|Paramecia User": "Boa Hancock",
  "Warlords|Bounty Hunter": "Jinbe",
  // Yonko
  "Yonko|Captain": "Shanks",
  "Yonko|Swordsman": "Shanks",
  "Yonko|Navigator": "Charlotte Smoothie",
  "Yonko|Sniper": "Van Augur",
  "Yonko|Doctor": "Doc Q",
  "Yonko|Devil Fruit User": "Big Mom",
  "Yonko|Paramecia User": "Big Mom",
  "Yonko|Ancient Weapon": "Poseidon",
  "Yonko|Bounty Hunter": "Blackbeard",
  // Revolutionaries
  "Revolutionaries|Captain": "Monkey D. Dragon",
  "Revolutionaries|Swordsman": "Karasu",
  "Revolutionaries|Navigator": "Koala",
  "Revolutionaries|Sniper": "Usopp",
  "Revolutionaries|Doctor": "Ivankov",
  "Revolutionaries|Devil Fruit User": "Sabo",
  "Revolutionaries|Paramecia User": "Sabo",
  "Revolutionaries|Inventor": "Dr. Vegapunk",
  // Villains
  "Villains|Captain": "Blackbeard",
  "Villains|Swordsman": "Shiryu",
  "Villains|Navigator": "Alvida",
  "Villains|Sniper": "Van Augur",
  "Villains|Doctor": "Caesar Clown",
  "Villains|Devil Fruit User": "Doflamingo",
  "Villains|Paramecia User": "Doflamingo",
  "Villains|Ancient Weapon": "Pluton",
  "Villains|Bounty Hunter": "Crocodile",
  // Allies
  "Allies|Captain": "Trafalgar Law",
  "Allies|Swordsman": "Kin'emon",
  "Allies|Navigator": "Pedro",
  "Allies|Sniper": "Sai",
  "Allies|Doctor": "Trafalgar Law",
  "Allies|Devil Fruit User": "Carrot",
  "Allies|Zoan User": "Carrot",
  "Allies|Bounty Hunter": "Bartolomeo",
  // World Government
  "World Government|Captain": "Spandam",
  "World Government|Swordsman": "Rob Lucci",
  "World Government|Navigator": "Kaku",
  "World Government|Sniper": "Jabra",
  "World Government|Doctor": "Dr. Vegapunk",
  "World Government|Devil Fruit User": "Rob Lucci",
  "World Government|Zoan User": "Rob Lucci",
  "World Government|Inventor": "Dr. Vegapunk",
  // Pirate Crews
  "Pirate Crews|Captain": "Whitebeard",
  "Pirate Crews|Swordsman": "Vista",
  "Pirate Crews|Navigator": "Marco",
  "Pirate Crews|Sniper": "Yasopp",
  "Pirate Crews|Doctor": "Marco",
  "Pirate Crews|Cook": "Thatch",
  "Pirate Crews|Devil Fruit User": "Marco",
  "Pirate Crews|Zoan User": "Marco",
  "Pirate Crews|Haki User": "Whitebeard",
  // Minks
  "Minks|Captain": "Inuarashi",
  "Minks|Swordsman": "Nekomamushi",
  "Minks|Navigator": "Pedro",
  "Minks|Sniper": "Carrot",
  "Minks|Doctor": "Tony Tony Chopper",
  "Minks|Devil Fruit User": "Carrot",
  "Minks|Zoan User": "Carrot",
  "Minks|Haki User": "Inuarashi",
  // Fish-Men
  "Fish-Men|Captain": "Jinbe",
  "Fish-Men|Swordsman": "Arlong",
  "Fish-Men|Navigator": "Jinbe",
  "Fish-Men|Sniper": "Hatchan",
  "Fish-Men|Doctor": "Jinbe",
  "Fish-Men|Cook": "Sanji",
  "Fish-Men|Devil Fruit User": "Jinbe",
  "Fish-Men|Haki User": "Jinbe",
  // Samurai
  "Samurai|Captain": "Kin'emon",
  "Samurai|Swordsman": "Kawamatsu",
  "Samurai|Navigator": "Raizo",
  "Samurai|Sniper": "Kanjuro",
  "Samurai|Doctor": "Tony Tony Chopper",
  "Samurai|Devil Fruit User": "Kanjuro",
  "Samurai|Paramecia User": "Kanjuro",
  "Samurai|Haki User": "Kin'emon",
  // Giants
  "Giants|Captain": "Dorry",
  "Giants|Swordsman": "Brogy",
  "Giants|Navigator": "Hajrudin",
  "Giants|Sniper": "Oimo",
  "Giants|Doctor": "Tony Tony Chopper",
  "Giants|Cook": "Kashi",
  "Giants|Devil Fruit User": "Hajrudin",
  "Giants|Haki User": "Dorry",
  // Civilians
  "Civilians|Captain": "Kaya",
  "Civilians|Swordsman": "Kuina",
  "Civilians|Navigator": "Nami",
  "Civilians|Sniper": "Usopp",
  "Civilians|Doctor": "Dr. Kureha",
  "Civilians|Cook": "Sanji",
  "Civilians|Inventor": "Usopp",
  // Scientists
  "Scientists|Captain": "Dr. Vegapunk",
  "Scientists|Swordsman": "Dr. Vegapunk",
  "Scientists|Navigator": "Dr. Vegapunk",
  "Scientists|Sniper": "Dr. Vegapunk",
  "Scientists|Doctor": "Dr. Vegapunk",
  "Scientists|Cook": "Sanji",
  "Scientists|Inventor": "Caesar Clown",
  "Scientists|Devil Fruit User": "Caesar Clown",
  "Scientists|Paramecia User": "Caesar Clown",
  // Royalty
  "Royalty|Captain": "Neptune",
  "Royalty|Swordsman": "Vivi",
  "Royalty|Navigator": "Shirahoshi",
  "Royalty|Sniper": "Usopp",
  "Royalty|Doctor": "Dr. Kureha",
  "Royalty|Cook": "Sanji",
  "Royalty|Ancient Weapon": "Poseidon",
};

const hints: { [key: string]: string } = {
  // Straw Hat Pirates
  "Straw Hat Pirates|Captain": "He wears a straw hat and dreams of becoming Pirate King.",
  "Straw Hat Pirates|Swordsman": "He wields three swords and loves sake.",
  "Straw Hat Pirates|Devil Fruit User": "He ate the Gum-Gum Fruit.",
  "Straw Hat Pirates|Bounty Hunter": "A fish-man and master of Fish-Man Karate.",
  "Straw Hat Pirates|Navigator": "She loves tangerines and maps.",
  "Straw Hat Pirates|Sniper": "He tells tall tales and uses a slingshot.",
  "Straw Hat Pirates|Doctor": "A blue-nosed reindeer who ate the Hito Hito no Mi.",
  // Marines
  "Marines|Captain": "He smokes two cigars at once and uses a jitte.",
  "Marines|Swordsman": "A female swordswoman who idolizes Zoro.",
  "Marines|Devil Fruit User": "An admiral who moves at the speed of light.",
  "Marines|Bounty Hunter": "She can turn people into iron bars.",
  "Marines|Navigator": "He is often seen giving briefings to other marines.",
  "Marines|Sniper": "He is known for his love of dancing and is a marine officer.",
  "Marines|Doctor": "He is a sickly member of Blackbeard's crew, formerly a pirate doctor.",
  // Warlords
  "Warlords|Captain": "He controls sand and was once a Shichibukai.",
  "Warlords|Swordsman": "The world's greatest swordsman, wields a black blade.",
  "Warlords|Devil Fruit User": "He can turn into sand.",
  "Warlords|Bounty Hunter": "He was once a Warlord and is a fish-man.",
  "Warlords|Navigator": "The Pirate Empress, captain of the Kuja Pirates.",
  "Warlords|Sniper": "He is a clown and current Warlord.",
  "Warlords|Doctor": "The \"Surgeon of Death\".",
  // Yonko
  "Yonko|Captain": "He is a red-haired Emperor of the Sea.",
  "Yonko|Swordsman": "He is a Yonko and a master swordsman.",
  "Yonko|Devil Fruit User": "She is the only female Yonko and has the Soru Soru no Mi.",
  "Yonko|Bounty Hunter": "He has two Devil Fruits and is a Yonko.",
  "Yonko|Navigator": "She is one of Big Mom's daughters and a Sweet Commander.",
  "Yonko|Sniper": "He is Blackbeard's sniper.",
  "Yonko|Doctor": "He is Blackbeard's doctor and has the Sick-Sick Fruit.",
  // Revolutionaries
  "Revolutionaries|Captain": "Luffy's father and leader of the Revolutionaries.",
  "Revolutionaries|Swordsman": "He can turn into a murder of crows.",
  "Revolutionaries|Devil Fruit User": "He has the Mera Mera no Mi after Ace.",
  "Revolutionaries|Bounty Hunter": "She can inspire people to fight with her flag.",
  "Revolutionaries|Navigator": "A former slave and now a key member of the Revolutionaries.",
  "Revolutionaries|Sniper": "He is also the Straw Hats' sniper.",
  "Revolutionaries|Doctor": "He can change gender at will and is a commander.",
  // Villains
  "Villains|Captain": "He stole Whitebeard's Devil Fruit and became a Yonko.",
  "Villains|Swordsman": "He is Blackbeard's swordsman and former head jailer of Impel Down.",
  "Villains|Devil Fruit User": "He controls strings and manipulates people like puppets.",
  "Villains|Bounty Hunter": "He controls sand and was once a Warlord.",
  "Villains|Navigator": "She was the first villain Luffy fought and has a slippery body.",
  "Villains|Sniper": "He is Blackbeard's sniper.",
  "Villains|Doctor": "He is a scientist who creates deadly gas weapons.",
  // Allies
  "Allies|Captain": "He is the captain of the Heart Pirates and a skilled doctor.",
  "Allies|Swordsman": "A samurai from Wano and leader of the Akazaya Nine.",
  "Allies|Devil Fruit User": "A rabbit mink who can use Electro and transform under the full moon.",
  "Allies|Bounty Hunter": "He is the \"Barrier Human\" and a big fan of Luffy.",
  "Allies|Navigator": "A jaguar mink and Pedro's partner.",
  "Allies|Sniper": "He is the leader of the Happo Navy and a martial artist.",
  "Allies|Doctor": "The \"Surgeon of Death\" and captain of the Heart Pirates.",
};

// Map character names to YouTube video IDs (example mapping, update as needed)
const characterVideos: { [key: string]: string } = {
  Luffy: "uPIsoC4xIhc",
  Zoro: "lGQ6LCC32Xw",
  Nami: "9fPvAzR_azo",
  Usopp: "_-CTSdyboUM",
  Sanji: "I6eHaRQO2DY",
  Vivi: "RCOGMd9fMzI",
  Chopper: "eFOhvFdTC5o",
  Robin: "xJniMpp-l7k",
  Franky: "v5ZQK_7WJC8",
  Brook: "hAvzPHgVB6Y",
  Jinbe: "wg65MSYqbIA",
  Smoker: "2Vv-BfVoq4g",
  Tashigi: "RgKAFK5djSk",
  Kizaru: "OPf0YbXqDm0",
  Crocodile: "YQHsXMglC9A",
  Mihawk: "CevxZvSJLk8",
  Law: "09R8_2nJtjg",
  Shanks: "kXYiU_JCYtU",
  BigMom: "ktvTqknDobU",
  Blackbeard: "60ItHLz5WEA",
  Dragon: "hLQl3WQQoQ0",
  Sabo: "pRpeEdMmmQ0",
  Ivankov: "uelHwf8o7_U",
  Doflamingo: "YqeW9_5kURI",
  CaesarClown: "YykjpeuMNEk",
  Bartolomeo: "09R8_2nJtjg",
  "Trafalgar Law": "09R8_2nJtjg",
  "Van Augur": "kJQP7kiw5Fk",
  "Kin'emon": "RgKAFK5djSk",
  Carrot: "Zi_XLOBDo_Y",
  Pedro: "hT_nvWreIhg",
  Sai: "CevxZvSJLk8",
  "Charlotte Smoothie": "ktvTqknDobU",
  "Fullbody": "YQHsXMglC9A",
  "Belo Betty": "pRpeEdMmmQ0",
  "Koala": "uelHwf8o7_U",
  "Buggy": "YqeW9_5kURI",
  "Shiryu": "YykjpeuMNEk",
  "Alvida": "YQHsXMglC9A",
  "Hina": "RgKAFK5djSk",
  "Brannew": "hT_nvWreIhg",
};

export default function OnePieceGrid() {
  const { dateSeed } = useContext(DateSeedContext);
  const affiliations = useMemo(() => seededShuffle(allAffiliations, dateSeed).slice(0, 3), [dateSeed]);
  const attributes = useMemo(() => seededShuffle(allAttributes, dateSeed + "x").slice(0, 3), [dateSeed]);

  // Filter to ensure no duplicate answers in the grid
  const gridAnswers = useMemo(() => {
    const usedAnswers = new Set<string>();
    const filteredCombinations: Record<string, string> = {};
    
    // First pass: collect all possible combinations for this grid
    const allCombinations = [];
    for (const aff of affiliations) {
      for (const attr of attributes) {
        const key = `${aff}|${attr}`;
        const answer = correctAnswers[key];
        if (answer) {
          allCombinations.push({ key, answer });
        }
      }
    }
    
    // Second pass: select combinations with unique answers
    for (const { key, answer } of allCombinations) {
      if (!usedAnswers.has(answer)) {
        filteredCombinations[key] = answer;
        usedAnswers.add(answer);
      }
    }
    
    // If we don't have 9 unique answers, fill remaining slots with duplicates
    // but prioritize unique answers first
    let remainingSlots = 9 - Object.keys(filteredCombinations).length;
    if (remainingSlots > 0) {
      for (const { key, answer } of allCombinations) {
        if (!filteredCombinations[key] && remainingSlots > 0) {
          filteredCombinations[key] = answer;
          remainingSlots--;
        }
      }
    }
    
    return filteredCombinations;
  }, [affiliations, attributes]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, "correct" | "incorrect" | "revealed" | undefined>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [videoCell, setVideoCell] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [videoChar, setVideoChar] = useState<string | null>(null);
  const [videosEnabled, setVideosEnabled] = useState<boolean>(true);
  const [guesses, setGuesses] = useState<Record<string, number>>({});
  const [suggestions, setSuggestions] = useState<Record<string, string[]>>({});
  const [showSuggestions, setShowSuggestions] = useState<Record<string, boolean>>({});
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<Record<string, number>>({});
  const [points, setPoints] = useState<number>(100);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  useEffect(() => {
    setAnswers({});
    setFeedback({});
    setGuesses({});
    setShowHint({});
    setPoints(100);
    setWrongAnswers(0);
    setHintsUsed(0);
    setGameComplete(false);
  }, [dateSeed]);

  // Check if game is complete
  useEffect(() => {
    const totalCells = 9;
    const completedCells = Object.keys(feedback).filter(key => 
      feedback[key] === "correct" || feedback[key] === "revealed" || (guesses[key] ?? 0) >= 3
    ).length;
    
    if (completedCells === totalCells) {
      setGameComplete(true);
    }
  }, [feedback, guesses]);

  const handleInput = (
    aff: string,
    attr: string,
    value: string
  ) => {
    const key = `${aff}|${attr}`;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setFeedback((prev) => ({ ...prev, [key]: undefined }));
    
    // Generate suggestions based on input
    if (value.trim()) {
      const inputLower = value.toLowerCase();
      const allCharacters = [...new Set(Object.values(correctAnswers))];
      const matchingCharacters = allCharacters.filter(char => 
        char.toLowerCase().includes(inputLower)
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions((prev) => ({ ...prev, [key]: matchingCharacters }));
      setShowSuggestions((prev) => ({ ...prev, [key]: true }));
      setSelectedSuggestionIndex((prev) => ({ ...prev, [key]: 0 })); // Reset selection
    } else {
      setShowSuggestions((prev) => ({ ...prev, [key]: false }));
      setSelectedSuggestionIndex((prev) => ({ ...prev, [key]: 0 }));
    }
  };

  const handleSuggestionClick = (aff: string, attr: string, suggestion: string) => {
    const key = `${aff}|${attr}`;
    setAnswers((prev) => ({ ...prev, [key]: suggestion }));
    setShowSuggestions((prev) => ({ ...prev, [key]: false }));
    setFeedback((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleInputBlur = (aff: string, attr: string) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      const key = `${aff}|${attr}`;
      setShowSuggestions((prev) => ({ ...prev, [key]: false }));
    }, 150);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    aff: string,
    attr: string
  ) => {
    const key = `${aff}|${attr}`;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (showSuggestions[key] && suggestions[key] && suggestions[key].length > 0) {
        const currentIndex = selectedSuggestionIndex[key] || 0;
        const nextIndex = (currentIndex + 1) % suggestions[key].length;
        setSelectedSuggestionIndex((prev) => ({ ...prev, [key]: nextIndex }));
      }
      return;
    }
    
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showSuggestions[key] && suggestions[key] && suggestions[key].length > 0) {
        const currentIndex = selectedSuggestionIndex[key] || 0;
        const prevIndex = currentIndex === 0 ? suggestions[key].length - 1 : currentIndex - 1;
        setSelectedSuggestionIndex((prev) => ({ ...prev, [key]: prevIndex }));
      }
      return;
    }
    
    if (e.key === "Enter") {
      const answer = answers[key] || "";
      
      // If there are suggestions and user presses Enter, use the selected suggestion
      if (showSuggestions[key] && suggestions[key] && suggestions[key].length > 0) {
        const selectedIndex = selectedSuggestionIndex[key] || 0;
        const selectedSuggestion = suggestions[key][selectedIndex];
        setAnswers((prev) => ({ ...prev, [key]: selectedSuggestion }));
        setShowSuggestions((prev) => ({ ...prev, [key]: false }));
        
        // Submit the selected suggestion
        if (feedback[key] === "correct" || (guesses[key] ?? 0) >= 3) return;
        const isCorrect = gridAnswers[key]?.toLowerCase() === selectedSuggestion.toLowerCase();
        if (isCorrect) {
          setFeedback((prev) => ({ ...prev, [key]: "correct" }));
          if (videosEnabled) {
            const charName = gridAnswers[key];
            if (characterVideos[charName]) {
              setVideo(characterVideos[charName]);
              setVideoChar(charName);
              setVideoCell(key);
            } else {
              setVideo(null);
              setVideoChar(null);
              setVideoCell(null);
            }
          }
        } else {
          setFeedback((prev) => ({ ...prev, [key]: "incorrect" }));
          setGuesses((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
          setWrongAnswers((prev) => prev + 1);
          setPoints((prev) => prev - 1);
        }
        return;
      }
      
      // Original logic for when no suggestions are available
      if (!answer) return;
      if (feedback[key] === "correct" || (guesses[key] ?? 0) >= 3) return;
      const isCorrect = gridAnswers[key]?.toLowerCase() === answer.trim().toLowerCase();
      if (isCorrect) {
        setFeedback((prev) => ({ ...prev, [key]: "correct" }));
        if (videosEnabled) {
          const charName = gridAnswers[key];
          if (characterVideos[charName]) {
            setVideo(characterVideos[charName]);
            setVideoChar(charName);
            setVideoCell(key);
          } else {
            setVideo(null);
            setVideoChar(null);
            setVideoCell(null);
          }
        }
      } else {
        setFeedback((prev) => ({ ...prev, [key]: "incorrect" }));
        setGuesses((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
        setWrongAnswers((prev) => prev + 1);
        setPoints((prev) => prev - 1);
      }
    }
  };

  const handleHint = (aff: string, attr: string) => {
    const key = `${aff}|${attr}`;
    setShowHint((prev) => ({ ...prev, [key]: true }));
    setHintsUsed((prev) => prev + 1);
    setPoints((prev) => prev - 5);
  };

  const handleReveal = (aff: string, attr: string) => {
    const key = `${aff}|${attr}`;
    setAnswers((prev) => ({ ...prev, [key]: gridAnswers[key] || "" }));
    setFeedback((prev) => ({ ...prev, [key]: "revealed" }));
    setShowHint((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-8 px-2 sm:px-4 md:px-8">
      {/* Glass card */}
      <div className="w-full max-w-5xl rounded-3xl bg-white/5 dark:bg-zinc-900/10 shadow-2xl border border-white/10 dark:border-zinc-800/20 p-2 sm:p-4 md:p-8 mx-auto relative overflow-hidden">
        {/* Scrollable grid container */}
        <div className="max-h-[80vh] overflow-y-auto">
        {/* User settings toggle */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <label htmlFor="toggle-videos" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 select-none cursor-pointer">Videos</label>
          <input
            id="toggle-videos"
            type="checkbox"
            checked={videosEnabled}
            onChange={() => setVideosEnabled((v) => !v)}
            className="accent-blue-500 w-4 h-4 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Video modal overlay (centered in grid card) */}
        {videosEnabled && video && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-3xl">
            <div className="relative flex flex-col items-center w-full">
              <button
                className="absolute -top-8 right-0 text-2xl text-white hover:text-red-400 z-10 bg-black/60 rounded-full px-3 py-1"
                onClick={() => { setVideo(null); setVideoChar(null); setVideoCell(null); }}
              >
                ✕
              </button>
              <div className="w-[90vw] max-w-[640px] aspect-video flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video}?autoplay=1&rel=0`}
                  title={videoChar || "Character Video"}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="rounded-2xl shadow-2xl w-full h-full"
                  style={{ minHeight: '180px', maxHeight: '360px' }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 sm:gap-4">
          {/* X axis header - sticky */}
          <div className="sticky top-0 z-10 grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 mb-2">
            <div className="" />
            {attributes.map((attr) => (
              <div key={attr} className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white text-center px-1 py-1 sm:py-2 rounded-xl bg-white/90 dark:bg-zinc-700/90 shadow-sm break-words leading-tight">
                {attr}
              </div>
            ))}
          </div>
          {/* Grid rows */}
          {affiliations.map((aff) => (
            <div key={aff} className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 items-center">
              <div className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white text-left px-1 py-1 sm:py-2 rounded-xl bg-white/80 dark:bg-zinc-700/80 shadow-sm break-words leading-tight">
                {aff}
              </div>
              {attributes.map((attr) => {
                const key = `${aff}|${attr}`;
                const guessCount = guesses[key] ?? 0;
                const isCorrect = feedback[key] === "correct";
                const isLocked = isCorrect || guessCount >= 3;
                return (
                  <div
                    key={attr}
                    className="rounded-2xl bg-white/90 dark:bg-zinc-800/90 shadow-lg flex flex-col items-center justify-center p-2 sm:p-3 md:p-6 min-h-[100px] sm:min-h-[140px] md:min-h-[180px] transition-colors border border-white/60 dark:border-zinc-700/80 backdrop-blur-xl relative"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full max-w-[90px] sm:max-w-[120px] md:max-w-[160px] px-2 sm:px-3 py-2 sm:py-3 md:py-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-slate-400 text-center text-sm sm:text-base md:text-xl font-semibold text-gray-900 dark:text-white bg-white dark:bg-zinc-700 placeholder-gray-500 dark:placeholder-gray-400 transition-colors
                          ${feedback[key] === "correct"
                            ? "border-green-500 ring-2 ring-green-400"
                            : feedback[key] === "incorrect"
                            ? "border-red-400 ring-2 ring-red-300"
                            : feedback[key] === "revealed"
                            ? "border-red-500 ring-2 ring-red-400"
                            : "border-gray-300 dark:border-zinc-600"}
                        `}
                        value={answers[key] || ""}
                        onChange={(e) => handleInput(aff, attr, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, aff, attr)}
                        onBlur={() => handleInputBlur(aff, attr)}
                        placeholder="?"
                        autoComplete="off"
                        disabled={isLocked}
                      />
                      {/* Suggestions dropdown */}
                      {showSuggestions[key] && suggestions[key] && suggestions[key].length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 max-h-32 overflow-y-auto">
                          {suggestions[key].map((suggestion, index) => (
                            <button
                              key={index}
                              className={`w-full px-2 py-1 text-left text-sm transition cursor-pointer ${
                                index === (selectedSuggestionIndex[key] || 0)
                                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
                                  : 'text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900'
                              }`}
                              onClick={() => handleSuggestionClick(aff, attr, suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Guess indicators */}
                    <div className="flex gap-1 mt-1 sm:mt-2 mb-1">
                      {[0,1,2].map(i => (
                        <div key={i} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-gray-400 dark:border-gray-600 ${guessCount > i ? 'bg-red-500' : 'bg-gray-200 dark:bg-zinc-800'}`}></div>
                      ))}
                    </div>
                    {feedback[key] === "correct" && (
                      <div className="text-green-600 dark:text-green-400 text-xs sm:text-sm mt-1 font-bold drop-shadow">Correct!</div>
                    )}
                    {feedback[key] === "incorrect" && guessCount < 3 && (
                      <div className="text-red-700 dark:text-red-300 text-xs sm:text-sm mt-1 font-bold drop-shadow">Try again</div>
                    )}
                    {feedback[key] === "revealed" && (
                      <div className="text-red-700 dark:text-red-300 text-xs sm:text-sm mt-1 font-bold drop-shadow">Better luck next time!</div>
                    )}
                    <div className="flex gap-1 sm:gap-2 justify-center mt-1 sm:mt-2">
                      {/* Show Hint button only after 1st incorrect guess, before 3rd */}
                      {guessCount > 0 && guessCount < 3 && !isCorrect && (
                        <button
                          className="px-1 sm:px-2 py-1 text-xs sm:text-sm rounded bg-blue-100/80 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 border border-blue-200/60 dark:border-blue-700/60 transition font-semibold shadow"
                          onClick={() => handleHint(aff, attr)}
                          disabled={showHint[key]}
                        >
                          Hint
                        </button>
                      )}
                      {/* Show Reveal button only after 3rd incorrect guess and not correct */}
                      {guessCount >= 3 && !isCorrect && feedback[key] !== "revealed" && (
                        <button
                          className="px-1 sm:px-2 py-1 text-xs sm:text-sm rounded bg-gray-200/80 dark:bg-zinc-800/60 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-700 border border-gray-300/60 dark:border-zinc-700/60 transition font-semibold shadow"
                          onClick={() => handleReveal(aff, attr)}
                        >
                          Reveal
                        </button>
                      )}
                    </div>
                    {/* Show hint if requested */}
                    {showHint[key] && hints[key] && (
                      <div className="text-xs sm:text-sm mt-1 text-blue-700 dark:text-blue-300 italic font-semibold drop-shadow text-center px-1">{hints[key]}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        </div>
      </div>
      
      {/* Score display - below grid and centered */}
      {gameComplete && (
        <div className="mt-8 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-lg border border-white/40 dark:border-zinc-800/60 p-6 text-center max-w-md">
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Game Complete!</div>
          <div className="text-lg text-gray-700 dark:text-gray-300">
            Final Score: <span className="font-bold text-slate-600 dark:text-slate-400">{points}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Wrong Answers: {wrongAnswers} | Hints Used: {hintsUsed}
          </div>
        </div>
      )}
    </div>
  );
}
