/**
 * Created by Pencroff on 21-Dec-2019.
 */

import { Dictionary } from '../dictionary';
import { sum32 } from '../../algorithm/hash';

describe('dictionary', () => {
  describe('constructor', () => {
    it('should init default config', () => {
      const dict = new Dictionary();
      expect(dict.length).toBe(0);
      expect(dict.size).toBe(8);
      expect(dict.hashFn).toBe(sum32);
    });
    it('should support size', () => {
      const dict = new Dictionary(null, 16);
      expect(dict.length).toBe(0);
      expect(dict.size).toBe(16);
      expect(dict.hashFn).toBe(sum32);
    });
    it('should support config', () => {
      const fn = () => 0;
      const dict = new Dictionary(null, {
        size: 32,
        hashFn: fn
      });
      expect(dict.length).toBe(0);
      expect(dict.size).toBe(32);
      expect(dict.hashFn).toBe(fn);
    });
    it('should support init value', () => {
      const dict = new Dictionary([
        ['keyA', 'A'],
        ['keyB', 'B'],
        ['keyC', 'C'],
      ], 4);
      expect(dict.length).toBe(3);
      expect(dict.size).toBe(4);
    });
    it('should resize to expect extra data', () => {
      const dict = new Dictionary([
        ['keyA', 'A'],
        ['keyB', 'B'],
        ['keyC', 'C'],
        ['keyD', 'D'],
        ['keyE', 'E'],
        ['keyF', 'F'],
        ['keyG', 'G'],
        ['keyH', 'H'],
        ['keyI', 'I'],
      ]);
      expect(dict.length).toBe(9);
      expect(dict.size).toBe(10);
    });
  });
  describe('set/get', () => {
    let list: [string, string][];
    let dict: Dictionary<string>;
    beforeEach(() => {
      list = [
        ['keyA', 'A'],
        ['keyB', 'B'],
        ['keyC', 'C'],
      ];
      dict = new Dictionary(list);
    });
    it('should init values', () => {
      list.forEach(([key, value]) => expect(dict.get(key)).toBe(value))
    });
    it('should set value', () => {
      expect(dict.length).toBe(3);
      dict.set('keyZ', 'Z');
      expect(dict.get('keyZ')).toBe('Z');
      expect(dict.length).toBe(4);
    });
  });

});
