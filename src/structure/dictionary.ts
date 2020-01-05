/**
 * @module structure
 */

import { LinkedList, LinkedListNode } from './linked';
import { StringHash32Fn, murmur2_32 } from '../algorithm/hash';
import { ComparatorFn, genericComparator } from '../primitive/comparator';

/**
 * Options for configuring [[Dictionary]] instance
 */
export interface DictionaryOptions<T> {
  /**
   * Initial bucket size
   */
  size?: number;
  /**
   * function for hashing keys (strings at the moment)
   */
  hashFn?: StringHash32Fn;
  /**
   * comparator for searching by value in [[Dictionary]]
   */
  comparator?: ComparatorFn<T>;
}

/**
 * Internal dictionary record, not for external usage
 * @ignore
 */
class DictionaryRecord<T> {
  constructor(public hashValue: number, public key?: string, public value?: T) {
  }
}

/**
 * ## Dictionary (hash table)
 *
 * In computing, a hash table (hash map) is a data structure that implements an associative array abstract data type,
 * a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash
 * code, into an array of buckets or slots, from which the desired value can be found.
 * Ideally, the hash function will assign each key to a unique bucket, but most hash table designs employ an imperfect
 * hash function, which might cause hash collisions where the hash function generates the same index for more than one
 * key. Such collisions are always accommodated in some way.
 *
 * ![hash table](https://www.tutorialspoint.com/data_structures_algorithms/images/hash_function.jpg)
 * source: tutorialspoint.com
 *
 * ### Complexity
 *
 * | Algorithm | Average | Worst case |
 * | - | - | - |
 * | Access | `O(1)` | `O(n)` |
 * | Search (by key) | `O(1)` | `O(n)` |
 * | Search (by value) | `O(n)` | `O(n)` |
 * | Insert | `O(1)` | `O(n)` |
 * | Delete | `O(1)` | `O(n)` |
 * | - | - | - |
 * | Space | `O(n)` | `O(n)` |
 *
 * ### Reference
 *
 * * [Hash table](https://en.wikipedia.org/wiki/Hash_table)
 *
 * ```typescript
 * import { Dictionary } from '@pencroff/ts-algorithms/dist/structure/dictionary';
 * const q = new Dictionary([1, 2, 3])
 * ```
 *
 * **Dictionary** used [[LinkedList]] for buckets and [[murmur2_32]] as hashing function (selected as most randomness - [link](https://softwareengineering.stackexchange.com/a/145633)).
 *
 * At the moment [[Dictionary]] keys expected to be `string`
 *
 * #### Note:
 * Native JS object is kind of [[Dictionary]]
 */
export class Dictionary<T> implements Iterable<[string, T]> {
  private options: DictionaryOptions<T>;
  private _len: number;
  private buckets: LinkedList<DictionaryRecord<T>>[];

  /**
   * Dictionary constructor
   * @param initArr initial data as array of tuples - [key, value]
   * @param sizeOptions initial Dictionary size or [[DictionaryOptions]] object
   */
  constructor(initArr?: [string, T][], sizeOptions?: number | DictionaryOptions<T>) {
    const size = this.getSize(sizeOptions);
    const hashFn = this.getHashFn(sizeOptions as DictionaryOptions<T>);
    const comparator = this.getComparator(sizeOptions as DictionaryOptions<T>);
    this.options = { size, hashFn, comparator };
    this._len = 0;
    this.buckets = this.createBuckets(size);
    if (Array.isArray(initArr)) {
      initArr.forEach(([key, value]) => this.set(key, value));
    }
  }

  /**
   * Number elements in dictionary
   */
  get length(): number {
    return this._len;
  }

  /**
   * Dictionary capacity, before resizing
   */
  get size(): number {
    return this.options.size;
  }

  /**
   * Current hash function
   */
  get hashFn(): StringHash32Fn {
    return this.options.hashFn;
  }

  /**
   * Dictionary iterator for iteration across all key-value tuples
   *
   * Complexity: **O(n)**
   */
  [Symbol.iterator](): Iterator<[string, T]> {
    let bucketIdx = 0;
    const size = this.size;
    const buckets = this.buckets;
    let currentList = buckets[bucketIdx];
    let iterator = currentList[Symbol.iterator]();
    function nextFn(): IteratorResult<[string, T]> {
      const next: IteratorResult<DictionaryRecord<T>> = iterator.next();
      if (next.done) {
        bucketIdx += 1;
        if (bucketIdx >= size) {
          return {
            done: true,
            value: undefined
          };
        } else {
          currentList = buckets[bucketIdx];
          iterator = currentList[Symbol.iterator]();
          return nextFn();
        }
      } else {
        return {
          done: false,
          value: [next.value.key, next.value.value]
        };
      }
    }
    return {
      next: nextFn
    }
  }

  /**
   * Dictionary iterator for iteration across all keys
   *
   * Complexity: **O(n)**
   */
  keys(): Iterable<string> {
    const iterator = this[Symbol.iterator]();
    return {
      [Symbol.iterator](): Iterator<string> {
        return {
          next(): IteratorResult<string> {
            const { done, value } = iterator.next();
            return {
              done,
              value: value && value[0],
            };
          }
        };
      }
    }
  }

  /**
   * Dictionary iterator for iteration across all values
   *
   * Complexity: **O(n)**
   */
  values(): Iterable<T> {
    const iterator = this[Symbol.iterator]();
    return {
      [Symbol.iterator](): Iterator<T> {
        return {
          next(): IteratorResult<T> {
            const { done, value } = iterator.next();
            return {
              done,
              value: value && value[1],
            };
          }
        };
      }
    }
  }

