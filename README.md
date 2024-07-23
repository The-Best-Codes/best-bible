# Best Bible

[![npm version](https://img.shields.io/npm/v/best-bible.svg)](https://www.npmjs.com/package/best-bible)
[![npm downloads](https://img.shields.io/npm/dm/best-bible.svg)](https://www.npmjs.com/package/best-bible)
[![npm license](https://img.shields.io/npm/l/best-bible.svg)](https://www.npmjs.com/package/best-bible)

<img src="https://github.com/The-Best-Codes/best-bible/blob/main/.image/best-bible-js-logo.png?raw=true" alt="Best Bible Logo" for="cover" style="border-radius: 20px">

_Fetch, parse, and analyze the Bible easily with JavaScript_

Best Bible is a powerful and easy-to-use Node.js package that provides a simple way to access and retrieve Bible verses, chapters, and books. It offers a comprehensive set of functions to fetch Bible data in various formats, making it convenient for developers to integrate Bible functionality into their applications.

## Installation

To install Best Bible, use npm:

```bash
npm install best-bible
```

## Usage

First, require the `best-bible` package in your Node.js application:

```javascript
const { (functions) } = require('best-bible');
```

Simply import each function you need to use in the curly braces `{}`, seperated by commas (`,`).

### Getting Bible Data

Best Bible provides several functions to retrieve Bible data:

- `getVerse(bookName, chapterNumber, verseNumber, outputType = "default")`: Retrieves a specific verse from the Bible.
- `getChapter(bookName, chapterNumber, outputType = "default")`: Retrieves a specific chapter from the Bible.
- `getBook(bookName, outputType = "default")`: Retrieves a specific book from the Bible.
- `getRange(startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber, outputType = "default")`: Retrieves a range of verses from the Bible.

### Utility Functions

Best Bible also provides utility functions for querying Bible metadata:

- `getChapterCount(bookName)`: Retrieves the number of chapters in a specific book.
- `getVerseCount(bookName, chapterNumber)`: Retrieves the number of verses in a specific chapter of a book.
- `getBibleBooks()`: Retrieves an array of all the books in the Bible.
- `resolveAbbreviation(abbreviation)`: Resolves a book abbreviation to its full name.

### Validation Utility Functions

Best Bible also provides utility functions for validating Bible data such as verse, chapter, and book names or indices.

To use these functions, you need to import the `bibleValidation` function group:

```javascript
const { bibleValidation } = require("best-bible");
```

The `bibleValidation` function group provides these functions:

- `isValidVerse(bookName, chapterNumber, verseNumber)`: returns true if the verse exists in the Bible.
- `isValidChapter(bookName, chapterNumber)`: returns true if the chapter exists in the Bible.
- `isValidBook(bookName)`: returns true if the book exists in the Bible.

### Example Usage

```javascript
const {
  getVerse,
  getChapter,
  getBook,
  getRange,
  getChapterCount,
  getVerseCount,
  getBibleBooks,
  resolveAbbreviation,
} = require("best-bible");

// Get a specific verse
const verse = getVerse("Genesis", 1, 1);
console.log(verse);

// Get a chapter
const chapter = getChapter("Psalms", 23, "string");
console.log(chapter);

// Get a book
const book = getBook("John", "indexed");
console.log(book);

// Get a range of verses
const range = getRange("Matthew", 5, 1, "Matthew", 5, 10);
console.log(range);

// Get the number of chapters in a book
const chapterCount = getChapterCount("Revelation");
console.log(chapterCount);

// Get the number of verses in a chapter
const verseCount = getVerseCount("Genesis", 1);
console.log(verseCount);

// Get all the books in the Bible
const books = getBibleBooks();
console.log(books);

// Resolve a book abbreviation
const bookName = resolveAbbreviation("Gen");
console.log(bookName);
```

<details>
<summary>
The `outputType` parameter determines the format of the returned data:

- `"default"`: Returns an array of verse content (default).
- `"indexed"`: Returns an array of objects containing verse details (key, book, chapter, verse, and content).
- `"string"`: Returns a string representation of the verse(s) in the format `"Book Chapter:Verse - Content"`.
</summary>

`default` will return each verse as an item in an array, for example:

```json
["verse1", "verse2", "verse3"]
```

`indexed` will return several JSON objects in an array, each verse with its metadata. See below:

```json
[
  {
    "key": "Genesis 1:1",
    "book": "Genesis",
    "chapter": 1,
    "verse": 1,
    "content": "In the beginning, God created the heavens and the earth."
  }
]
```

`string` will return each verse as a string, for example:

```yml
"Book Chapter:Verse - Content"
```

</details>

### Data Input

When calling any function which requires a book name, use a book name from the following list:

<details>
<summary>Click to view</summary>

```json
[
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "SongOfSolomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation"
]
```

</details>

When calling any function which requires a chapter or verse, use a positive integer. You will never need to use a chapter number larger than 150, or a verse number larger than 176.[^1] [^2]

## Contributing

Contributions to Best Bible are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/The-Best-Codes/best-bible).

## License

Best Bible is open-source software licensed under the [GNU General Public License Version 3](https://www.gnu.org/licenses/gpl-3.0.en.html).

---

_Footnotes_

[^1]: [Psalms 150 - KJV](https://www.biblegateway.com/passage/?search=Psalms+150&version=KJV)
[^2]: [Psalms 119 - KJV](https://www.biblegateway.com/passage/?search=Psalms+119&version=KJV)
