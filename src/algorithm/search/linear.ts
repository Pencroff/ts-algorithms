/**
 * @module search
 */


import { ComparatorFn, genericComparator } from '../../primitive/comparator';
/**
 * ## Linear Search
 * A linear search sequentially checks each element of the list until it finds an element that matches the target value.
 * If the algorithm reaches the end of the list, the search terminates unsuccessfully.
 *
 *  ![Linear Search](https://www.tutorialspoint.com/data_structures_algorithms/images/linear_search.gif)
 *  source: www.tutorialspoint.com
 *
 * ### Complexity
 *
 * * Worst-case performance	- `O(n)`
 * * Best-case performance - `O(1)`
 * * Average performance - `O(n)`
 * * Worst-case space complexity - `O(1) iterative`
 *
 * ### Reference
 *
 * * [Linear Search](https://en.wikipedia.org/wiki/Linear_search)
 *
 * @typeparam collection of types T
 * @param v searching value
 * @param [comparator] check [[ComparatorFn]], by default used [[genericComparator]]
 * @return index of found element, -1 if not found
 */
export function linearIndexOf<T>(collection: T[], v:T, comparator: ComparatorFn<T> = genericComparator): number {
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
