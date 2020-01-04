/**
 * @module hash
 */

/**
 * Sum all characters bytes in string (MAX 2^32)
 * @param v
 */
export function sum32(v: string = '', prevRes = 0): number {
  let sum = typeof prevRes === 'number' && prevRes || 0;
  for (let char of v) {
    const characterCode = char.codePointAt(0);
    if (characterCode > 0x7F) {
      const str = unescape(encodeURIComponent(char));
      for (let i = 0; i < str.length; i++) {
        const characterCode = str.charCodeAt(i);
        sum += characterCode;
      }
    } else {
      sum += characterCode;
    }
    sum = sum >>> 0;
  }
  return sum;
}
