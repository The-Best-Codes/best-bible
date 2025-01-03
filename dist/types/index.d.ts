interface Word {
    word: string;
    index: number;
}
interface VerseResult {
    key: string;
    book: string;
    chapter: string;
    verse: string;
    content: string;
}
/**
 * Parses a verse string and returns either an array of word objects or a cleaned string.
 *
 * @param verse - The verse string to parse.
 * @param outputType - The type of output. Can be "default", "string", or "indexed".
 * @return The parsed verse based on the output type.
 * @deprecated The bible.json file no longer has translation markers, so this function is not needed.
 */
export declare function parseVerse(verse: string, outputType?: "default" | "string" | "indexed"): Array<Word> | string;
/**
 * Retrieves a specific verse from the Bible data based on the provided book name, chapter number, and verse number.
 *
 * @param bookName - The name of the book containing the verse.
 * @param chapterNumber - The number of the chapter containing the verse.
 * @param verseNumber - The number of the verse to retrieve.
 * @param outputType - The type of output format desired (indexed or string).
 * @param cleanVerse - Whether to clean the verse before returning it.
 * @return The content of the requested verse based on the output type.
 */
export declare function getVerse(bookName: string, chapterNumber: number, verseNumber: number, outputType?: "default" | "indexed" | "string", 
/**
 * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
 */
cleanVerse?: boolean): Array<VerseResult> | string | string[];
/**
 * Retrieves information about a chapter from the Bible data.
 *
 * @param bookName - The name of the book containing the chapter.
 * @param chapterNumber - The number of the chapter to retrieve.
 * @param outputType - The type of output format desired (indexed or string).
 * @param cleanVerse - Whether to clean the verse before returning it.
 * @return The information about the chapter based on the output type.
 */
export declare function getChapter(bookName: string, chapterNumber: number, outputType?: "default" | "indexed" | "string", 
/**
 * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
 */
cleanVerse?: boolean): Array<VerseResult> | string | string[];
/**
 * Retrieves information about a book from the Bible data.
 *
 * @param bookName - The name of the book to retrieve.
 * @param outputType - The type of output format desired (indexed or string).
 * @param cleanVerse - Whether to clean the verse before returning it.
 * @return The information about the book based on the output type.
 */
export declare function getBook(bookName: string, outputType?: "default" | "indexed" | "string", 
/**
 * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
 */
cleanVerse?: boolean): Array<VerseResult> | string | {
    [key: string]: string[];
};
/**
 * Retrieves the number of chapters in a specific book of the Bible.
 *
 * @param bookName - The name of the book.
 * @throws Throws an error if the book name is invalid.
 * @return The number of chapters in the specified book.
 */
export declare function getChapterCount(bookName: string): number;
/**
 * Retrieves the number of verses in a specific chapter of a book in the Bible.
 *
 * @param bookName - The name of the book.
 * @param chapterNumber - The number of the chapter.
 * @throws Throws an error if the chapter reference is invalid.
 * @return The number of verses in the specified chapter.
 */
export declare function getVerseCount(bookName: string, chapterNumber: number): number;
/**
 * Retrieves the list of Bible books.
 *
 * @return An array containing the names of all the Bible books.
 */
export declare function getBibleBooks(): string[];
/**
 * Retrieves a range of verses from the Bible based on the provided start and end references.
 *
 * @param startBookName - The name of the starting book.
 * @param startChapterNumber - The number of the starting chapter.
 * @param startVerseNumber - The number of the starting verse.
 * @param endBookName - The name of the ending book.
 * @param endChapterNumber - The number of the ending chapter.
 * @param endVerseNumber - The number of the ending verse.
 * @param outputType - The type of output. Can be "indexed", "string", or "default".
 * @param cleanVerse - Whether to clean the verse before returning it.
 * @throws Throws an error if the verse reference is invalid.
 * @return Returns an array of verses or a string of verses depending on the outputType.
 */
export declare function getRange(startBookName: string, startChapterNumber: number, startVerseNumber: number, endBookName: string, endChapterNumber: number, endVerseNumber: number, outputType?: "default" | "indexed" | "string", 
/**
 * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
 */
cleanVerse?: boolean): Array<VerseResult> | string | string[];
/**
 * Searches for a query string in each verse of the Bible and returns the matching verses.
 *
 * @param query - The query string to search for.
 * @param caseSensitive - Whether the search should be case sensitive.
 * @param exactMatch - Whether the search should match the exact phrase.
 * @param outputType - The type of output format desired (indexed or string).
 * @return The matching verses based on the output type.
 */
export declare function searchVerse(query: string, caseSensitive?: boolean, exactMatch?: boolean, outputType?: "indexed" | "string"): Array<VerseResult> | string;
/**
 * Resolves an abbreviation to its full name.
 *
 * @param abbreviation - The abbreviation to resolve.
 * @return The full name corresponding to the abbreviation.
 */
export declare function resolveAbbreviation(abbreviation: string): string;
/**
 * Returns an object containing the number of books, chapters, and verses in the Bible.
 *
 * @return An object with the number of books, chapters, and verses in the Bible.
 */
export declare function bibleStats(): {
    books: number;
    chapters: number;
    verses: number;
};
/**
 * Returns an object containing the three validation functions: `isValidBook`, `isValidChapter`, and `isValidVerse`.
 *
 * @return An object with the validation functions as properties.
 */
export declare function bibleValidation(): {
    isValidBook: (bookName: string) => boolean;
    isValidChapter: (bookName: string, chapterNumber: number) => boolean;
    isValidVerse: (bookName: string, chapterNumber: number, verseNumber: number) => boolean;
};
export {};
