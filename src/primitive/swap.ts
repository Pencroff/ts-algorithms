/**
 * @module primitive
 */

/**
 * Swap collection elements
 *
 * @typeparam T type collection
 * @param collection collection of elements
 * @param idxA first element index
 * @param idxB second element index
 */
export function swap<T>(collection: T[], idxA: number, idxB: number): void {
  const temp = collection[idxA];
  collection[idxA] = collection[idxB];
  collection[idxB] = temp;
}
