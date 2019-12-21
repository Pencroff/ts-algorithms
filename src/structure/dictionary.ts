/**
 * @module structure
 */

import { LinkedList } from './linked';
import { StringHash32Fn, sum32 } from '../algorithm/hash';
import { NotImplementedError } from '../error/not-implemented.error';
import { ComparatorFn } from '../primitive/comparator';


export interface DictionaryOptions<T> {
  size?: number;
  hashFn?: StringHash32Fn;
  comparator?: ComparatorFn<T>;
}

const DEFAULT_SIZE = 8;
const DEFAULT_HASHFN = sum32;
const SIZE_INCREASE_COEF = 0.25;

export class Dictionary<T> {
  private options: DictionaryOptions<T>;
  private _len: number;
  private buckets: LinkedList<T>[];

  constructor(initArr?: [string, T][], sizeOptions?: number | DictionaryOptions<T>) {
    const size = this.getSize(sizeOptions);
    const hashFn = this.getHashFn(sizeOptions as DictionaryOptions<T>);
    const comparator = this.getComparator(sizeOptions as DictionaryOptions<T>);
    this.options = { size, hashFn };
    this._len = 0;
    this.buckets = new Array(this.size).fill(null).map(() => new LinkedList<T>(null, comparator));
    if (Array.isArray(initArr)) {
        initArr.forEach(([key, value]) => this.set(key, value));
    }
  }

  get length(): number {
    return this._len;
  }

  get size(): number {
    return this.options.size;
  }

  get hashFn(): StringHash32Fn {
    return this.options.hashFn;
  }

  [Symbol.iterator](): Iterator<[string, T]> {
    throw new NotImplementedError();
  }

  keys(): Iterator<string> {
    throw new NotImplementedError();
  }

  values(): Iterator<T> {
    throw new NotImplementedError();
  }

  set(key: string, value: T) {
    if (this.length === this.size) {
        this.resize();
    }
    this._len += 1;
  }

  get(key: string): T {
    return null;
  }

  remove(key: string): boolean {
    throw new NotImplementedError();
  }

  hasKey(key: string): boolean {
    throw new NotImplementedError();
  }

  hasValue(): boolean {
    throw new NotImplementedError();
  }

  /**
   * Resize dictionary for most efficient data access
   * Called automatically, if length equal size, before insert new key-value pair
   * Increased size 25% of prev value
   *
   * Complexity: **O(n)**
   */
  resize(): boolean {
    const newSize = this.getNewSize(this.size);
    this.options.size = newSize;
    return true;
  }

  clear(): void {
    throw new NotImplementedError();
  }

  toArray(): [string, T][] {
    throw new NotImplementedError();
  }

  private getNewSize(oldSize: number): number {
    const delta = oldSize * SIZE_INCREASE_COEF;
    const newSize = Math.round(oldSize + delta);
    return newSize;
  }

  private getSize(sizeOptions: number | DictionaryOptions<T>): number {
    let size = DEFAULT_SIZE;
    if (typeof sizeOptions === 'number' && sizeOptions !== 0) {
      size = sizeOptions;
    } else if (sizeOptions && sizeOptions.size) {
      size = sizeOptions.size;
    }
    return size;
  }

  private getHashFn(options: DictionaryOptions<T>): StringHash32Fn {
    let fn = DEFAULT_HASHFN;
    if (options && options.hashFn) {
      fn = options.hashFn;
    }
    return fn;
  }

  private getComparator(options: DictionaryOptions<T>): ComparatorFn<T> {
    let comparator;
    if (options && options.comparator) {
        comparator = options.comparator;
    }
    return comparator;
  }
}
