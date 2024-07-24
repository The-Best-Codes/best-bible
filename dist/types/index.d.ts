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
export function getVerse(bookName: string, chapterNumber: number, verseNumber: number, outputType?: string | undefined, cleanVerse?: boolean | undefined): any[] | string;
/**
 * Retrieves information about a chapter from the Bible data.
 *
 * @param {string} bookName - The name of the book containing the chapter.
 * @param {number} chapterNumber - The number of the chapter to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @param {boolean} [cleanVerse=true] - Whether to clean the verse before returning it.
 * @return {Array|String} The information about the chapter based on the output type.
 */
export function getChapter(bookName: string, chapterNumber: number, outputType?: string | undefined, cleanVerse?: boolean | undefined): any[] | string;
/**
 * Retrieves information about a book from the Bible data.
 *
 * @param {string} bookName - The name of the book to retrieve.
 * @param {string} [outputType="default"] - The type of output format desired (indexed or string).
 * @param {boolean} [cleanVerse=true] - Whether to clean the verse before returning it.
 * @return {Array|String|Object} The information about the book based on the output type.
 */
export function getBook(bookName: string, outputType?: string | undefined, cleanVerse?: boolean | undefined): any[] | string | Object;
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
export function getRange(startBookName: string, startChapterNumber: number, startVerseNumber: number, endBookName: string, endChapterNumber: number, endVerseNumber: number, outputType?: string | undefined, cleanVerse?: boolean | undefined): any[] | string;
/**
 * Retrieves the number of chapters in a specific book of the Bible.
 *
 * @param {string} bookName - The name of the book.
 * @throws {Error} Throws an error if the book name is invalid.
 * @return {number} The number of chapters in the specified book.
 */
export function getChapterCount(bookName: string): number;
/**
 * Retrieves the number of verses in a specific chapter of a book in the Bible.
 *
 * @param {string} bookName - The name of the book.
 * @param {number} chapterNumber - The number of the chapter.
 * @throws {Error} Throws an error if the chapter reference is invalid.
 * @return {number} The number of verses in the specified chapter.
 */
export function getVerseCount(bookName: string, chapterNumber: number): number;
/**
 * Retrieves the list of Bible books.
 *
 * @return {Array} An array containing the names of all the Bible books.
 */
export function getBibleBooks(): any[];
/**
* Searches for a query string in each verse of the Bible and returns the matching verses.
*
* @param {string} query - The query string to search for.
* @param {boolean} [caseSensitive=false] - Whether the search should be case sensitive.
* @param {boolean} [exactMatch=false] - Whether the search should match the exact phrase.
* @param {string} [outputType="indexed"] - The type of output format desired (indexed or string).
* @return {Array|string} The matching verses based on the output type.
*/
export function searchVerse(query: string, caseSensitive?: boolean | undefined, exactMatch?: boolean | undefined, outputType?: string | undefined): any[] | string;
/**
 * Parses a verse string and returns either an array of word objects or a cleaned string.
 *
 * @param {string} verse - The verse string to parse.
 * @param {string} [outputType="default"] - The type of output. Can be "default", "string", or "indexed".
 * @return {Array|String} The parsed verse based on the output type.
 */
export function parseVerse(verse: string, outputType?: string | undefined): any[] | string;
/**
 * Resolves an abbreviation to its full name.
 *
 * @param {string} abbreviation - The abbreviation to resolve.
 * @return {string} The full name corresponding to the abbreviation.
 */
export function resolveAbbreviation(abbreviation: string): string;
/**
 * Returns an object containing the number of books, chapters, and verses in the Bible.
 *
 * @return {Object} An object with the number of books, chapters, and verses in the Bible.
 */
export function bibleStats(): Object;
export declare let bibleValidation: {
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: PropertyKey): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: PropertyKey): boolean;
};
