import { expect, test, describe } from "bun:test";
import { getVerse, bibleStats, searchVerse } from "../src/index";

describe("Bible Verse Retrieval", () => {
  test("getVerse returns correct verse", () => {
    const verse = getVerse("John", 3, 25);
    expect(verse).toBeArray();
    expect(verse.length).toBe(1);
    expect(verse[0]).toBe(
      "Then there arose a question between some of John's disciples and the Jews about purifying."
    );
  });

  test("getVerse handles invalid input", () => {
    expect(() => getVerse("NonExistentBook", 999, 999)).toThrow(
      "Invalid verse reference"
    );
  });
});

describe("Bible Statistics", () => {
  test("bibleStats returns valid statistics", () => {
    const stats = bibleStats();
    expect(stats).toEqual({
      books: 66,
      chapters: 1189,
      verses: 31102,
    });
  });
});

describe("Bible Verse Search", () => {
  test("searchVerse finds exact match", () => {
    const results: any = searchVerse("Jesus wept");
    expect(results).toBeArray();
    expect(results.length).toBe(1);
    expect(results[0]).toEqual({
      key: "John 11:34",
      book: "John",
      chapter: "11",
      verse: "34",
      content: "Jesus wept.",
    });
  });

  test("searchVerse returns empty array for no matches", () => {
    const results: any = searchVerse("xyzabc123nonexistenttext");
    expect(results).toBeArray();
    expect(results.length).toBe(0);
  });

  test("searchVerse handles partial matches", () => {
    const results: any = searchVerse("Jesus");
    expect(results).toBeArray();
    expect(results.length).toBeGreaterThan(0);
    results.forEach((verse) => {
      expect(verse.content.toLowerCase()).toInclude("jesus");
    });
  });
});