  /**
   * Set / update value in [[Dictionary]] by key
   * @param key
   * @param value
   *
   * Complexity: **O(1)** / **O(n)**
   */
  set(key: string, value: T) {
    if (this.length === this.size) {
      this.resize();
    }
    this._len += 1;
    const [node, hashValue, list] = this.getNodeByKey(key);
    if (node) {
      node.value.value = value;
    } else {
      list.insertLast(new DictionaryRecord(hashValue, key, value));
    }
  }

  /**
   * Get value from [[Dictionary]] by key
   * @param key
   *
   * Complexity: **O(1)** / **O(n)**
   */
  get(key: string): T {
    let res: T;
    const [node] = this.getNodeByKey(key);
    if (node) {
      res = node.value.value;
    }
    return res;
  }

  /**
   * Remove value from [[Dictionary]] by key
   * @param key
   * @return `true` if key-value was really deleted, `false` if no key available
   *
   * Complexity: **O(1)** / **O(n)**
   */
  remove(key: string): boolean {
    let res = false;
    const [node, hashValue, list] = this.getNodeByKey(key);
    if (node) {
        list.remove(node);
        res = true;
        this._len -= 1;
    }
    return res;
  }

  /**
   * Check if [[Dictionary]] has a `key`
   * @param key
   *
   * Complexity: **O(1)** / **O(n)**
   */
  hasKey(key: string): boolean {
    let res = false;
    for (let dictKey of this.keys()) {
      if (key === dictKey) {
          res = true;
          break;
      }
    }
    return res;
  }

  /**
   * Check if [[Dictionary]] has a `value`
   * @param value
   *
   * Complexity: **O(n)**
   */
  hasValue(value: T): boolean {
    let res = false;
    for (let dictValue of this.values()) {
      if (this.options.comparator(value, dictValue) === 0) {
        res = true;
        break;
      }
    }
    return res;
  }

  /**
   * Resize dictionary for most efficient data access
   * Called automatically, if length equal size, before insert new key-value pair
   * Increased size 25% of prev value, 100% or 50% for size less then 32
   *
   * Complexity: **O(n)**
   */
  resize(): boolean {
    const newSize = this.getNewSize(this.size);
    const newBuckets = this.createBuckets(newSize, this.buckets);
    this.options.size = newSize;
    this.buckets = newBuckets;
    return true;
  }

  /**
   * Clear all values in [[Dictionary]]
   *
   * Complexity: **O(n)**
   */
  clear(): void {
    this._len = 0;
    for (let list of this.buckets) {
      list.clear();
    }
  }

  private createBuckets(newSize: number, oldBuckets?: LinkedList<DictionaryRecord<T>>[]) {
    const newBuckets = new Array(newSize).fill(null).map(() =>
      new LinkedList<DictionaryRecord<T>>(null, (a, b) => a.hashValue === b.hashValue ? 0 : -1));
    if (oldBuckets) {
      for (let bucket of oldBuckets) {
        for (let dictRecord of bucket) {
          const { hashValue, key, value } = dictRecord;
          const bucketIdx = hashValue % newSize;
          newBuckets[bucketIdx].insertLast(new DictionaryRecord(hashValue, key, value));
        }
      }
    }
    return newBuckets;
  }

  private getNodeByKey(key: string): [LinkedListNode<DictionaryRecord<T>>,
                                       number,
                                       LinkedList<DictionaryRecord<T>>] {
    const hashValue = this.hashFn(key);
    const bucketIdx = hashValue % this.size;
    const list = this.buckets[bucketIdx];
    const node = list.find({ hashValue });
    return [node, hashValue, list];
  }

  private getNewSize(oldSize: number): number {
    const SIZE_INCREASE_COEF_100 = 1;
    const SIZE_INCREASE_GRADE_50 = 16;
    const SIZE_INCREASE_COEF_50 = 0.5;
    const SIZE_INCREASE_GRADE_25 = 32;
    const SIZE_INCREASE_COEF_25 = 0.25;

    let coef = SIZE_INCREASE_COEF_25;
    if (oldSize < SIZE_INCREASE_GRADE_25) {
        coef = SIZE_INCREASE_COEF_50
    }
    if (oldSize < SIZE_INCREASE_GRADE_50) {
      coef = SIZE_INCREASE_COEF_100
    }
    const delta = oldSize * coef;
    const newSize = Math.round(oldSize + delta);
    return newSize;
  }

  private getSize(sizeOptions: number | DictionaryOptions<T>): number {
    const DEFAULT_SIZE = 8;

    let size = DEFAULT_SIZE;
    if (typeof sizeOptions === 'number' && sizeOptions !== 0) {
      size = sizeOptions;
    } else if (sizeOptions && sizeOptions.size) {
      size = sizeOptions.size;
    }
    return size;
  }

  private getHashFn(options: DictionaryOptions<T>): StringHash32Fn {
    const DEFAULT_HASHFN = murmur2_32;

    let fn = DEFAULT_HASHFN;
    if (options && options.hashFn) {
      fn = options.hashFn;
    }
    return fn;
  }

  private getComparator(options: DictionaryOptions<T>): ComparatorFn<T> {
    let comparator: ComparatorFn<T> = genericComparator;
    if (options && options.comparator) {
        comparator = options.comparator;
    }
    return comparator;
  }
}
