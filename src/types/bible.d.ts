interface BibleData {
  [bookName: string]: {
    [chapterNumber: string]: string[];
  };
}
export default BibleData;
