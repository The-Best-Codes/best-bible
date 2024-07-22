"use strict";

var bibleData = require("./data/bible.json");
var abbreviations = require("./utils/abbreviations");
var _require = require("./utils/validation"),
  isValidBook = _require.isValidBook,
  isValidChapter = _require.isValidChapter,
  isValidVerse = _require.isValidVerse;
function getVerse(bookName, chapterNumber, verseNumber) {
  if (!isValidVerse(bookName, chapterNumber, verseNumber)) {
    throw new Error('Invalid verse reference');
  }
  return bibleData[bookName][chapterNumber][verseNumber - 1];
}
function getChapter(bookName, chapterNumber) {
  if (!isValidChapter(bookName, chapterNumber)) {
    throw new Error('Invalid chapter reference');
  }
  return bibleData[bookName][chapterNumber];
}
function getBook(bookName) {
  if (!isValidBook(bookName)) {
    throw new Error('Invalid book name');
  }
  return bibleData[bookName];
}
function resolveAbbreviation(abbreviation) {
  return abbreviations[abbreviation] || abbreviation;
}
module.exports = {
  getVerse: getVerse,
  getChapter: getChapter,
  getBook: getBook,
  resolveAbbreviation: resolveAbbreviation
};