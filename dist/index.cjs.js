const basePath = process.env.NODE_ENV === 'production' ? '../src' : '.';
const bibleData = require(`${basePath}/data/bible.json`);
const abbreviations = require(`${basePath}/utils/abbreviations`);
const { isValidBook, isValidChapter, isValidVerse } = require(`${basePath}/utils/validation`);

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
    getVerse,
    getChapter,
    getBook,
    resolveAbbreviation,
};