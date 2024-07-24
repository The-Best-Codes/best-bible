const bibleData = require(`./data/bible.json`);
const abbreviations = require(`./utils/abbreviations`);
const { isValidBook, isValidChapter, isValidVerse } = require(`./utils/validation`);

/**
 * Parses a verse string and returns either an array of word objects or a cleaned string.
 *
 * @param {string} verse - The verse string to parse.
 * @param {string} [outputType="default"] - The type of output. Can be "default", "string", or "indexed".
 * @return {Array|String} The parsed verse based on the output type.
 */
function parseVerse(verse, outputType = "default") {
    // Remove translation identifiers (text within square brackets)
    let cleanedVerse = verse.replace(/\[(.*?)\]/g, '$1');

    // Remove any '#' at the start of the verse
    cleanedVerse = cleanedVerse.replace(/^#\s*/, '');

    // Trim any extra whitespace
    cleanedVerse = cleanedVerse.trim();

    // Remove multiple spaces
    cleanedVerse = cleanedVerse.replace(/\s+/g, ' ');

    if (outputType === "default" || outputType === "string") {
        return cleanedVerse;
    } else if (outputType === "indexed") {
        // Split the cleaned verse into words
        const words = cleanedVerse.split(' ');

        // Create an array of word objects
        return words.map((word, index) => ({
            word: word,
            index: index
        }));
    } else {
        throw new Error("Invalid outputType. Use 'default' or 'indexed'.");
    }
}

/**
 * Retrieves a specific verse from the Bible data based on the provided book name, chapter number, and verse number.
 *
 * @param {string} bookName - The name of the book containing the verse.
 * @param {number} chapterNumber - The number of the chapter containing the verse.
 * @param {number} verseNumber - The number of the verse to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @param {boolean} [cleanVerse=true] - Whether to clean the verse before returning it.
 * @return {Array|string} The content of the requested verse based on the output type.
 */
function getVerse(bookName, chapterNumber, verseNumber, outputType = "default", cleanVerse = true) {
    if (!isValidVerse(bookName, chapterNumber, verseNumber)) {
        throw new Error('Invalid verse reference');
    }
    let content = bibleData[bookName][chapterNumber][verseNumber - 1];

    if (cleanVerse) {
        content = parseVerse(content, "string");
    }
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

/**
 * Retrieves information about a chapter from the Bible data.
 *
 * @param {string} bookName - The name of the book containing the chapter.
 * @param {number} chapterNumber - The number of the chapter to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @param {boolean} [cleanVerse=true] - Whether to clean the verse before returning it.
 * @return {Array|String} The information about the chapter based on the output type.
 */
function getChapter(bookName, chapterNumber, outputType = "default", cleanVerse = true) {
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
            content: cleanVerse ? parseVerse(content, "string") : content
        }));
    } else if (outputType === "string") {
        return verses.map((content, index) => `${bookName} ${chapterNumber}:${index + 1} - ${cleanVerse ? parseVerse(content, "string") : content}`).join("\n");
    } else {
        return verses;
    }
}

/**
 * Retrieves information about a book from the Bible data.
 *
 * @param {string} bookName - The name of the book to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @param {boolean} [cleanVerse=true] - Whether to clean the verse before returning it.
 * @return {Array|String|Object} The information about the book based on the output type.
 */
function getBook(bookName, outputType = "default", cleanVerse = true) {
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
                content: cleanVerse ? parseVerse(content, "string") : content
            }))
        );
    } else if (outputType === "string") {
        return Object.entries(chapters).map(([chapterNumber, verses]) =>
            verses.map((content, index) => `${bookName} ${chapterNumber}:${index + 1} - ${cleanVerse ? parseVerse(content, "string") : content}`).join("\n")
        ).join("\n\n");
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
 * @param {boolean} [cleanVerse=true] - Whether to clean the verse before returning it.
 * @throws {Error} Throws an error if the verse reference is invalid.
 * @return {Array|string} Returns an array of verses or a string of verses depending on the outputType.
 */
function getRange(startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber, outputType = "default", cleanVerse = true) {
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
                let content = getVerse(bookName, chapterNumber, verseNumber)[0];

                if (cleanVerse) {
                    content = parseVerse(content, "string");
                }
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


/**
* Searches for a query string in each verse of the Bible and returns the matching verses.
*
* @param {string} query - The query string to search for.
* @param {boolean} [caseSensitive=false] - Whether the search should be case sensitive.
* @param {boolean} [exactMatch=false] - Whether the search should match the exact phrase.
* @param {string} [outputType="indexed"] - The type of output format desired (indexed or string).
* @return {Array|string} The matching verses based on the output type.
*/
function searchVerse(query, caseSensitive = false, exactMatch = false, outputType = "indexed") {
    let searchResults = [];

    // Normalize query based on case sensitivity
    const normalizedQuery = caseSensitive ? query : query.toLowerCase();

    for (let book in bibleData) {
        for (let chapter in bibleData[book]) {
            for (let verse in bibleData[book][chapter]) {
                const verseContent = bibleData[book][chapter][verse];
                const normalizedContent = caseSensitive ? verseContent : verseContent.toLowerCase();

                // Check for exact match or substring match
                let matchCondition;
                if (exactMatch) {
                    const regex = new RegExp(`\\b${normalizedQuery}\\b`, caseSensitive ? '' : 'i');
                    matchCondition = regex.test(normalizedContent);
                } else {
                    matchCondition = normalizedContent.indexOf(normalizedQuery) !== -1;
                }

                if (matchCondition) {
                    searchResults.push({
                        key: `${book} ${chapter}:${verse}`,
                        book: book,
                        chapter: chapter,
                        verse: verse,
                        content: verseContent
                    });
                }
            }
        }
    }

    if (outputType === "string") {
        return searchResults.map(result => `${result.book} ${result.chapter}:${result.verse} - ${result.content}`).join("\n");
    } else if (outputType === "indexed") {
        return searchResults;
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


/**
 * Returns an object containing the number of books, chapters, and verses in the Bible.
 *
 * @return {Object} An object with the number of books, chapters, and verses in the Bible.
 */
function bibleStats() {
    return {
        books: Object.keys(bibleData).length,
        chapters: Object.values(bibleData).reduce((sum, book) => sum + Object.keys(book).length, 0),
        verses: Object.values(bibleData).reduce((sum, book) => sum + Object.values(book).reduce((sum, chapter) => sum + chapter.length, 0), 0),
    };
}

/**
 * Returns an object containing the three validation functions: `isValidBook`, `isValidChapter`, and `isValidVerse`.
 *
 * @return {Object} An object with the validation functions as properties.
 */
function validators() {
    return {
        isValidBook,
        isValidChapter,
        isValidVerse
    }
}

module.exports = {
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
    bibleValidation: {
        ...validators()
    }
};