declare module "best-bible" {
  export function getVerse(
    bookName: string,
    chapterNumber: number,
    verseNumber: number,
    outputType?: string
  ): string;
  export function getVerseCount(
    bookName: string,
    chapterNumber: number
  ): number;
  export function getChapter(
    bookName: string,
    chapterNumber: number,
    outputType?: string
  ): string;
  export function getChapterCount(bookName: string): number;
  export function getBook(bookName: string, outputType?: string): string;
  export function getBookCount(): number;
  export function bibleStats(): {
    books: number;
    chapters: number;
    verses: number;
  };
}
