/**
 * @module structure
 */

import { LinkedList } from './linked-list';

/**
 * ## Queue (FIFO - first-in-first-out)
 *
 * In computer science, a queue is a collection of entities that are maintained in a sequence and can be modified
 * by the addition of entities at one end of the sequence and removal from the other end of the sequence. By convention,
 * the end of the sequence at which elements are added is called the back or rear of the queue and the end at which
 * elements are removed is called the head or front of the queue, analogously to the words used when people line up
 * to wait for goods or services. The operation of adding an element to the rear of the queue is known as enqueue,
 * and the operation of removing an element from the front is known as dequeue. Other operations may also be allowed,
 * often including a peek or front operation that returns the value of the next element to be dequeued without
 * dequeuing it.
 *
 * ![Queue](https://res.cloudinary.com/practicaldev/image/fetch/s--6l64S1Dr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/lkgf80jmtry868zwknri.png)
 * source: dev.to
 *
 * ### Complexity
 *
 * | Algorithm | Average | Worst case |
 * | - | - | - |
 * | Access | `O(n)` | `O(n)` |
 * | Search | `O(n)` | `O(n)` |
 * | Insert | `O(1)` | `O(1)` |
 * | Delete | `O(1)` | `O(1)` |
 * | - | - | - |
 * | Space | `O(n)` | `O(n)` |
 *
 * ### Reference
 *
 * * [Queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))
 *
 * ```typescript
 * import { Queue } from '@pencroff/ts-algorithms/dist/structure/linked';
 * const q = new Queue([1, 2, 3])
 * ```
 *
 * **Queue** based on [[LinkedList]]
 */
export class Queue<T> {
  private _list: LinkedList<T>;

  /**
   * Queue constructor
   * @param initArr initial data as array
   */
  constructor(initArr?: T[]) {
    this._list = new LinkedList<T>(initArr);
  }

  get length(): number {
    return this._list.length;
  }

  /**
   * Queue iterator for iteration across all nodes
   *
   * Complexity: **O(n)**
   */
  [Symbol.iterator] (): Iterator<T> {
    return this._list[Symbol.iterator]();
  }

  /**
   * Add new value to [[Queue]] tail
   *
   * Complexity: **O(1)**
   *
   * @param value
   */
  enqueue(value: T): void {
    this._list.insertLast(value);
  }

  /**
   * Take head value from [[Queue]]
   *
   * Complexity: **O(1)**
   */
  dequeue(): T {
    const res = this.peek();
    this._list.removeFirst();
    return res;
  }

  /**
   * Check value in [[Queue]] head without removing it
   *
   * Complexity: **O(1)**
   */
  peek(): T {
    let res;
    const first = this._list.first;
    if (first) {
        res = first.value;
    }
    return res;
  }

  /**
   * Determines whether a value is in the [[Queue]]
   *
   * Complexity: **O(n)**
   *
   * @param value
   */
  has(value: T): boolean {
    return this._list.has(value);
  }

  /**
   * Clear all values in [[Queue]]
   *
   * Complexity: **O(1)**
   */
  clear(): void {
    this._list.clear();
  }

  /**
   * Export [[Queue]] to array
   *
   * Complexity: **O(n)**
   */
  toArray(): T[] {
    return this._list.toArray();
  }
}
