import { getVerse, getChapter, getBook, getRange, getChapterCount, getVerseCount, getBibleBooks, searchVerse, parseVerse, resolveAbbreviation, bibleStats, bibleValidation } from './index';

// Expose the functions to the global scope
(window as any).BestBible = {
  getVerse,
  getChapter,
  getBook,
  getRange,
  getChapterCount,
  getVerseCount,
  getBibleBooks,
  searchVerse,
  parseVerse,
  resolveAbbreviation,
  bibleStats,
  bibleValidation
};