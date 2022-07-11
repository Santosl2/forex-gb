export function manifyText(text: string, start: number, end: number) {
  if (text.length > 15) {
    return `...${text.substring(text.length - 9)}`;
  }
  return text;
}
