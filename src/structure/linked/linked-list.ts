/**
 * @module structure
 */
import { ComparatorFn, genericComparator } from '../../primitive/comparator';
import { LinkedListNode } from './linked-list-node';

/**
 * ## Linked list
 *
 * In computer science, a linked list is a linear collection of data elements, whose order is not given by
 * their physical placement in memory. Instead, each element points to the next. It is a data structure
 * consisting of a collection of nodes which together represent a sequence. In its most basic form, each node
 * contains: data, and a reference (in other words, a link) to the next node in the sequence. This structure
 * allows for efficient insertion or removal of elements from any position in the sequence during iteration.
 *
 * ![Linked list](https://personalzone-hulgokm2zfcmm9u.netdna-ssl.com/wp-content/uploads/2017/07/singly-linked-list-vs-doubly-linked-list.jpg)
 *  source: www.thecodingdelight.com
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
 * | Space	| `O(n)` | `O(n)` |
 *
 * ### Reference
 *
 * * [Linked list](https://en.wikipedia.org/wiki/Linked_list)
 * * [Doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list)
 *
 * ```typescript
 * import { LinkedList } from '@pencroff/ts-algorithms/dist/structure/linked';
 * const list = new LinkedList([1, 2, 3])
 * ```
 *
 * **LinkedList** implements `generic` doubly linked list
 */
export class LinkedList<T> {
  private _first: LinkedListNode<T>;
  private _last: LinkedListNode<T>;
  private _count: number;

  constructor(initCollection: T[], comparator: ComparatorFn<T> = genericComparator) {
  }

  get first(): LinkedListNode<T> {
    return null;
  }

  get last(): LinkedListNode<T> {
    return null;
  }

  get count(): number {
    return 0;
  }

  insertAfter(node: LinkedListNode<T>, value: T|LinkedListNode<T>): LinkedList<T> {
    return null;
  }

  insertBefore(node: LinkedListNode<T>, value: T|LinkedListNode<T>): LinkedList<T> {
    return null;
  }

  insertFirst(value: T|LinkedListNode<T>): LinkedList<T> {
    return  null;
  }

  insertLast(value: T|LinkedListNode<T>): LinkedList<T> {
    return  null;
  }

  clear(): void {

  }

  remove(value: T|LinkedListNode<T>): LinkedList<T> {
    return null;
  }

  removeFirst(): LinkedList<T> {
    return null;
  }

  removeLast(): LinkedList<T> {
    return null;
  }

  has(value: T|LinkedListNode<T>): boolean {
    return null;
  }

  find(value: T): LinkedListNode<T> {
    return null;
  }

  findLast(value: T): LinkedListNode<T> {
    return null;
  }

  reverse(): LinkedList<T> {
    return null;
  }

  toArray(): T[] {
    return null;
  }
}
