/**
 * @module hash
 */

/**
 * Sum all characters codes in string (MAX 2^32)
 * @param v
 */
export function sum32(v: string = ''): number {
  let sum = 0;
  const LIMIT = 2**32;
  for (let char of v) {
    sum += char.codePointAt(0);
    sum %= LIMIT;
  }
  return sum;
}
