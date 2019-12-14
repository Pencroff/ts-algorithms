/**
 * @module structure
 */
import { NotImplementedError } from '../../error/not-implemented.error';

export class Queue<T> {
  constructor(initArr?: T[]) {
  }

  get length(): number {
    throw new NotImplementedError();
  }

  enqueue(value: T): void {
    throw new NotImplementedError();
  }

  dequeue(): T {
    throw new NotImplementedError();
  }

  pick(): T {
    throw new NotImplementedError();
  }

  has(value: T): boolean {
    throw new NotImplementedError();
  }

  clear(): void {
    throw new NotImplementedError();
  }

}
