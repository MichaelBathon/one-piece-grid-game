"use client";
import React, { useState, useMemo, useContext } from "react";
import { DateSeedContext } from "./theme-provider";

const allAffiliations = [
  "Straw Hat Pirates",
  "Marines",
  "Warlords",
  "Yonko",
  "Revolutionaries",
  "Villains",
  "Allies",
];

const allAttributes = [
  "Captain",
  "Swordsman",
  "Devil Fruit User",
  "Bounty Hunter",
  "Navigator",
  "Sniper",
  "Doctor",
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

// All 49 combinations with answers and hints
const correctAnswers: Record<string, string> = {
  // Straw Hat Pirates
  "Straw Hat Pirates|Captain": "Luffy",
  "Straw Hat Pirates|Swordsman": "Zoro",
  "Straw Hat Pirates|Devil Fruit User": "Luffy",
  "Straw Hat Pirates|Bounty Hunter": "Jinbe",
  "Straw Hat Pirates|Navigator": "Nami",
  "Straw Hat Pirates|Sniper": "Usopp",
  "Straw Hat Pirates|Doctor": "Chopper",
  // Marines
  "Marines|Captain": "Smoker",
  "Marines|Swordsman": "Tashigi",
  "Marines|Devil Fruit User": "Kizaru",
  "Marines|Bounty Hunter": "Hina",
  "Marines|Navigator": "Brannew",
  "Marines|Sniper": "Fullbody",
  "Marines|Doctor": "Doc Q",
  // Warlords
  "Warlords|Captain": "Crocodile",
  "Warlords|Swordsman": "Mihawk",
  "Warlords|Devil Fruit User": "Crocodile",
  "Warlords|Bounty Hunter": "Jinbe",
  "Warlords|Navigator": "Boa Hancock",
  "Warlords|Sniper": "Buggy",
  "Warlords|Doctor": "Law",
  // Yonko
  "Yonko|Captain": "Shanks",
  "Yonko|Swordsman": "Shanks",
  "Yonko|Devil Fruit User": "Big Mom",
  "Yonko|Bounty Hunter": "Blackbeard",
  "Yonko|Navigator": "Charlotte Smoothie",
  "Yonko|Sniper": "Van Augur",
  "Yonko|Doctor": "Doc Q",
  // Revolutionaries
  "Revolutionaries|Captain": "Dragon",
  "Revolutionaries|Swordsman": "Karasu",
  "Revolutionaries|Devil Fruit User": "Sabo",
  "Revolutionaries|Bounty Hunter": "Belo Betty",
  "Revolutionaries|Navigator": "Koala",
  "Revolutionaries|Sniper": "Usopp",
  "Revolutionaries|Doctor": "Ivankov",
  // Villains
  "Villains|Captain": "Blackbeard",
  "Villains|Swordsman": "Shiryu",
  "Villains|Devil Fruit User": "Doflamingo",
  "Villains|Bounty Hunter": "Crocodile",
  "Villains|Navigator": "Alvida",
  "Villains|Sniper": "Van Augur",
  "Villains|Doctor": "Caesar Clown",
  // Allies
  "Allies|Captain": "Law",
  "Allies|Swordsman": "Kin'emon",
  "Allies|Devil Fruit User": "Carrot",
  "Allies|Bounty Hunter": "Bartolomeo",
  "Allies|Navigator": "Pedro",
  "Allies|Sniper": "Sai",
  "Allies|Doctor": "Trafalgar Law",
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

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, "correct" | "incorrect" | undefined>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [videoCell, setVideoCell] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [videoChar, setVideoChar] = useState<string | null>(null);
  const [videosEnabled, setVideosEnabled] = useState<boolean>(true);

  const handleInput = (
    aff: string,
    attr: string,
    value: string
  ) => {
    const key = `${aff}|${attr}`;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setFeedback((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    aff: string,
    attr: string
  ) => {
    if (e.key === "Enter") {
      const key = `${aff}|${attr}`;
      const answer = answers[key] || "";
      if (!answer) return;
      const isCorrect = correctAnswers[key]?.toLowerCase() === answer.trim().toLowerCase();
      setFeedback((prev) => ({
        ...prev,
        [key]: isCorrect ? "correct" : "incorrect",
      }));
      if (isCorrect && videosEnabled) {
        const charName = correctAnswers[key];
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
    }
  };

  const handleHint = (aff: string, attr: string) => {
    const key = `${aff}|${attr}`;
    setShowHint((prev) => ({ ...prev, [key]: true }));
  };

  const handleReveal = (aff: string, attr: string) => {
    const key = `${aff}|${attr}`;
    setAnswers((prev) => ({ ...prev, [key]: correctAnswers[key] || "" }));
    setFeedback((prev) => ({ ...prev, [key]: "correct" }));
    setShowHint((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-8 px-2 sm:px-4 md:px-8">
      {/* Glassmorphism background image */}
      <div
        className="absolute inset-0 -z-10 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/onepiece-map.jpg)',
          filter: 'blur(8px) brightness(0.7)',
        }}
      />
      {/* Glass card */}
      <div className="w-full max-w-2xl rounded-3xl bg-white/30 dark:bg-zinc-900/40 shadow-2xl border border-white/40 dark:border-zinc-800/60 backdrop-blur-2xl p-2 sm:p-4 md:p-8 mx-auto relative overflow-visible">
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
        <div className="flex flex-col gap-4">
          {/* X axis header */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-2">
            <div className="" />
            {attributes.map((attr) => (
              <div key={attr} className="text-xs sm:text-base md:text-lg font-bold text-gray-900 dark:text-white text-center px-1 py-2 rounded-xl bg-white/40 dark:bg-zinc-800/60 shadow-sm">
                {attr}
              </div>
            ))}
          </div>
          {/* Grid rows */}
          {affiliations.map((aff) => (
            <div key={aff} className="grid grid-cols-4 gap-2 sm:gap-4 items-center">
              <div className="text-xs sm:text-base md:text-lg font-bold text-gray-900 dark:text-white text-left px-1 py-2 rounded-xl bg-white/40 dark:bg-zinc-800/60 shadow-sm">
                {aff}
              </div>
              {attributes.map((attr) => {
                const key = `${aff}|${attr}`;
                // Only show video modal, not in cell
                return (
                  <div
                    key={attr}
                    className="rounded-2xl bg-white/60 dark:bg-zinc-900/60 shadow-lg flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 min-h-[90px] sm:min-h-[110px] md:min-h-[120px] transition-colors border border-white/40 dark:border-zinc-800/60 backdrop-blur-xl relative"
                  >
                    <input
                      type="text"
                      className={`w-full max-w-[90px] sm:max-w-[110px] md:max-w-[120px] px-2 py-2 sm:py-2.5 md:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white bg-white/80 dark:bg-zinc-900/80 placeholder-gray-400 dark:placeholder-gray-500 transition-colors
                        ${feedback[key] === "correct"
                          ? "border-green-500 ring-2 ring-green-400"
                          : feedback[key] === "incorrect"
                          ? "border-red-400 ring-2 ring-red-300"
                          : "border-white/60 dark:border-zinc-700"}
                      `}
                      value={answers[key] || ""}
                      onChange={(e) => handleInput(aff, attr, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, aff, attr)}
                      placeholder="?"
                      autoComplete="off"
                    />
                    {feedback[key] === "correct" && (
                      <div className="text-green-600 dark:text-green-400 text-xs sm:text-sm mt-1 font-bold drop-shadow">Correct!</div>
                    )}
                    {feedback[key] === "incorrect" && (
                      <div className="text-red-700 dark:text-red-300 text-xs sm:text-sm mt-1 font-bold drop-shadow">Try again</div>
                    )}
                    <div className="flex gap-2 justify-center mt-2">
                      <button
                        className="px-2 py-1 text-xs sm:text-sm rounded bg-blue-100/80 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 border border-blue-200/60 dark:border-blue-700/60 transition font-semibold shadow"
                        onClick={() => handleHint(aff, attr)}
                        disabled={showHint[key]}
                      >
                        Hint
                      </button>
                      <button
                        className="px-2 py-1 text-xs sm:text-sm rounded bg-gray-200/80 dark:bg-zinc-800/60 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-700 border border-gray-300/60 dark:border-zinc-700/60 transition font-semibold shadow"
                        onClick={() => handleReveal(aff, attr)}
                      >
                        Reveal
                      </button>
                    </div>
                    {showHint[key] && hints[key] && (
                      <div className="text-xs sm:text-sm mt-1 text-blue-700 dark:text-blue-300 italic font-semibold drop-shadow">{hints[key]}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
