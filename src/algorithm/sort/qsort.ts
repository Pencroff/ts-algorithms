/**
 * @module sort
 */

import { ComparatorFn, genericComparator } from '../../primitive/comparator';
import { swap } from '../../primitive/swap';

/**
 * ## Quicksort (unstable, in-place implementation)
 * Quicksort is a divide and conquer algorithm. Quicksort first divides a large array into two
 * smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.
 *
 * ![Quicksort](https://upload.wikimedia.org/wikipedia/commons/f/fe/Quicksort.gif)
 *  source: commons.wikimedia.org
 *
 * ### Complexity
 *
 * | Case | BigO |
 * | - | - |
 * | Worst-case performance	| `O(n^2)` |
 * | Best-case performance | `O(n log n) (simple partition) or O(n) (three-way partition and equal keys)` |
 * | Average performance | `O(n log n)` |
 * | Worst-case space complexity | `O(n) auxiliary (naive) O(log n) auxiliary` |
 *
 * ### Reference
 *
 * * [Quicksort](https://en.wikipedia.org/wiki/Quicksort)
 *
 * ```typescript
 * import { qSort } from '@pencroff/ts-algorithms/dist/algorithm/sort/qsort';
 * qSort([11, 5, 8]), // [5, 8, 11]
 * ```
 *
 * @param collection sorting data
 * @param [comparator] comparator used for search, default [[genericComparator]]
 */
export function qSort<T>(collection: T[], comparator: ComparatorFn<T> = genericComparator) {
  singleSort(collection, 0, collection.length - 1, comparator);
}

/**
 * Quicksort for part of collection, recursive execution
 * @ignore
 * @param colection
 * @param first
 * @param last
 * @param comparator
 */
function singleSort<T>(colection: T[], first: number, last: number, comparator: ComparatorFn<T>) {
  let firstIdx = first;
  let lastIdx = last;
  const pivotIdx = first + last >> 1;
  const pivot = colection[pivotIdx];
  while (firstIdx < lastIdx) {
    while (comparator(pivot, colection[firstIdx]) > 0) {  // pivot > colection[firstIdx]
      firstIdx += 1;
    }
    while (comparator(colection[lastIdx], pivot) > 0) {  // colection[lastIdx] > pivot
      lastIdx -= 1;
    }
    if (firstIdx <= lastIdx) {
      if (firstIdx < lastIdx) {
        swap(colection, firstIdx, lastIdx);
      }
      firstIdx += 1;
      lastIdx -= 1;
    }
  }
  if (firstIdx < last) {
    singleSort(colection, firstIdx, last, comparator);
  }
  if (first < lastIdx) {
    singleSort(colection, first, lastIdx, comparator);
  }
}
