declare function isValidBook(bookName: string): Promise<boolean>;
declare function isValidChapter(bookName: string, chapterNumber: number): Promise<boolean>;
declare function isValidVerse(bookName: string, chapterNumber: number, verseNumber: number): Promise<boolean>;
export { isValidBook, isValidChapter, isValidVerse };
