from collections import deque
from typing import Any
import unittest
import doctest

# 固定長スタッククラス


class TestFixedStack(unittest.TestCase):
    def test_push(self):
        s = FixedStack(64)
        s.push(1)
        self.assertEqual(s.dump(), [1])

    def test_find(self):
        s = FixedStack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        self.assertEqual(s.find(2), 1)

    def test_count(self):
        s = FixedStack(64)
        s.push(1)
        s.push(1)
        s.push(1)
        self.assertEqual(s.count(1), 3)

    def test_peek(self):
        s = FixedStack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        self.assertEqual(s.peek(), 3)

    def test_pop(self):
        s = FixedStack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        self.assertEqual(s.pop(), 3)
        self.assertEqual(s.__len__(), 2)

    def test_clear(self):
        s = FixedStack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        s.clear()
        self.assertEqual(s.is_empty(), True)


class FixedStack:
    """固定長スタッククラス
    >>> stack = FixedStack(64)
    >>> stack.push(1)
    >>> stack.push(2)
    >>> stack.push(3)
    >>> stack.dump()
    [1, 2, 3]
    >>> stack.peek()
    3
    >>> stack.find(2)
    1
    >>> stack.count(2)
    1
    >>> stack.clear()
    >>> stack.is_empty()
    True
    """

    class Empty(Exception):
        pass

    class Full(Exception):
        pass

    def __init__(self, capacity: int = 256) -> None:
        self.stk = [None] * capacity
        self.capacity = capacity
        self.ptr = 0

    def __len__(self) -> int:
        return self.ptr

    def is_empty(self) -> bool:
        return self.ptr <= 0

    def is_full(self) -> bool:
        return self.ptr >= self.capacity

    def push(self, value: Any) -> None:
        if self.is_full():
            raise FixedStack.Full
        self.stk[self.ptr] = value
        self.ptr += 1

    def find(self, value: Any) -> Any:
        for i in range(self.ptr - 1, -1, -1):
            if self.stk[i] == value:
                return i
        return -1

    def count(self, value: Any) -> bool:
        c = 0
        for i in range(self.ptr):
            if self.stk[i] == value:
                c += 1
        return c

    def __contains__(self, value: Any) -> bool:
        return self.count(value)

    def pop(self) -> Any:
        if self.is_empty():
            raise FixedStack.Empty
        self.ptr -= 1
        return self.stk[self.ptr]

    def peek(self) -> Any:
        if self.is_empty():
            raise FixedStack.Empty
        return self.stk[self.ptr - 1]

    def clear(self) -> None:
        self.ptr = 0

    def dump(self) -> None:
        if self.is_empty():
            print('スタックは空です。')
        else:
            return self.stk[:self.ptr]

# 固定長スタッククラス（collection.dequeを利用)


class TestStack(unittest.TestCase):
    def test_push(self):
        s = Stack(64)
        s.push(1)
        self.assertEqual(s.dump(), [1])

    def test_find(self):
        s = Stack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        self.assertEqual(s.find(2), 1)

    def test_count(self):
        s = Stack(64)
        s.push(1)
        s.push(1)
        s.push(1)
        self.assertEqual(s.count(1), 3)

    def test_peek(self):
        s = Stack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        self.assertEqual(s.peek(), 3)

    def test_pop(self):
        s = Stack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        self.assertEqual(s.pop(), 3)
        self.assertEqual(s.__len__(), 2)

    def test_clear(self):
        s = Stack(64)
        s.push(1)
        s.push(2)
        s.push(3)
        s.clear()
        self.assertEqual(s.is_empty(), True)


class Stack:
    def __init__(self, maxlen: int = 256) -> None:
        self.capacity = maxlen
        self.__stk = deque([], maxlen)

    def __len__(self) -> int:
        return len(self.__stk)

    def is_empty(self) -> bool:
        return not self.__stk

    def is_full(self) -> bool:
        return len(self.__stk) == self.__stk.maxlen

    def push(self, value: Any) -> None:
        self.__stk.append(value)

    def pop(self) -> Any:
        return self.__stk.pop()

    def peek(self) -> Any:
        return self.__stk[-1]

    def clear(self) -> None:
        self.__stk.clear()

    def find(self, value: Any) -> Any:
        try:
            return self.__stk.index(value)
        except ValueError:
            return -1

    def count(self, value: Any) -> int:
        return self.__stk.count(value)

    def dump(self) -> Any:
        return list(self.__stk)

# 固定長キュークラスFixedQueueの利用例


class TestFixedQueue(unittest.TestCase):
    def test_enque(self):
        q = FixedQueue(64)
        q.enque(1)
        self.assertEqual(q.dump()[0], 1)

    def test_deque(self):
        q = FixedQueue(64)
        q.enque(1)
        q.enque(2)
        q.enque(3)
        self.assertEqual(q.deque(), 1)

    def test_peek(self):
        q = FixedQueue(64)
        q.enque(1)
        q.enque(2)
        q.enque(3)
        self.assertEqual(q.peek(), 1)

    def test_find(self):
        q = FixedQueue(64)
        q.enque(1)
        q.enque(2)
        q.enque(3)
        self.assertEqual(q.find(2), 1)

    def test_count(self):
        q = FixedQueue(64)
        q.enque(2)
        q.enque(2)
        q.enque(2)
        self.assertEqual(q.count(2), 3)

    def test_clear(self):
        q = FixedQueue(64)
        q.enque(1)
        q.enque(2)
        q.enque(3)
        q.clear()
        self.assertTrue(q.is_empty())

    def test_dump(self):
        q = FixedQueue(64)
        q.enque(1)
        q.enque(2)
        q.enque(3)
        self.assertEqual(q.dump()[2], 3)
        q.clear()
        self.assertEqual(q.dump(), 'キューは空です。')


class FixedQueue:
    class Empty(Exception):
        pass

    class Full(Exception):
        pass

    def __init__(self, capacity: int) -> None:
        self.no = 0
        self.front = 0
        self.rear = 0
        self.capacity = capacity
        self.que = [None] * capacity

    def __len__(self) -> int:
        return self.no

    def is_empty(self) -> bool:
        return self.no <= 0

    def is_full(self) -> bool:
        return self.no >= self.capacity

    def enque(self, x: Any) -> None:
        if self.is_full():
            raise FixedQueue.Full
        self.que[self.rear] = x
        self.rear += 1
        self.no += 1
        if self.rear == self.capacity:
            self.rear = 0

    def deque(self) -> Any:
        if self.is_empty():
            raise FixedQueue.Empty
        x = self.que[self.front]
        self.front += 1
        self.no -= 1
        if self.front == self.capacity:
            self.front = 0
        return x

    def peek(self) -> Any:
        if self.is_empty():
            raise FixedQueue.Empty
        return self.que[self.front]

    def find(self, value: Any) -> Any:
        for i in range(self.no):
            idx = (i + self.front) % self.capacity
            if self.que[idx] == value:
                return idx
        return -1

    def count(self, value: Any) -> bool:
        c = 0
        for i in range(self.no):
            idx = (i + self.front) % self.capacity
            if self.que[idx] == value:
                c += 1
        return c

    def __contains__(self, value: Any) -> bool:
        return self.count(value)

    def clear(self):
        self.no = self.front = self.rear = 0

    def dump(self) -> Any:
        if self.is_empty():
            return 'キューは空です。'
        return list(self.que)


doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
