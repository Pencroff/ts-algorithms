/**
 * Created by Pencroff on 01-Mar-2020.
 */

import { PriorityQueue, PriorityTuple } from '../priority-queue';

describe('priority-queue', () => {
  let q: PriorityQueue<string>;
  let maxQ: PriorityQueue<string>;

  beforeEach(() => {
    const data = [
      ['A', 1],
      ['B', 2],
      ['C', 3],
      ['D', 2],
      ['E', 3],
      ['F', 1],
      ['G', 1],
    ] as PriorityTuple<string>[];
    q = new PriorityQueue<string>(data);
    maxQ = new PriorityQueue<string>(data, true);
  });

  describe('constructor', () => {
    it('should init by param', () => {
      expect(q.length).toBe(7);
      expect(q.isEmpty()).toBe(false);
      expect(maxQ.length).toBe(7);
      expect(maxQ.isEmpty()).toBe(false);
    });
    it('should support empty state', () => {
      q = new PriorityQueue<string>();
      expect(q.isEmpty()).toBe(true);
      maxQ = new PriorityQueue<string>([], true);
      expect(maxQ.isEmpty()).toBe(true);
    });
  });

  describe('queue methods', () => {
    it('should peek correct priority', () => {
      expect(q.peek()[1]).toEqual(1);
      expect(maxQ.peek()[1]).toEqual(3);
    });
    it('should peek undefined in empty Queue', () => {
      q = new PriorityQueue<string>();
      maxQ = new PriorityQueue<string>([], true);
      expect(q.peek()).toBeUndefined();
      expect(maxQ.peek()).toBeUndefined();
    });
    it('should dequeue in correct order', () => {
      expect(q.dequeue()[1]).toEqual(1);
      expect(q.dequeue()[1]).toEqual(1);
      expect(q.dequeue()[1]).toEqual(1);
      expect(q.dequeue()[1]).toEqual(2);
      expect(q.dequeue()[1]).toEqual(2);
      expect(q.dequeue()[1]).toEqual(3);
      expect(q.dequeue()[1]).toEqual(3);

      expect(maxQ.dequeue()[1]).toEqual(3);
      expect(maxQ.dequeue()[1]).toEqual(3);
      expect(maxQ.dequeue()[1]).toEqual(2);
      expect(maxQ.dequeue()[1]).toEqual(2);
      expect(maxQ.dequeue()[1]).toEqual(1);
      expect(maxQ.dequeue()[1]).toEqual(1);
      expect(maxQ.dequeue()[1]).toEqual(1);
    });

    it('should support clear operation', () => {
      expect(q.isEmpty()).toBe(false);
      expect(maxQ.isEmpty()).toBe(false);
      q.clear();
      maxQ.clear();
      expect(q.isEmpty()).toBe(true);
      expect(maxQ.isEmpty()).toBe(true);
    });

    it('should enqueue in correct order', () => {
      q = new PriorityQueue<string>();
      maxQ = new PriorityQueue<string>([], true);
      q.enqueue('A', 3);
      q.enqueue('B', 1);
      q.enqueue('C', 5);


      maxQ.enqueue('A', 3);
      maxQ.enqueue('B', 1);
      maxQ.enqueue('C', 5);

      expect(q.dequeue()).toEqual(['B', 1]);
      expect(q.dequeue()).toEqual(['A', 3]);
      expect(q.dequeue()).toEqual(['C', 5]);
      expect(maxQ.dequeue()).toEqual(['C', 5]);
      expect(maxQ.dequeue()).toEqual(['A', 3]);
      expect(maxQ.dequeue()).toEqual(['B', 1]);
    });

    it('should support iterator over whole collection', () => {
      const mockQ = jest.fn();
      const mockMaxQ = jest.fn();
      for (let v of q) {
        mockQ(v[1]);
      }
      for (let v of maxQ) {
        mockMaxQ(v[1]);
      }
      expect(mockQ.mock.calls).toEqual([
        [1], [2], [1], [2], [3], [3], [1],
      ]);
      expect(mockMaxQ.mock.calls).toEqual([
        [3], [3], [2], [1], [2], [1], [1],
      ]);
    });
    it('should support default priority', () => {
      q = new PriorityQueue<string>();
      q.enqueue('A');
      expect(q.peek()).toEqual(['A', 0]);
    });
  });
});
