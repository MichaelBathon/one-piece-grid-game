const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Path to the game-data file
const gameDataPath = path.join(__dirname, '../src/app/game-data.ts');

// Read the file
const fileContent = fs.readFileSync(gameDataPath, 'utf8');

// Simple regex to extract character names from the rawCharacters array
const nameRegex = /name:\s*"([^"]+)"/g;
const names = [];
let match;
while ((match = nameRegex.exec(fileContent)) !== null) {
  names.push(match[1]);
}

console.log('Found', names.length, 'character names. Scraping EmojiDB...');

function getNameVariants(name) {
  const variants = [];
  variants.push(name);
  // Remove middle initials (e.g., "Monkey D. Luffy" -> "Monkey Luffy")
  variants.push(name.replace(/\b[A-Z]\./g, '').replace(/\s+/g, ' ').trim());
  // Only last word (e.g., "Monkey D. Luffy" -> "Luffy")
  variants.push(name.split(' ').slice(-1)[0]);
  // Remove parentheses and content within
  if (name.includes('(')) {
    variants.push(name.replace(/\s*\([^)]*\)/g, '').trim());
    // Add just the alias in parentheses
    const alias = name.match(/\(([^)]+)\)/);
    if (alias) variants.push(alias[1]);
  }
  // Remove duplicate/empty variants
  return [...new Set(variants.filter(Boolean))];
}

async function getEmojiComboForName(name) {
  const variants = getNameVariants(name);
  for (const variant of variants) {
    const urlName = variant.replace(/\s+/g, '-').replace(/[().']/g, '').toLowerCase();
    const url = `https://emojidb.org/${encodeURIComponent(urlName)}-emojis`;
    try {
      const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const $ = cheerio.load(data);
      // New structure: div.emoji-list > div.emoji-ctn > div.emoji
      const emojis = [];
      $('div.emoji-list div.emoji-ctn div.emoji').each((i, el) => {
        if (i < 6) emojis.push($(el).text().trim());
      });
      if (emojis.length > 0) {
        const combo = emojis.join('');
        console.log(`  Success for '${name}' with variant '${variant}': ${combo}`);
        return combo;
      } else {
        console.log(`  No emojis found for '${name}' with variant '${variant}'`);
      }
    } catch (err) {
      console.log(`  Error for '${name}' with variant '${variant}': ${err.message}`);
    }
  }
  return '';
}

(async () => {
  const result = {};
  for (const name of names) {
    console.log('Scraping:', name);
    const emojiCombo = await getEmojiComboForName(name);
    result[name] = emojiCombo;
    // Optional: add a short delay to avoid hammering the site
    await new Promise(res => setTimeout(res, 500));
  }
  fs.writeFileSync(path.join(__dirname, 'emoji-combos.json'), JSON.stringify(result, null, 2));
  console.log('Done! Emoji combos saved to scripts/emoji-combos.json');
})();