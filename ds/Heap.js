import { firstChildIndex, parentIndex } from './Tree'

/**
 * Self Balancing :
 * Sort given array, if ascending = true use max heap else uses minHeap
 * @param array
 * @param ascending
 */

export function Heap(array, ascending = true) {
    const heap = []
    this.insert = function (value) {
        let i = heap.length
        heap.push(value)
        _moveup(heap, i, ascending)
    }

    this.getValue = function () {
        return heap
    }

    this.pop = function () {
        const value = heap[0]
        heap[0] = heap.pop()
        _movedown(heap, 0, ascending)
        return value
    }

    this.peek = function () {
        if (heap.length > 0) return heap[0]
        return null
    }

    for (let i = 0; i < array.length; i++) {
        this.insert(array[i])
    }

    function _moveup(heap, index, ascending) {
        // compare parent and child, if smaller then swap
        let parent = parentIndex(index)
        if (parent >= 0) {
            if (_checkIfSwapNeeded(heap, parent, index, ascending)) {
                _swap(heap, parent, index)
                _moveup(heap, parent, ascending)
            }
        }
    }

    function _validIndex(index) {
        if (index < heap.length && index >= 0) {
            return index
        }
        return -1
    }

    function _swap(heap, parent, index) {
        let temp = heap[parent]
        heap[parent] = heap[index]
        heap[index] = temp
    }

    /**
     * Move min[left, top, right] to top and swap left and right
     * @param heap
     * @param index
     * @param ascending
     * @private
     */
    function _movedown(heap, index, ascending) {
        let firstChild = _validIndex(firstChildIndex(index))
        let rightChild = _validIndex(firstChild + 1)

        if (firstChild > 0) {
            const compareLeftChild = _checkIfSwapNeeded(
                heap,
                index,
                firstChild,
                ascending
            )
            if (rightChild > 0) {
                const compareRightChild = _checkIfSwapNeeded(
                    heap,
                    index,
                    rightChild,
                    ascending
                )
                if (compareLeftChild || compareRightChild) {
                    if (
                        _checkIfSwapNeeded(
                            heap,
                            rightChild,
                            firstChild,
                            ascending
                        )
                    ) {
                        _swap(heap, firstChild, index)
                        _movedown(heap, firstChild, ascending)
                    } else {
                        _swap(heap, rightChild, index)
                        _movedown(heap, rightChild, ascending)
                    }
                }
            } else if (compareLeftChild) {
                _swap(heap, firstChild, index)
                _movedown(heap, firstChild, ascending)
            }
        }
    }

    function _checkIfSwapNeeded(heap, leftIndex, rightIndex, ascending) {
        if (ascending) {
            return heap[leftIndex] > heap[rightIndex]
        } else {
            return heap[leftIndex] < heap[rightIndex]
        }
    }
}
