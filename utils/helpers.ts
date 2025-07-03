/**
 * Returns an array of unique random integers in the range [0, max)
 * @param count Number of unique indices to generate
 * @param max Exclusive upper limit of the range
 */
export function getUniqueRandomIndices(count: number, max: number): number[] {
  if (count > max) {
    throw new Error(
      `Cannot generate ${count} unique indices from a maximum of ${max} items.`
    );
  }

  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }

  return Array.from(indices);
}

export function convertCurrencyToNumber(text: string): number {
  return Number(text.replace(/[^0-9.]/g, "")); // => 123.45
}
