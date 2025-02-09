import * as BestBible from "./index";

// Define a type for the messages your extension will send
type Message =
  | {
      type: "bestbible.getVerse";
      bookName: string;
      chapterNumber: number;
      verseNumber: number;
      outputType?: "default" | "indexed" | "string";
    }
  | {
      type: "bestbible.getChapter";
      bookName: string;
      chapterNumber: number;
      outputType?: "default" | "indexed" | "string";
    }
  | {
      type: "bestbible.getBook";
      bookName: string;
      outputType?: "default" | "indexed" | "string";
    }
  | { type: "bestbible.getChapterCount"; bookName: string }
  | { type: "bestbible.getVerseCount"; bookName: string; chapterNumber: number }
  | { type: "bestbible.getBibleBooks" }
  | {
      type: "bestbible.getRange";
      startBookName: string;
      startChapterNumber: number;
      startVerseNumber: number;
      endBookName: string;
      endChapterNumber: number;
      endVerseNumber: number;
      outputType?: "default" | "indexed" | "string";
    }
  | {
      type: "bestbible.searchVerse";
      query: string;
      caseSensitive?: boolean;
      exactMatch?: boolean;
      outputType?: "indexed" | "string";
    }
  | { type: "bestbible.resolveAbbreviation"; abbreviation: string }
  | { type: "bestbible.bibleStats" }
  | { type: "bestbible.bibleValidation" };

// Listen for messages from the extension
chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse) => {
    try {
      switch (message.type) {
        case "bestbible.getVerse":
          sendResponse(
            BestBible.getVerse(
              message.bookName,
              message.chapterNumber,
              message.verseNumber,
              message.outputType,
            ),
          );
          break;
        case "bestbible.getChapter":
          sendResponse(
            BestBible.getChapter(
              message.bookName,
              message.chapterNumber,
              message.outputType,
            ),
          );
          break;
        case "bestbible.getBook":
          sendResponse(BestBible.getBook(message.bookName, message.outputType));
          break;
        case "bestbible.getChapterCount":
          sendResponse(BestBible.getChapterCount(message.bookName));
          break;
        case "bestbible.getVerseCount":
          sendResponse(
            BestBible.getVerseCount(message.bookName, message.chapterNumber),
          );
          break;
        case "bestbible.getBibleBooks":
          sendResponse(BestBible.getBibleBooks());
          break;
        case "bestbible.getRange":
          sendResponse(
            BestBible.getRange(
              message.startBookName,
              message.startChapterNumber,
              message.startVerseNumber,
              message.endBookName,
              message.endChapterNumber,
              message.endVerseNumber,
              message.outputType,
            ),
          );
          break;
        case "bestbible.searchVerse":
          sendResponse(
            BestBible.searchVerse(
              message.query,
              message.caseSensitive,
              message.exactMatch,
              message.outputType,
            ),
          );
          break;
        case "bestbible.resolveAbbreviation":
          sendResponse(BestBible.resolveAbbreviation(message.abbreviation));
          break;
        case "bestbible.bibleStats":
          sendResponse(BestBible.bibleStats());
          break;
        case "bestbible.bibleValidation":
          sendResponse(BestBible.bibleValidation());
          break;
        default:
          sendResponse({ error: "Unknown message type" });
      }
    } catch (error: any) {
      console.error("Error processing message:", error);
      sendResponse({ error: error.message });
    }

    return true;
  },
);
