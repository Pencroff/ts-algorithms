/**
 * Created by Pencroff on 21-Dec-2019.
 */

import { sum32 } from '../sum32';

describe('sum 32', () => {
  it('should calc correct values', () => {
    expect(sum32()).toBe(0);
    expect(sum32('')).toBe(0);
    expect(sum32('A')).toBe(65);
    expect(sum32('AA')).toBe(130);
  });
  it('should process long string', () => {
    expect(sum32('1234567890')).toBe(525);
    expect(sum32('The quick brown fox jumps over the lazy dog')).toBe(4057);
  });
  it('should support unicode', () => {
    expect(sum32('😀')).toBe(679);
    expect(sum32('🦄🌈')).toBe(1372);
  });
  it('should not be over 2^32', () => {
    const longStr = new Array(2**10).join('ÿ');
    expect(sum32(longStr)).toBeLessThan(2**32);
  });
  it('should support pev value', () => {
    const prev = sum32('ABC');
    expect(sum32('1234567890', prev)).toBe(723);
  });
});
