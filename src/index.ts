import jsonBibleData from "./data/bible.json";
import BibleData from "./types/bible";
import abbreviations from "./utils/abbreviations";
import { isValidBook, isValidChapter, isValidVerse } from "./utils/validation";

// @ts-ignore
const bibleData: BibleData = jsonBibleData;

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
export function parseVerse(
  verse: string,
  outputType: "default" | "string" | "indexed" = "default",
): Array<Word> | string {
  let cleanedVerse = verse;

  if (outputType === "default" || outputType === "string") {
    return cleanedVerse;
  } else if (outputType === "indexed") {
    const words = cleanedVerse.split(" ");
    return words.map((word, index) => ({
      word: word,
      index: index,
    }));
  } else {
    throw new Error("Invalid outputType. Use 'default' or 'indexed'.");
  }
}

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
export function getVerse(
  bookName: string,
  chapterNumber: number,
  verseNumber: number,
  outputType: "default" | "indexed" | "string" = "default",
  /**
   * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
   */
  cleanVerse: boolean = true,
): Array<VerseResult> | string | string[] {
  if (!isValidVerse(bookName, chapterNumber, verseNumber)) {
    throw new Error("Invalid verse reference");
  }
  let content = bibleData[bookName][chapterNumber][verseNumber - 1];

  if (cleanVerse) {
    content = parseVerse(content, "string") as string;
  }

  if (outputType === "indexed") {
    return [
      {
        key: `${bookName} ${chapterNumber}:${verseNumber}`,
        book: bookName,
        chapter: chapterNumber.toString(),
        verse: verseNumber.toString(),
        content: content,
      },
    ];
  } else if (outputType === "string") {
    return `${bookName} ${chapterNumber}:${verseNumber} - ${content}`;
  } else {
    return [content];
  }
}

/**
 * Retrieves information about a chapter from the Bible data.
 *
 * @param bookName - The name of the book containing the chapter.
 * @param chapterNumber - The number of the chapter to retrieve.
 * @param outputType - The type of output format desired (indexed or string).
 * @param cleanVerse - Whether to clean the verse before returning it.
 * @return The information about the chapter based on the output type.
 */
export function getChapter(
  bookName: string,
  chapterNumber: number,
  outputType: "default" | "indexed" | "string" = "default",
  /**
   * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
   */
  cleanVerse: boolean = true,
): Array<VerseResult> | string | string[] {
  if (!isValidChapter(bookName, chapterNumber)) {
    throw new Error("Invalid chapter reference");
  }
  const verses = bibleData[bookName][chapterNumber] as string[];

  if (outputType === "indexed") {
    return verses.map((content: string, index: number) => ({
      key: `${bookName} ${chapterNumber}:${index + 1}`,
      book: bookName,
      chapter: chapterNumber.toString(),
      verse: (index + 1).toString(),
      content: cleanVerse ? (parseVerse(content, "string") as string) : content,
    }));
  } else if (outputType === "string") {
    return verses
      .map(
        (content: string, index: number) =>
          `${bookName} ${chapterNumber}:${index + 1} - ${
            cleanVerse ? (parseVerse(content, "string") as string) : content
          }`,
      )
      .join("\n");
  } else {
    return verses;
  }
}

/**
 * Retrieves information about a book from the Bible data.
 *
 * @param bookName - The name of the book to retrieve.
 * @param outputType - The type of output format desired (indexed or string).
 * @param cleanVerse - Whether to clean the verse before returning it.
 * @return The information about the book based on the output type.
 */
