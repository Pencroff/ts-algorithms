/**
 * @module structure
 */
import { BinaryHeap } from './binary-heap';

/**
 * Max heap
 * Root element has largest value
 */
export class MaxBinaryHeap<T> extends BinaryHeap<T> {

  /**
   * Max heap order
   * @param elA
   * @param elB
   */
  protected isCorrectOrder(elA: T, elB: T) {
    return this.comparator(elA, elB) <= 0;
  }
}
