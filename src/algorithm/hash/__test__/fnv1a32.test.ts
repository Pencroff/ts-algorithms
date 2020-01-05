/**
 * Created by Pencroff on 21-Dec-2019.
 */

import { fnv1a32 } from '../fnv1a32';

describe('fnv1a 32bit', () => {
  it('should calc correct values', () => {
    expect(fnv1a32()).toBe(0x811C9DC5);
    expect(fnv1a32('')).toBe(0x811C9DC5);
    expect(fnv1a32('hello')).toBe(0x4F9F2CAB);
    expect(fnv1a32('hello world')).toBe(0xD58B3FA7);
    expect(fnv1a32('A')).toBe(0xC40BF6CC);
    expect(fnv1a32('AA')).toBe(0x2BD51FF7);
  });
  it('should process long string', () => {
    expect(fnv1a32('1234567890')).toBe(0x6108E844);
    expect(fnv1a32('The quick brown fox jumps over the lazy dog')).toBe(0x48FFF90);
  });
  it('should support unicode', () => {
    expect(fnv1a32('😀')).toBe(0x33A29608);
    expect(fnv1a32('🦄🌈')).toBe(0xAAF5FEE7);
  });
  it('should not be over 2^32', () => {
    const longStr = new Array(2**10).join('ÿ');
    expect(fnv1a32(longStr)).toBeLessThan(2**32);
  });
  it('should support pev value', () => {
    const prev = fnv1a32('hello');
    expect(fnv1a32('world', prev)).toBe(0x3B9F5C61);
  });
});
