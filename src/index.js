const bibleData = require(`./data/bible.json`);
const abbreviations = require(`./utils/abbreviations`);
const { isValidBook, isValidChapter, isValidVerse } = require(`./utils/validation`);

function getVerse(bookName, chapterNumber, verseNumber, outputType = "default") {
    if (!isValidVerse(bookName, chapterNumber, verseNumber)) {
        throw new Error('Invalid verse reference');
    }
    const content = bibleData[bookName][chapterNumber][verseNumber - 1];
    if (outputType === "indexed") {
        return [{
            key: `${bookName} ${chapterNumber}:${verseNumber}`,
            book: bookName,
            chapter: chapterNumber.toString(),
            verse: verseNumber.toString(),
            content: content
        }];
    } else if (outputType === "string") {
        return `${bookName} ${chapterNumber}:${verseNumber} - ${content}`;
    } else {
        return [content];
    }
}

function getChapter(bookName, chapterNumber, outputType = "default") {
    if (!isValidChapter(bookName, chapterNumber)) {
        throw new Error('Invalid chapter reference');
    }
    const verses = bibleData[bookName][chapterNumber];
    if (outputType === "indexed") {
        return verses.map((content, index) => ({
            key: `${bookName} ${chapterNumber}:${index + 1}`,
            book: bookName,
            chapter: chapterNumber.toString(),
            verse: (index + 1).toString(),
            content: content
        }));
    } else if (outputType === "string") {
        return verses.map((content, index) => `${bookName} ${chapterNumber}:${index + 1} - ${content}`).join("\n");
    } else {
        return verses;
    }
}

function getBook(bookName, outputType = "default") {
    if (!isValidBook(bookName)) {
        throw new Error('Invalid book name');
    }
    const chapters = bibleData[bookName];
    if (outputType === "indexed") {
        return Object.entries(chapters).flatMap(([chapterNumber, verses]) =>
            verses.map((content, index) => ({
                key: `${bookName} ${chapterNumber}:${index + 1}`,
                book: bookName,
                chapter: chapterNumber,
                verse: (index + 1).toString(),
                content: content
            }))
        );
    } else if (outputType === "string") {
        return Object.entries(chapters).map(([chapterNumber, verses]) =>
            verses.map((content, index) => `${bookName} ${chapterNumber}:${index + 1} - ${content}`).join("\n")
        ).join("\n\n");
    } else {
        return chapters;
    }
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

function getRange(startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber, outputType = "default") {
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
                const content = getVerse(bookName, chapterNumber, verseNumber)[0];
                if (outputType === "indexed") {
                    verses.push({
                        key: `${bookName} ${chapterNumber}:${verseNumber}`,
                        book: bookName,
                        chapter: chapterNumber.toString(),
                        verse: verseNumber.toString(),
                        content: content
                    });
                } else if (outputType === "string") {
                    verses.push(`${bookName} ${chapterNumber}:${verseNumber} - ${content}`);
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