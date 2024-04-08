export function getIndexLetter(index: number) {
  return String.fromCharCode(65 + (index % 26));
}
