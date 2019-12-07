/**
 * Collection of search algorithms
 * @preferred
 * @module search
 */


import { ComparatorFn } from '../../primitive/comparator';

/**
 *
 */
export type IndexOfFn<T> = (collection: T[], value: T, comparator: ComparatorFn<T>) => number;
