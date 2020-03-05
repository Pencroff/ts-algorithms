/**
 * Created by Pencroff on 02-Jan-2020.
 */

import { BinaryHeap } from '../binary-heap';
// @ts-ignore
import { hasValues } from '../../../../helper/iterable';
import { genericComparator } from '../../../primitive/comparator';

describe('binary.heap', () => {
  let heap: BinaryHeap<number>;
  beforeEach(() => {
    heap = new BinaryHeap([7, 4, 1, 8, 10])
  });
  it ('should be instantiated', () => {
    expect(heap).toBeInstanceOf(BinaryHeap);
  });
  it('should be initialized', () => {
    expect(heap.length).toBe(5);
    hasValues(heap, [1, 7, 4, 8, 10])
  });
  it('should insert value', () => {
    heap.insert(3);
    expect(heap.length).toBe(6);
    hasValues(heap, [1, 7, 3, 8, 10, 4])
  });
  it('should peek element', () => {
    const el = heap.peek();
    expect(heap.length).toBe(5);
    expect(el).toBe(1);
  });
  it('should extract element', () => {
    const el = heap.extract();
    expect(heap.length).toBe(4);
    expect(el).toBe(1);
    hasValues(heap, [4, 7, 10, 8]);
  });
  it('should extract element extra', () => {
    heap = new BinaryHeap<number>([10, 15, 20, 17, 25]);
    hasValues(heap, [10, 15, 20, 17, 25]);
    const el = heap.extract();
    expect(heap.length).toBe(4);
    expect(el).toBe(10);
    hasValues(heap, [15, 17, 20, 25]);
  });
  it('should search element', () => {
    expect(heap.find(1)).toBe(0);
    expect(heap.find(4)).toBe(2);
    expect(heap.find(100)).toBe(-1);
  });
  it('should search first', () => {
    heap = new BinaryHeap<number>([1, 4, 2, 4, 5, 4])
    hasValues(heap, [1, 4, 2, 4, 5, 4]);
    expect(heap.find(4)).toBe(1);
  });
  it('should delete element', () => {
    expect(heap.remove(99)).toBe(false);
    expect(heap.remove(4)).toBe(true);
    hasValues(heap, [1, 7, 10, 8]);
  });
  it('should check empty state', () => {
    expect(heap.isEmpty()).toBe(false);
    heap = new BinaryHeap<number>();
    expect(heap.isEmpty()).toBe(true);
  });
  it('should replace element', () => {
    expect(heap.replace(99, 12)).toBe(false);
    expect(heap.replace(7, 12)).toBe(true);
    hasValues(heap, [1, 8, 4, 12, 10])
  });
  it('should support custom comparator', () => {
    const heapStr = new BinaryHeap(['7', '4', '1', '8', '10'], genericComparator);
    hasValues(heapStr, ['1', '10', '4', '8', '7'])
  });
  it('should work with large tree', () => {
    heap = new BinaryHeap<number>([4, 9, 8, 17, 26, 50, 16, 19, 69, 32, 93, 65]);
    hasValues(heap, [4, 9, 8, 17, 26, 50, 16, 19, 69, 32, 93, 65]);
    heap.insert(7);
    hasValues(heap, [4, 9, 7, 17, 26, 8, 16, 19, 69, 32, 93, 65, 50]);
    heap.remove(4);
    hasValues(heap, [7, 9, 8, 17, 26, 50, 16, 19, 69, 32, 93, 65]);
    heap.replace(50, 5);
    hasValues(heap, [ 5, 9, 7, 17, 26, 8, 16, 19, 69, 32, 93, 65]);
    heap.replace(9, 99);
    hasValues(heap, [ 5, 17, 7, 19, 26, 8, 16, 99, 69, 32, 93, 65]);
  });
  it('should clear data', () => {
    expect(heap.isEmpty()).toBe(false);
    heap.clear();
    expect(heap.isEmpty()).toBe(true);
  });
});
