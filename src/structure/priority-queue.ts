/**
 * @module structure
 */
import { NotImplementedError } from '../error/not-implemented.error';
import { genericComparator } from '../primitive/comparator';
import { BinaryHeap, MaxBinaryHeap } from './heap';

export type PriorityTuple<T> = [T, number];

export class PriorityQueue<T> {
  private _heap: BinaryHeap<[T, number]>;

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

  get length(): number {
    return this._heap.length;
  }

  [Symbol.iterator](): Iterator<PriorityTuple<T>> {
    return this._heap[Symbol.iterator]();
  }

  isEmpty(): boolean {
    return this._heap.isEmpty();
  }

  enqueue(value: T, priority: number = 0): void {
    this._heap.insert([value, priority]);
  }

  dequeue(): PriorityTuple<T> {
    return this._heap.extract();
  }

  peek(): PriorityTuple<T> {
    return this._heap.peek();
  }

  clear(): void {
    this._heap.clear();
  }
}

function priorityComparator<T>(a: PriorityTuple<T>, b: PriorityTuple<T>) {
  return genericComparator(a[1], b[1]);
}
