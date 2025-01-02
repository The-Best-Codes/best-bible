import jsonBibleData from "../data/bible.json";
import BibleData from "../types/bible";

// @ts-ignore
const bibleData: BibleData = jsonBibleData;

/**
 * Checks if the provided book name is a valid entry in the bibleData.
 *
 * @param bookName - The name of the book to check.
 * @return Indicates whether the book name is valid.
 */
function isValidBook(bookName: string): boolean {
  return Object.prototype.hasOwnProperty.call(bibleData, bookName);
}

/**
 * Checks if the given chapter number is valid for the specified book.
 *
 * @param bookName - The name of the book.
 * @param chapterNumber - The number of the chapter.
 * @return Returns true if the chapter number is valid, false otherwise.
 */
function isValidChapter(bookName: string, chapterNumber: number): boolean {
  if (!isValidBook(bookName)) {
    return false;
  }
  const book = bibleData[bookName];
  return Object.prototype.hasOwnProperty.call(book, chapterNumber);
}

/**
 * Checks if the given verse number is valid for the specified book and chapter.
 *
 * @param bookName - The name of the book.
 * @param chapterNumber - The number of the chapter.
 * @param verseNumber - The number of the verse.
 * @return Returns true if the verse number is valid, false otherwise.
 */
function isValidVerse(
  bookName: string,
  chapterNumber: number,
  verseNumber: number,
): boolean {
  if (!isValidChapter(bookName, chapterNumber)) {
    return false;
  }
  const chapter = bibleData[bookName][chapterNumber] as string[];
  return verseNumber >= 1 && verseNumber <= chapter.length;
}

export { isValidBook, isValidChapter, isValidVerse };
