import bibleData from "./data/bible.json";
import abbreviations from "./utils/abbreviations";
import { isValidBook, isValidChapter, isValidVerse } from "./utils/validation";
/**
 * Retrieves a specific verse from the Bible data based on the provided book name, chapter number, and verse number.
 *
 * @param {string} bookName - The name of the book containing the verse.
 * @param {number} chapterNumber - The number of the chapter containing the verse.
 * @param {number} verseNumber - The number of the verse to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @return {Array|string} The content of the requested verse based on the output type.
 */
function getVerse(bookName, chapterNumber, verseNumber, outputType) {
    if (outputType === void 0) { outputType = "default"; }
    if (!isValidVerse(bookName, chapterNumber, verseNumber)) {
        throw new Error("Invalid verse reference");
    }
    var content = bibleData[bookName][chapterNumber][verseNumber - 1];
    if (outputType === "indexed") {
        return [
            {
                key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber),
                book: bookName,
                chapter: chapterNumber.toString(),
                verse: verseNumber.toString(),
                content: content,
            },
        ];
    }
    else if (outputType === "string") {
        return "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber, " - ").concat(content);
    }
    else {
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
function getChapter(bookName, chapterNumber, outputType) {
    if (outputType === void 0) { outputType = "default"; }
    if (!isValidChapter(bookName, chapterNumber)) {
        throw new Error("Invalid chapter reference");
    }
    var verses = bibleData[bookName][chapterNumber];
    if (outputType === "indexed") {
        return verses.map(function (content, index) { return ({
            key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1),
            book: bookName,
            chapter: chapterNumber.toString(),
            verse: (index + 1).toString(),
            content: content,
        }); });
    }
    else if (outputType === "string") {
        return verses
            .map(function (content, index) {
            return "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1, " - ").concat(content);
        })
            .join("\n");
    }
    else {
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
function getBook(bookName, outputType) {
    if (outputType === void 0) { outputType = "default"; }
    if (!isValidBook(bookName)) {
        throw new Error("Invalid book name");
    }
    var chapters = bibleData[bookName];
    if (outputType === "indexed") {
        return Object.entries(chapters).flatMap(function (_a) {
            var chapterNumber = _a[0], verses = _a[1];
            return verses.map(function (content, index) { return ({
                key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1),
                book: bookName,
                chapter: chapterNumber,
                verse: (index + 1).toString(),
                content: content,
            }); });
        });
    }
    else if (outputType === "string") {
        return Object.entries(chapters)
            .map(function (_a) {
            var chapterNumber = _a[0], verses = _a[1];
            return verses
                .map(function (content, index) {
                return "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1, " - ").concat(content);
            })
                .join("\n");
        })
            .join("\n\n");
    }
    else {
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
        throw new Error("Invalid book name");
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
        throw new Error("Invalid chapter reference");
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
function getRange(startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber, outputType) {
    if (outputType === void 0) { outputType = "default"; }
    if (!isValidVerse(startBookName, startChapterNumber, startVerseNumber) ||
        !isValidVerse(endBookName, endChapterNumber, endVerseNumber)) {
        throw new Error("Invalid verse reference");
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
            var startVerse = bookIndex === startBookIndex && chapterNumber === startChapterNumber
                ? startVerseNumber
                : 1;
            var endVerse = bookIndex === endBookIndex && chapterNumber === endChapterNumber
                ? endVerseNumber
                : getVerseCount(bookName, chapterNumber);
            // Iterate through the verses
            for (var verseNumber = startVerse; verseNumber <= endVerse; verseNumber++) {
                var content = getVerse(bookName, chapterNumber, verseNumber)[0];
                if (outputType === "indexed") {
                    verses.push({
                        key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber),
                        book: bookName,
                        chapter: chapterNumber.toString(),
                        verse: verseNumber.toString(),
                        content: content,
                    });
                }
                else if (outputType === "string") {
                    verses.push("".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber, " - ").concat(content));
                }
                else {
                    verses.push(content);
                }
            }
        }
    }
    if (outputType === "string") {
        return verses.join("\n");
    }
    else {
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
        chapters: Object.values(bibleData).reduce(function (sum, book) { return sum + Object.keys(book).length; }, 0),
        verses: Object.values(bibleData).reduce(function (sum, book) {
            return sum +
                Object.values(book).reduce(function (sum, chapter) { return sum + chapter.length; }, 0);
        }, 0),
    };
}
export { getVerse, getChapter, getBook, getRange, getChapterCount, getVerseCount, getBibleBooks, resolveAbbreviation, bibleStats, };
