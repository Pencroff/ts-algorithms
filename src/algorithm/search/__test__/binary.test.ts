/**
 * Created by Pencroff on 07-Dec-2019.
 */

import { binaryIndexOf } from '../binary';
import { numberCollection, stringCollection } from './search.data';
import { genericComparator } from '../../../primitive/comparator';

describe('binary.search', () => {
  let sortedNumberCollection: number[];
  let sortedStringCollection: string[];

  beforeEach(() => {
    sortedNumberCollection = numberCollection.slice().sort(genericComparator);
    sortedStringCollection = stringCollection.slice().sort(genericComparator);
  });

  it('should search in collection of pure elements', () => {
    const numIdx = 4;
    const numResult = binaryIndexOf(sortedNumberCollection, sortedNumberCollection[numIdx]);
    expect(numResult).toBe(numIdx);
    const strIdx = 5;
    const strResult = binaryIndexOf(sortedStringCollection, sortedStringCollection[strIdx]);
    expect(strResult).toBe(strIdx);
  });
  it('should return -1 for unfound', () => {
    const numResult = binaryIndexOf(sortedNumberCollection, 99);
    expect(numResult).toBe(-1);
    const strResult = binaryIndexOf(sortedStringCollection, 'ABC');
    expect(strResult).toBe(-1);
  });
  it('should return -1 for unfound in middle', () => {
    const numResult = binaryIndexOf(sortedNumberCollection, 10);
    expect(numResult).toBe(-1);
  });
  it('should find first and last', () => {
    let numResult = binaryIndexOf(sortedNumberCollection, sortedNumberCollection[0]);
    expect(numResult).toBe(0);
    numResult = binaryIndexOf(sortedNumberCollection, sortedNumberCollection[sortedNumberCollection.length - 1]);
    expect(numResult).toBe(sortedNumberCollection.length - 1);
  });
});
