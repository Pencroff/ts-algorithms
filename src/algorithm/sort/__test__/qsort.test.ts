/**
 * Created by Pencroff on 08-Dec-2019.
 */
import { qSort } from '../qsort';
import { numberCollection, stringCollection, objectCollection } from './sort.data';
// @ts-ignore
import { cases } from '../../../../helper/cases';

const sortFn = qSort;

describe('quick sort', () => {

  describe('Number sorting', () => {
    let collection: number[];
    beforeEach(() => {
      collection = numberCollection.slice();
    });
    cases('simple case', (opts) => {
      sortFn(opts.in);
      expect(opts.in).toEqual(opts.result);
    }, [
      { name: 'empty', in: [], result: [] },
      { name: 'single small', in: [1], result: [1] },
      { name: 'single large', in: [1000], result: [1000] },
    ]);
    cases('sequence', (opts) => {
      sortFn(opts.in);
      expect(opts.in).toEqual(opts.result);
    }, [
      { name: 'sorted', in: [1, 2, 3, 4, 5], result: [1, 2, 3, 4, 5] },
      { name: 'unsorted', in: [2, 1, 3, 5, 4], result: [1, 2, 3, 4, 5] },
      { name: 'reversed', in: [5, 4, 3, 2, 1], result: [1, 2, 3, 4, 5] },
      { name: 'integer-float', in: [1.1, 1], result: [1, 1.1] },
      { name: 'float', in: [0.5, 4.9, 5.0, -1.8, 3.3], result: [-1.8, 0.5, 3.3, 4.9, 5.0] },
      { name: 'positive-negative-couple', in: [1.1, -1.1], result: [-1.1, 1.1] },
      { name: 'positive-negative', in: [-1, 2, -3, -2, 1, 3], result: [-3, -2, -1, 1, 2, 3] },
      { name: 'small-large', in: [1, 1000, 555], result: [1, 555, 1000] },
      { name: 'repeats', in: [2, 1, 2, 1], result: [1, 1, 2, 2] },
    ]);
    cases('edge-cases', (opts) => {
      sortFn(opts.in);
      expect(opts.in).toEqual(opts.result);
    }, [
      { name: 'min-max', in: [Number.MAX_VALUE, Number.MIN_VALUE], result: [Number.MIN_VALUE, Number.MAX_VALUE] },
      { name: 'min-max-integer', in: [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER], result: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER] },
    ]);
    it('should sort numbers', () => {
      sortFn(collection);
      const first = collection[0];
      const second = collection[1];
      const preLast = collection[collection.length - 2];
      const last = collection[collection.length - 1];
      expect(first).toBeLessThan(second);
      expect(second).toBeLessThan(preLast);
      expect(preLast).toBeLessThan(last);
    });
  });

  describe('String sorting', () => {
    let collection: string[];
    beforeEach(() => {
      collection = stringCollection.slice();
    });
    test('should sort string', () => {
      sortFn(collection);
      const first = collection[0];
      const second = collection[1];
      const preLast = collection[collection.length - 2];
      const last = collection[collection.length - 1];
      expect(first < second).toBe(true);
      expect(second < preLast).toBe(true);
      expect(preLast < last).toBe(true);
    });
  });

  describe('Object and custom comparator', () => {
    let collection: any[];
    beforeEach(() => {
      collection = objectCollection.slice();
    });

    it('expected to be unstable', () => {
      const el = collection[0];
      sortFn(collection, (a, b) => a.age - b.age);
      const firstIdx = collection.indexOf(el);
      sortFn(collection, (a, b) => a.age - b.age);
      const secondIdx = collection.indexOf(el);
      expect(firstIdx).not.toEqual(secondIdx);
    })
  });
});
