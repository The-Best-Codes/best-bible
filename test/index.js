const { getVerse, bibleStats } = require('../src/index');

const verse = getVerse('Genesis', 1, 1);

console.log(verse);

console.log(bibleStats())