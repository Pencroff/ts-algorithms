/**
 * @module structure
 */

import { LinkedList } from './linked-list';

export class Queue<T> {
  private _list: LinkedList<T>;

  constructor(initArr?: T[]) {
    this._list = new LinkedList<T>(initArr);
  }

  get length(): number {
    return this._list.length;
  }

  enqueue(value: T): void {
    this._list.insertLast(value);
  }

  dequeue(): T {
    const res = this.peek();
    this._list.removeFirst();
    return res;
  }

  peek(): T {
    let res;
    const first = this._list.first;
    if (first) {
        res = first.value;
    }
    return res;
  }

  has(value: T): boolean {
    return this._list.has(value);
  }

  clear(): void {
    this._list.clear();
  }

  [Symbol.iterator] (): Iterator<T> {
    return this._list[Symbol.iterator]();
  }
}
