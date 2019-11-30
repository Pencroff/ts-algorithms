
namespace Comparator {
  /**
   * Comparator function expect two parameters with the same type
   * @return {number}
   *    parameters equal - return zero
   *    a less then b - return less then zero
   *    a great then b - return great then zero
   */
  export type ComparatorFn<T> = (a: T, b: T) => number;
}

