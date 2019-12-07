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
 *
 *  source: www.mathwarehouse.com
 *
 * ### Complexity
 *
 * * Worst-case performance	- `O(log n)`
 * * Best-case performance - `O(1)`
 * * Average performance - `O(log n)`
 * * Worst-case space complexity - `O(1)`
 *
 * ### Reference
 *
 * * [Binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm)
 *
 * @typeparam collection of types T
 * @param v searching value
 * @param [comparator] check [[ComparatorFn]], by default used [[genericComparator]]
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
