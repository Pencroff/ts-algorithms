
namespace primitive {

  /**
   * Comparator function expect two parameters with the same type
   * @return {number} represent comparison operation, check below
   *    + parameters equal - return zero
   *    + a less then b - return less then zero
   *    + a great then b - return great then zero
   */
  export type ComparatorFn<T> = (a: T, b: T) => number;

  /**
   * Generic comparator
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

}
