/**
 * @module structure
 */

/**
 * Node for [[LinkedList]]
 */
export class LinkedListNode<T> {
  /**
   * LinkeListNode constructor
   * @param value    node value
   * @param [next]   next node
   * @param [prev]   previous node
   */
  constructor(public value: T, public next: LinkedListNode<T> = null, public prev: LinkedListNode<T> = null) {
  }

  /**
   * Transform node to string
   * @param [serializer]  function to stringify objects
   */
  toString(serializer?: (value: T) => string) {
    return serializer ? serializer(this.value) : `${this.value}`;
  }
}
