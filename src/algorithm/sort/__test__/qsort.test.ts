/**
 * Created by Pencroff on 08-Dec-2019.
 */

import { qSort } from '../qsort';
import { numberCollection, stringCollection, objectCollection } from './sort.data';

describe('quick sort', () => {

  let numCollection: number[];
  let strCollection: string[];
  let objCollection: any[];

  beforeEach(() => {
    numCollection = numberCollection.slice();
    strCollection = stringCollection.slice();
    objCollection = objectCollection.slice();
  });

  test('should sort numbers', () => {
    qSort(numCollection);
    const first = numCollection[0];
    const second = numCollection[1];
    const preLast = numCollection[numCollection.length - 2];
    const last = numCollection[numCollection.length - 1];
    expect(first).toBeLessThan(second);
    expect(second).toBeLessThan(preLast);
    expect(preLast).toBeLessThan(last);
  });

  test('should sort string', () => {
    qSort(strCollection);
    const first = strCollection[0];
    const second = strCollection[1];
    const preLast = strCollection[strCollection.length - 2];
    const last = strCollection[strCollection.length - 1];
    expect(first < second).toBe(true);
    expect(second < preLast).toBe(true);
    expect(preLast < last).toBe(true);
  });

  test('expected to be unstable', () => {
    const el = objCollection[0];
    qSort(objCollection, (a, b) => a.age - b.age);
    const firstIdx = objCollection.indexOf(el);
    qSort(objCollection, (a, b) => a.age - b.age);
    const secondIdx = objCollection.indexOf(el);
    expect(firstIdx).not.toEqual(secondIdx);
  })
});
