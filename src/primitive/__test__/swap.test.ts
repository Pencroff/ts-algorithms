/**
 * Created by Pencroff on 08-Dec-2019.
 */

import { swap } from '../swap';

describe('swap', () => {
  test('should swap elements', () => {
    const list = [1,2,3];
    swap(list, 0, 2);
    expect(list).toEqual([3,2,1]);
  });
});
