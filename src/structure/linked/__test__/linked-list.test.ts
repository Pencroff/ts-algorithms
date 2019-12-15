/**
 * Created by Pencroff on 10-Dec-2019.
 */

// @ts-ignore
import { cases } from '../../../../helper/cases';
// @ts-ignore
import { isLinkedList } from '../../../../helper/linked';

import { LinkedList } from '../linked-list';
import { LinkedListNode } from '../linked-list-node';

describe('linked-list', () => {
  describe('constructor', () => {
    it('should be an instance of LinkedList', () => {
      const list = new LinkedList();
      expect(list).toBeInstanceOf(LinkedList);
    });
    cases('should accept initial collection', (opts) => {
      const list = new LinkedList(opts.arr);
      expect(list.length).toEqual(opts.len);
      if (list.first) {
        expect(list.first.value).toEqual(opts.first);
      } else {
        expect(list.first).toEqual(opts.first);
      }
      if (list.last) {
        expect(list.last.value).toEqual(opts.last);
      } else {
        expect(list.last).toEqual(opts.last);
      }
      expect(isLinkedList(list)).toBe(true);
    }, [
      { name: 'empty', arr: [], len: 0, first: null, last: null },
      { name: 'single', arr: ['A'], len: 1, first: 'A', last: 'A' },
      { name: 'small', arr: [1, true, 'Z'], len: 3, first: 1, last: 'Z' },
      { name: 'large', arr: [1, 3, 5, 'A', 'B', 'C', 'X', 'Y', 'ZZZ'], len: 9, first: 1, last: 'ZZZ' },
    ]);
  });

  describe('insert operations', () => {
    let list: LinkedList<string>;
    beforeEach(() => {
      list = new LinkedList(['A', 'B', 'C']);
    });

    cases('should insertFirst', (opts) => {
      const { first: oldFirst } = list;
      list.insertFirst(opts.value);
      const { first } = list;

      if (typeof opts.value === 'string') {
        expect(first.value).toEqual(opts.value);
      } else {
        expect(first).toEqual(opts.value);
      }

      expect(first.next).toEqual(oldFirst);
      expect(oldFirst.prev).toEqual(first);

      expect(isLinkedList(list)).toBe(true);
      expect(list.length).toEqual(4);
    }, [
      { name: 'value', value: 'X' },
      { name: 'node', value: new LinkedListNode('Z') },
    ]);

    cases('to empty list insertFirst', (opts) => {
      list = new LinkedList<string>();
      list.insertFirst(opts.value);
      expect(list.first).toEqual(list.last);
      if (typeof opts.value === 'string') {
        expect(list.first.value).toBe(opts.value);
      } else {
        expect(list.first).toBe(opts.value);
      }
      expect(list.length).toBe(1);
    }, [
      { name: 'value', value: 'X' },
      { name: 'node', value: new LinkedListNode('Z') },
    ]);

    cases('should insertLast', (opts) => {
      const { last: oldLast } = list;
      list.insertLast(opts.value);
      const { last } = list;

      if (typeof opts.value === 'string') {
        expect(last.value).toEqual(opts.value);
      } else {
        expect(last).toEqual(opts.value);
      }

      expect(last.prev).toEqual(oldLast);
      expect(oldLast.next).toEqual(last);

      expect(isLinkedList(list)).toBe(true);
      expect(list.length).toEqual(4);
    }, [
      { name: 'value', value: 'X' },
      { name: 'node', value: new LinkedListNode('Z') },
    ]);

    cases('to empty list insertLast', (opts) => {
      list = new LinkedList<string>();
      list.insertLast(opts.value);
      expect(list.first).toEqual(list.last);
      if (typeof opts.value === 'string') {
        expect(list.last.value).toBe(opts.value);
      } else {
        expect(list.first).toBe(opts.value);
        expect(list.last).toBe(opts.value);
      }
      expect(list.length).toBe(1);
    }, [
      { name: 'value', value: 'X' },
      { name: 'node', value: new LinkedListNode('Z') },
    ]);

    cases('should insertAfter', (opts) => {
      const { first } = list;
      const nextRef = first.next;
      list.insertAfter(first, opts.value);
      const newNode = first.next;

      if (typeof opts.value === 'string') {
        expect(newNode.value).toEqual(opts.value);
      } else {
        expect(newNode).toEqual(opts.value);
      }

      expect(nextRef.prev.value).toEqual(newNode.value);

      expect(nextRef.prev).toEqual(newNode);

      expect(newNode.next).toEqual(nextRef);
      expect(newNode.prev).toEqual(first);

      expect(isLinkedList(list)).toBe(true);
      expect(list.length).toEqual(4);
    }, [
      { name: 'value', value: 'X' },
      { name: 'node', value: new LinkedListNode('Z') },
    ]);

    cases('should insertBefore', (opts) => {
      const { last } = list;
      const prevRef = last.prev;
      list.insertBefore(last, opts.value);
      const newNode = last.prev;

      if (typeof opts.value === 'string') {
        expect(newNode.value).toEqual(opts.value);
      } else {
        expect(newNode).toEqual(opts.value);
      }

      expect(newNode.prev).toEqual(prevRef);
      expect(newNode.next).toEqual(last);

      expect(prevRef.next).toEqual(newNode);

      expect(isLinkedList(list)).toBe(true);
      expect(list.length).toEqual(4);
    }, [
      { name: 'value', value: 'X' },
      { name: 'node', value: new LinkedListNode('Z') },
    ]);
  });

  describe('remove operations', () => {
    let list: LinkedList<string>;
    beforeEach(() => {
      list = new LinkedList(['A', 'B', 'C']);
    });

    it('should clear', () => {
      expect(list.first).not.toBeNull();
      expect(list.last).not.toBeNull();
      expect(list.length).not.toBe(0);
      list.clear();
      expect(list.first).toBeNull();
      expect(list.last).toBeNull();
      expect(list.length).toBe(0);
    });

    describe('should removeFirst', () => {
      it('filled linked list', () => {
        const nextFirst = list.first.next;
        expect(list.removeFirst()).toBe(true);
        expect(list.first).toEqual(nextFirst);
        expect(nextFirst.prev).toBeNull();
        expect(list.length).toBe(2);
      });

      it('single element', () => {
        list = new LinkedList<string>(['A']);
        expect(list.removeFirst()).toBe(true);
        expect(list.first).toBeNull();
        expect(list.last).toBeNull();
        expect(list.length).toBe(0);
      });

      it('empty', () => {
        list = new LinkedList<string>();
        expect(list.removeFirst()).toBe(false);
        expect(list.first).toBeNull();
        expect(list.last).toBeNull();
        expect(list.length).toBe(0);
      });
    });

    describe('should removeLast', () => {
      it('filled linked list', () => {
        const nextLast = list.last.prev;
        expect(list.removeLast()).toBe(true);
        expect(list.last).toEqual(nextLast);
        expect(nextLast.next).toBeNull();
        expect(list.length).toBe(2);
      });

      it('single element', () => {
        list = new LinkedList<string>(['A']);
        expect(list.removeLast()).toBe(true);
        expect(list.first).toBeNull();
        expect(list.last).toBeNull();
        expect(list.length).toBe(0);
      });

      it('empty', () => {
        list = new LinkedList<string>();
        expect(list.removeLast()).toBe(false);
        expect(list.first).toBeNull();
        expect(list.last).toBeNull();
        expect(list.length).toBe(0);
      });
    });

    describe('should remove', () => {
      it('node - start', () => {
        expect(list.remove(list.first)).toBe(true);
        expect(list.first.value).toBe('B');
        expect(list.first.next).toEqual(list.last);
        expect(list.first.prev).toBeNull();
        expect(list.length).toBe(2);
      });
      it('value - start', () => {
        expect(list.remove('A')).toBe(true);
        expect(list.first.value).toBe('B');
        expect(list.first.next).toEqual(list.last);
        expect(list.first.prev).toBeNull();
        expect(list.length).toBe(2);
      });
      it('node - middle', () => {
        const node = list.first.next;
        expect(list.remove(node)).toBe(true);
        expect(list.first.next).toEqual(list.last);
        expect(list.last.prev).toEqual(list.first);
        expect(list.length).toBe(2);
      });
      it('value - middle', () => {
        expect(list.remove('B')).toBe(true);
        expect(list.first.next).toEqual(list.last);
        expect(list.last.prev).toEqual(list.first);
        expect(list.length).toBe(2);
      });
      it('node - end', () => {
        expect(list.remove(list.last)).toBe(true);
        expect(list.last.value).toBe('B');
        expect(list.last.next).toBeNull();
        expect(list.last.prev).toEqual(list.first);
        expect(list.length).toBe(2);
      });
      it('value - end', () => {
        expect(list.remove('C')).toBe(true);
        expect(list.last.value).toBe('B');
        expect(list.last.next).toBeNull();
        expect(list.last.prev).toEqual(list.first);
        expect(list.length).toBe(2);
      });
    });
  });

  describe('search operations', () => {
    let list: LinkedList<string>;
    beforeEach(() => {
      list = new LinkedList(['A', 'B', 'C', 'X', 'B', 'Y'])
    });

    it('shold return undefined as notFound', () => {
      let node = list.find('Z');
      expect(node).toBeUndefined();
      node = list.findLast('Z');
      expect(node).toBeUndefined();
      list = new LinkedList<string>();
      node = list.find('Z');
      expect(node).toBeUndefined();
      node = list.findLast('Z');
      expect(node).toBeUndefined();
    });

    it('should find first value', () => {
      const node = list.find('B');
      expect(node).toBeInstanceOf(LinkedListNode);
      expect(node.value).toEqual('B');
      expect(node).toEqual(list.first.next);
    });

    it('should find last value', () => {
      const node = list.findLast('B');
      expect(node).toBeInstanceOf(LinkedListNode);
      expect(node.value).toEqual('B');
      expect(node).toEqual(list.last.prev);
    });

    it('should support custom comparator', () => {
      const list = new LinkedList([
        { name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'X' }, { name: 'B' }, { name: 'Y' }
      ], (a: { name: string }, b : { name: string }) => (a.name === b.name ? 0 : a.name > b.name ? -1 : 1) );
      let node = list.find({ name: 'B' });
      expect(node).toBeInstanceOf(LinkedListNode);
      expect(node.value).toEqual({ name: 'B' });
      expect(node).toEqual(list.first.next);
      node = list.findLast({ name: 'B' });
      expect(node).toBeInstanceOf(LinkedListNode);
      expect(node.value).toEqual({ name: 'B' });
      expect(node).toEqual(list.last.prev);
    });

    it('should "has" element by value', () => {
      expect(list.has('X')).toBeTruthy();
      expect(list.has('Z')).toBeFalsy();
    });
  });

  it('should reverse list', () => {
    const collection = ['A', 'B', 'C', 'D', 'E'];
    const reversed = collection.slice().reverse();
    const list = new LinkedList(collection);
    list.reverse();
    let current = list.first;
    reversed.forEach((el) => {
      expect(current.value).toEqual(el);
      current = current.next;
    })
  });

  it('should export to array', () => {
    const collection = ['A', 'B', 'C', 'D', 'E'];
    const reversed = collection.slice().reverse();
    const list = new LinkedList(collection);
    list.reverse();
    expect(list.toArray()).toEqual(reversed);
  });

  it('should iterate elements', () => {
    const list = new LinkedList(['X', 'Y', 'Z'])
    const mock = jest.fn();
    for (let v of list) {
      mock(v);
    }
    expect(mock.mock.calls).toEqual([['X'], ['Y'], ['Z']]);
  });

  it('should return itself for chaining', () => {
    const list = new LinkedList([1, 2, 3, 4, 5, 6, 7]);
    expect(list.insertAfter(list.first, 1.5)).toBe(list);
    expect(list.insertBefore(list.last, 6.5)).toBe(list);
    expect(list.insertFirst(0)).toBe(list);
    expect(list.insertLast(8)).toBe(list);
    expect(list.reverse()).toBe(list);
  });
});
