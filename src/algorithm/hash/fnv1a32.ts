/**
 * @module hash
 */

/**
 * FNV1a non-cryptographic hash function - 32 bit (MAX 2^32)
 *
 * #### Reference
 * * [fnv](http://www.isthe.com/chongo/tech/comp/fnv/)
 * * [wiki](https://en.wikipedia.org/wiki/Fowler–Noll–Vo_hash_function)
 *
 * @param v
 */
export function fnv1a32(v: string = '', prevRes = 0): number {
  const FNV_OFFSETS = 2166136261;
  let hash = prevRes || FNV_OFFSETS;
  for (let char of v) {
    const characterCode = char.codePointAt(0);
    if (characterCode > 0x7F) {
      const str = unescape(encodeURIComponent(char));
      for (let i = 0; i < str.length; i++) {
        const characterCode = str.charCodeAt(i);
        hash ^= characterCode;
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
      }
    } else {
      hash ^= characterCode;
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    hash = hash >>> 0;
  }
  return hash;
}
