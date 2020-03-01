/**
 * @module structure
 */
import { NotImplementedError } from '../error/not-implemented.error';

export type PriorityTuple<T> = [T, number];

interface PriorityRecord<T> {
  data: T;
  priority: number;
}

export class PriorityQueue<T> {
  private _list: PriorityRecord<T>[];

  constructor(initArr?: PriorityTuple<T>[]) {
    this._list = [];
  }

  get length(): number {
    return this._list.length;
  }

  [Symbol.iterator] (): Iterator<T> {
    throw new NotImplementedError();
  }

  isEmpty(): boolean {
    throw new NotImplementedError();
  }

  enqueue(value: T, priority: number): void {
    throw new NotImplementedError();
  }

  dequeue(): PriorityTuple<T> {
    throw new NotImplementedError();
  }

  peek(): T {
    throw new NotImplementedError();
  }

  clear(): void {
    throw new NotImplementedError();
  }
}
