/**
 * Checks if the provided book name is a valid entry in the bibleData.
 *
 * @param {string} bookName - The name of the book to check.
 * @return {boolean} Indicates whether the book name is valid.
 */
declare function isValidBook(bookName: string): boolean;
/**
 * Checks if the given chapter number is valid for the specified book.
 *
 * @param {string} bookName - The name of the book.
 * @param {number} chapterNumber - The number of the chapter.
 * @return {boolean} Returns true if the chapter number is valid, false otherwise.
 */
declare function isValidChapter(bookName: string, chapterNumber: number): any;
/**
 * Checks if the given verse number is valid for the specified book and chapter.
 *
 * @param {string} bookName - The name of the book.
 * @param {number} chapterNumber - The number of the chapter.
 * @param {number} verseNumber - The number of the verse.
 * @return {boolean} Returns true if the verse number is valid, false otherwise.
 */
declare function isValidVerse(bookName: string, chapterNumber: number, verseNumber: number): boolean;
export { isValidBook, isValidChapter, isValidVerse };
