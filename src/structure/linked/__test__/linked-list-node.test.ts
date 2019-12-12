/**
 * Created by Pencroff on 09-Dec-2019.
 */

// @ts-ignore
import { cases } from '../../../../helper/cases';
import { LinkedListNode } from '../linked-list-node';

describe('linked-list-node', () => {
  cases('should contain', (opts) => {
    const node = new LinkedListNode(opts.value);
    expect(node.value).toEqual(opts.resValue);
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  }, [
    { name: 'simple value', value: 'abc', resValue: 'abc' },
    { name: 'object value', value: { name: 'abc', age: 1 },  resValue: { name: 'abc', age: 1 } },
  ]);
  cases('should use next link', (opts) => {
    const node = new LinkedListNode(opts.value, opts.next);
    expect(node.value).toEqual(opts.resValue);
    expect(node.next).toEqual(opts.resNext);
    expect(node.prev).toBeNull();
  }, [
    { name: 'simple value', value: 'abc', next: new LinkedListNode('xyz'),
                             resValue: 'abc', resNext: new LinkedListNode('xyz') },
    { name: 'object value', value: { name: 'abc', age: 1 }, next: new LinkedListNode('xyz'),
                             resValue: { name: 'abc', age: 1 }, resNext: new LinkedListNode('xyz') },
  ]);
  cases('should use prev link', (opts) => {
    const node = new LinkedListNode(opts.value, opts.next, opts.prev);
    expect(node.value).toEqual(opts.resValue);
    expect(node.next).toEqual(opts.resNext);
  }, [
    { name: 'simple value', value: 'abc', next: new LinkedListNode('xyz'), prev: new LinkedListNode('123'),
                             resValue: 'abc', resNext: new LinkedListNode('xyz'), resPrev: new LinkedListNode('123') },
    { name: 'object value', value: { name: 'abc', age: 1 }, next: new LinkedListNode('xyz'), prev: new LinkedListNode('123'),
                             resValue: { name: 'abc', age: 1 }, resNext: new LinkedListNode('xyz'), resPrev: new LinkedListNode('123') },
  ]);
  it('should stringify simple value', () => {
    const node = new LinkedListNode('abc');
    expect(node.toString()).toEqual('abc');
    node.value = 'xyz';
    expect(node.toString()).toEqual('xyz');
  });
  it('should support serializer', () => {
    const serializer = (v: any) => `${v.name} - ${v.age}`;
    const node = new LinkedListNode({ name: 'abc', age: 10 });
    expect(node.toString(serializer)).toEqual('abc - 10');
  });
});
