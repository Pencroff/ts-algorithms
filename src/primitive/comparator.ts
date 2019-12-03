/**
 * Primitive module contain basic types used across algorithms and data structures
 * @module primitive
 */


/**
 * Comparator function expect two parameters with the same type
 * @typeparam T type of both input parameters
 * @return {number} represent comparison operation, check below
 *    + parameters equal - return zero
 *    + a less then b - return less then zero
 *    + a great then b - return great then zero
 */
export type ComparatorFn<T> = (a: T, b: T) => number;

/**
 * Generic comparator, working for primitive types
 * @param a
 * @param b
 * @return {number} - check [[ComparatorFn]]
 */
export function genericComparator<T>(a: T, b: T): number {
  let res;
  if (a === b) {
    res = 0;
  }
  if (a < b) {
    res = -1;
  }
  if (a > b) {
    res = 1;
  }
  return res;
}
