/**
 * Created by Pencroff on 12-Dec-2019.
 */

import { LinkedList } from '../src/structure/linked';

export function isLinkedList<T>(list: LinkedList<T>) {
  const { first, last } = list;
  let emptyOrSingle = ((first === null) && (last === null) && (list.length === 0))
    || ((first === last) && (list.length === 1));
  let loopFlag = !emptyOrSingle;
  if (loopFlag) {
    let current = first;
    let nextLink = first.next;
    let prevLink = null;
    while (current.next) {
      loopFlag = loopFlag && (current.next === nextLink && current.prev === prevLink);
      nextLink = (current.next && current.next.next) || null;
      prevLink = current;
      current = current.next;
    }
    if (current.next === null) {
      loopFlag = loopFlag && (current === last);
    }
  }
  return emptyOrSingle || loopFlag;
}
