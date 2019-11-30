/**
 * Created by Pencroff on 30-Nov-2019.
 */

/**
 * Comparator function expect two parameters with the same type
 * return {number}
 *    - 0 - parameters equal
 *    - < 0 - v1 less then v2
 *    - > 0 - v1 great then v2
 */
export type ComparatorFn<T> = (v1: T, v2: T) => number;
