function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import bibleData from './data/bible.json';
import abbreviations from './utils/abbreviations';
import { isValidBook, isValidChapter, isValidVerse } from './utils/validation';

/**
 * Retrieves a specific verse from the Bible data based on the provided book name, chapter number, and verse number.
 *
 * @param {string} bookName - The name of the book containing the verse.
 * @param {number} chapterNumber - The number of the chapter containing the verse.
 * @param {number} verseNumber - The number of the verse to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @return {Array|string} The content of the requested verse based on the output type.
 */
function getVerse(bookName, chapterNumber, verseNumber) {
  var outputType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "default";
  if (!isValidVerse(bookName, chapterNumber, verseNumber)) {
    throw new Error('Invalid verse reference');
  }
  var content = bibleData[bookName][chapterNumber][verseNumber - 1];
  if (outputType === "indexed") {
    return [{
      key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber),
      book: bookName,
      chapter: chapterNumber.toString(),
      verse: verseNumber.toString(),
      content: content
    }];
  } else if (outputType === "string") {
    return "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber, " - ").concat(content);
  } else {
    return [content];
  }
}

/**
 * Retrieves information about a chapter from the Bible data.
 *
 * @param {string} bookName - The name of the book containing the chapter.
 * @param {number} chapterNumber - The number of the chapter to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @return {Array|String} The information about the chapter based on the output type.
 */
function getChapter(bookName, chapterNumber) {
  var outputType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "default";
  if (!isValidChapter(bookName, chapterNumber)) {
    throw new Error('Invalid chapter reference');
  }
  var verses = bibleData[bookName][chapterNumber];
  if (outputType === "indexed") {
    return verses.map(function (content, index) {
      return {
        key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1),
        book: bookName,
        chapter: chapterNumber.toString(),
        verse: (index + 1).toString(),
        content: content
      };
    });
  } else if (outputType === "string") {
    return verses.map(function (content, index) {
      return "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1, " - ").concat(content);
    }).join("\n");
  } else {
    return verses;
  }
}

/**
 * Retrieves information about a book from the Bible data.
 *
 * @param {string} bookName - The name of the book to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @return {Array|String|Object} The information about the book based on the output type.
 */
function getBook(bookName) {
  var outputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
  if (!isValidBook(bookName)) {
    throw new Error('Invalid book name');
  }
  var chapters = bibleData[bookName];
  if (outputType === "indexed") {
    return Object.entries(chapters).flatMap(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        chapterNumber = _ref2[0],
        verses = _ref2[1];
      return verses.map(function (content, index) {
        return {
          key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1),
          book: bookName,
          chapter: chapterNumber,
          verse: (index + 1).toString(),
          content: content
        };
      });
    });
  } else if (outputType === "string") {
    return Object.entries(chapters).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        chapterNumber = _ref4[0],
        verses = _ref4[1];
      return verses.map(function (content, index) {
        return "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1, " - ").concat(content);
      }).join("\n");
    }).join("\n\n");
  } else {
    return chapters;
  }
}

/**
 * Retrieves the number of chapters in a specific book of the Bible.
 *
 * @param {string} bookName - The name of the book.
 * @throws {Error} Throws an error if the book name is invalid.
 * @return {number} The number of chapters in the specified book.
 */
function getChapterCount(bookName) {
  if (!isValidBook(bookName)) {
    throw new Error('Invalid book name');
  }
  return Object.keys(bibleData[bookName]).length;
}

/**
 * Retrieves the number of verses in a specific chapter of a book in the Bible.
 *
 * @param {string} bookName - The name of the book.
 * @param {number} chapterNumber - The number of the chapter.
 * @throws {Error} Throws an error if the chapter reference is invalid.
 * @return {number} The number of verses in the specified chapter.
 */
function getVerseCount(bookName, chapterNumber) {
  if (!isValidChapter(bookName, chapterNumber)) {
    throw new Error('Invalid chapter reference');
  }
  return bibleData[bookName][chapterNumber].length;
}

