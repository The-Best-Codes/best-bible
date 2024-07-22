const bibleData = require(`./data/bible.json`);
const abbreviations = require(`./utils/abbreviations`);
const { isValidBook, isValidChapter, isValidVerse } = require(`./utils/validation`);

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

function getChapterCount(bookName) {
    if (!isValidBook(bookName)) {
        throw new Error('Invalid book name');
    }
    return Object.keys(bibleData[bookName]).length;
}

function getVerseCount(bookName, chapterNumber) {
    if (!isValidChapter(bookName, chapterNumber)) {
        throw new Error('Invalid chapter reference');
    }
    return bibleData[bookName][chapterNumber].length;
}

function getBibleBooks() {
    return Object.keys(bibleData);
}

function getRange(startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber) {
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
        var startChapter = (bookIndex === startBookIndex) ? startChapterNumber : 1;
        var endChapter = (bookIndex === endBookIndex) ? endChapterNumber : getChapterCount(bookName);

        // Iterate through the chapters
        for (var chapterNumber = startChapter; chapterNumber <= endChapter; chapterNumber++) {
            var startVerse = (bookIndex === startBookIndex && chapterNumber === startChapterNumber) ? startVerseNumber : 1;
            var endVerse = (bookIndex === endBookIndex && chapterNumber === endChapterNumber) ? endVerseNumber : getVerseCount(bookName, chapterNumber);

            // Iterate through the verses
            for (var verseNumber = startVerse; verseNumber <= endVerse; verseNumber++) {
                verses.push(getVerse(bookName, chapterNumber, verseNumber));
            }
        }
    }

    return verses;
}

function resolveAbbreviation(abbreviation) {
    return abbreviations[abbreviation] || abbreviation;
}

module.exports = {
    getVerse,
    getChapter,
    getBook,
    getRange,
    getChapterCount,
    getVerseCount,
    getBibleBooks,
    resolveAbbreviation,
};