/**
 * @module structure
 */
import { genericComparator } from '../primitive/comparator';
import { BinaryHeap, MaxBinaryHeap } from './heap';

export type PriorityTuple<T> = [T, number];

/**
 * ## PriorityQueue (binary heap implementation)
 *
 * In computer science, a priority queue is an abstract data type which is like a regular queue or stack data structure,
 * but where additionally each element has a "priority" associated with it. In a priority queue, an element with high
 * priority is served before an element with low priority. In some implementations, if two elements have the same
 * priority, they are served according to the order in which they were enqueued, while in other implementations,
 * ordering of elements with the same priority is undefined.
 *
 * #### Priority Queue
 * ![min heap](https://howtodoinjava.com/wp-content/uploads/2018/10/priority-queue-pattern.png)
 * source: howtodoinjava.com
 *
 * ### Complexity
 *
 * | Algorithm | Average | Worst case |
 * | - | - | - |
 * | enqueue | `O(log n)` | `O(log n)` |
 * | dequeue | `O(1)` | `O(1)` |
 * | peek    | `O(1)` | `O(1)` |
 * | - | - | - |
 * | Space | `O(n)` | `O(n)` |
 *
 * ### Reference
 *
 * * [PriorityQueue (data structure)](https://en.wikipedia.org/wiki/Priority_queue)
 *
 * ```typescript
 * import { PriorityQueue } from '@pencroff/ts-algorithms/dist/structure/priority-queue';
 * const q = new PriorityQueue([['A', 1], ['B', 2], ['C', 3]])
 * ```
 */
export class PriorityQueue<T> {
  private _heap: BinaryHeap<[T, number]>;

  /**
   *
   * @param initArr
   * @param asMaxPriority
   */
  constructor(
    initArr?: PriorityTuple<T>[],
    private asMaxPriority = false
  ) {
    if (asMaxPriority) {
      this._heap = new MaxBinaryHeap(initArr, priorityComparator);
    } else {
      this._heap = new BinaryHeap(initArr, priorityComparator);
    }
  }

  /**
   * Priority Q size
   */
  get length(): number {
    return this._heap.length;
  }

  /**
   * Iterator over internal collection (not sorted)
   *
   * Complexity: **O(n)**
   */
  [Symbol.iterator](): Iterator<PriorityTuple<T>> {
    return this._heap[Symbol.iterator]();
  }

  /**
   * Check elements availability
   *
   * Complexity: **O(1)**
   */
  isEmpty(): boolean {
    return this._heap.isEmpty();
  }

  /**
   * Enqueue element to Q
   * @param value
   * @param priority
   *
   * Complexity: **O(log n)**
   */
  enqueue(value: T, priority: number = 0): void {
    this._heap.insert([value, priority]);
  }

  /**
   * Dequeue element from Q (not stable - dequeue order not same with enqueue)
   *
   * Complexity: **O(1)**
   */
  dequeue(): PriorityTuple<T> {
    return this._heap.extract();
  }

  /**
   * Check element on top of Q
   *
   * Complexity: **O(1)**
   */
  peek(): PriorityTuple<T> {
    return this._heap.peek();
  }

  /**
   * Clear Q
   *
   * Complexity: **O(1)**
   */
  clear(): void {
    this._heap.clear();
  }
}

function priorityComparator<T>(a: PriorityTuple<T>, b: PriorityTuple<T>) {
  return genericComparator(a[1], b[1]);
}
