const fs = require('fs').promises;
const path = require('path');

function cleanVerse(verse) {
    return verse
        .replace(/\[(.*?)\]/g, '$1')  // Remove translation identifiers
        .replace(/^#\s*/, '')         // Remove '#' at the start
        .trim()                       // Trim whitespace
        .replace(/\s+/g, ' ');        // Remove multiple spaces
}

function parseVerse(verse) {
    const parts = [];
    let currentText = '';
    const words = verse.split(' ');

    words.forEach(word => {
        if (word.startsWith('[') && word.endsWith(']')) {
            if (currentText) {
                parts.push({ text: currentText.trim(), type: 'normal' });
                currentText = '';
            }
            parts.push({ text: word.slice(1, -1), type: 'added' });
        } else {
            currentText += ' ' + word;
        }
    });

    if (currentText) {
        parts.push({ text: currentText.trim(), type: 'normal' });
    }

    return parts;
}

async function processBible(inputFile, cleanedOutput, parsedOutput) {
    try {
        const data = await fs.readFile(inputFile, 'utf8');
        const bible = JSON.parse(data);

        const cleanedBible = {};
        const parsedBible = {};

        for (const [book, chapters] of Object.entries(bible)) {
            cleanedBible[book] = {};
            parsedBible[book] = {};
            for (const [chapter, verses] of Object.entries(chapters)) {
                cleanedBible[book][chapter] = verses.map(cleanVerse);
                parsedBible[book][chapter] = verses.map((verse, index) => ({
                    [index + 1]: parseVerse(verse)
                }));
            }
        }

        await fs.writeFile(cleanedOutput, JSON.stringify(cleanedBible, null, 2));
        await fs.writeFile(parsedOutput, JSON.stringify(parsedBible, null, 2));

        console.log('Processing complete. Files created:');
        console.log(cleanedOutput);
        console.log(parsedOutput);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Run the process
const inputFile = path.join(__dirname, 'bible.json');
const cleanedOutput = path.join(__dirname, 'bible_cleaned.json');
const parsedOutput = path.join(__dirname, 'bible_parsed.json');

processBible(inputFile, cleanedOutput, parsedOutput);