/**
 * Created by Pencroff on 08-Dec-2019.
 */
import { ComparatorFn, genericComparator } from '../../primitive/comparator';
import { LinkedListNode } from './linked-list-node';

/**
 * LinkedList implements generic doubly linked list.
 *
 *
 */
export class LinkedList<T> {
  private _first: LinkedListNode<T>;
  private _last: LinkedListNode<T>;
  private _count: number;

  constructor(comparator: ComparatorFn<T> = genericComparator) {
  }

  get first(): LinkedListNode<T> {
    return null;
  }

  get last(): LinkedListNode<T> {
    return null;
  }

  get count(): number {
    return 0;
  }

  insertAfter(node: LinkedListNode<T>, value: T|LinkedListNode<T>): LinkedList<T> {
    return null;
  }

  insertBefore(node: LinkedListNode<T>, value: T|LinkedListNode<T>): LinkedList<T> {
    return null;
  }

  insertFirst(value: T|LinkedListNode<T>): LinkedList<T> {
    return  null;
  }

  insertLast(value: T|LinkedListNode<T>): LinkedList<T> {
    return  null;
  }

  clear(): void {

  }

  remove(value: T|LinkedListNode<T>): LinkedList<T> {
    return null;
  }

  removeFirst(): LinkedList<T> {
    return null;
  }

  removeLast(): LinkedList<T> {
    return null;
  }

  has(value: T|LinkedListNode<T>): boolean {
    return null;
  }

  find(value: T): LinkedListNode<T> {
    return null;
  }

  findLast(value: T): LinkedListNode<T> {
    return null;
  }
}
