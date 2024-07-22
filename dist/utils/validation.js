"use strict";

var bibleData = require("../data/bible.json");
function isValidBook(bookName) {
  return bibleData.hasOwnProperty(bookName);
}
function isValidChapter(bookName, chapterNumber) {
  if (!isValidBook(bookName)) {
    return false;
  }
  var book = bibleData[bookName];
  return book.hasOwnProperty(chapterNumber);
}
function isValidVerse(bookName, chapterNumber, verseNumber) {
  if (!isValidChapter(bookName, chapterNumber)) {
    return false;
  }
  var chapter = bibleData[bookName][chapterNumber];
  return verseNumber >= 1 && verseNumber <= chapter.length;
}
module.exports = {
  isValidBook: isValidBook,
  isValidChapter: isValidChapter,
  isValidVerse: isValidVerse
};