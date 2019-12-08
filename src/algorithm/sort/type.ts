/**
 * Collection of sort algorithms
 * @preferred
 * @module sort
 */


import { ComparatorFn } from '../../primitive/comparator';

/**
 * Sort function type for sorting algorithms
 */
export type SortFn<T> = (collection: T[], comparator: ComparatorFn<T>) => void;
