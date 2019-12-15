/**
 * @module structure
 */
import { ComparatorFn, genericComparator } from '../../primitive/comparator';
import { LinkedListNode } from './linked-list-node';
import { NotImplementedError } from '../../error/not-implemented.error';

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
 * | Space | `O(n)` | `O(n)` |
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
export class LinkedList<T> implements Iterable<T> {
  private _first: LinkedListNode<T>;
  private _last: LinkedListNode<T>;
  private _len: number;

  /**
   * LinkedList constructor
   * @param initArr     initial data as array
   * @param [comparator] check [[ComparatorFn]], default [[genericComparator]]
   */
  constructor(initArr?: T[], private comparator: ComparatorFn<T> = genericComparator) {
    this._first = null;
    this._last = null;
    this._len = 0;

    if (Array.isArray(initArr)) {
      initArr.forEach((el) => {
        this.insertLast(el);
      })
    }
  }

  get first(): LinkedListNode<T> {
    return this._first;
  }

  get last(): LinkedListNode<T> {
    return this._last;
  }

  get length(): number {
    return this._len;
  }

  [Symbol.iterator] (): Iterator<T> {
    let current = this.first;
    return {
      next(...args): IteratorResult<T> {
        if (current) {
          const { value } = current;
          current = current.next;
          return {
            done: false,
            value,
          }
        } else {
          return {
            done: true,
            value: undefined
          }
        }
      }
    }
  }

  /**
   * Insert value or node after node
   *
   * Complexity: **O(1)**
   *
   * @param node
   * @param value
   */
  insertAfter(node: LinkedListNode<T>, value: T | LinkedListNode<T>): LinkedList<T> {
    const newNode = this.toNode(value);
    if (node.next) {
      node.next.prev = newNode;
    }
    newNode.next = node.next;
    newNode.prev = node;
    node.next = newNode;
    this._len += 1;
    return this;
  }

  /**
   * Insert value or node before node
   *
   * Complexity: **O(1)**
   *
   * @param node
   * @param value
   */
  insertBefore(node: LinkedListNode<T>, value: T | LinkedListNode<T>): LinkedList<T> {
    const newNode = this.toNode(value);
    if (node.prev) {
      node.prev.next = newNode;
    }
    newNode.prev = node.prev;
    newNode.next = node;
    node.prev = newNode;
    this._len += 1;
    return this;
  }

  /**
   * Insert value or node first
   *
   * Complexity: **O(1)**
   *
   * @param value
   */
  insertFirst(value: T | LinkedListNode<T>): LinkedList<T> {
    const node = this.toNode(value);
    node.next = this.first;
    if (this.first) {
      this.first.prev = node;
    }
    if (!this.last) {
      this._last = node;
    }
    this._first = node;
    this._len += 1;
    return this;
  }

  /**
   * Insert value or node last
   *
   * Complexity: **O(1)**
   *
   * @param value
   */
  insertLast(value: T | LinkedListNode<T>): LinkedList<T> {
    const node = this.toNode(value);
    node.prev = this.last;
    if (this.last) {
      this.last.next = node;
    }
    if (!this.first) {
      this._first = node;
    }
    this._last = node;
    this._len += 1;
    return this;
  }

  /**
   * Clear all values in [[LinkedList]]
   *
   * Complexity: **O(1)**
   */
  clear(): void {
    this._first = null;
    this._last = null;
    this._len = 0;
  }

  /**
   * Remove node by reference or value from [[LinkedList]]
   *
   * Complexity:
   * * remove(value: LinkedListNode<T>) - **O(1)**
   * * remove(value: T) - **O(n)**
   *
   * @param value
   */
  remove(value: T | LinkedListNode<T>): boolean {
    const { first, last } = this;
    let res = (first !== null) && (last !== null);
    if (res) {
      if (value instanceof LinkedListNode) {
        if (this.length === 1) {
          this._first = null;
          this._last = null;
        } else {
          const { next, prev } = (value as LinkedListNode<T>);
          if (this.first === value) {
            this._first = next;
          }
          if (this.last === value) {
            this._last = prev;
          }
          if (next) {
            next.prev = prev;
          }
          if (prev) {
            prev.next = next;
          }
        }
        this._len -= 1;
      } else {
        const node = this.find(value);
        this.remove(node);
        res = !!node;
      }
    }
    return res;
  }

  /**
   * Remove first node from [[LinkedList]]
   *
   * Complexity: **O(1)**
   */
  removeFirst(): boolean {
    return this.remove(this.first);
  }

  /**
   * Remove last node from [[LinkedList]]
   *
   * Complexity: **O(1)**
   */
  removeLast(): boolean {
    return this.remove(this.last);
  }

  /**
   * Find first node by value in [[LinkedList]], used comparator function, linear search
   *
   * Complexity: **O(n)**
   *
   * @param value
   */
  find(value: T): LinkedListNode<T> {
    let res;
    if (this.first) {
      let current = this.first;
      while (current) {
        if (this.comparator(current.value, value) === 0) {
            res = current;
            break;
        }
        current = current.next;
      }
    }
    return res;
  }

  /**
   * Find last node by value in [[LinkedList]], used comparator function, linear search
   *
   * Complexity: **O(n)**
   *
   * @param value
   */
  findLast(value: T): LinkedListNode<T> {
    let res;
    if (this.last) {
      let current = this.last;
      while (current) {
        if (this.comparator(current.value, value) === 0) {
          res = current;
          break;
        }
        current = current.prev;
      }
    }
    return res;
  }

  /**
   * Determines whether a value is in the [[LinkedList]]
   *
   * Complexity: **O(n)**
   *
   * @param value
   */
  has(value: T): boolean {
    return !!this.find(value);
  }

  /**
   * Reverse order of list nodes
   *
   * Complexity: **O(n)**
   */
  reverse(): LinkedList<T> {
    if (this.first !== this.last) {
      let current = this.first;
      let next;
      let prev;

      while (current) {
        next = current.next;
        prev = current.prev;

        current.next = prev;
        current.prev = next;

        prev = current;
        current = next;
      }

      this._last = this.first;
      this._first = prev;
    }
    return this;
  }

  /**
   * Export list to array
   *
   * Complexity: **O(n)**
   */
  toArray(): T[] {
    const res = [];
    let current = this.first;
    while (current) {
      res.push(current.value);
      current = current.next;
    }
    return res;
  }

  private toNode(value: T | LinkedListNode<T>): LinkedListNode<T> {
    return value instanceof LinkedListNode ? value : new LinkedListNode(value);
  }
}
