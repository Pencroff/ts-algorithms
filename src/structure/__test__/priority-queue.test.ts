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
      expect(q.peek()).toEqual(['A', 1]);
      expect(maxQ.peek()).toEqual(['C', 3]);
    });
    it('should peek undefined in empty Queue', () => {
      q = new PriorityQueue<string>();
      maxQ = new PriorityQueue<string>([], true);
      expect(q.peek()).toBeUndefined();
      expect(maxQ.peek()).toBeUndefined();
    });
    it('should dequeue in correct order', () => {
      expect(q.dequeue()).toEqual(['A', 1]);
      expect(q.dequeue()).toEqual(['F', 1]);
      expect(q.dequeue()).toEqual(['G', 1]);
      expect(q.dequeue()).toEqual(['B', 2]);
      expect(q.dequeue()).toEqual(['D', 2]);
      expect(q.dequeue()).toEqual(['C', 3]);
      expect(q.dequeue()).toEqual(['E', 3]);

      expect(maxQ.dequeue()).toEqual(['C', 3]);
      expect(maxQ.dequeue()).toEqual(['E', 3]);
      expect(maxQ.dequeue()).toEqual(['B', 2]);
      expect(maxQ.dequeue()).toEqual(['D', 2]);
      expect(maxQ.dequeue()).toEqual(['A', 1]);
      expect(maxQ.dequeue()).toEqual(['F', 1]);
      expect(maxQ.dequeue()).toEqual(['G', 1]);
    });
  });
});
