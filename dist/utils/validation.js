"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidBook = isValidBook;
exports.isValidChapter = isValidChapter;
exports.isValidVerse = isValidVerse;
var _bible = _interopRequireDefault(require("../data/bible.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Checks if the provided book name is a valid entry in the bibleData.
 *
 * @param {string} bookName - The name of the book to check.
 * @return {boolean} Indicates whether the book name is valid.
 */
function isValidBook(bookName) {
  return _bible["default"].hasOwnProperty(bookName);
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
  var book = _bible["default"][bookName];
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
  var chapter = _bible["default"][bookName][chapterNumber];
  return verseNumber >= 1 && verseNumber <= chapter.length;
}