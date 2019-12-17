/**
 * Created by Pencroff on 15-Dec-2019.
 */

// @ts-ignore
import { hasValues } from '../../../../helper/linked';

import { Queue } from '../queue';

describe('queue', () => {
  let q: Queue<string>;
  beforeEach(() => {
    q = new Queue(['A', 'B', 'C']);
  });

  it('should support init collection', () => {
    expect(q.length).toBe(3);
    hasValues(q,['A', 'B', 'C'])
  });

  it('should enqueue value', () => {
    q.enqueue('D');
    expect(q.length).toBe(4);
    hasValues(q,['A', 'B', 'C', 'D'])
  });

  it('should dequeue value', () => {
    const value = q.dequeue();
    expect(value).toBe('A');
    expect(q.length).toBe(2);
    hasValues(q,['B', 'C'])
  });
  it('should peek value', () => {
    q.dequeue();
    q.enqueue('D');
    const value = q.peek();
    expect(value).toBe('B');
    expect(q.length).toBe(3);
    hasValues(q,['B', 'C', 'D']);
  });
  it('should "has" value', () => {
    expect(q.has('C')).toBe(true);
    expect(q.has('X')).toBe(false);
  });
  it('should clear queue', () => {
      q.clear();
      expect(q.length).toBe(0);
      expect(q.dequeue()).toBeUndefined();
      expect(q.peek()).toBeUndefined();
  });
  it('should export to array', () => {
    q.dequeue();
    q.enqueue('X');
    q.enqueue('Y');
    q.enqueue('Z');
    expect(q.toArray()).toEqual(['B', 'C', 'X', 'Y', 'Z']);
  });
});
