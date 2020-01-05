import { murmur2_32, murmur3_32 } from '../murmur32';

describe('MurmurHash 32bit', () => {
  describe('v2', () => {
    it('should calc correct values', () => {
      expect(murmur2_32()).toBe(0x0);
      expect(murmur2_32('')).toBe(0x0);
      expect(murmur2_32('hello')).toBe(0xE56129CB);
      expect(murmur2_32('hello world')).toBe(0x44A81419);
      expect(murmur2_32('A')).toBe(0x25F31569);
      expect(murmur2_32('AA')).toBe(0xD7DD4011);
    });
    it('should process long string', () => {
      expect(murmur2_32('1234567890')).toBe(0x60726E16);
      expect(murmur2_32('The quick brown fox jumps over the lazy dog')).toBe(0x212729D0);
    });
    it('should support unicode', () => {
      expect(murmur2_32('😀')).toBe(0xCDC9F705);
      expect(murmur2_32('🦄🌈')).toBe(0x94B5D92E);
    });
    it('should not be over 2^32', () => {
      const longStr = new Array(2**10).join('ÿ');
      expect(murmur2_32(longStr)).toBeLessThan(2**32);
    });
    it('should support pev value', () => {
      const prev = murmur2_32('hello');
      expect(murmur2_32('world', prev)).toBe(0x9CB9216D);
    });
  });

  describe('v3', () => {
    it('should calc correct values', () => {
      expect(murmur3_32()).toBe(0x0);
      expect(murmur3_32('')).toBe(0x0);
      expect(murmur3_32('hello')).toBe(0x248BFA47);
      expect(murmur3_32('hello world')).toBe(0x5E928F0F);
      expect(murmur3_32('A')).toBe(0x54DCF7CE);
      expect(murmur3_32('AA')).toBe(0x3FE9A061);
    });
    it('should process long string', () => {
      expect(murmur3_32('1234567890')).toBe(0x3204634D);
      expect(murmur3_32('The quick brown fox jumps over the lazy dog')).toBe(0x2E4FF723);
    });
    it('should support unicode', () => {
      expect(murmur3_32('😀')).toBe(0xBEB42EFA);
      expect(murmur3_32('🦄🌈')).toBe(0xB3C23859);
    });
    it('should not be over 2^32', () => {
      const longStr = new Array(2**10).join('ÿ');
      expect(murmur3_32(longStr)).toBeLessThan(2**32);
    });
    it('should support pev value', () => {
      const prev = murmur3_32('hello');
      expect(murmur3_32('world', prev)).toBe(0x4AD3A7CC);
    });
  });
});
