/**
 * @module hash
 */

/**
 * MurmurHash2 non-cryptographic hash function - 32 bits, supports unicode
 *
 * #### Reference
 * * [wiki](https://en.wikipedia.org/wiki/MurmurHash)
 * * [home](https://sites.google.com/site/murmurhash/)
 * * [source](https://github.com/garycourt/murmurhash-js)
 *
 * @param v
 * @param prevRes
 */
export function murmur2_32(v: string = '', prevRes = 0): number {
  const CC = 0x5bd1e995;
  const str = unescape(encodeURIComponent(v));
  let len = str.length;
  let hash = prevRes ^ len;
  let idx = 0;

  while (len >= 4) {
    let k = getInt32(str, idx);
    k = (((k & 0xffff) * CC) + ((((k >>> 16) * CC) & 0xffff) << 16));
    k ^= k >>> 24;
    k = (((k & 0xffff) * CC) + ((((k >>> 16) * CC) & 0xffff) << 16));
    hash = (((hash & 0xffff) * CC) + ((((hash >>> 16) * CC) & 0xffff) << 16)) ^ k;
    len -= 4;
    idx += 4;
  }

  switch (len) {
    case 3: hash ^= (str.charCodeAt(idx + 2) & 0xff) << 16;
    case 2: hash ^= (str.charCodeAt(idx + 1) & 0xff) << 8;
    case 1: hash ^= (str.charCodeAt(idx) & 0xff);
      hash = (((hash & 0xffff) * CC) + ((((hash >>> 16) * CC) & 0xffff) << 16));
  }

  hash ^= hash >>> 13;
  hash = (((hash & 0xffff) * CC) + ((((hash >>> 16) * CC) & 0xffff) << 16));
  hash ^= hash >>> 15;

  return hash >>> 0;
}


/**
 * MurmurHash3 non-cryptographic hash function - 32 bits, supports unicode
 *
 * #### Reference
 * * [wiki](https://en.wikipedia.org/wiki/MurmurHash)
 * * [home](https://sites.google.com/site/murmurhash/)
 * * [source](https://github.com/garycourt/murmurhash-js)
 *
 * @param v
 * @param prevRes
 */
export function murmur3_32(v: string = '', prevRes = 0): number {
  const C1 = 0xcc9e2d51;
  const C2 = 0x1b873593;

  const CC1 = 0x85ebca6b;
  const CC2 = 0xc2b2ae35;

  const str = unescape(encodeURIComponent(v));
  let len = str.length;
  let remainder = len % 4;
  const bytes = len - remainder;
  let hash = prevRes;
  let idx = 0;
  let k1;

  while (idx < bytes) {
    k1 =  getInt32(str, idx);
    idx += 4;

    k1 = ((((k1 & 0xffff) * C1) + ((((k1 >>> 16) * C1) & 0xffff) << 16))) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((((k1 & 0xffff) * C2) + ((((k1 >>> 16) * C2) & 0xffff) << 16))) & 0xffffffff;

    hash ^= k1;
    hash = (hash << 13) | (hash >>> 19);
    let hashB = ((((hash & 0xffff) * 5) + ((((hash >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
    hash = (((hashB & 0xffff) + 0x6b64) + ((((hashB >>> 16) + 0xe654) & 0xffff) << 16));
  }

  k1 = 0;

  switch (remainder) {
    case 3: k1 ^= (str.charCodeAt(idx + 2) & 0xff) << 16;
    case 2: k1 ^= (str.charCodeAt(idx + 1) & 0xff) << 8;
    case 1: k1 ^= (str.charCodeAt(idx) & 0xff);

      k1 = (((k1 & 0xffff) * C1) + ((((k1 >>> 16) * C1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * C2) + ((((k1 >>> 16) * C2) & 0xffff) << 16)) & 0xffffffff;
      hash ^= k1;
  }

  hash ^= len;

  hash ^= hash >>> 16;
  hash = (((hash & 0xffff) * CC1) + ((((hash >>> 16) * CC1) & 0xffff) << 16)) & 0xffffffff;
  hash ^= hash >>> 13;
  hash = ((((hash & 0xffff) * CC2) + ((((hash >>> 16) * CC2) & 0xffff) << 16))) & 0xffffffff;
  hash ^= hash >>> 16;


  return hash >>> 0;
}

/**
 * @ignore
 * @param str
 * @param i
 */
function getInt32(str: string, i: number) {
  return ((str.charCodeAt(i) & 0xff)) |
  ((str.charCodeAt(i + 1) & 0xff) << 8) |
  ((str.charCodeAt(i + 2) & 0xff) << 16) |
  ((str.charCodeAt(i + 3) & 0xff) << 24);
}
