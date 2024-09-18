export function shortentext(text: string, wordsLimit: number) {
  const words = text.split(' ');
  if (words.length > wordsLimit) {
    return words.slice(0, wordsLimit).join(' ') + '...';
  }
  return text;
}