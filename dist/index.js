var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
var _dirname = path.dirname(fileURLToPath(import.meta.url));
var bibleDataPromise = fs.readFile(path.join(_dirname, "data", "bible.json"), "utf8");
import abbreviations from "./utils/abbreviations";
import { isValidBook, isValidChapter, isValidVerse } from "./utils/validation";
function loadBibleData() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bibleDataPromise];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, JSON.parse(data)];
            }
        });
    });
}
/**
 * Retrieves a specific verse from the Bible data based on the provided book name, chapter number, and verse number.
 *
 * @param {string} bookName - The name of the book containing the verse.
 * @param {number} chapterNumber - The number of the chapter containing the verse.
 * @param {number} verseNumber - The number of the verse to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @return {Array|string} The content of the requested verse based on the output type.
 */
function getVerse(bookName_1, chapterNumber_1, verseNumber_1) {
    return __awaiter(this, arguments, void 0, function (bookName, chapterNumber, verseNumber, outputType) {
        var bibleData, content;
        if (outputType === void 0) { outputType = "default"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isValidVerse(bookName, chapterNumber, verseNumber)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Invalid verse reference");
                    }
                    return [4 /*yield*/, loadBibleData()];
                case 2:
                    bibleData = _a.sent();
                    content = bibleData[bookName][chapterNumber][verseNumber - 1];
                    if (outputType === "indexed") {
                        return [2 /*return*/, [
                                {
                                    key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber),
                                    book: bookName,
                                    chapter: chapterNumber.toString(),
                                    verse: verseNumber.toString(),
                                    content: content,
                                },
                            ]];
                    }
                    else if (outputType === "string") {
                        return [2 /*return*/, "".concat(bookName, " ").concat(chapterNumber, ":").concat(verseNumber, " - ").concat(content)];
                    }
                    else {
                        return [2 /*return*/, [content]];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Retrieves information about a chapter from the Bible data.
 *
 * @param {string} bookName - The name of the book containing the chapter.
 * @param {number} chapterNumber - The number of the chapter to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @return {Array|String} The information about the chapter based on the output type.
 */
function getChapter(bookName_1, chapterNumber_1) {
    return __awaiter(this, arguments, void 0, function (bookName, chapterNumber, outputType) {
        var bibleData, verses;
        if (outputType === void 0) { outputType = "default"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isValidChapter(bookName, chapterNumber)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Invalid chapter reference");
                    }
                    return [4 /*yield*/, loadBibleData()];
                case 2:
                    bibleData = _a.sent();
                    verses = bibleData[bookName][chapterNumber];
                    if (outputType === "indexed") {
                        return [2 /*return*/, verses.map(function (content, index) { return ({
                                key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1),
                                book: bookName,
                                chapter: chapterNumber.toString(),
                                verse: (index + 1).toString(),
                                content: content,
                            }); })];
                    }
                    else if (outputType === "string") {
                        return [2 /*return*/, verses
                                .map(function (content, index) {
                                return "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1, " - ").concat(content);
                            })
                                .join("\n")];
                    }
                    else {
                        return [2 /*return*/, verses];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Retrieves information about a book from the Bible data.
 *
 * @param {string} bookName - The name of the book to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @return {Array|String|Object} The information about the book based on the output type.
 */
function getBook(bookName_1) {
    return __awaiter(this, arguments, void 0, function (bookName, outputType) {
        var bibleData, chapters;
        if (outputType === void 0) { outputType = "default"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isValidBook(bookName)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Invalid book name");
                    }
                    return [4 /*yield*/, loadBibleData()];
                case 2:
                    bibleData = _a.sent();
                    chapters = bibleData[bookName];
                    if (outputType === "indexed") {
                        return [2 /*return*/, Object.entries(chapters).flatMap(function (_a) {
                                var chapterNumber = _a[0], verses = _a[1];
                                return verses.map(function (content, index) { return ({
                                    key: "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1),
                                    book: bookName,
                                    chapter: chapterNumber,
                                    verse: (index + 1).toString(),
                                    content: content,
                                }); });
                            })];
                    }
                    else if (outputType === "string") {
                        return [2 /*return*/, Object.entries(chapters)
                                .map(function (_a) {
                                var chapterNumber = _a[0], verses = _a[1];
                                return verses
                                    .map(function (content, index) {
                                    return "".concat(bookName, " ").concat(chapterNumber, ":").concat(index + 1, " - ").concat(content);
                                })
                                    .join("\n");
                            })
                                .join("\n\n")];
                    }
                    else {
                        return [2 /*return*/, chapters];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Retrieves the number of chapters in a specific book of the Bible.
 *
 * @param {string} bookName - The name of the book.
 * @throws {Error} Throws an error if the book name is invalid.
 * @return {number} The number of chapters in the specified book.
 */
function getChapterCount(bookName) {
    return __awaiter(this, void 0, void 0, function () {
        var bibleData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isValidBook(bookName)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Invalid book name");
                    }
                    return [4 /*yield*/, loadBibleData()];
                case 2:
                    bibleData = _a.sent();
                    return [2 /*return*/, Object.keys(bibleData[bookName]).length];
            }
        });
    });
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
    return __awaiter(this, void 0, void 0, function () {
        var bibleData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isValidChapter(bookName, chapterNumber)];
                case 1:
                    if (!(_a.sent())) {
                        throw new Error("Invalid chapter reference");
                    }
                    return [4 /*yield*/, loadBibleData()];
                case 2:
                    bibleData = _a.sent();
                    return [2 /*return*/, bibleData[bookName][chapterNumber].length];
            }
        });
    });
}
/**
 * Retrieves the list of Bible books.
 *
 * @return {Array} An array containing the names of all the Bible books.
 */
function getBibleBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var bibleData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBibleData()];
                case 1:
                    bibleData = _a.sent();
                    return [2 /*return*/, Object.keys(bibleData)];
            }
        });
    });
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
function getRange(startBookName_1, startChapterNumber_1, startVerseNumber_1, endBookName_1, endChapterNumber_1, endVerseNumber_1) {
    return __awaiter(this, arguments, void 0, function (startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber, outputType) {
        var _a, bibleData, verses, bibleBooksPromise, startBookIndex, endBookIndex, bookIndex, bookName, startChapter, chapterCountPromise, endChapter, chapterNumber, startVerse, verseCountPromise, endVerse, verseNumber, versePromise, content;
        if (outputType === void 0) { outputType = "default"; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, isValidVerse(startBookName, startChapterNumber, startVerseNumber)];
                case 1:
                    _a = !(_b.sent());
                    if (_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, isValidVerse(endBookName, endChapterNumber, endVerseNumber)];
                case 2:
                    _a = !(_b.sent());
                    _b.label = 3;
                case 3:
                    if (_a) {
                        throw new Error("Invalid verse reference");
                    }
                    return [4 /*yield*/, loadBibleData()];
                case 4:
                    bibleData = _b.sent();
                    verses = [];
                    return [4 /*yield*/, getBibleBooks()];
                case 5:
                    bibleBooksPromise = _b.sent();
                    startBookIndex = bibleBooksPromise.indexOf(startBookName);
                    endBookIndex = bibleBooksPromise.indexOf(endBookName);
                    bookIndex = startBookIndex;
                    _b.label = 6;
                case 6:
                    if (!(bookIndex <= endBookIndex)) return [3 /*break*/, 15];
                    bookName = bibleBooksPromise[bookIndex];
                    startChapter = bookIndex === startBookIndex ? startChapterNumber : 1;
                    return [4 /*yield*/, getChapterCount(bookName)];
                case 7:
                    chapterCountPromise = _b.sent();
                    endChapter = bookIndex === endBookIndex ? endChapterNumber : chapterCountPromise;
                    chapterNumber = startChapter;
                    _b.label = 8;
                case 8:
                    if (!(chapterNumber <= endChapter)) return [3 /*break*/, 14];
                    startVerse = bookIndex === startBookIndex && chapterNumber === startChapterNumber
                        ? startVerseNumber
                        : 1;
                    return [4 /*yield*/, getVerseCount(bookName, chapterNumber)];
                case 9:
                    verseCountPromise = _b.sent();
                    endVerse = bookIndex === endBookIndex && chapterNumber === endChapterNumber
                        ? endVerseNumber
                        : verseCountPromise;
                    verseNumber = startVerse;
                    _b.label = 10;
                case 10:
                    if (!(verseNumber <= endVerse)) return [3 /*break*/, 13];
                    return [4 /*yield*/, getVerse(bookName, chapterNumber, verseNumber)];
                case 11:
                    versePromise = _b.sent();
                    content = versePromise[0];
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
                    _b.label = 12;
                case 12:
                    verseNumber++;
                    return [3 /*break*/, 10];
                case 13:
                    chapterNumber++;
                    return [3 /*break*/, 8];
                case 14:
                    bookIndex++;
                    return [3 /*break*/, 6];
                case 15:
                    if (outputType === "string") {
                        return [2 /*return*/, verses.join("\n")];
                    }
                    else {
                        return [2 /*return*/, verses];
                    }
                    return [2 /*return*/];
            }
        });
    });
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
    return __awaiter(this, void 0, void 0, function () {
        var bibleData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadBibleData()];
                case 1:
                    bibleData = _a.sent();
                    return [2 /*return*/, {
                            books: Object.keys(bibleData).length,
                            chapters: Object.values(bibleData).reduce(function (sum, book) { return sum + Object.keys(book).length; }, 0),
                            verses: Object.values(bibleData).reduce(function (sum, book) {
                                return sum +
                                    Object.values(book).reduce(function (sum, chapter) { return sum + chapter.length; }, 0);
                            }, 0),
                        }];
            }
        });
    });
}
export { getVerse, getChapter, getBook, getRange, getChapterCount, getVerseCount, getBibleBooks, resolveAbbreviation, bibleStats, };
