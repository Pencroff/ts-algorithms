/**
 * @module structure
 */
import { NotImplementedError } from '../../error/not-implemented.error';
import { ComparatorFn, genericComparator } from '../../primitive/comparator';
import { swap } from '../../primitive/swap';

export class BinaryHeap<T> implements Iterable<T> {
  private items: T[];
  protected comparator: ComparatorFn<T>;

  constructor(initArr?: T[], comparator: ComparatorFn<T> = genericComparator) {
    this.items = [];
    this.comparator = comparator;
    if (Array.isArray(initArr)) {
      initArr.forEach((el) => {
        this.insert(el);
      })
    }
  }

  get length(): number {
    return this.items.length;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.items[Symbol.iterator]();
  }

  insert(v: T): void {
    this.items.push(v);
    this.upHeap();
  }

  peek(): T {
    return this.items[0];
  }

  extract(): T {
    const res = this.peek();
    this.items[0] = this.items.pop();
    this.downHeap();
    return res;
  }

  remove(v: T): boolean {
    const idx = this.find(v);
    const res = idx !== -1;
    if (res) {
      if (idx === this.length - 1) {
        this.items.pop();
      } else {
        this.items[idx] = this.items.pop();
        this.rebalance(idx);
      }
    }
    return res;
  }

  replace(oldV: T, newV: T): boolean {
    const idx = this.find(oldV);
    const res = idx !== -1;
    if (res) {
      this.items[idx] = newV;
      this.rebalance(idx);
    }
    return res;
  }

  find(v: T): number {
    let res = -1;
    this.items.every((el, idx) => {
      const flag = (this.comparator(el, v) === 0);
      if (flag) {
        res = idx;
      }
      return !flag;
    });
    return res;
  }

  isEmpty(): boolean {
    const len = this.items.length;
    return len === 0;
  }

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

  private hasParent(idx: number): boolean {
    const { length: len, getParentIdx } = this;
    return (getParentIdx(idx) >= 0);
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

  private rebalance(idx: number): void {
    const parent = this.getParent(idx);
    if (
      this.hasLeftChild(idx)
      && (
        !parent
        || !this.isCorrectOrder(parent, this.items[idx])
      )
    ) {
      this.downHeap(idx);
    } else {
      this.upHeap(idx);
    }
  }

  private upHeap(startIdx?: number): void {
    let idx = startIdx || this.length - 1;
    while (
      this.hasParent(idx)
      && this.isCorrectOrder(this.getParent(idx), this.items[idx])
      ) {
      const parentIdx = this.getParentIdx(idx);
      swap(this.items, parentIdx, idx);
      idx = parentIdx;
    }
  }

  private downHeap(startIdx = 0): void {
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
