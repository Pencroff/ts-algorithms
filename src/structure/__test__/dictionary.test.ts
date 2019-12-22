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
      expect(dict.size).toBe(16);
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
      list.forEach(([key, value]) => expect(dict.get(key)).toBe(value));
    });
    it('should set value', () => {
      expect(dict.length).toBe(3);
      dict.set('keyZ', 'Z');
      expect(dict.get('keyZ')).toBe('Z');
      expect(dict.length).toBe(4);
    });
    it('should update value', () => {
      dict.set('keyA', 'ZZZ');
      expect(dict.get('keyA')).toBe('ZZZ');
    });
    it('should get undefined for not available key', () => {
      expect(dict.get('keyX')).toBeUndefined();
    });
  });
  describe('iterate key/values/tuples', () => {
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
    it('iterate keys', () => {
      const keyList = [];
      const expectedKeyList = list.map((record) => record[0]).sort();
      for (let key of dict.keys()) {
        keyList.push(key);
      }
      keyList.sort();
      expect(keyList).toEqual(expectedKeyList);
    });
    it('iterate values', () => {
      const valueList = [];
      const expectedValueList = list.map((record) => record[1]).sort();
      for (let value of dict.values()) {
        valueList.push(value);
      }
      valueList.sort();
      expect(valueList).toEqual(expectedValueList);
    });
    it('iterate tuples', () => {
      const comparator = (a: string[], b: string[]) =>
        (a[0] === b[0]) ? 0 : (a[0] < b[0]) ? -1 : 1;
      const tupleList = [];
      for (let tuple of dict) {
        tupleList.push(tuple);
      }
      tupleList.sort(comparator);
      list.sort(comparator);
      expect(tupleList).toEqual(list);
    });
  });
  describe('has key/value', () => {
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
    it('should check key', () => {
      expect(dict.hasKey('keyC')).toBe(true);
      expect(dict.hasKey('keyX')).toBe(false);
    });
    it('should check value', () => {
      expect(dict.hasValue('C')).toBe(true);
      expect(dict.hasValue('X')).toBe(false);
    });
  });
  describe('remove/clear', () => {
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
    it('should remove value by key', () => {
      expect(dict.remove('keyA')).toBe(true);
      expect(dict.length).toBe(2);
      expect(dict.remove('keyB')).toBe(true);
      expect(dict.remove('keyA')).toBe(false);
      expect(dict.remove('keyB')).toBe(false);
      expect(dict.hasKey('keyA')).toBe(false);
      expect(dict.hasKey('keyB')).toBe(false);
      expect(dict.hasKey('keyC')).toBe(true);
      expect(dict.get('keyA')).toBeUndefined();
      expect(dict.get('keyB')).toBeUndefined();
      expect(dict.get('keyC')).toBe('C');
      expect(dict.length).toBe(1);
    });
    it('should clear all records', () => {
      expect(dict.length).toBe(3);
      dict.clear();
      expect(dict.length).toBe(0);
      const keyArr = Array.from(dict.keys());
      expect(keyArr).toEqual([]);
    });
  });
  describe('resize', () => {
    let dict: Dictionary<number>;
    beforeEach(() => {
      dict = new Dictionary<number>(null, 4);
    });
    it('should increase size 100%', () => {
      addToDict(dict, 4);
      expect(dict.length).toBe(4);
      expect(dict.size).toBe(4);
      expect(dict.hasValue(3)).toBe(true);
      addToDict(dict, 1);
      expect(dict.length).toBe(5);
      expect(dict.size).toBe(8);
      expect(dict.hasValue(4)).toBe(true);
      addToDict(dict, 4);
      expect(dict.length).toBe(9);
      expect(dict.size).toBe(16);
      expect(dict.hasValue(8)).toBe(true);
    });
    it('should increase size 50%', () => {
      addToDict(dict, 17);
      expect(dict.length).toBe(17);
      expect(dict.size).toBe(24);
      expect(dict.hasValue(16)).toBe(true);
      addToDict(dict, 8);
      expect(dict.length).toBe(25);
      expect(dict.size).toBe(36);
      expect(dict.hasValue(24)).toBe(true);
    });
  });
});

function addToDict(dict: Dictionary<number>, numberElements: number) {
  const len = dict.length;
  for (let i = len; i < (len + numberElements); i += 1) {
    dict.set(`key${i}`, i);
  }
}
