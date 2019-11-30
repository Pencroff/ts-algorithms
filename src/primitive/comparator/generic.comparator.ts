/**
 * Generic comparator
 * @param v1
 * @param v2
 * return {number}
 */
export function genericComparator<T>(v1: T, v2: T): number {
  let res;
  if (v1 === v2) {
      res = 0;
  }
  if (v1 < v2) {
      res = -1;
  }
  if (v1 > v2) {
      res = 1;
  }
  return res;
}
