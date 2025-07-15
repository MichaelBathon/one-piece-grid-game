import { NextRequest, NextResponse } from 'next/server';
import { onePieceCharacters, OnePieceCharacter } from '../../../game-data';

// In-memory character list (imported from game-data.ts)
let characters: OnePieceCharacter[] = onePieceCharacters;

export async function PUT(req: NextRequest) {
  const { name, emojiClue, action } = await req.json();
  if (!name || !Array.isArray(emojiClue) || !['add', 'remove'].includes(action)) {
    return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
  }
  const char = characters.find(c => c.name === name);
  if (!char) {
    return NextResponse.json({ error: 'Character not found' }, { status: 404 });
  }
  if (!Array.isArray(char.emojiClue)) char.emojiClue = [];
  if (action === 'add') {
    for (const emoji of emojiClue) {
      if (!char.emojiClue.includes(emoji)) char.emojiClue.push(emoji);
    }
  } else if (action === 'remove') {
    char.emojiClue = char.emojiClue.filter((e: string) => !emojiClue.includes(e));
  }
  return NextResponse.json({ name: char.name, emojiClue: char.emojiClue });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.name || !Array.isArray(data.hints)) {
    return NextResponse.json({ error: 'Missing required fields: name, hints' }, { status: 400 });
  }
  if (characters.some(c => c.name === data.name)) {
    return NextResponse.json({ error: 'Character already exists' }, { status: 409 });
  }
  const newChar: OnePieceCharacter = {
    ...data,
    emojiClue: Array.isArray(data.emojiClue) ? data.emojiClue : [],
    hints: data.hints,
  };
  characters.push(newChar);
  return NextResponse.json(newChar);
} 