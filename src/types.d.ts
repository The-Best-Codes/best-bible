declare module "best-bible" {
  export function getVerse(
    book: string,
    chapter: number,
    verse: number
  ): string;
  export function getChapter(book: string, chapter: number): string;
  export function getBook(book: string): string;
  export function getRange(
    startBook: string,
    startChapter: number,
    startVerse: number,
    endBook: string,
    endChapter: number,
    endVerse: number
  ): string;
  export function getChapterCount(book: string): number;
  export function getVerseCount(book: string, chapter: number): number;
  export function getBibleBooks(): string[];
  export function resolveAbbreviation(abbreviation: string): string;
  export function bibleStats(): string;
}
