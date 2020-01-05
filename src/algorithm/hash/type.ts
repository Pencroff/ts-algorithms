/**
 * Different hash algorithms
 *
 * Refferences:
 * * [List](https://en.wikipedia.org/wiki/List_of_hash_functions)
 * * [Comparison](https://softwareengineering.stackexchange.com/a/145633)
 *
 * ```typescript
 * import { fnv1a32, murmur2_32, murmur3_32, sum32 } from '@pencroff/ts-algorithms/dist/algorithm/hash';
 * const res = fnv1a32('Abc!'); // 157309246
 * ```
 *
 * @preferred
 * @module hash
 */

/**
 * Non crypto hash function implementation
 */
export type StringHash32Fn = (value: string, prevValue?: number) => number;
