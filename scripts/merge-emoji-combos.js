const fs = require('fs');
const path = require('path');

const combosPath = path.join(__dirname, 'emoji-combos.json');
const gameDataPath = path.join(__dirname, '../src/app/game-data.ts');
const outputPath = path.join(__dirname, '../src/app/game-data.with-emojis.ts');

const combos = JSON.parse(fs.readFileSync(combosPath, 'utf8'));
const fileContent = fs.readFileSync(gameDataPath, 'utf8');

// Add emojiClue?: string; to the interface if not present
let updated = fileContent.replace(/(export interface OnePieceCharacter \{[^}]*)(\})/, (m, start, end) => {
  if (/emojiClue\?/.test(m)) return m;
  return start + '  emojiClue?: string;\n' + end;
});

// Helper to filter only emoji and basic punctuation/whitespace
function filterEmoji(str) {
  // This regex keeps emoji, numbers, basic punctuation, and whitespace
  return str.match(/[\p{Emoji}\p{P}\p{N}\p{Zs}]/gu)?.join('') || '';
}

// Regex to match each character object in the rawCharacters array
updated = updated.replace(/(\{\s*name: "([^"]+)"[\s\S]*?\n\s*\})/g, (match, obj, name) => {
  let emoji = combos[name];
  if (!emoji) return match;
  emoji = filterEmoji(emoji);
  // If emojiClue already present, replace it
  if (/emojiClue:/.test(match)) {
    return match.replace(/emojiClue: "[^"]*",?/, `emojiClue: "${emoji}",`);
  }
  // Otherwise, add emojiClue before the closing }
  return match.replace(/\n\s*\}$/, `,\n    emojiClue: "${emoji}"\n  }`);
});

fs.writeFileSync(outputPath, updated);
console.log('Done! Output written to src/app/game-data.with-emojis.ts. Review and replace the original if correct.');