export function getBook(
  bookName: string,
  outputType: "default" | "indexed" | "string" = "default",
  /**
   * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
   */
  cleanVerse: boolean = true,
): Array<VerseResult> | string | { [key: string]: string[] } {
  if (!isValidBook(bookName)) {
    throw new Error("Invalid book name");
  }
  const chapters = bibleData[bookName] as { [key: string]: string[] };

  if (outputType === "indexed") {
    return Object.entries(chapters).flatMap(([chapterNumber, verses]) =>
      (verses as string[]).map((content: string, index: number) => ({
        key: `${bookName} ${chapterNumber}:${index + 1}`,
        book: bookName,
        chapter: chapterNumber,
        verse: (index + 1).toString(),
        content: cleanVerse
          ? (parseVerse(content, "string") as string)
          : content,
      })),
    );
  } else if (outputType === "string") {
    return Object.entries(chapters)
      .map(([chapterNumber, verses]) =>
        (verses as string[])
          .map(
            (content: string, index: number) =>
              `${bookName} ${chapterNumber}:${index + 1} - ${
                cleanVerse ? (parseVerse(content, "string") as string) : content
              }`,
          )
          .join("\n"),
      )
      .join("\n\n");
  } else {
    return chapters;
  }
}

/**
 * Retrieves the number of chapters in a specific book of the Bible.
 *
 * @param bookName - The name of the book.
 * @throws Throws an error if the book name is invalid.
 * @return The number of chapters in the specified book.
 */
export function getChapterCount(bookName: string): number {
  if (!isValidBook(bookName)) {
    throw new Error("Invalid book name");
  }
  return Object.keys(bibleData[bookName]).length;
}

/**
 * Retrieves the number of verses in a specific chapter of a book in the Bible.
 *
 * @param bookName - The name of the book.
 * @param chapterNumber - The number of the chapter.
 * @throws Throws an error if the chapter reference is invalid.
 * @return The number of verses in the specified chapter.
 */
export function getVerseCount(bookName: string, chapterNumber: number): number {
  if (!isValidChapter(bookName, chapterNumber)) {
    throw new Error("Invalid chapter reference");
  }
  return (bibleData[bookName][chapterNumber] as string[]).length;
}

/**
 * Retrieves the list of Bible books.
 *
 * @return An array containing the names of all the Bible books.
 */
export function getBibleBooks(): string[] {
  return Object.keys(bibleData);
}

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
export function getRange(
  startBookName: string,
  startChapterNumber: number,
  startVerseNumber: number,
  endBookName: string,
  endChapterNumber: number,
  endVerseNumber: number,
  outputType: "default" | "indexed" | "string" = "default",
  /**
   * @deprecated Use of `cleanVerse` will be removed in a future version. Verses are now always cleaned by default.
   */
  cleanVerse: boolean = true,
): Array<VerseResult> | string | string[] {
  if (
    !isValidVerse(startBookName, startChapterNumber, startVerseNumber) ||
    !isValidVerse(endBookName, endChapterNumber, endVerseNumber)
  ) {
    throw new Error("Invalid verse reference");
  }

  const verses: Array<VerseResult | string> = [];

  const startBookIndex = getBibleBooks().indexOf(startBookName);
  const endBookIndex = getBibleBooks().indexOf(endBookName);

  for (let bookIndex = startBookIndex; bookIndex <= endBookIndex; bookIndex++) {
    const bookName = getBibleBooks()[bookIndex];
    const startChapter = bookIndex === startBookIndex ? startChapterNumber : 1;
    const endChapter =
      bookIndex === endBookIndex ? endChapterNumber : getChapterCount(bookName);

    for (
      let chapterNumber = startChapter;
      chapterNumber <= endChapter;
      chapterNumber++
    ) {
      const startVerse =
        bookIndex === startBookIndex && chapterNumber === startChapterNumber
          ? startVerseNumber
          : 1;
      const endVerse =
        bookIndex === endBookIndex && chapterNumber === endChapterNumber
          ? endVerseNumber
          : getVerseCount(bookName, chapterNumber);

      for (
        let verseNumber = startVerse;
        verseNumber <= endVerse;
        verseNumber++
      ) {
        let content = getVerse(
          bookName,
          chapterNumber,
          verseNumber,
        )[0] as string;

        if (cleanVerse) {
          content = parseVerse(content, "string") as string;
        }

        if (outputType === "indexed") {
          verses.push({
            key: `${bookName} ${chapterNumber}:${verseNumber}`,
            book: bookName,
            chapter: chapterNumber.toString(),
            verse: verseNumber.toString(),
            content: content,
          });
        } else if (outputType === "string") {
          verses.push(
            `${bookName} ${chapterNumber}:${verseNumber} - ${content}`,
          );
        } else {
          verses.push(content);
        }
      }
    }
  }

  if (outputType === "string") {
    return verses.join("\n");
  } else {
    return verses as Array<VerseResult> | string[];
  }
}

