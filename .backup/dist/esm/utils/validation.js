import bibleData from "../data/bible.json";

/**
 * Checks if the provided book name is a valid entry in the bibleData.
 *
 * @param {string} bookName - The name of the book to check.
 * @return {boolean} Indicates whether the book name is valid.
 */
function isValidBook(bookName) {
  return bibleData.hasOwnProperty(bookName);
}

/**
 * Checks if the given chapter number is valid for the specified book.
 *
 * @param {string} bookName - The name of the book.
 * @param {number} chapterNumber - The number of the chapter.
 * @return {boolean} Returns true if the chapter number is valid, false otherwise.
 */
function isValidChapter(bookName, chapterNumber) {
  if (!isValidBook(bookName)) {
    return false;
  }
  var book = bibleData[bookName];
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
function isValidVerse(bookName, chapterNumber, verseNumber) {
  if (!isValidChapter(bookName, chapterNumber)) {
    return false;
  }
  var chapter = bibleData[bookName][chapterNumber];
  return verseNumber >= 1 && verseNumber <= chapter.length;
}
export { isValidBook, isValidChapter, isValidVerse };