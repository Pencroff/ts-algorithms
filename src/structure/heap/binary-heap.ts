/**
 * @module structure
 */
import { ComparatorFn, genericComparator } from '../../primitive/comparator';
import { swap } from '../../primitive/swap';

/**
 * ## Heap (binary heap implementation)
 *
 * In computer science, a heap is a specialized tree-based data structure which is essentially an almost complete
 * tree that satisfies the heap property: in a max heap, for any given node C, if P is a parent node of C, then
 * the key (the value) of P is greater than or equal to the key of C. In a min heap, the key of P is less than or
 * equal to the key of C.[2] The node at the "top" of the heap (with no parents) is called the root node.
 *
 * #### Min heap
 * ![min heap](https://www.tutorialspoint.com/data_structures_algorithms/images/min_heap_example.jpg)
 * source: tutorialspoint.com
 *
 * #### Max heap
 * ![max heap](https://www.tutorialspoint.com/data_structures_algorithms/images/max_heap_example.jpg)
 * source: tutorialspoint.com
 *
 * ### Complexity
 *
 * | Algorithm | Average | Worst case |
 * | - | - | - |
 * | Access | `O(1)` | `O(n)` |
 * | Search | `O(n)` | `O(n)` |
 * | Insert | `O(1)` | `O(log n)` |
 * | Delete | `O(log n)` | `O(log n)` |
 * | Peek | `O(1)` | `O(1)` |
 * | - | - | - |
 * | Space | `O(n)` | `O(n)` |
 *
 * ### Reference
 *
 * * [Heap (data structure)](https://en.wikipedia.org/wiki/Heap_(data_structure))
 * * [BinaryHeap](http://opendatastructures.org/versions/edition-0.1e/ods-java/10_1_BinaryHeap_Implicit_Bi.html)
 *
 * ```typescript
 * import { BinaryHeap } from '@pencroff/ts-algorithms/dist/structure/heap';
 * const h = new BinaryHeap([1, 2, 3])
 * ```
 */
export class BinaryHeap<T> implements Iterable<T> {
  private items: T[];
  protected comparator: ComparatorFn<T>;

  /**
   * Heap constructor
   * @param initArr
   * @param comparator
   */
  constructor(initArr?: T[], comparator: ComparatorFn<T> = genericComparator) {
    this.items = [];
    this.comparator = comparator;
    if (Array.isArray(initArr)) {
      initArr.forEach((el) => {
        this.insert(el);
      })
    }
  }

  /**
   * Number elemnets in heap
   */
  get length(): number {
    return this.items.length;
  }

  /**
   * Heap iterator for iteration across all key-value tuples
   *
   * Complexity: **O(n)**
   */
  [Symbol.iterator](): Iterator<T> {
    return this.items[Symbol.iterator]();
  }

  /**
   * Insert new value in heap
   *
   * Complexity: **O(n)**
   */
  insert(v: T): void {
    this.items.push(v);
    this.siftUp();
  }

  /**
   * Read top element
   *
   * Complexity: **O(1)**
   */
  peek(): T {
    return this.items[0];
  }

  /**
   * Tale top element from heap
   *
   * Complexity: **O(log n)**
   */
  extract(): T {
    const res = this.peek();
    this.items[0] = this.items.pop();
    this.siftDown();
    return res;
  }

  /**
   * Remove element by value
   * @param v
   *
   * Complexity: **O(n) + O(log n)**
   */
  remove(v: T): boolean {
    const idx = this.find(v);
    const res = idx !== -1;
    if (res) {
      if (idx === this.length - 1) {
        this.items.pop();
      } else {
        this.items[idx] = this.items.pop();
        this.siftDown(idx);
      }
    }
    return res;
  }

  /**
   * Replace value and re-balance heap
   * @param oldValue
   * @param newValue
   *
   * Complexity: **O(n) + O(log n)**
   */
  replace(oldValue: T, newValue: T): boolean {
    const idx = this.find(oldValue);
    const res = idx !== -1;
    if (res) {
      this.items[idx] = newValue;
      this.reBalance(idx);
    }
    return res;
  }

  /**
   * Find el index by value
   * @param value
   *
   * Complexity: **O(n)**
   */
  find(value: T): number {
    let res = -1;
    this.items.every((el, idx) => {
      const flag = (this.comparator(el, value) === 0);
      if (flag) {
        res = idx;
      }
      return !flag;
    });
    return res;
  }

  /**
   * is empty check
   *
   * Complexity: **O(1)**
   */
  isEmpty(): boolean {
    const len = this.length;
    return len === 0;
  }

  /**
   * Order comparator, has influence on type of [[Heap]]
   * Current implementation - min heap
   * @param elA
   * @param elB
   */
  protected isCorrectOrder(elA: T, elB: T): boolean {
    return this.comparator(elA, elB) > 0;
  }

  // region helper methods
  private getLeftChildIdx(parentIdx: number): number {
    return 2 * parentIdx + 1;
  }

  private getRightChildIdx(parentIdx: number): number {
    return 2 * parentIdx + 2;
  }

  private getParentIdx(childIdx: number): number {
    return Math.floor((childIdx - 1) / 2);
  }

  private hasLeftChild(idx: number): boolean {
    const { length: len, getLeftChildIdx } = this;
    return (getLeftChildIdx(idx) < len);
  }

  private hasRightChild(idx: number): boolean {
    const { length: len, getRightChildIdx } = this;
    return (getRightChildIdx(idx) < len);
  }

  private getLeftChild(idx: number): T {
    const { getLeftChildIdx } = this;
    return this.items[getLeftChildIdx(idx)];
  }

  private getRightChild(idx: number): T {
    const { getRightChildIdx } = this;
    return this.items[getRightChildIdx(idx)];
  }

  private getParent(idx: number): T {
    const { getParentIdx } = this;
    return this.items[getParentIdx(idx)];
  }

  // endregion helper methods

  private reBalance(idx: number): void {
    const parent = this.getParent(idx);
    if (
      this.hasLeftChild(idx)
      && (
        !parent
        || !this.isCorrectOrder(parent, this.items[idx])
      )
    ) {
      this.siftDown(idx);
    } else {
      this.siftUp(idx);
    }
  }

  private siftUp(startIdx?: number): void {
    let idx = startIdx || this.length - 1;
    let parentIdx = this.getParentIdx(idx);
    while (
      idx > 0
      && !this.isCorrectOrder(this.items[idx], this.getParent(idx))
      ) {
      swap(this.items, parentIdx, idx);
      idx = parentIdx;
      parentIdx = this.getParentIdx(idx);
    }
  }

  private siftDown(startIdx = 0): void {
    let currentIdx = startIdx;
    let nextIdx = null;

    while (this.hasLeftChild(currentIdx)) {
      if (
        this.hasRightChild(currentIdx)
        && this.isCorrectOrder(this.getLeftChild(currentIdx), this.getRightChild(currentIdx))
      ) {
        nextIdx = this.getRightChildIdx(currentIdx);
      } else {
        nextIdx = this.getLeftChildIdx(currentIdx);
      }
      if (this.isCorrectOrder(
        this.items[nextIdx],
        this.items[currentIdx],
      )) {
        break;
      }
      swap(this.items, currentIdx, nextIdx);
      currentIdx = nextIdx;
    }
  }
}
