const { getVerse, bibleStats, searchVerse } = require('../src/index');

const verse = getVerse('John', 3, 25);

console.log(verse);

console.log(getVerse('John', 3, 25, undefined, false));

console.log(bibleStats())

//console.log(searchVerse('Jesus'))