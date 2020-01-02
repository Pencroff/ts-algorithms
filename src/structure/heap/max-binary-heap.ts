/**
 * @module structure
 */
import { BinaryHeap } from './binary-heap';
import { NotImplementedError } from '../../error/not-implemented.error';

export class MaxBinaryHeap<T> extends BinaryHeap<T> {

  protected isCorrectOrder(elA: T, elB: T) {
    return this.comparator(elA, elB) < 0;
  }
}
