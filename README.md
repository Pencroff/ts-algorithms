# ts-algorithms
Typescript algorithms and Data Structures

[![Build Status](https://travis-ci.org/Pencroff/ts-algorithms.svg?branch=master)](https://travis-ci.org/Pencroff/ts-algorithms)
[![codecov](https://codecov.io/gh/Pencroff/ts-algorithms/branch/master/graph/badge.svg)](https://codecov.io/gh/Pencroff/ts-algorithms)

## Get started

`npm i @pencroff/ts-algorithms --save`

The package doesn't provide any common exports. All required imports should be per item.
For example:

```
import { genericComparator } from '@pencroff/ts-algorithms/dist/primitive/comparator'

const res = genericComparator('A', 'B'); // returns -1, check primitives for details
```

## Algorithms

* Structures
    * [Linked list (generic doubly linked)](https://ts-algorithms.pencroff.com/classes/structure.linkedlist.html)
    * [Queue (FIFO)](https://ts-algorithms.pencroff.com/classes/structure.queue.html)
    * [Stack (LIFO)](https://ts-algorithms.pencroff.com/classes/structure.stack.html)
* Search
    * [Linear Search](https://ts-algorithms.pencroff.com/modules/search.html#linearindexof)
    * [Binary Search](https://ts-algorithms.pencroff.com/modules/search.html#binaryindexof)
* Sorting
    * [Quicksort](https://ts-algorithms.pencroff.com/modules/sort.html#qsort)
    

## Theory

Big O notation is used in computer science to describe the performance or complexity of an algorithm.

![Big O chart](https://ts-algorithms.pencroff.com/assets/big-o-chart.svg)
source: www.bigocheatsheet.com

Big O can be used for measuring time complexity or space / memory complexity.

References:

* 📝 [The Big O Notation](https://dev.to/sarah_chima/the-big-o-notation-an-introduction-34f7)
* 📽️ [Big O Notation](https://www.youtube.com/watch?v=v4cd1O4zkGw)
