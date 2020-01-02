/**
 * Created by Pencroff on 17-Dec-2019.
 */

import { Stack } from '../stack';
// @ts-ignore
import { hasValues } from '../../../../helper/iterable';

describe('stack', () => {
  let stack: Stack<string>;
  beforeEach(() => {
    stack = new Stack(['A', 'B', 'C']);
  });

  it('should support init collection', () => {
    expect(stack.length).toBe(3);
    hasValues(stack,['A', 'B', 'C'])
  });

  it('should push value', () => {
    stack.push('D');
    expect(stack.length).toBe(4);
    hasValues(stack,['A', 'B', 'C', 'D'])
  });

  it('should pop value', () => {
    const value = stack.pop();
    expect(value).toBe('C');
    expect(stack.length).toBe(2);
    hasValues(stack,['A', 'B'])
  });
  it('should peek value', () => {
    stack.pop();
    stack.push('D');
    const value = stack.peek();
    expect(value).toBe('D');
    expect(stack.length).toBe(3);
    hasValues(stack,['A', 'B', 'D']);
  });
  it('should "has" value', () => {
    expect(stack.has('C')).toBe(true);
    expect(stack.has('X')).toBe(false);
  });
  it('should clear queue', () => {
    stack.clear();
    expect(stack.length).toBe(0);
    expect(stack.pop()).toBeUndefined();
    expect(stack.peek()).toBeUndefined();
  });
  it('should export to array', () => {
    stack.pop();
    stack.push('X');
    stack.push('Y');
    stack.push('Z');
    expect(stack.toArray()).toEqual(['A', 'B', 'X', 'Y', 'Z']);
  });
});
