/**
 * @module structure
 */

/**
 * Represent a node for [[LinkedList]]
 */
export class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> = null, public prev: LinkedListNode<T> = null) {
  }

  toString(serializer?: (value: T) => string) {
    return serializer ? serializer(this.value) : `${this.value}`;
  }
}
