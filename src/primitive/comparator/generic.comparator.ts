
namespace Comparator {
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
