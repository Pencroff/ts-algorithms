/**
 * @module search
 */

import { ComparatorFn, genericComparator } from '../../primitive/comparator';

/**
 * ## Binary search
 * Binary search works on sorted arrays. Binary search begins by comparing an element in the middle of the array
 * with the target value. If the target value matches the element, its position in the array is returned. If the
 * target value is less than the element, the search continues in the lower half of the array. If the target value
 * is greater than the element, the search continues in the upper half of the array. By doing this, the algorithm
 * eliminates the half in which the target value cannot lie in each iteration.
 *
 *  ![Binary search](https://www.mathwarehouse.com/programming/images/binary-vs-linear-search/binary-and-linear-search-animations.gif)
 *  source: www.mathwarehouse.com
 *
 * ### Complexity
 *
 * | Case | BigO |
 * | - | - |
 * | Worst-case performance	| `O(log n)` |
 * | Best-case performance | `O(1)` |
 * | Average performance | `O(log n)` |
 * | Worst-case space complexity | `O(1)` |
 *
 * ### Reference
 *
 * * [Binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm)
 *
 * ```typescript
 * import { binaryIndexOf } from '@pencroff/ts-algorithms/dist/search/binary';
 * const res = binaryIndexOf([3, 5, 8], 8); // 2
 * ```
 *
 * @typeparam collection of types T
 * @param v searching value
 * @param [comparator] check [[ComparatorFn]], by default used [[genericComparator]]
 * @return index of found element, -1 if not found
 */
export function binaryIndexOf<T>(collection: T[], v:T, comparator: ComparatorFn<T> = genericComparator): number {
  const len = collection.length;
  let first = 0;
  let last = len - 1;
  let mid = (first + last) >> 1;
  let item;
  if (len === 0 || collection[first] > v || collection[last] < v) {
    return -1;
  }
  while (first - last) {
    item = collection[mid];
    if (v === item) {
      return mid;
    } else if (v < item) {
      last = mid;
    } else {
      first = mid + 1;
    }
    mid = (first + last) >> 1;
  }
  if (collection[last] !== v) {
    return -1;
  }
  return last;
}