/**
 * Retrieves the list of Bible books.
 *
 * @return {Array} An array containing the names of all the Bible books.
 */
function getBibleBooks() {
  return Object.keys(bibleData);
}

/**
 * Retrieves a range of verses from the Bible based on the provided start and end references.
 *
 * @param {string} startBookName - The name of the starting book.
 * @param {number} startChapterNumber - The number of the starting chapter.
 * @param {number} startVerseNumber - The number of the starting verse.
 * @param {string} endBookName - The name of the ending book.
 * @param {number} endChapterNumber - The number of the ending chapter.
 * @param {number} endVerseNumber - The number of the ending verse.
 * @param {string} [outputType="default"] - The type of output. Can be "indexed", "string", or "default".
 * @throws {Error} Throws an error if the verse reference is invalid.
 * @return {Array|string} Returns an array of verses or a string of verses depending on the outputType.
 */
function getRange(startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber) {
  var outputType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "default";
  if (!isValidVerse(startBookName, startChapterNumber, startVerseNumber) || !isValidVerse(endBookName, endChapterNumber, endVerseNumber)) {
    throw new Error('Invalid verse reference');
  }
  var verses = [];

  // Get the index of the start and end books
  var startBookIndex = getBibleBooks().indexOf(startBookName);
  var endBookIndex = getBibleBooks().indexOf(endBookName);

  // Iterate through the books
  for (var bookIndex = startBookIndex; bookIndex <= endBookIndex; bookIndex++) {
    var bookName = getBibleBooks()[bookIndex];
    var startChapter = bookIndex === startBookIndex ? startChapterNumber : 1;
    var endChapter = bookIndex === endBookIndex ? endChapterNumber : getChapterCount(bookName);

    // Iterate through the chapters
    for (var chapterNumber = startChapter; chapterNumber <= endChapter; chapterNumber++) {
      var startVerse = bookIndex === startBookIndex && chapterNumber === startChapterNumber ? startVerseNumber : 1;
      var endVerse = bookIndex === endBookIndex && chapterNumber === endChapterNumber ? endVerseNumber : getVerseCount(bookName, chapterNumber);

      // Iterate through the verses
      for (var verseNumber = startVerse; verseNumber <= endVerse; verseNumber++) {
        var content = getVerse(bookName, chapterNumber, verseNumber)[0];
        if (outputType === "indexed") {
          verses.push({
            key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber),
            book: bookName,
            chapter: chapterNumber.toString(),
            verse: verseNumber.toString(),
            content: content
          });
        } else if (outputType === "string") {
          verses.push("".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber, " - ").concat(content));
        } else {
          verses.push(content);
        }
      }
    }
  }
  if (outputType === "string") {
    return verses.join("\n");
  } else {
    return verses;
  }
}

/**
 * Resolves an abbreviation to its full name.
 *
 * @param {string} abbreviation - The abbreviation to resolve.
 * @return {string} The full name corresponding to the abbreviation.
 */
function resolveAbbreviation(abbreviation) {
  return abbreviations[abbreviation] || abbreviation;
}
function bibleStats() {
  return {
    books: Object.keys(bibleData).length,
    chapters: Object.values(bibleData).reduce(function (sum, book) {
      return sum + Object.keys(book).length;
    }, 0),
    verses: Object.values(bibleData).reduce(function (sum, book) {
      return sum + Object.values(book).reduce(function (sum, chapter) {
        return sum + chapter.length;
      }, 0);
    }, 0)
  };
}

/**
 * Returns an object containing the three validation functions: `isValidBook`, `isValidChapter`, and `isValidVerse`.
 *
 * @return {Object} An object with the validation functions as properties.
 */
function validators() {
  return {
    isValidBook: isValidBook,
    isValidChapter: isValidChapter,
    isValidVerse: isValidVerse
  };
}
export { getVerse, getChapter, getBook, getRange, getChapterCount, getVerseCount, getBibleBooks, resolveAbbreviation, bibleStats };