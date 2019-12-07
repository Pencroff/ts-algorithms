/**
 * @module search
 */


import { ComparatorFn, genericComparator } from '../../primitive/comparator';
/**
 * ## Linear Search
 * In computer science, linear search or sequential search is a
 * method for finding a target value within a list. It sequentially
 * checks each element of the list for the target value until a
 * match is found or until all the elements have been searched.
 * Linear search runs in at worst linear time and makes at most `n`
 * comparisons, where `n` is the length of the list.
 *
 *  ![Linear Search](https://www.tutorialspoint.com/data_structures_algorithms/images/linear_search.gif)
 *
 * ### Complexity
 *
 * **Time Complexity**: `O(n)` - since in worst case we're checking each element
 * exactly once.
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
