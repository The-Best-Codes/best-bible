const { getVerse, bibleStats, searchVerse } = require('../dist/cjs/index');

const verse = getVerse('John', 3, 25);

console.log(verse);

console.log(getVerse('John', 3, 25, undefined, false));

console.log(bibleStats())

//console.log(searchVerse('Jesus'))