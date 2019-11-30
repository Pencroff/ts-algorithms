/**
 * Created by Pencroff on 30-Nov-2019.
 */

import { genericComparator } from '../comparator';

describe('generic comparator', () => {
  test('should support equal', () => {
    expect(genericComparator(1, 1)).toEqual(0);
    expect(genericComparator('A', 'A')).toEqual(0);
  });
  test('should support less', () => {
    expect(genericComparator(1, 2)).toEqual(-1);
    expect(genericComparator('A', 'B')).toEqual(-1);
  });
  test('should support great', () => {
    expect(genericComparator(1, -5)).toEqual(1);
    expect(genericComparator('A', '0')).toEqual(1);
  });
  test('should be used for sorting', () => {
    expect([11, 3, 5, 0].sort(genericComparator))
                        .toEqual([0, 3, 5, 11]);
    expect([11, 3, 5, 0].sort((v1, v2) => (0 - genericComparator(v1, v2))))
                        .toEqual([11, 5, 3, 0]);
  })
});
