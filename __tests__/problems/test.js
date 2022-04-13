import {
    distanceNumber,
    numberOfPermutation,
    smallestDifference,
    stepMultiplication,
} from '../../problems/AE_smallest_difference'
import {
    lavenshteinDistance,
    minTopLeftDiagonalLeft,
} from '../../problems/AE_Lavenshtein_distance'
import { createTreeFromNumberElement } from '../../ds/Tree'
import {
    binaryTreeDiameter,
    findSuccessor,
    heightBalancedBinaryTree,
} from '../../problems/AE_Tree_problems'
import { Graph } from '../../ds/Graph'
import {
    findShortestPathToEachNode,
    shortestPathDijkstra,
} from '../../problems/AC_Topological_Sort'
import { arrayToLinkedList } from '../../ds/LinkedList'
import { linkedListPalindrome } from '../../problems/AE_Linked_List_Palindrome'
import { multiStringSearch } from '../../problems/AE_multi_string_search'
import {
    findMidIndex,
    findPeak,
    maximumProfitSellingStock,
} from '../../problems/GFG_Stock_MaximumProfit'
import { balancedBrackets } from '../../problems/AE_BalancedBrackets'

describe('Problems Test', () => {
    test('Smallest Difference', () => {
        expect(smallestDifference([-1, 10], [1, 14])).toEqual([-1, 1])
        expect(smallestDifference([10, -1], [14, 1])).toEqual([-1, 1])
        expect(smallestDifference([-1], [1])).toEqual([-1, 1])
        expect(smallestDifference([1], [1])).toEqual([1, 1])
        expect(smallestDifference([-900, 1], [-879, 1])).toEqual([1, 1])

        expect(
            smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17])
        ).toEqual([28, 26])
    })

    test('distanceNumber', () => {
        expect(distanceNumber(-1, 1)).toEqual(2)
        expect(distanceNumber(-3, -1)).toEqual(2)
        expect(distanceNumber(1, 3)).toEqual(2)
        expect(distanceNumber(-1, -1)).toEqual(0)
        expect(distanceNumber(1, 1)).toEqual(0)
        expect(distanceNumber(-5, 5)).toEqual(10)
        expect(distanceNumber(-5, -4)).toEqual(1)
    })

    test('stepMultiplication', () => {
        expect(stepMultiplication(4, 3)).toEqual(4)
        expect(stepMultiplication(4, 2)).toEqual(12)
    })

    test('numberOfCombination', () => {
        expect(numberOfPermutation(4, 1)).toEqual(4)
        expect(numberOfPermutation(4, 2)).toEqual(6)
        expect(numberOfPermutation(4, 3)).toEqual(4)
        expect(numberOfPermutation(4, 0)).toEqual(1)
        expect(numberOfPermutation(4, 4)).toEqual(1)

        expect(numberOfPermutation(10, 0)).toEqual(1)
        expect(numberOfPermutation(10, 1)).toEqual(10)
    })

    test('lavenshteinDistance', () => {
        expect(lavenshteinDistance('aaba', 'sa')).toEqual(3)
        expect(lavenshteinDistance('abcdefghij', '1234567890')).toEqual(10)
        // expect(lavenshteinDistance('asbn', 'sap')).toEqual(4)
        expect(lavenshteinDistance('sap', 'asbn')).toEqual(3)
        expect(lavenshteinDistance('abc', 'yabd')).toEqual(2)
        expect(lavenshteinDistance('biting', 'mitten')).toEqual(4)
        expect(lavenshteinDistance('table', 'bal')).toEqual(3)
    })

    test('minTopLeftDiagonalLeft', () => {
        expect(minTopLeftDiagonalLeft([], 0, 0)).toEqual(0)
        expect(minTopLeftDiagonalLeft([[0]], 0, 1)).toEqual(0)
        expect(minTopLeftDiagonalLeft([[0, 1]], 0, 2)).toEqual(1)
        expect(minTopLeftDiagonalLeft([[0, 1]], 1, 0)).toEqual(0)
        expect(minTopLeftDiagonalLeft([[0, 1], [1]], 1, 1)).toEqual(0)
        expect(minTopLeftDiagonalLeft([[0, 1], [1, 0], []], 2, 0)).toEqual(1)
    })

    test('binaryTreeDiameter', () => {
        let tree = createTreeFromNumberElement([4, 4, 0, 2, 1, 2, 1])
        expect(binaryTreeDiameter(tree)).toEqual(6)
    })

    test('findSuccessor', () => {
        let tree = createTreeFromNumberElement([4, 4, 0, 2, 1, 2, 1])
        expect(findSuccessor(tree, tree.left)).toEqual(4)
    })

    test('heightBalancedBinaryTree', () => {
        let tree = createTreeFromNumberElement([4, 4, 1, 0, 4, 4, 0, 0, 0, 0])
        expect(heightBalancedBinaryTree(tree)).toEqual(false)

        expect(
            heightBalancedBinaryTree(
                createTreeFromNumberElement([4, 4, 1, 0, 4, 0, 0, 0])
            )
        ).toEqual(true)
    })

    test('Topological Sort', () => {
        let listGraph = new Graph(Graph.DIRECTED).getAdjacencyList()
        listGraph.addEdge('A', 'B', 3)
        listGraph.addEdge('A', 'C', 6)
        listGraph.addEdge('B', 'C', 4)
        listGraph.addEdge('B', 'E', 11)
        listGraph.addEdge('B', 'D', 4)
        listGraph.addEdge('D', 'E', -4)
        listGraph.addEdge('D', 'F', 5)
        listGraph.addEdge('D', 'G', 2)
        listGraph.addEdge('C', 'G', 11)
        listGraph.addEdge('C', 'D', 4)
        listGraph.addEdge('G', 'H', 2)
        listGraph.addEdge('E', 'H', 9)
        listGraph.addEdge('F', 'H', 1)
        expect(listGraph.nodeTraversalBFS()).toEqual([
            'A',
            'B',
            'C',
            'E',
            'D',
            'G',
            'H',
            'F',
        ])
        expect(listGraph.nodeTraversalDFS()).toEqual([
            'A',
            'B',
            'C',
            'G',
            'H',
            'D',
            'E',
            'F',
        ])
        expect(listGraph.nodeTraversalTopological()).toEqual([
            'A',
            'B',
            'C',
            'D',
            'F',
            'E',
            'G',
            'H',
        ])
        const shortestPathCalculation = findShortestPathToEachNode(listGraph)
        expect(shortestPathCalculation.getShortestPath('A', 'H')).toEqual(11)
        expect(shortestPathCalculation.getAllShortestPath()).toEqual({
            A: 0,
            B: 3,
            C: 6,
            D: 7,
            E: 3,
            F: 12,
            G: 9,
            H: 11,
        })

        listGraph = new Graph(Graph.DIRECTED).getAdjacencyList()
        listGraph.addEdge('0', '1', 4)
        listGraph.addEdge('0', '2', 1)
        listGraph.addEdge('2', '1', 2)
        listGraph.addEdge('1', '3', 1)
        listGraph.addEdge('2', '3', 5)
        listGraph.addEdge('3', '4', 3)
        expect(
            findShortestPathToEachNode(listGraph).getAllShortestPath()
        ).toEqual({
            0: 0,
            1: 3,
            2: 1,
            3: 4,
            4: 7,
        })

        listGraph = new Graph(Graph.DIRECTED).getAdjacencyList()
        listGraph.addEdge('1', '2', 2)
        listGraph.addEdge('2', '3', 4)
        expect(
            findShortestPathToEachNode(listGraph).getAllShortestPath()
        ).toEqual({
            1: 0,
            2: 2,
            3: 6,
        })
    })

    test('shortestPathDijkstra', () => {
        let listGraph = new Graph(Graph.DIRECTED).getAdjacencyList()
        listGraph.addEdge('1', '4', 10)
        listGraph.addEdge('4', '1', 10)
        listGraph.addEdge('1', '2', 50)
        listGraph.addEdge('2', '4', 15)
        listGraph.addEdge('1', '3', 45)
        listGraph.addEdge('4', '5', 15)
        listGraph.addEdge('5', '2', 20)
        listGraph.addEdge('2', '3', 10)
        listGraph.addEdge('5', '3', 35)
        listGraph.addEdge('3', '5', 30)
        listGraph.addEdge('6', '5', 3)
        let computation = shortestPathDijkstra(listGraph)
        expect(computation.getAllShortestPath()).toEqual({
            1: 0,
            2: 45,
            3: 45,
            4: 10,
            5: 25,
            6: Infinity,
        })
        expect(computation.getShortestDistance('5')).toEqual(25)
        expect(computation.getShortestPath('5')).toEqual(['1', '4', '5'])
        expect(computation.getShortestPath('2')).toEqual(['1', '4', '5', '2'])
        expect(computation.getShortestPath('6')).toEqual([])
        expect(
            shortestPathDijkstra(listGraph, '2').getAllShortestPath()
        ).toEqual({
            1: 25,
            2: 0,
            3: 10,
            4: 15,
            5: 30,
            6: Infinity,
        })
    })

    test('Linked List Palindrome', () => {
        const head = arrayToLinkedList([1, 1])
        expect(head.value).toEqual(1)
        expect(linkedListPalindrome(head)).toEqual(true)
    })

    test('multiStringSearch', () => {
        expect(
            multiStringSearch('this is a big string', [
                'this',
                'yo',
                'is',
                'a',
                'bigger',
                'string',
                'kappa',
            ])
        ).toEqual([true, false, true, true, false, true, false])
        expect(
            multiStringSearch('abcdefghijklmnopqrstuvwxyz', [
                'abc',
                'mnopqr',
                'wyz',
                'no',
                'e',
                'tuuv',
            ])
        ).toEqual([true, true, false, true, true, false])
    })

    test('findPeak', () => {
        expect(findMidIndex(0, 10)).toEqual(5)
        expect(findMidIndex(5, 10)).toEqual(7)
        expect(findMidIndex(8, 10)).toEqual(9)
        expect(findPeak([5, 10, 15, 25, 30, 45, 65, 50, 35, 1])).toEqual(6)
        expect(findPeak([5, 10, 15, 25, 30, 45, 50])).toEqual(6)
        expect(findPeak([50, 40, 30])).toEqual(0)
        expect(findPeak([50])).toEqual(0)
        expect(findPeak([50, 40])).toEqual(0)
        expect(findPeak([40, 50])).toEqual(1)
        expect(findPeak([1, 1, 1])).toEqual(2)
        expect(findPeak([1, 1, 2])).toEqual(2)
        expect(findPeak([1, 2, 1])).toEqual(1)
        expect(findPeak([2, 1, 1])).toEqual(0)
        expect(findPeak([1, 3, 20, 4, 1, 0])).toEqual(2)
    })

    test('stock selling', () => {
        expect(
            maximumProfitSellingStock([4, 2, 4, 6, 13, 8, 0, 4, 6, 1, 33])
        ).toEqual([
            [1, 4, 11],
            [6, 8, 6],
            [9, 10, 32],
        ])

        expect(
            maximumProfitSellingStock([4, 2, 4, -6, -13, 8, 0, 4, 6, 1, -33])
        ).toEqual([
            [1, 2, 2],
            [4, 5, 21],
            [6, 8, 6],
        ])

        expect(maximumProfitSellingStock([90, 80, 70, 60, 50])).toEqual([])
    })

    test('Balanced Brackets', () => {
        expect(balancedBrackets('[]')).toEqual(true)
        expect(balancedBrackets('[')).toEqual(false)
    })
})
