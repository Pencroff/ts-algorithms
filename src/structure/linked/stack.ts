/**
 * @module structure
 */

import { LinkedList } from './linked-list';

/**
 * ## Stack (LIFO - last-in-first-out)
 *
 * In computer science, a stack is an abstract data type that serves as a collection of elements, with two
 * principal operations:
 *
 * * push, which adds an element to the collection, and
 * * pop, which removes the most recently added element that was not yet removed.
 *
 * The order in which elements come off a stack gives rise to its alternative name, LIFO (last in, first out).
 * Additionally, a peek operation may give access to the top without modifying the stack. The name "stack" for
 * this type of structure comes from the analogy to a set of physical items stacked on top of each other, which makes
 * it easy to take an item off the top of the stack, while getting to an item deeper in the stack may require taking
 * off multiple other items first.
 *
 * ![Stack](https://thepracticaldev.s3.amazonaws.com/i/mwcwre09s12vqa3gvl7a.png)
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
 * * [Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
 *
 * ```typescript
 * import { Stack } from '@pencroff/ts-algorithms/dist/structure/linked';
 * const q = new Stack([1, 2, 3])
 * ```
 *
 * **Stack** based on [[LinkedList]]
 */
export class Stack<T> {
  private readonly _list: LinkedList<T>;

  /**
   * Stack constructor
   * @param initArr initial data as array
   */
  constructor(initArr?: T[]) {
    this._list = new LinkedList<T>(initArr);
  }

  get length(): number {
    return this._list.length;
  }

  /**
   * Stack iterator for iteration across all nodes
   *
   * Complexity: **O(n)**
   */
  [Symbol.iterator] (): Iterator<T> {
    return this._list[Symbol.iterator]();
  }

  /**
   * Check value in [[Stack]] tail without removing it
   *
   * Complexity: **O(1)**
   */
  peek(): T {
    let res: T;
    if (this._list.last) {
        res = this._list.last.value;
    }
    return res;
  }

  /**
   * Take tail value from [[Stack]]
   *
   * Complexity: **O(1)**
   */
  pop(): T {
    const res = this.peek();
    this._list.removeLast();
    return res;
  }

  /**
   * Add new value to [[Stack]] tail
   *
   * Complexity: **O(1)**
   *
   * @param value
   */
  push(value: T): void {
    this._list.insertLast(value);
  }

  /**
   * Determines whether a value is in the [[Stack]]
   *
   * Complexity: **O(n)**
   *
   * @param value
   */
  has(value: T): boolean {
    return this._list.has(value);
  }

  /**
   * Clear all values in [[Stack]]
   *
   * Complexity: **O(1)**
   */
  clear(): void {
    this._list.clear();
  }

  /**
   * Export [[Stack]] to array
   *
   * Complexity: **O(n)**
   */
  toArray(): T[] {
    return this._list.toArray();
  }
}
