/**
 * Indexed Priority Queue:
 * Queue with each element have priority. Larger priority element will be executed first
 * enqueue and dequeue
 * Uses heap ds and give logarithmic time insert and remove
 */
import { firstChildIndex, parentIndex, validIndex } from './Tree'

export class HeapPriorityQueue {
    constructor(ascending = false) {
        this.heap = []
        this.index = {}
        this.ascending = ascending
    }

    enqueue(elem, priority = 1) {
        let index = this.heap.length
        if (this.index[elem] === undefined) {
            let node = new InternalNode(elem, priority)
            this.heap.push(node)
            this.index[elem] = index
            this._moveUp(index)
        } else {
            throw 'ELEMENT_ALREADY_ADDED'
        }
    }

    dequeue() {
        if (this.heap.length > 0) {
            return this._remove(0).value
        }
        throw 'N0_ELEMENT_IN_QUEUE'
    }

    _remove(index) {
        let node = this.heap[index]
        delete this.index[node.value]
        let last = this.heap.pop()
        if (this.heap.length === 0 || this.heap.length === index) {
            return node
        }
        this.heap[index] = last
        this.index[last.value] = 0
        // move up is not needed as last element cannot be greater than parent in heap
        this._moveDown(index)
        return node
    }

    length() {
        return this.heap.length
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0].value : null
    }

    changePriority(elem, newPriority) {
        let index = this._position(elem)
        if (index !== null) {
            this.heap[index].priority = newPriority
            // if new priority is greater, move top
            // else move down
            let compare = []
            compare.push(index)
            let parent = validIndex(parentIndex(index), this.heap)
            if (parent >= 0) {
                compare.push(parent)
            }
            let leftIndex = validIndex(firstChildIndex(index), this.heap)
            if (leftIndex >= 0) {
                compare.push(leftIndex)
                let rightIndex = validIndex(leftIndex + 1, this.heap)
                if (rightIndex >= 0) {
                    compare.push(rightIndex)
                }
            }
            let pIndex = this._findPriority(...compare)
            if (pIndex !== parent) {
                this._moveUp(index)
            } else if (pIndex !== index) {
                this._moveDown(index)
            }
        } else {
            throw 'ELEMENT_NOT_AVAILABLE'
        }
    }

    remove(elem) {
        let index = this._position(elem)
        if (index !== null) {
            this._remove(index)
        }
    }

    contains(elem) {
        let index = this._position(elem)
        return index !== null
    }

    getPriority(elem) {
        if (this.contains(elem)) {
            return this.heap[this.index[elem]].priority
        }
        return null
    }

    _position(elem) {
        if (this.index[elem] !== undefined) {
            return this.index[elem]
        }
        return null
    }

    // Move element up, to fit in the priority
    _moveUp(index) {
        if (index > 0) {
            let parent = parentIndex(index)
            const pIndex = this._findPriority(index, parent)
            if (pIndex !== parent) {
                this._swap(parent, index)
                this._moveUp(parent)
            }
        }
    }

    // large value among the 2 nodes will replacing parent
    _moveDown(index) {
        let leftIndex = validIndex(firstChildIndex(index), this.heap)
        if (leftIndex >= 0) {
            let compare = []
            compare.push(index)
            compare.push(leftIndex)
            let rightIndex = validIndex(leftIndex + 1, this.heap)
            if (rightIndex >= 0) {
                // compare parent, left and right
                compare.push(rightIndex)
            }
            const pIndex = this._findPriority(...compare)
            if (pIndex !== index) {
                this._swap(index, pIndex)
                this._moveDown(pIndex)
            }
        }
    }

    // return element with the highest priority, if no priority found return first element
    _findPriority(...nodeIndex) {
        // return max priority nodes
        let pNode = nodeIndex[0]
        for (let i = 1; i < nodeIndex.length; i++) {
            if (this.ascending === true) {
                if (
                    this.heap[pNode].priority > this.heap[nodeIndex[i]].priority
                ) {
                    pNode = nodeIndex[i]
                }
            } else {
                if (
                    this.heap[pNode].priority < this.heap[nodeIndex[i]].priority
                ) {
                    pNode = nodeIndex[i]
                }
            }
        }
        return pNode
    }

    // Swap 2 nodes
    _swap(leftIndex, rightIndex) {
        let temp = this.heap[leftIndex]
        this.heap[leftIndex] = this.heap[rightIndex]
        this.heap[rightIndex] = temp
        this.index[this.heap[leftIndex].value] = leftIndex
        this.index[this.heap[rightIndex].value] = rightIndex
    }
}

class InternalNode {
    constructor(elem, priority) {
        this.value = elem
        this.priority = priority
    }
}
