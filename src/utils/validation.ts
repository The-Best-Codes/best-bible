// @ts-ignore
const bibleData = require("../data/bible.json");

/**
 * Checks if the provided book name is a valid entry in the bibleData.
 *
 * @param {string} bookName - The name of the book to check.
 * @return {boolean} Indicates whether the book name is valid.
 */
// @ts-ignore
function isValidBook(bookName: string) {
  return bibleData.hasOwnProperty(bookName);
}

/**
 * Checks if the given chapter number is valid for the specified book.
 *
 * @param {string} bookName - The name of the book.
 * @param {number} chapterNumber - The number of the chapter.
 * @return {boolean} Returns true if the chapter number is valid, false otherwise.
 */
// @ts-ignore
function isValidChapter(bookName: string, chapterNumber: number) {
  if (!isValidBook(bookName)) {
    return false;
  }
  const book = bibleData[bookName];
  return book.hasOwnProperty(chapterNumber);
}

/**
 * Checks if the given verse number is valid for the specified book and chapter.
 *
 * @param {string} bookName - The name of the book.
 * @param {number} chapterNumber - The number of the chapter.
 * @param {number} verseNumber - The number of the verse.
 * @return {boolean} Returns true if the verse number is valid, false otherwise.
 */
// @ts-ignore
function isValidVerse(
  bookName: string,
  chapterNumber: number,
  verseNumber: number,
) {
  if (!isValidChapter(bookName, chapterNumber)) {
    return false;
  }
  const chapter = bibleData[bookName][chapterNumber];
  return verseNumber >= 1 && verseNumber <= chapter.length;
}

module.exports = {
  isValidBook,
  isValidChapter,
  isValidVerse,
};
