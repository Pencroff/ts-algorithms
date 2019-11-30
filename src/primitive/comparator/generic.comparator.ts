/**
 * Created by Pencroff on 30-Nov-2019.
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
