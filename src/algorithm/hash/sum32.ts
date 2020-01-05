/**
 * @module hash
 */

/**
 * Sum all characters bytes in string (MAX 2^32)
 * @param v
 */
export function sum32(v: string = '', prevRes = 0): number {
  let hash = typeof prevRes === 'number' && prevRes || 0;
  const str = unescape(encodeURIComponent(v));
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const code = str.charCodeAt(i);
    hash += code;
    hash = hash >>> 0;
  }
  return hash;
}
