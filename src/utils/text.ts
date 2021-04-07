export const splitLongTextIntoParagraphs = (text: string, sentencesPerParagraph: number = 4) => {
  // eslint-disable-next-line no-useless-escape
  const sentenceRegex = /[^\.!\?]+[\.!\?]+/g;
  // Forgive me... but Wikipedia's summary's come back in a weird format.
  const sentences: string[] =
    text
      .replaceAll('U.S.', 'US')
      .replaceAll('D.C', 'DC')
      .replaceAll('\n', '')
      .replace('            ', '')
      .replace('            ', '')
      .replace('            ', '')
      .match(sentenceRegex) || [];

  let myArray = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    myArray.push(sentences.slice(i, i + sentencesPerParagraph));
  }

  return myArray;
};
