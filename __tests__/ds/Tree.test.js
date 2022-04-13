import {
    _createTreeNode,
    firstChildIndex,
    parentIndex,
    pathToLeafNode,
    treeFromArray,
    TreeNode,
    _treeToArray,
    heapSort,
    createTreeFromNumberElement,
    treeTraversalLRT,
    treeTraversalLTR,
    treeTraversalTLR,
} from '../../ds/Tree'
import { Heap } from '../../ds/Heap'
import { shortenPath } from '../../problems/AE_ShortedFileSystemPath'
import { HeapPriorityQueue } from '../../ds/HeapPriorityQueue'
import { AVLTree } from '../../ds/AVLTree'
import { SegmentTree } from '../../ds/SegmentTree'

describe('Test tree', () => {
    test('TreeNode', () => {
        expect(new TreeNode(0).description()).toEqual('0')
        expect(new TreeNode(0, new TreeNode(1)).description()).toEqual('0, 1')
        expect(
            new TreeNode(0, new TreeNode(1), new TreeNode(2)).description()
        ).toEqual('0, 1, 2')

        expect(firstChildIndex(0)).toEqual(1)
        expect(firstChildIndex(1)).toEqual(3)
        expect(firstChildIndex(2)).toEqual(5)
        expect(firstChildIndex(3)).toEqual(7)

        expect(parentIndex(1)).toEqual(0)
        expect(parentIndex(3)).toEqual(1)
        expect(parentIndex(5)).toEqual(2)
        expect(parentIndex(6)).toEqual(2)

        expect(treeFromArray([1, 2, 3, 4, 5, 6, 7, 8]).findHeight()).toEqual(4)
        expect(treeFromArray([1, 2, 3, 4, 5, 6, 7]).findHeight()).toEqual(3)
        expect(treeFromArray([1, null, 3, 4, 5, 6, 7, 8]).findHeight()).toEqual(
            3
        ) // 5,6,8 is invalid
        expect(
            treeFromArray([1, 2, 3, null, null, 6, 7, 8]).findHeight()
        ).toEqual(3)
        expect(
            treeFromArray([
                1,
                null,
                3,
                null,
                null,
                6,
                7,
                null,
                null,
                null,
                null,
                8,
            ]).findHeight()
        ).toEqual(4)
    })

    test('createTreeNode', () => {
        let root = _createTreeNode([1], null, 0)
        expect(root.value).toEqual(1)
        expect(root.left).toEqual(null)
        expect(root.right).toEqual(null)

        root = _createTreeNode([1, 2], null, 0)
        expect(root.left.value).toEqual(2)
        expect(root.left.left).toEqual(null)
        expect(root.left.right).toEqual(null)

        root = _createTreeNode([1, 2, 3, 4, 5, 6], null, 0)
        expect(root.left.right.value).toEqual(5)
    })

    test('treeFromArray', () => {
        expect(treeFromArray([1])).not.toEqual(null)
        expect(treeFromArray([])).toEqual(null)
        expect(_treeToArray(treeFromArray([1, 2, 3, 4, 5, 6, 7, 8]))).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8,
        ])
        expect(_treeToArray(treeFromArray([0]))).toEqual([0])
        expect(_treeToArray(treeFromArray([]))).toEqual([])
        expect(
            _treeToArray(treeFromArray([1, 2, null, 4, 5, 6, 7, 8]))
        ).toEqual([1, 2, null, 4, 5, 8])
    })

    test('pathToLeftMostLeafNode', () => {
        expect(
            pathToLeafNode(
                new TreeNode(
                    1,
                    new TreeNode(2, null, new TreeNode(3, new TreeNode(4)))
                )
            )
        ).toEqual([null, 0, 1, 0])

        expect(
            pathToLeafNode(new TreeNode(1, new TreeNode(2), new TreeNode(3)))
        ).toEqual([null, 0])

        let sampleTree = treeFromArray([
            1,
            null,
            3,
            null,
            null,
            6,
            7,
            null,
            null,
            null,
            null,
            8,
        ])
        expect(pathToLeafNode(sampleTree, true)).toEqual([null, 1, 0, 0])
        expect(pathToLeafNode(sampleTree, false)).toEqual([null, 1, 1])
    })

    test('heap sort', () => {
        expect(new Heap([2, 1]).getValue()).toEqual([1, 2])
        expect(new Heap([3, 2, 1]).getValue()).toEqual([1, 3, 2])
        expect(new Heap([1, 2, 3, 4]).getValue()).toEqual([1, 2, 3, 4])
        expect(new Heap([4, 3, 2, 1]).getValue()).toEqual([1, 2, 3, 4])
        expect(new Heap([3, 2, 1, 4]).getValue()).toEqual([1, 3, 2, 4])
        expect(new Heap([3, 4, 2, 1], false).getValue()).toEqual([4, 3, 2, 1])
        expect(new Heap([1, 2, 3, 4], false).getValue()).toEqual([4, 3, 2, 1])
        let heap = new Heap([3, 2, 1, 4, 8, 9, -1], false)
        heap.pop()
        expect(heap.getValue()).toEqual([8, 4, 1, 2, 3, -1])
        heap.pop()
        expect(heap.peek()).toEqual(4)
        expect(heap.getValue()).toEqual([4, 3, 1, 2, -1])
        heap.pop()
        expect(heap.getValue()).toEqual([3, 2, 1, -1])

        heap = new Heap([3, 2, 1, 4, 8, 9, -1])
        heap.pop()
        expect(heap.getValue()).toEqual([1, 3, 2, 4, 8, 9])
        heap.pop()
        expect(heap.getValue()).toEqual([2, 3, 9, 4, 8])

        heap = new Heap([4, 4, 4, 1, 2])
        heap.pop()
        expect(heap.getValue()).toEqual([2, 4, 4, 4])

        heap = new Heap([6, 5, 1, 2, 9, 8, 7, 2, 2, 3, 4, 0, 1, 2, 1])
        expect(heap.getValue()).toEqual([
            0, 2, 1, 2, 3, 1, 1, 6, 2, 9, 4, 8, 5, 7, 2,
        ])

        heap = new Heap([6, 5, 1, 2, 9, 8, 7, 2, 2, 3, 4, 0, 1, 2, 1], false)
        expect(heap.getValue()).toEqual([
            9, 6, 8, 2, 5, 1, 7, 2, 2, 3, 4, 0, 1, 2, 1,
        ])
    })

    test('shortenPath', () => {
        expect(shortenPath('/foo/../')).toEqual('/')
        expect(shortenPath('/foo/bar/../.././//')).toEqual('/')
        expect(shortenPath('./foo/bar//.///')).toEqual('/foo/bar/')
        expect(shortenPath('../foo/bar/../../.././//')).toEqual('/')
    })

    test('tree LRT traversal', () => {
        let tree = createTreeFromNumberElement([4, 4, 0, 0, 1, 0])
        expect(tree.toArray()).toEqual([
            0,
            1,
            2,
            3,
            4,
            null,
            null,
            null,
            null,
            null,
            10,
        ])
        tree = createTreeFromNumberElement([4, 4, 0, 2, 1, 2, 1, 2, 1])
        expect(treeTraversalLRT(tree)).toEqual([
            15, 11, 7, 3, 18, 14, 10, 4, 1, 2, 0,
        ])
    })

    test('PriorityQueue', () => {
        let queue = new HeapPriorityQueue()
        queue.enqueue('A', 5)
        queue.enqueue('B', 3)
        expect(queue.dequeue()).toEqual('A')
        queue.enqueue('C', 3)
        queue.enqueue('D', 3)
        queue.enqueue('E', 4)
        expect(queue.dequeue()).toEqual('E')
        queue.enqueue('F', 5)
        queue.enqueue('G', 6)
        queue.enqueue('H', 7)
        expect(queue.dequeue()).toEqual('H')
        expect(queue.dequeue()).toEqual('G')
        expect(queue.dequeue()).toEqual('F')

        queue = new HeapPriorityQueue()
        for (let i = 0; i < 10; i++) {
            queue.enqueue(i, i)
        }
        let i = 10 - 1
        while (queue.peek() !== null) {
            expect(queue.dequeue()).toEqual(i)
            i--
        }
        expect(queue.length()).toEqual(0)
        expect(queue.index).toEqual({})

        queue.enqueue('C', 3)
        queue.enqueue('D', 3)
        queue.enqueue('E', 4)
        queue.enqueue('F', 5)
        queue.enqueue('G', 6)
        queue.enqueue('H', 7)
        expect(queue.contains('D')).toEqual(true)
        queue.remove('F')
        queue.remove('D')
        expect(queue.contains('D')).toEqual(false)
        expect(queue.getPriority('C')).toEqual(3)
        expect(queue._findPriority(1, 0, 3)).toEqual(0)
        expect(queue._findPriority(0)).toEqual(0)
        expect(queue._findPriority(1, 0)).toEqual(0)
        expect(queue._findPriority(0, 1)).toEqual(0)
        queue.changePriority('C', 10)
        queue.changePriority('H', 1)
        queue.changePriority('G', 2)
        queue.changePriority('E', 7)
        expect(queue.peek()).toEqual('C')
        expect(queue.dequeue()).toEqual('C')
        expect(queue.dequeue()).toEqual('E')
        expect(queue.dequeue()).toEqual('G')
        expect(queue.dequeue()).toEqual('H')
        expect(queue.length()).toEqual(0)
        queue.enqueue('G', 6)
        queue.enqueue('H', 7)
        queue.remove('H')
        queue.remove('G')
        expect(queue.length()).toEqual(0)
    })

    test('AVL Tree', () => {
        let tree = new AVLTree()
        tree.insert(7)
        tree.insert(8)
        tree.insert(9)
        tree.insert(10)
        tree.insert(11)
        tree.insert(12)
        tree.insert(1)
        tree.insert(2)
        tree.insert(3)
        tree.insert(4)
        tree.insert(5)
        tree.insert(6)
        expect(Math.abs(tree.root.bf())).toBeLessThan(2)
        expect(tree.max()).toEqual(12)
        expect(tree.min()).toEqual(1)
        expect(tree.findNode(12).value).toEqual(12)
        expect(tree.findNode(1).value).toEqual(1)
        expect(tree.findNode(8).value).toEqual(8)
        expect(tree.findNode(13)).toEqual(null)

        expect(treeTraversalLTR(tree.root)).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        ])
        expect(treeTraversalLRT(tree.root)).toEqual([
            1, 3, 2, 6, 5, 4, 9, 8, 12, 11, 10, 7,
        ])
        expect(treeTraversalTLR(tree.root)).toEqual([
            7, 4, 2, 1, 3, 5, 6, 10, 8, 9, 11, 12,
        ])
        expect(pathToLeafNode(tree.root)).toEqual([null, 0, 0, 0])

        tree = new AVLTree()
        for (let x of 'VSXQGJPLNVCDF') {
            tree.insert(x)
        }
        expect(treeTraversalLTR(tree.root)).toEqual([
            'C',
            'D',
            'F',
            'G',
            'J',
            'L',
            'N',
            'P',
            'Q',
            'S',
            'V',
            'X',
        ])
    })

    test('segment tree', () => {
        let segment = new SegmentTree(new Array(7).fill(1))
        expect(segment._calculateH(14)).toEqual(4)
        expect(segment._calculateMaxH(4)).toEqual(32)
        expect(segment._calculateH(7)).toEqual(3)
        expect(segment._calculateMaxH(3)).toEqual(16)
        expect(segment._startPosArray(3)).toEqual(7)
        expect(segment.segmentArray).toEqual([
            7,
            4,
            3,
            2,
            2,
            2,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            Infinity,
            Infinity,
        ])
    })
})
