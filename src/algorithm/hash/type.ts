/**
 * @module hash
 */

/**
 * Non crypto hash function implementation
 */
export type StringHash32Fn = (value: string, prevValue?: number) => number;
