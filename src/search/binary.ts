/**
 * @module search
 */


import { ComparatorFn, genericComparator } from '../primitive/comparator';

/**
 *
 * @typeparam collection of types T
 * @param v searching value
 * @param comparator check [[ComparatorFn]]
 * @return index of found element, -1 if not found
 */
export function binaryIndexOf<T>(collection: T[], v:T, comparator: ComparatorFn<T> = genericComparator): number {
  let res = -1;
  const len = collection.length;
  for (let idx = 0; idx < len; idx += 1) {
    if (comparator(collection[idx], v) === 0) {
      res = idx;
      break;
    }
  }
  return res;
}
