/**
 * @module structure
 */

import { LinkedList, LinkedListNode } from './linked';
import { StringHash32Fn, sum32 } from '../algorithm/hash';
import { NotImplementedError } from '../error/not-implemented.error';
import { ComparatorFn, genericComparator } from '../primitive/comparator';


export interface DictionaryOptions<T> {
  size?: number;
  hashFn?: StringHash32Fn;
  comparator?: ComparatorFn<T>;
}

const DEFAULT_SIZE = 8;
const DEFAULT_HASHFN = sum32;
const SIZE_INCREASE_COEF = 0.25;

class DictionaryRecord<T> {
  constructor(public hashValue: number, public key?: string, public value?: T) {
  }
}

export class Dictionary<T> implements Iterable<[string, T]> {
  private options: DictionaryOptions<T>;
  private _len: number;
  private buckets: LinkedList<DictionaryRecord<T>>[];

  constructor(initArr?: [string, T][], sizeOptions?: number | DictionaryOptions<T>) {
    const size = this.getSize(sizeOptions);
    const hashFn = this.getHashFn(sizeOptions as DictionaryOptions<T>);
    const comparator = this.getComparator(sizeOptions as DictionaryOptions<T>);
    this.options = { size, hashFn, comparator };
    this._len = 0;
    this.buckets = new Array(this.size).fill(null).map(() =>
      new LinkedList<DictionaryRecord<T>>(null, (a, b) => a.hashValue === b.hashValue ? 0 : -1));
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

  get(key: string): T {
    let res: T;
    const [node] = this.getNodeByKey(key);
    if (node) {
      res = node.value.value;
    }
    return res;
  }

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
    this._len = 0;
    for (let list of this.buckets) {
      list.clear();
    }
  }

  toArray(): [string, T][] {
    const res: [string, T][] = [];
    for (let tuple of this) {
      res.push(tuple);
    }
    return res;
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
    let comparator: ComparatorFn<T> = genericComparator;
    if (options && options.comparator) {
        comparator = options.comparator;
    }
    return comparator;
  }
}
