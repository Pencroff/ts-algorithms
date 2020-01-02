/**
 * Created by Pencroff on 02-Jan-2020.
 */

import { MaxBinaryHeap } from '../max-binary-heap';
// @ts-ignore
import { hasValues } from '../../../../helper/iterable';

describe('max-binary.heap', () => {
  let heap: MaxBinaryHeap<number>;
  beforeEach(() => {
    heap = new MaxBinaryHeap([7, 4, 1, 8, 10])
  });
  it ('should be instantiated', () => {
    expect(heap).toBeInstanceOf(MaxBinaryHeap);
  });
  it('should be initialized', () => {
    expect(heap.length).toBe(5);
    hasValues(heap, [10, 8, 1, 4, 7])
  });
  it('should insert value', () => {
    heap.insert(3);
    expect(heap.length).toBe(6);
    hasValues(heap, [10, 8, 3, 4, 7, 1])
  });
  it('should peek element', () => {
    const el = heap.peek();
    expect(heap.length).toBe(5);
    expect(el).toBe(10);
  });
  it('should extract element', () => {
    const el = heap.extract();
    expect(heap.length).toBe(4);
    expect(el).toBe(10);
    hasValues(heap, [8, 7, 1, 4]);
  });
  it('should extract element extra', () => {
    heap = new MaxBinaryHeap<number>([10, 15, 20, 17, 25]);
    hasValues(heap, [25, 20, 15, 10, 17]);
    const el = heap.extract();
    expect(heap.length).toBe(4);
    expect(el).toBe(25);
    hasValues(heap, [20, 17, 15, 10]);
  });
  it('should search element', () => {
    expect(heap.find(10)).toBe(0);
    expect(heap.find(4)).toBe(3);
    expect(heap.find(100)).toBe(-1);
  });
  it('should search first', () => {
    heap = new MaxBinaryHeap<number>([1, 4, 2, 4, 5, 4])
    hasValues(heap, [5, 4, 4, 1, 4, 2]);
    expect(heap.find(4)).toBe(1);
  });
  it('should delete element', () => {
    expect(heap.remove(99)).toBe(false);
    expect(heap.remove(4)).toBe(true);
    expect(heap.remove(7)).toBe(true);
    hasValues(heap, [10, 8, 1]);
  });
  it('should check empty state', () => {
    expect(heap.isEmpty()).toBe(false);
    heap = new MaxBinaryHeap<number>();
    expect(heap.isEmpty()).toBe(true);
  });
  it('should replace element', () => {
    expect(heap.replace(99, 12)).toBe(false);
    expect(heap.replace(7, 12)).toBe(true);
    hasValues(heap, [12, 10, 1, 4, 8])
  });
});
