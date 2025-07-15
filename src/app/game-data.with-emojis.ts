// One Piece Grid - Canonical Character Database
// Fully enriched for robust grid logic and randomizer

export interface OnePieceCharacter {
  name: string;
  role?: string;
  affiliation?: string;
  arc?: string[];
  species?: string;
  fightingStyle?: string;
  devilFruit?: string;
  bounty?: string;
  gender?: string;
  title?: string;
  origin?: string;
  hints: string[];
  hardMode?: boolean;
  video?: string;
  emojiClue?: string;
}

const rawCharacters: OnePieceCharacter[] = [
  // Straw Hat Pirates
  {
    name: "Monkey D. Luffy",
    role: "Captain",
    affiliation: "Straw Hat Pirates",
    arc: ["East Blue", "Alabasta", "Enies Lobby", "Marineford", "Dressrosa", "Whole Cake Island", "Wano"],
    species: "Human",
    fightingStyle: "Melee",
    devilFruit: "Gum-Gum Fruit",
    bounty: "3,000,000,000",
    gender: "Male",
    title: "Fifth Emperor",
    origin: "East Blue",
    hints: [
      "He wears a straw hat and dreams of becoming Pirate King.",
      "He ate the Gum-Gum Fruit.",
      "He is the captain of the Straw Hat Pirates.",
      "He is known for his rubber powers.",
      "He has a scar under his left eye."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/1QGgkYyqS-g?autoplay=1", // Luffy
    emojiClue: "👒🐒🍖👒⚔🏴☠🌊🏴☠▶• . 0"
  },
  // Roronoa Zoro (consolidated)
  {
    name: "Roronoa Zoro",
    role: "Swordsman",
    affiliation: "Straw Hat Pirates",
    arc: ["East Blue", "Alabasta", "Enies Lobby", "Wano"],
    species: "Human",
    fightingStyle: "Swordsmanship",
    bounty: "1,111,000,000",
    gender: "Male",
    origin: "East Blue",
    hints: [
      "He wields three swords and loves sake.",
      "He is the swordsman of the Straw Hat Pirates.",
      "He is known for his green hair.",
      "He often gets lost.",
      "He aims to be the world's greatest swordsman."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/lGQ6LCC32Xw?autoplay=1",
    emojiClue: "⚔🍙⚔☠🏴☠⚔▶• . 0"
  },
  {
    name: "Nami",
    role: "Navigator",
    affiliation: "Straw Hat Pirates",
    arc: ["East Blue", "Arlong Park", "Alabasta", "Enies Lobby", "Whole Cake Island", "Wano"],
    species: "Human",
    fightingStyle: "Staff",
    bounty: "366,000,000",
    gender: "Female",
    origin: "East Blue",
    hints: [
      "She loves tangerines and maps.",
      "She is the navigator of the Straw Hat Pirates.",
      "She uses a staff called the Clima-Tact.",
      "She was once part of Arlong's crew.",
      "She is known for her weather-based attacks."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/9fPvAzR_azo?autoplay=1", // Nami
    emojiClue: "🍊🍊🗺💰🗺🧭💰"
  },
  {
    name: "Usopp",
    role: "Sniper",
    affiliation: "Straw Hat Pirates",
    arc: ["East Blue", "Alabasta", "Enies Lobby", "Dressrosa", "Wano"],
    species: "Human",
    fightingStyle: "Slingshot",
    bounty: "500,000,000",
    gender: "Male",
    origin: "East Blue",
    hints: [
      "He tells tall tales and uses a slingshot.",
      "He is the sniper of the Straw Hat Pirates.",
      "He is known for his long nose.",
      "He dreams of becoming a brave warrior of the sea.",
      "He is also known as Sogeking."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/_-CTSdyboUM?autoplay=1", // Usopp
    emojiClue: "🤥🏹🎯👺👃🎭"
  },
  {
    name: "Sanji",
    role: "Cook",
    affiliation: "Straw Hat Pirates",
    arc: ["Baratie", "Alabasta", "Enies Lobby", "Whole Cake Island", "Wano"],
    species: "Human",
    fightingStyle: "Melee",
    bounty: "1,032,000,000",
    gender: "Male",
    title: "Black Leg",
    origin: "North Blue",
    hints: [
      "He only fights with his legs.",
      "He is the cook of the Straw Hat Pirates.",
      "He has a curly eyebrow.",
      "He is known for his chivalry.",
      "He is a prince of Germa 66."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/I6eHaRQO2DY?autoplay=1" // Sanji,
    emojiClue: "࿓🚬👨🍳୭(࿓/   )  ﹏﹏﹏  ",
  },
  {
    name: "Tony Tony Chopper",
    role: "Doctor",
    affiliation: "Straw Hat Pirates",
    arc: ["Drum Island", "Alabasta", "Enies Lobby", "Wano"],
    species: "Reindeer-Human",
    fightingStyle: "Transformation",
    devilFruit: "Hito Hito no Mi",
    bounty: "1,000",
    gender: "Male",
    origin: "Drum Island",
    hints: [
      "He is a blue-nosed reindeer who ate the Hito Hito no Mi.",
      "He is the doctor of the Straw Hat Pirates.",
      "He can transform into different forms.",
      "He is often mistaken for the crew's pet.",
      "He loves cotton candy."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/RCOGMd9fMzI?autoplay=1" // Chopper,
    emojiClue: "🦌🏴☠🩺🍄💊🎩",
  },
  {
    name: "Nico Robin",
    role: "Archaeologist",
    affiliation: "Straw Hat Pirates",
    arc: ["Alabasta", "Enies Lobby", "Dressrosa", "Wano"],
    species: "Human",
    fightingStyle: "Hana Hana no Mi",
    devilFruit: "Hana Hana no Mi",
    bounty: "930,000,000",
    gender: "Female",
    origin: "West Blue",
    hints: [
      "She can sprout extra limbs using her Devil Fruit.",
      "She is the archaeologist of the Straw Hat Pirates.",
      "She is the only survivor of Ohara.",
      "She can read Poneglyphs.",
      "She joined the crew after Alabasta."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/xJniMpp-l7k?autoplay=1" // Robin,
    emojiClue: "🌸📜📚🌺🔍",
  },
  {
    name: "Franky",
    role: "Shipwright",
    affiliation: "Straw Hat Pirates",
    arc: ["Water 7", "Enies Lobby", "Dressrosa", "Wano"],
    species: "Cyborg",
    fightingStyle: "Melee",
    bounty: "394,000,000",
    gender: "Male",
    origin: "South Blue",
    hints: [
      "He is a cyborg and the shipwright of the Straw Hat Pirates.",
      "He built the Thousand Sunny.",
      "He loves cola.",
      "He was once the leader of the Franky Family.",
      "He often shouts 'SUPER!'."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/v5ZQK_7WJC8?autoplay=1" // Franky,
    emojiClue: "🦾🤖🥤🛠🕶🔧",
  },
  {
    name: "Brook",
    role: "Musician",
    affiliation: "Straw Hat Pirates",
    arc: ["Thriller Bark", "Whole Cake Island", "Wano"],
    species: "Skeleton",
    fightingStyle: "Swordsmanship",
    devilFruit: "Yomi Yomi no Mi",
    bounty: "383,000,000",
    gender: "Male",
    origin: "West Blue",
    hints: [
      "He is a living skeleton and the musician of the Straw Hat Pirates.",
      "He ate the Yomi Yomi no Mi.",
      "He loves making skull jokes.",
      "He can use music in battle.",
      "He often asks to see women's panties."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/hAvzPHgVB6Y?autoplay=1" // Brook,
    emojiClue: "💀🎻🎶🎩🎵☠",
  },
  {
    name: "Jinbe",
    role: "Helmsman",
    affiliation: "Straw Hat Pirates",
    arc: ["Fish-Man Island", "Whole Cake Island", "Wano"],
    species: "Fish-Man",
    fightingStyle: "Fish-Man Karate",
    bounty: "1,100,000,000",
    gender: "Male",
    title: "Knight of the Sea",
    origin: "Fish-Man Island",
    hints: [
      "He is a fish-man and the helmsman of the Straw Hat Pirates.",
      "He is a master of Fish-Man Karate.",
      "He was once a Warlord of the Sea.",
      "He is known as the 'Knight of the Sea'.",
      "He joined the crew in Wano."
    ],
    hardMode: false,
    video: "https://www.youtube.com/embed/wg65MSYqbIA?autoplay=1" // Jinbe,
    emojiClue: "🌊🐋👊🏴☠🥋🦈",
  },
  // Marines
  {
    name: "Monkey D. Garp",
    role: "Vice Admiral",
    affiliation: "Marines",
    arc: ["Marineford", "Post-War", "Water 7"],
    species: "Human",
    fightingStyle: "Melee",
    bounty: undefined,
    gender: "Male",
    title: "Hero of the Marines",
    origin: "East Blue",
    hints: [
      "He is known as the Hero of the Marines.",
      "He is Luffy's grandfather.",
      "He is famous for his powerful punches.",
      "He trained Coby and Helmeppo.",
      "He often throws cannonballs by hand."
    ],
    hardMode: false,
    emojiClue: "🐒💥👴👊🐵🦍",
  },
  {
    name: "Sengoku",
    role: "Fleet Admiral",
    affiliation: "Marines",
    arc: ["Marineford", "Post-War"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Hito Hito no Mi, Model: Daibutsu",
    bounty: undefined,
    gender: "Male",
    title: "Buddha",
    origin: "Grand Line",
    hints: [
      "He is a former Fleet Admiral of the Marines.",
      "He can transform into a giant golden Buddha.",
      "He was Garp's superior.",
      "He led the Marines during the Marineford War.",
      "He has a pet goat."
    ],
    hardMode: false,
    emojiClue: "✨👮♂👊👴🐐🌊",
  },
  {
    name: "Sakazuki (Akainu)",
    role: "Fleet Admiral",
    affiliation: "Marines",
    arc: ["Marineford", "Post-War"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Magu Magu no Mi",
    bounty: undefined,
    gender: "Male",
    title: "Akainu",
    origin: "North Blue",
    hints: [
      "He is the current Fleet Admiral of the Marines.",
      "He has the power of magma.",
      "He is known for his absolute justice.",
      "He fought Aokiji for the position of Fleet Admiral.",
      "He killed Ace at Marineford."
    ],
    hardMode: false,
    emojiClue: "🌋🔥👊👨✈🏴☠⚓",
  },
  {
    name: "Borsalino (Kizaru)",
    role: "Admiral",
    affiliation: "Marines",
    arc: ["Sabaody Archipelago", "Marineford", "Egghead"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Pika Pika no Mi",
    bounty: undefined,
    gender: "Male",
    title: "Kizaru",
    origin: "North Blue",
    hints: [
      "He is an admiral who moves at the speed of light.",
      "He has a laid-back personality.",
      "He fought the Supernovas at Sabaody.",
      "He can shoot laser beams.",
      "He is known for his catchphrase 'Yare Yare'."
    ],
    hardMode: false,
    emojiClue: "🥴🌟👒🐓⛑",
  },
  {
    name: "Kuzan (Aokiji)",
    role: "Former Admiral",
    affiliation: "Marines",
    arc: ["Long Ring Long Land", "Marineford", "Post-War"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Hie Hie no Mi",
    bounty: undefined,
    gender: "Male",
    title: "Aokiji",
    origin: "South Blue",
    hints: [
      "He is a former admiral with ice powers.",
      "He is known for his lazy justice.",
      "He fought Akainu for the position of Fleet Admiral.",
      "He helped the Straw Hats escape from Marineford.",
      "He rides a bicycle across the sea."
    ],
    hardMode: false,
    emojiClue: "❄🧊🕶🌊🚴♂🥶",
  },
  {
    name: "Smoker",
    role: "Vice Admiral",
    affiliation: "Marines",
    arc: ["Loguetown", "Alabasta", "Punk Hazard"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Moku Moku no Mi",
    bounty: undefined,
    gender: "Male",
    title: undefined,
    origin: "Grand Line",
    hints: [
      "He is a Marine who uses a jitte and smokes two cigars.",
      "He has the power of smoke.",
      "He relentlessly pursues Luffy.",
      "He was stationed at Loguetown.",
      "He partnered with Tashigi."
    ],
    hardMode: false,
    emojiClue: "🚬💨🌬🚭🔥 ☠ ☠ ",
  },
  {
    name: "Tashigi",
    role: "Captain",
    affiliation: "Marines",
    arc: ["Loguetown", "Punk Hazard", "Dressrosa"],
    species: "Human",
    fightingStyle: "Swordsmanship",
    bounty: undefined,
    gender: "Female",
    title: undefined,
    origin: "Grand Line",
    hints: [
      "She is a Marine swordswoman who idolizes Zoro.",
      "She often loses her glasses.",
      "She partnered with Smoker.",
      "She collects famous swords.",
      "She resembles Zoro's childhood friend."
    ],
    hardMode: false,
    emojiClue: "⚔👓📚👩✈👚👩⚖",
  },
  {
    name: "Coby",
    role: "Captain",
    affiliation: "Marines",
    arc: ["East Blue", "Marineford", "Post-War"],
    species: "Human",
    fightingStyle: "Melee",
    bounty: undefined,
    gender: "Male",
    title: undefined,
    origin: "East Blue",
    hints: [
      "He started as a cabin boy and became a Marine Captain.",
      "He is Luffy's friend and rival.",
      "He trained under Garp.",
      "He awakened Observation Haki at Marineford.",
      "He has pink hair."
    ],
    hardMode: false,
    emojiClue: "🌸👮♂🎖📈👊🚢",
  },
  // Princesses
  {
    name: "Nefertari Vivi",
    role: "Princess",
    affiliation: "Alabasta Kingdom",
    arc: ["Alabasta", "Reverie"],
    species: "Human",
    gender: "Female",
    origin: "Grand Line",
    hints: [
      "She is the princess of Alabasta.",
      "She traveled with the Straw Hats.",
      "She uses a peacock slashers weapon.",
      "She is beloved by her people.",
      "She has a pet duck named Karoo."
    ],
    hardMode: false,
    emojiClue: "🦆💙👸🏜👑🐫",
  },
  {
    name: "Rebecca",
    role: "Princess",
    affiliation: "Dressrosa Kingdom",
    arc: ["Dressrosa"],
    species: "Human",
    gender: "Female",
    origin: "Grand Line",
    hints: [
      "She is the princess of Dressrosa.",
      "She fought as a gladiator in the colosseum.",
      "She is the daughter of Kyros.",
      "She wears a pink gladiator helmet.",
      "She is known for her kindness."
    ],
    hardMode: false,
    emojiClue: "*‧*‧ ࿔  🎀🌹",
  },
  {
    name: "Shirahoshi",
    role: "Princess",
    affiliation: "Ryugu Kingdom",
    arc: ["Fish-Man Island", "Reverie"],
    species: "Mermaid",
    gender: "Female",
    origin: "Fish-Man Island",
    hints: [
      "She is the mermaid princess of Fish-Man Island.",
      "She is Poseidon, an Ancient Weapon.",
      "She can communicate with Sea Kings.",
      "She is very large and shy.",
      "She is the daughter of King Neptune."
    ],
    hardMode: false,
    emojiClue: "🧜♀👑🌊🌸🐋🐠",
  },
  // Arc Villains
  {
    name: "Crocodile",
    role: "Former Warlord",
    affiliation: "Baroque Works",
    arc: ["Alabasta", "Marineford"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Suna Suna no Mi",
    gender: "Male",
    origin: "Grand Line",
    hints: [
      "He is the main antagonist of the Alabasta arc.",
      "He can control sand.",
      "He was a Warlord of the Sea.",
      "He has a hook for a hand.",
      "He leads Baroque Works."
    ],
    hardMode: false,
    emojiClue: "🐊",
  },
  {
    name: "Don Krieg",
    role: "Pirate Captain",
    affiliation: "Krieg Pirates",
    arc: ["Baratie"],
    species: "Human",
    fightingStyle: "Weapons",
    gender: "Male",
    origin: "East Blue",
    hints: [
      "He is the main antagonist of the Baratie arc.",
      "He is known for his armor and weapons.",
      "He commands a large fleet.",
      "He fought Luffy at the Baratie.",
      "He is ruthless and cunning."
    ],
    hardMode: false,
    emojiClue: "🏴☠🛡💣🔫🎽🚢",
  },
  {
    name: "Enel",
    role: "God",
    affiliation: "Skypiea",
    arc: ["Skypiea"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Goro Goro no Mi",
    gender: "Male",
    origin: "Skypiea",
    hints: [
      "He is the main antagonist of the Skypiea arc.",
      "He has the power of lightning.",
      "He considers himself a god.",
      "He wears large golden drums on his back.",
      "He was defeated by Luffy."
    ],
    hardMode: false,
    emojiClue: "⚡👑🌩🥁⚡👂",
  },
  // Whitebeard Pirates
  {
    name: "Portgas D. Ace",
    role: "2nd Division Commander",
    affiliation: "Whitebeard Pirates",
    arc: ["Alabasta", "Marineford", "Post-War"],
    species: "Human",
    fightingStyle: "Melee",
    devilFruit: "Mera Mera no Mi",
    bounty: "550,000,000",
    gender: "Male",
    title: "Fire Fist",
    origin: "East Blue",
    hints: [
      "He is Luffy's sworn brother and Sabo's brother.",
      "He was the 2nd Division Commander of the Whitebeard Pirates.",
      "He ate the Mera Mera no Mi, giving him fire powers.",
      "He was captured and executed at Marineford.",
      "He is the son of Gol D. Roger."
    ],
    hardMode: false,
    emojiClue: "♠🎩🏴☠🍖🕊",
  },
  // Heart Pirates
  // Trafalgar D. Water Law (consolidated)
  {
    name: "Trafalgar D. Water Law",
    role: "Captain",
    affiliation: "Heart Pirates",
    arc: ["Sabaody Archipelago", "Punk Hazard", "Dressrosa", "Wano"],
    species: "Human",
    fightingStyle: "Swordsmanship",
    devilFruit: "Ope Ope no Mi",
    bounty: "3,000,000,000",
    gender: "Male",
    title: "Surgeon of Death",
    origin: "North Blue",
    hints: [
      "He is the captain of the Heart Pirates and a member of the Worst Generation.",
      "He wields the sword Kikoku and has the power of the Ope Ope no Mi.",
      "He is known as the Surgeon of Death.",
      "He formed an alliance with Luffy to take down Doflamingo.",
      "He is from Flevance, the White City."
    ],
    hardMode: false,
    emojiClue: "⚓🏴☠🫀🩺🌊⚖",
  },
  // Bepo (consolidated)
  {
    name: "Bepo",
    role: "Navigator",
    affiliation: "Heart Pirates",
    arc: ["Sabaody Archipelago", "Punk Hazard", "Wano"],
    species: "Mink",
    fightingStyle: "Martial Arts",
    gender: "Male",
    origin: "Zou",
    hints: [
      "He is a talking polar bear mink and the navigator of the Heart Pirates.",
      "He is skilled in martial arts.",
      "He is very apologetic and polite.",
      "He is from Zou.",
      "He is a loyal crewmate to Law."
    ],
    hardMode: false,
    emojiClue: "🐻❄🧡🥋⚔💉❤🩹",
  },
  {
    name: "Shachi",
    role: "Fighter",
    affiliation: "Heart Pirates",
    arc: ["Sabaody Archipelago", "Punk Hazard", "Wano"],
    species: "Human",
    gender: "Male",
    origin: "North Blue",
    hints: [
      "He is a member of the Heart Pirates.",
      "He often works with Penguin.",
      "He is known for his beanie hat.",
      "He is a skilled fighter.",
      "He is loyal to Law."
    ],
    hardMode: false,
    emojiClue: "🐻❄🎧🧢⛵🏴☠🚢",
  },
  {
    name: "Penguin",
    role: "Fighter",
    affiliation: "Heart Pirates",
    arc: ["Sabaody Archipelago", "Punk Hazard", "Wano"],
    species: "Human",
    gender: "Male",
    origin: "North Blue",
    hints: [
      "He is a member of the Heart Pirates.",
      "He often works with Shachi.",
      "He is known for his penguin-themed hat.",
      "He is a skilled fighter.",
      "He is loyal to Law."
    ],
    hardMode: false,
    emojiClue: "🐧૮(••)🐧｡‧🐧‧｡🐧",
  },
  {
    name: "Jean Bart",
    role: "Helmsman",
    affiliation: "Heart Pirates",
    arc: ["Sabaody Archipelago", "Wano"],
    species: "Human",
    gender: "Male",
    origin: "North Blue",
    hints: [
      "He is a former slave and now the helmsman of the Heart Pirates.",
      "He is very large and strong.",
      "He was freed by Law at Sabaody.",
      "He is loyal to Law.",
      "He is from North Blue."
    ],
    hardMode: false,
    emojiClue: "🔨🏴☠👤🌊✊🛶",
  },
  {
    name: "Ikkaku",
    role: "Crew Member",
    affiliation: "Heart Pirates",
    arc: ["Wano"],
    species: "Human",
    gender: "Female",
    origin: "Unknown",
    hints: [
      "She is a female member of the Heart Pirates.",
      "She is seen during the Wano arc.",
      "She is loyal to Law.",
      "She is a minor character.",
      "She is part of the Heart Pirates' crew."
    ],
    hardMode: true,
    emojiClue: "👨🦲👊⛩🀄⚔🤺",
  },
  {
    name: "Clione",
    role: "Crew Member",
    affiliation: "Heart Pirates",
    arc: ["Wano"],
    species: "Human",
    gender: "Male",
    origin: "Unknown",
    hints: [
      "He is a minor member of the Heart Pirates.",
      "He is seen during the Wano arc.",
      "He is loyal to Law.",
      "He is a background character.",
      "He is part of the Heart Pirates' crew."
    ],
    hardMode: true,
    emojiClue: "👼🐌🐚🌊💧👻",
  },
  {
    name: "Uni",
    role: "Crew Member",
    affiliation: "Heart Pirates",
    arc: ["Wano"],
    species: "Human",
    gender: "Male",
    origin: "Unknown",
    hints: [
      "He is a minor member of the Heart Pirates.",
      "He is seen during the Wano arc.",
      "He is loyal to Law.",
      "He is a background character.",
      "He is part of the Heart Pirates' crew."
    ],
    hardMode: true,
    emojiClue: "🎓🏫🦄🎓 ｡ ..",
  },
  {
    name: "Cotton",
    role: "Crew Member",
    affiliation: "Heart Pirates",
    arc: ["Wano"],
    species: "Human",
    gender: "Male",
    origin: "Unknown",
    hints: [
      "He is a minor member of the Heart Pirates.",
      "He is seen during the Wano arc.",
      "He is loyal to Law.",
      "He is a background character.",
      "He is part of the Heart Pirates' crew."
    ],
    hardMode: true,
    emojiClue: "☁🧑🏿🌾👨🏿🌾🌾🧶🌿💭✋🏿🧑🏿🦲🤚🏿🔫👮🏻🧑🏿🌾",
  },
  // Worst Generation (Supernovas)
  {
    name: "Eustass Kid",
    role: "Captain",
    affiliation: "Kid Pirates",
    arc: ["Sabaody Archipelago", "Wano"],
    species: "Human",
    fightingStyle: "Magnetism",
    devilFruit: "Jiki Jiki no Mi",
    bounty: "3,000,000,000",
    gender: "Male",
    title: "Captain",
    origin: "South Blue",
    hints: [
      "He is the captain of the Kid Pirates and a member of the Worst Generation.",
      "He has the power of magnetism from the Jiki Jiki no Mi.",
      "He lost his arm before Wano.",
      "He is known for his ruthlessness.",
      "He fought alongside Luffy and Law against Big Mom and Kaido."
    ],
    hardMode: false,
    emojiClue: "🦾🧲🏴☠🔴😡🔩",
  },
  {
    name: "Killer",
    role: "Combatant",
    affiliation: "Kid Pirates",
    arc: ["Sabaody Archipelago", "Wano"],
    species: "Human",
    fightingStyle: "Scythe Blades",
    bounty: "200,000,000",
    gender: "Male",
    title: "Massacre Soldier",
    origin: "South Blue",
    hints: [
      "He is the right-hand man of Eustass Kid.",
      "He is known as the Massacre Soldier.",
      "He fights with scythe-like blades.",
      "He was forced to eat a SMILE fruit in Wano.",
      "He is a member of the Worst Generation."
    ],
    hardMode: false,
    emojiClue: "🔪☠😁🔪🩸︻💥☠༺☠༻",
  },
  {
    name: "Scratchmen Apoo",
    role: "Captain",
    affiliation: "On Air Pirates",
    arc: ["Sabaody Archipelago", "Wano"],
    species: "Human",
    fightingStyle: "Sound Attacks",
    devilFruit: "Oto Oto no Mi",
    bounty: "350,000,000",
    gender: "Male",
    title: "Captain",
    origin: "Grand Line",
    hints: [
      "He is the captain of the On Air Pirates and a member of the Worst Generation.",
      "He uses sound-based attacks.",
      "He has the Oto Oto no Mi.",
      "He allied with Kaido in Wano.",
      "He is a longarm tribe member."
    ],
    hardMode: false,
    emojiClue: "🏴☠👖🎵👄🎹😬",
  },
  {
    name: "Basil Hawkins",
    role: "Captain",
    affiliation: "Hawkins Pirates",
    arc: ["Sabaody Archipelago", "Wano"],
    species: "Human",
    fightingStyle: "Tarot/Straw Powers",
    devilFruit: "Wara Wara no Mi",
    bounty: "320,000,000",
    gender: "Male",
    title: "Magician",
    origin: "North Blue",
    hints: [
      "He is the captain of the Hawkins Pirates and a member of the Worst Generation.",
      "He uses tarot cards and straw-based powers.",
      "He has the Wara Wara no Mi.",
      "He allied with Kaido in Wano.",
      "He is known as the Magician."
    ],
    hardMode: false,
    emojiClue: "🌾🃏🎩🔮⚔🎴",
  },
  {
    name: "X Drake",
    role: "Captain",
    affiliation: "Drake Pirates",
    arc: ["Sabaody Archipelago", "Wano"],
    species: "Human",
    fightingStyle: "Swordsmanship",
    devilFruit: "Ryu Ryu no Mi, Model: Allosaurus",
    bounty: "222,000,000",
    gender: "Male",
    title: "Captain",
    origin: "North Blue",
    hints: [
      "He is the captain of the Drake Pirates and a member of the Worst Generation.",
      "He is a former Marine Rear Admiral.",
      "He has the Ryu Ryu no Mi, Model: Allosaurus.",
      "He allied with the Marines in Wano.",
      "He is known for his dinosaur transformation."
    ],
    hardMode: false,
    emojiClue: "🦖❌🏴☠⚔👮♂⚓",
  },
  {
    name: "Capone Bege",
    role: "Captain",
    affiliation: "Fire Tank Pirates",
    arc: ["Sabaody Archipelago", "Whole Cake Island"],
    species: "Human",
    fightingStyle: "Castle Transformation",
    devilFruit: "Shiro Shiro no Mi",
    bounty: "350,000,000",
    gender: "Male",
    title: "Gang",
    origin: "West Blue",
    hints: [
      "He is the captain of the Fire Tank Pirates and a member of the Worst Generation.",
      "He can transform into a fortress with the Shiro Shiro no Mi.",
      "He is known as Gang Bege.",
      "He played a major role in the Whole Cake Island arc.",
      "He is married to Charlotte Chiffon."
    ],
    hardMode: false,
    emojiClue: "🚬🎩🤵🔫👔🗡",
  },
  {
    name: "Jewelry Bonney",
    role: "Captain",
    affiliation: "Bonney Pirates",
    arc: ["Sabaody Archipelago", "Egghead"],
    species: "Human",
    fightingStyle: "Age Manipulation",
    devilFruit: "Unknown (Age Manipulation)",
    bounty: "320,000,000",
    gender: "Female",
    title: "Captain",
    origin: "South Blue",
    hints: [
      "She is the captain of the Bonney Pirates and a member of the Worst Generation.",
      "She can manipulate age.",
      "She is the daughter of Bartholomew Kuma.",
      "She played a major role in the Egghead arc.",
      "She is known for her appetite."
    ],
    hardMode: false,
    emojiClue: "🌸🍕🍔👵🍗⏳",
  },
  {
    name: "Urouge",
    role: "Captain",
    affiliation: "Fallen Monk Pirates",
    arc: ["Sabaody Archipelago", "Whole Cake Island"],
    species: "Human",
    fightingStyle: "Body Size Manipulation",
    bounty: "108,000,000",
    gender: "Male",
    title: "Mad Monk",
    origin: "Sky Island",
    hints: [
      "He is the captain of the Fallen Monk Pirates and a member of the Worst Generation.",
      "He can increase his body size and strength.",
      "He is known as Mad Monk.",
      "He is from a Sky Island.",
      "He defeated one of Big Mom's Sweet Commanders."
    ],
    hardMode: false,
    emojiClue: "🏴☠🍖💥🔮🙏👼",
  },
  // Yonko (Four Emperors)
  {
    name: "Shanks",
    role: "Captain",
    affiliation: "Red-Haired Pirates",
    arc: ["East Blue", "Marineford", "Wano"],
    species: "Human",
    fightingStyle: "Swordsmanship",
    bounty: "4,048,900,000",
    gender: "Male",
    title: "Red-Haired",
    origin: "West Blue",
    hints: [
      "He is the captain of the Red-Haired Pirates.",
      "He is one of the Four Emperors.",
      "He inspired Luffy to become a pirate.",
      "He lost his arm saving Luffy.",
      "He is known for his red hair and missing arm."
    ],
    hardMode: false,
    emojiClue: "🏴☠🦰☠🍺👒🗡",
  },
  {
    name: "Benn Beckman",
    role: "First Mate",
    affiliation: "Red-Haired Pirates",
    arc: ["East Blue", "Marineford"],
    species: "Human",
    fightingStyle: "Firearms",
    bounty: undefined,
    gender: "Male",
    title: undefined,
    origin: "Unknown",
    hints: [
      "He is the first mate of the Red-Haired Pirates.",
      "He is known for his intelligence.",
      "He is Shanks' right-hand man.",
      "He is calm and strategic.",
      "He is a notable Yonko crew member."
    ],
    hardMode: false,
    emojiClue: "🧢🚬🔫🏴☠🧠⚓",
  },
  {
    name: "Charlotte Linlin (Big Mom)",
    role: "Captain",
    affiliation: "Big Mom Pirates",
    arc: ["Whole Cake Island", "Wano"],
    species: "Human",
    fightingStyle: "Soru Soru no Mi",
    devilFruit: "Soru Soru no Mi",
    bounty: "4,388,000,000",
    gender: "Female",
    title: "Big Mom",
    origin: "Elbaf",
    hints: [
      "She is the captain of the Big Mom Pirates.",
      "She is one of the Four Emperors.",
      "She has the power to manipulate souls.",
      "She is the mother of many children.",
      "She rules Totto Land."
    ],
    hardMode: false,
    emojiClue: "🎡🎪🐆👵👴💨",
  },
  {
    name: "Charlotte Katakuri",
    role: "Sweet Commander",
    affiliation: "Big Mom Pirates",
    arc: ["Whole Cake Island"],
    species: "Human",
    fightingStyle: "Mochi Mochi no Mi",
    devilFruit: "Mochi Mochi no Mi",
    bounty: "1,057,000,000",
    gender: "Male",
    title: undefined,
    origin: "Totto Land",
    hints: [
      "He is a Sweet Commander of the Big Mom Pirates.",
      "He has the power of the Mochi Mochi no Mi.",
      "He is known for his observation haki.",
      "He is Big Mom's son.",
      "He fought Luffy in the Mirror World."
    ],
    hardMode: false,
    emojiClue: "🍩🧣💪🍡🍬🥊",
  },
  {
    name: "Kaido",
    role: "Captain",
    affiliation: "Beasts Pirates",
    arc: ["Wano"],
    species: "Oni",
    fightingStyle: "Melee",
    devilFruit: "Uo Uo no Mi, Model: Seiryu",
    bounty: "4,611,100,000",
    gender: "Male",
    title: "Strongest Creature",
    origin: "Grand Line",
    hints: [
      "He is the captain of the Beasts Pirates.",
      "He is one of the Four Emperors.",
      "He can transform into a dragon.",
      "He is known as the Strongest Creature.",
      "He ruled Wano until his defeat."
    ],
    hardMode: false,
    emojiClue: "🐉🏴☠🐲👹🔥🌊",
  },
  {
    name: "King",
    role: "All-Star",
    affiliation: "Beasts Pirates",
    arc: ["Wano"],
    species: "Lunarian",
    fightingStyle: "Swordsmanship",
    devilFruit: "Ryu Ryu no Mi, Model: Pteranodon",
    bounty: "1,390,000,000",
    gender: "Male",
    title: undefined,
    origin: "Grand Line",
    hints: [
      "He is an All-Star of the Beasts Pirates.",
      "He is a Lunarian.",
      "He can transform into a pteranodon.",
      "He fought Zoro in Wano.",
      "He is Kaido's right-hand man."
    ],
    hardMode: false,
    emojiClue: "👑🤴🏻",
  },
  {
    name: "Marshall D. Teach (Blackbeard)",
    role: "Captain",
    affiliation: "Blackbeard Pirates",
    arc: ["Jaya", "Marineford", "Dressrosa", "Wano"],
    species: "Human",
    fightingStyle: "Devil Fruit",
    devilFruit: "Yami Yami no Mi, Gura Gura no Mi",
    bounty: "3,996,000,000",
    gender: "Male",
    title: "Blackbeard",
    origin: "Grand Line",
    hints: [
      "He is the captain of the Blackbeard Pirates.",
      "He possesses two Devil Fruits.",
      "He became a Yonko after Marineford.",
      "He is known as Blackbeard.",
      "He is a major antagonist in the series."
    ],
    hardMode: false,
    emojiClue: "🇲🇭🇨🇮🏴☠🆔®",
  },
  {
    name: "Shiryu",
    role: "Chief of Staff",
    affiliation: "Blackbeard Pirates",
    arc: ["Impel Down", "Wano"],
    species: "Human",
    fightingStyle: "Swordsmanship",
    bounty: undefined,
    gender: "Male",
    title: undefined,
    origin: "Grand Line",
    hints: [
      "He is the chief of staff of the Blackbeard Pirates.",
      "He was formerly the head jailer of Impel Down.",
      "He is a swordsman.",
      "He joined Blackbeard after the Impel Down breakout.",
      "He is a notable Yonko crew member."
    ],
    hardMode: false,
    emojiClue: "🗡🏴☠🖤⚔👻👤⚖",
  },
] as OnePieceCharacter[];

export const onePieceCharacters: OnePieceCharacter[] = rawCharacters.map(char => {
  const arc = Array.isArray(char.arc) ? char.arc.filter((v): v is string => typeof v === 'string') : undefined;
  return arc ? { ...char, arc } : { ...char };
});

// Generate grid coordinates from character attributes
export function generateGridCoordinates(): {
  affiliations: string[];
  roles: string[];
  answers: (string | null)[][];
  hints: (string[] | null)[][];
} {
  // Extract unique affiliations and roles from characters
  const affiliations = [...new Set(onePieceCharacters.map(char => char.affiliation).filter((v): v is string => typeof v === 'string'))];
  const roles = [...new Set(onePieceCharacters.map(char => char.role).filter((v): v is string => typeof v === 'string'))];

  // Create 3x3 grid
  const gridSize = 3;
  const answers: (string | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  const hints: (string[] | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

  // Fill grid with valid character combinations
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const affiliation = affiliations[row];
      const role = roles[col];
      
      // Find characters that match both affiliation and role
      const matchingCharacters = onePieceCharacters.filter(char => 
        char.affiliation === affiliation && char.role === role
      );

      if (matchingCharacters.length > 0) {
        // Use the first matching character
        const character = matchingCharacters[0];
        answers[row][col] = character.name;
        hints[row][col] = character.hints;
      }
    }
  }

  return {
    affiliations: affiliations.slice(0, gridSize),
    roles: roles.slice(0, gridSize),
    answers,
    hints
  };
}

// New function: generateComboGrid
export function generateComboGrid(characters: OnePieceCharacter[]): {
  rowType: string;
  colType: string;
  rowValues: string[];
  colValues: string[];
  answers: (string | null)[][];
  hints: (string[] | null)[][];
} {
  // Possible attribute types
  const attributeTypes = [
    { key: 'affiliation', getter: (char: OnePieceCharacter) => char.affiliation },
    { key: 'role', getter: (char: OnePieceCharacter) => char.role },
    { key: 'origin', getter: (char: OnePieceCharacter) => char.origin },
    { key: 'devilFruit', getter: (char: OnePieceCharacter) => char.devilFruit },
    { key: 'bounty', getter: (char: OnePieceCharacter) => char.bounty },
    { key: 'species', getter: (char: OnePieceCharacter) => char.species },
    { key: 'fightingStyle', getter: (char: OnePieceCharacter) => char.fightingStyle },
    { key: 'gender', getter: (char: OnePieceCharacter) => char.gender },
    { key: 'title', getter: (char: OnePieceCharacter) => char.title },
  ];

  // Try all pairs of attribute types, find one that can fill a 3x3 grid
  for (let i = 0; i < attributeTypes.length; i++) {
    for (let j = 0; j < attributeTypes.length; j++) {
      if (i === j) continue;
      const rowType = attributeTypes[i];
      const colType = attributeTypes[j];
      // Get all unique values for each
      const rowValuesAll = Array.from(new Set(characters.map(rowType.getter).filter((v): v is string => typeof v === 'string'))) as string[];
      const colValuesAll = Array.from(new Set(characters.map(colType.getter).filter((v): v is string => typeof v === 'string'))) as string[];
      // Try all combinations of 3 row values and 3 col values
      for (let rStart = 0; rStart <= rowValuesAll.length - 3; rStart++) {
        for (let cStart = 0; cStart <= colValuesAll.length - 3; cStart++) {
          const rowValues = rowValuesAll.slice(rStart, rStart + 3);
          const colValues = colValuesAll.slice(cStart, cStart + 3);
          // Build grid
          let allFilled = true;
          const answers: (string | null)[][] = Array(3).fill(null).map(() => Array(3).fill(null));
          const hints: (string[] | null)[][] = Array(3).fill(null).map(() => Array(3).fill(null));
          for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
              const rv = rowValues[row];
              const cv = colValues[col];
              const match = characters.find(char => rowType.getter(char) === rv && colType.getter(char) === cv);
              if (match) {
                answers[row][col] = match.name;
                hints[row][col] = match.hints;
              } else {
                allFilled = false;
              }
            }
          }
          if (allFilled) {
            return {
              rowType: rowType.key,
              colType: colType.key,
              rowValues,
              colValues,
              answers,
              hints
            };
          }
        }
      }
    }
  }
  // Fallback: return empty grid
  return {
    rowType: '',
    colType: '',
    rowValues: [] as string[],
    colValues: [] as string[],
    answers: Array(3).fill(null).map(() => Array(3).fill(null)),
    hints: Array(3).fill(null).map(() => Array(3).fill(null)),
  };
}

// Update getGameData to use generateComboGrid
export function getGameData(date: Date = new Date(), hardMode: boolean = false): {
  rowType: string;
  colType: string;
  rowValues: string[];
  colValues: string[];
  answers: (string | null)[][];
  hints: (string[] | null)[][];
} {
  const seed = date.getTime();
  const random = Math.seedrandom(seed.toString());
  // Shuffle characters to get different combinations
  const shuffledCharacters = [...getOnePieceCharacters(hardMode)].sort(() => random() - 0.5);
  return generateComboGrid(shuffledCharacters);
}

// New simple grid: 9 unique random characters, 2 random attributes per cell
export function getSimpleGridGameData(date: Date = new Date(), hardMode: boolean = false): {
  cells: {
    attr1: string;
    value1: string;
    attr2: string;
    value2: string;
    answer: string;
    hints: string[];
    video?: string;
  }[];
} {
  const allowedKeys: (keyof OnePieceCharacter)[] = [
    'affiliation', 'role', 'species', 'fightingStyle', 'devilFruit', 'bounty', 'origin', 'title', 'gender'
  ];
  const seed = date.getTime();
  const random = Math.seedrandom(seed.toString());
  
  // Only use characters with at least two distinct, non-empty allowed attributes
  const allChars = getOnePieceCharacters(hardMode).filter(char => {
    const validKeys = allowedKeys.filter(k => 
      typeof char[k] === 'string' && 
      char[k] && 
      char[k] !== char.name && 
      char[k] !== '?' && 
      char[k] !== 'undefined'
    );
    return validKeys.length >= 2;
  });
  
  // Ensure we have enough characters, duplicate if necessary
  let shuffled = [...allChars].sort(() => random() - 0.5);
  while (shuffled.length < 9) {
    shuffled = [...shuffled, ...allChars].sort(() => random() - 0.5);
  }
  
  const picked = shuffled.slice(0, 9);
  // Helper function to get 2 valid clues for a character
  function getClues(char: OnePieceCharacter): { key1: keyof OnePieceCharacter; value1: string; key2: keyof OnePieceCharacter; value2: string } {
    // Get all valid keys (non-empty, not name, not '?', not 'undefined', and value is a string)
    const validKeys = allowedKeys.filter(k => {
      const v = char[k];
      return (
        typeof v === 'string' &&
        v &&
        v !== char.name &&
        v !== '?' &&
        v !== 'undefined'
      );
    });

    if (validKeys.length < 2) {
      throw new Error(`Character ${char.name} does not have enough valid attributes for clues`);
    }

    // Generate first random index
    let index1 = Math.floor(random() * validKeys.length);
    let key1 = validKeys[index1];
    let value1 = char[key1];

    // Ensure first value is valid
    while (!value1 || value1 === 'undefined' || value1 === 'null' || value1 === '') {
      index1 = (index1 + 1) % validKeys.length;
      key1 = validKeys[index1];
      value1 = char[key1];
    }

    // Generate second random index (different from first)
    let index2 = Math.floor(random() * validKeys.length);
    while (index2 === index1) {
      index2 = Math.floor(random() * validKeys.length);
    }
    
    let key2 = validKeys[index2];
    let value2 = char[key2];

    // Ensure second value is valid
    while (!value2 || value2 === 'undefined' || value2 === 'null' || value2 === '' || index2 === index1) {
      index2 = (index2 + 1) % validKeys.length;
      if (index2 === index1) {
        index2 = (index2 + 1) % validKeys.length;
      }
      key2 = validKeys[index2];
      value2 = char[key2];
    }

    return { key1, value1: String(value1), key2, value2: String(value2) };
  }

  const cells = picked.map(char => {
    const clues = getClues(char);
    
    return {
      attr1: clues.key1,
      value1: clues.value1,
      attr2: clues.key2,
      value2: clues.value2,
      answer: char.name,
      hints: char.hints,
      video: char.video
    };
  });
  
  return { cells };
}

export function getOnePieceCharacters(hardMode: boolean = false): OnePieceCharacter[] {
  return hardMode ? onePieceCharacters : onePieceCharacters.filter(c => !c.hardMode);
}

// Simple seeded random number generator
declare global {
  interface Math {
    seedrandom: (seed: string) => () => number;
  }
}

// Polyfill for seedrandom if not available
if (typeof Math.seedrandom === 'undefined') {
  Math.seedrandom = function(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return function() {
      hash = (hash * 9301 + 49297) % 233280;
      return hash / 233280;
    };
  };
} 