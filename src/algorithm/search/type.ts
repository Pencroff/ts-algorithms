/**
 * Collection of search algorithms
 * @preferred
 * @module search
 */


import { ComparatorFn } from '../../primitive/comparator';

/**
 * IndexOf function type for search algorithms
 * @typeparam T type of collection elements for search
 */
export type IndexOfFn<T> = (collection: T[], value: T, comparator: ComparatorFn<T>) => number;
