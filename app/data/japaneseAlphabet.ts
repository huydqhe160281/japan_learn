export type AlphabetType = "hiragana" | "katakana";

export interface JapaneseCharacter {
  character: string;
  romaji: string;
  type: AlphabetType;
}

// Bảng chữ cái Hiragana cơ bản
export const hiragana: JapaneseCharacter[] = [
  { character: "あ", romaji: "a", type: "hiragana" },
  { character: "い", romaji: "i", type: "hiragana" },
  { character: "う", romaji: "u", type: "hiragana" },
  { character: "え", romaji: "e", type: "hiragana" },
  { character: "お", romaji: "o", type: "hiragana" },
  { character: "か", romaji: "ka", type: "hiragana" },
  { character: "き", romaji: "ki", type: "hiragana" },
  { character: "く", romaji: "ku", type: "hiragana" },
  { character: "け", romaji: "ke", type: "hiragana" },
  { character: "こ", romaji: "ko", type: "hiragana" },
  { character: "さ", romaji: "sa", type: "hiragana" },
  { character: "し", romaji: "shi", type: "hiragana" },
  { character: "す", romaji: "su", type: "hiragana" },
  { character: "せ", romaji: "se", type: "hiragana" },
  { character: "そ", romaji: "so", type: "hiragana" },
  { character: "た", romaji: "ta", type: "hiragana" },
  { character: "ち", romaji: "chi", type: "hiragana" },
  { character: "つ", romaji: "tsu", type: "hiragana" },
  { character: "て", romaji: "te", type: "hiragana" },
  { character: "と", romaji: "to", type: "hiragana" },
  { character: "な", romaji: "na", type: "hiragana" },
  { character: "に", romaji: "ni", type: "hiragana" },
  { character: "ぬ", romaji: "nu", type: "hiragana" },
  { character: "ね", romaji: "ne", type: "hiragana" },
  { character: "の", romaji: "no", type: "hiragana" },
  { character: "は", romaji: "ha", type: "hiragana" },
  { character: "ひ", romaji: "hi", type: "hiragana" },
  { character: "ふ", romaji: "fu", type: "hiragana" },
  { character: "へ", romaji: "he", type: "hiragana" },
  { character: "ほ", romaji: "ho", type: "hiragana" },
  { character: "ま", romaji: "ma", type: "hiragana" },
  { character: "み", romaji: "mi", type: "hiragana" },
  { character: "む", romaji: "mu", type: "hiragana" },
  { character: "め", romaji: "me", type: "hiragana" },
  { character: "も", romaji: "mo", type: "hiragana" },
  { character: "や", romaji: "ya", type: "hiragana" },
  { character: "ゆ", romaji: "yu", type: "hiragana" },
  { character: "よ", romaji: "yo", type: "hiragana" },
  { character: "ら", romaji: "ra", type: "hiragana" },
  { character: "り", romaji: "ri", type: "hiragana" },
  { character: "る", romaji: "ru", type: "hiragana" },
  { character: "れ", romaji: "re", type: "hiragana" },
  { character: "ろ", romaji: "ro", type: "hiragana" },
  { character: "わ", romaji: "wa", type: "hiragana" },
  { character: "を", romaji: "wo", type: "hiragana" },
  { character: "ん", romaji: "n", type: "hiragana" },
];

// Bảng chữ cái Katakana cơ bản
export const katakana: JapaneseCharacter[] = [
  { character: "ア", romaji: "a", type: "katakana" },
  { character: "イ", romaji: "i", type: "katakana" },
  { character: "ウ", romaji: "u", type: "katakana" },
  { character: "エ", romaji: "e", type: "katakana" },
  { character: "オ", romaji: "o", type: "katakana" },
  { character: "カ", romaji: "ka", type: "katakana" },
  { character: "キ", romaji: "ki", type: "katakana" },
  { character: "ク", romaji: "ku", type: "katakana" },
  { character: "ケ", romaji: "ke", type: "katakana" },
  { character: "コ", romaji: "ko", type: "katakana" },
  { character: "サ", romaji: "sa", type: "katakana" },
  { character: "シ", romaji: "shi", type: "katakana" },
  { character: "ス", romaji: "su", type: "katakana" },
  { character: "セ", romaji: "se", type: "katakana" },
  { character: "ソ", romaji: "so", type: "katakana" },
  { character: "タ", romaji: "ta", type: "katakana" },
  { character: "チ", romaji: "chi", type: "katakana" },
  { character: "ツ", romaji: "tsu", type: "katakana" },
  { character: "テ", romaji: "te", type: "katakana" },
  { character: "ト", romaji: "to", type: "katakana" },
  { character: "ナ", romaji: "na", type: "katakana" },
  { character: "ニ", romaji: "ni", type: "katakana" },
  { character: "ヌ", romaji: "nu", type: "katakana" },
  { character: "ネ", romaji: "ne", type: "katakana" },
  { character: "ノ", romaji: "no", type: "katakana" },
  { character: "ハ", romaji: "ha", type: "katakana" },
  { character: "ヒ", romaji: "hi", type: "katakana" },
  { character: "フ", romaji: "fu", type: "katakana" },
  { character: "ヘ", romaji: "he", type: "katakana" },
  { character: "ホ", romaji: "ho", type: "katakana" },
  { character: "マ", romaji: "ma", type: "katakana" },
  { character: "ミ", romaji: "mi", type: "katakana" },
  { character: "ム", romaji: "mu", type: "katakana" },
  { character: "メ", romaji: "me", type: "katakana" },
  { character: "モ", romaji: "mo", type: "katakana" },
  { character: "ヤ", romaji: "ya", type: "katakana" },
  { character: "ユ", romaji: "yu", type: "katakana" },
  { character: "ヨ", romaji: "yo", type: "katakana" },
  { character: "ラ", romaji: "ra", type: "katakana" },
  { character: "リ", romaji: "ri", type: "katakana" },
  { character: "ル", romaji: "ru", type: "katakana" },
  { character: "レ", romaji: "re", type: "katakana" },
  { character: "ロ", romaji: "ro", type: "katakana" },
  { character: "ワ", romaji: "wa", type: "katakana" },
  { character: "ヲ", romaji: "wo", type: "katakana" },
  { character: "ン", romaji: "n", type: "katakana" },
];

// Tất cả các ký tự
export const allCharacters: JapaneseCharacter[] = [...hiragana, ...katakana];

// Hàm lấy các lựa chọn sai ngẫu nhiên
export function getRandomWrongAnswers(
  correctAnswer: string,
  allAnswers: string[],
  count: number = 3
): string[] {
  const wrongAnswers = allAnswers.filter((ans) => ans !== correctAnswer);
  const shuffled = wrongAnswers.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Hàm trộn mảng
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
