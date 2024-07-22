# Best Bible
Fetch, parse, and analyze the Bible easily with JavaScript

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

Simple import each function you need to use in the curly braces `{}`, seperated by commas (`,`).


### Getting Bible Data

Best Bible provides several functions to retrieve Bible data:

- `getVerse(bookName, chapterNumber, verseNumber, outputType = "default")`: Retrieves a specific verse from the Bible.
- `getChapter(bookName, chapterNumber, outputType = "default")`: Retrieves a specific chapter from the Bible.
- `getBook(bookName, outputType = "default")`: Retrieves a specific book from the Bible.
- `getRange(startBookName, startChapterNumber, startVerseNumber, endBookName, endChapterNumber, endVerseNumber, outputType = "default")`: Retrieves a range of verses from the Bible.

The `outputType` parameter determines the format of the returned data:
- `"default"`: Returns an array of verse content (default).
- `"indexed"`: Returns an array of objects containing verse details (key, book, chapter, verse, and content).
- `"string"`: Returns a string representation of the verse(s) in the format `"Book Chapter:Verse - Content"`.

### Utility Functions

Best Bible also provides utility functions for querying Bible metadata:

- `getChapterCount(bookName)`: Retrieves the number of chapters in a specific book.
- `getVerseCount(bookName, chapterNumber)`: Retrieves the number of verses in a specific chapter of a book.
- `getBibleBooks()`: Retrieves an array of all the books in the Bible.
- `resolveAbbreviation(abbreviation)`: Resolves a book abbreviation to its full name.

### Example Usage

```javascript
const { getVerse, getChapter, getBook, getRange, getChapterCount, getVerseCount, getBibleBooks, resolveAbbreviation } = require('best-bible');

// Get a specific verse
const verse = getVerse('Genesis', 1, 1);
console.log(verse);

// Get a chapter
const chapter = getChapter('Psalms', 23, 'string');
console.log(chapter);

// Get a book
const book = getBook('John', 'indexed');
console.log(book);

// Get a range of verses
const range = getRange('Matthew', 5, 1, 'Matthew', 5, 10);
console.log(range);

// Get the number of chapters in a book
const chapterCount = getChapterCount('Revelation');
console.log(chapterCount);

// Get the number of verses in a chapter
const verseCount = getVerseCount('Genesis', 1);
console.log(verseCount);

// Get all the books in the Bible
const books = getBibleBooks();
console.log(books);

// Resolve a book abbreviation
const bookName = resolveAbbreviation('Gen');
console.log(bookName);
```

### The `outputType` parameter

The `outputType` parameter controls what format the Bible data is output as.

`"default"` will return each verse as an item in an array, for example:

```json
[
  "verse1",
  "verse2",
  "verse3"
]
```

`indexed` will return several JSON objects in an array, each verse with its metadata. See below:

----Finish this----

## Contributing

Contributions to Best Bible are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/The-Best-Codes/best-bible).

## License

Best Bible is open-source software licensed under the [GNU General Public License Version 3]([https://opensource.org/licenses/MIT](https://www.gnu.org/licenses/gpl-3.0.en.html)).
```