/**
 * Searches for a query string in each verse of the Bible and returns the matching verses.
 *
 * @param query - The query string to search for.
 * @param caseSensitive - Whether the search should be case sensitive.
 * @param exactMatch - Whether the search should match the exact phrase.
 * @param outputType - The type of output format desired (indexed or string).
 * @return The matching verses based on the output type.
 */
export function searchVerse(
  query: string,
  caseSensitive: boolean = false,
  exactMatch: boolean = false,
  outputType: "indexed" | "string" = "indexed",
): Array<VerseResult> | string {
  const searchResults: Array<VerseResult> = [];
  const normalizedQuery = caseSensitive ? query : query.toLowerCase();

  for (const book in bibleData) {
    for (const chapter in bibleData[book]) {
      for (const verse in bibleData[book][chapter]) {
        const verseContent = bibleData[book][chapter][verse] as string;
        const normalizedContent = caseSensitive
          ? verseContent
          : verseContent.toLowerCase();

        let matchCondition;
        if (exactMatch) {
          const regex = new RegExp(
            `\\b${normalizedQuery}\\b`,
            caseSensitive ? "" : "i",
          );
          matchCondition = regex.test(normalizedContent);
        } else {
          matchCondition = normalizedContent.includes(normalizedQuery);
        }

        if (matchCondition) {
          searchResults.push({
            key: `${book} ${chapter}:${verse}`,
            book: book,
            chapter: chapter,
            verse: verse,
            content: verseContent,
          });
        }
      }
    }
  }

  if (outputType === "string") {
    return searchResults
      .map(
        (result) =>
          `${result.book} ${result.chapter}:${result.verse} - ${result.content}`,
      )
      .join("\n");
  } else {
    return searchResults;
  }
}

/**
 * Resolves an abbreviation to its full name.
 *
 * @param abbreviation - The abbreviation to resolve.
 * @return The full name corresponding to the abbreviation.
 */
export function resolveAbbreviation(abbreviation: string): string {
  return abbreviations[abbreviation] || abbreviation;
}

/**
 * Returns an object containing the number of books, chapters, and verses in the Bible.
 *
 * @return An object with the number of books, chapters, and verses in the Bible.
 */
export function bibleStats(): {
  books: number;
  chapters: number;
  verses: number;
} {
  return {
    books: Object.keys(bibleData).length,
    chapters: Object.values(bibleData).reduce(
      (sum: number, book: any) => sum + Object.keys(book).length,
      0,
    ),
    verses: Object.values(bibleData).reduce(
      (sum: number, book: any) =>
        sum +
        Object.values(book).reduce(
          (sum: number, chapter: any) => sum + chapter.length,
          0,
        ),
      0,
    ),
  };
}

/**
 * Returns an object containing the three validation functions: `isValidBook`, `isValidChapter`, and `isValidVerse`.
 *
 * @return An object with the validation functions as properties.
 */
export function bibleValidation(): {
  isValidBook: (bookName: string) => boolean;
  isValidChapter: (bookName: string, chapterNumber: number) => boolean;
  isValidVerse: (
    bookName: string,
    chapterNumber: number,
    verseNumber: number,
  ) => boolean;
} {
  return {
    isValidBook,
    isValidChapter,
    isValidVerse,
  };
}
