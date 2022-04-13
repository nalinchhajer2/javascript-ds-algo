/**
 *
 */
import { firstChildIndex } from './Tree'

const DUMMY = Infinity
export class SegmentTree {
    constructor(array, operation) {
        this._operation =
            operation ??
            function (l, r) {
                return l + r
            }
        this._build(array ?? [])
    }

    _calculateH(n) {
        return Math.ceil(Math.log(n) / Math.log(2))
    }

    _calculateMaxH(h) {
        return 1 << (h + 1)
    }

    _startPosArray(h) {
        return (1 << h) - 1
    }

    _build(array) {
        this.N = array.length
        this.H = this._calculateH(this.N)
        this.maxH = this._calculateMaxH(this.H)
        this.segmentArray = new Array(this.maxH).fill(DUMMY)
        let startPos = this._startPosArray(this.H)
        for (let i = 0; i < array.length; i++) {
            this.segmentArray[startPos + i] = array[i]
        }
        this._traversalLRT(0, this.segmentArray)
    }

    _traversalLRT(root, array) {
        if (root < array.length) {
            let leftIndex = firstChildIndex(root)
            let left = this._traversalLRT(leftIndex, array)
            let right = this._traversalLRT(leftIndex + 1, array)
            if (left !== DUMMY || right !== DUMMY) {
                array[root] = this._operate(left, right)
            }
            return array[root]
        }
        return DUMMY
    }

    _operate(l, r) {
        if (l !== DUMMY && r !== DUMMY) {
            return this._operation(l, r)
        }
        if (l !== DUMMY) {
            return l
        }
        return DUMMY
    }
}
