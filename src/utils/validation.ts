import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadBibleData() {
  const filePath = path.join(__dirname, "..", "data", "bible.json");
  const rawData = await fs.readFile(filePath, "utf8");
  return JSON.parse(rawData);
}

const bibleDataPromise = loadBibleData();

async function isValidBook(bookName: string): Promise<boolean> {
  const bibleData = await bibleDataPromise;
  return bibleData.hasOwnProperty(bookName);
}

async function isValidChapter(
  bookName: string,
  chapterNumber: number
): Promise<boolean> {
  const bibleData = await bibleDataPromise;
  if (!(await isValidBook(bookName))) {
    return false;
  }
  const book = bibleData[bookName];
  return book.hasOwnProperty(chapterNumber);
}

async function isValidVerse(
  bookName: string,
  chapterNumber: number,
  verseNumber: number
): Promise<boolean> {
  if (!(await isValidChapter(bookName, chapterNumber))) {
    return false;
  }
  const bibleData = await bibleDataPromise;
  const chapter = bibleData[bookName][chapterNumber];
  return verseNumber >= 1 && verseNumber <= chapter.length;
}

export { isValidBook, isValidChapter, isValidVerse };
