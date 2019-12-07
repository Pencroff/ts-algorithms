/**
 * Created by Pencroff on 01-Dec-2019.
 */

import { linearIndexOf } from '../linear';
import { numberCollection, objectCollection, stringCollection } from './search.data';

describe('linear.search', () => {
  it('should search in collection of pure elements', () => {
    const numIdx = 4;
    const numResult = linearIndexOf(numberCollection, numberCollection[numIdx]);
    expect(numResult).toBe(numIdx);
    const strIdx = 5;
    const strResult = linearIndexOf(stringCollection, stringCollection[strIdx]);
    expect(strResult).toBe(strIdx);
  });
  it('should return -1 for unfound', () => {
    const numResult = linearIndexOf(numberCollection, 99);
    expect(numResult).toBe(-1);
    const strResult = linearIndexOf(stringCollection, 'ABC');
    expect(strResult).toBe(-1);
  });
  it('should search through objects', () => {
    const objIdx = 5;
    const objComparator = (a: {name: string, age: number}, b: {name: string, age: number}) => (a.name === b.name && b.age === b.age) ? 0 : null;
    const res = linearIndexOf(objectCollection, { ...objectCollection[objIdx] }, objComparator);
    expect(res).toBe(objIdx);
    const notFoundRes = linearIndexOf(objectCollection, { name: 'xyz', age: 99 }, objComparator);
    expect(notFoundRes).toBe(-1);
  });
});
