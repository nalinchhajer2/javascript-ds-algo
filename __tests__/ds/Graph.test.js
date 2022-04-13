import { Graph } from '../../ds/Graph'

describe('Graph test', () => {
    test('graph by object', () => {
        let graph = new Graph()
        graph.addEdge(1, 2)
        expect(graph.getAdjacencyMatrix().matrix).toEqual([
            [undefined, 1],
            [1, undefined],
        ])

        // graph by adjacency list
        // graph by edge list
        // graph by Incidence Matrix
    })

    test('graph by adjacency matrix', () => {
        let matrixGraph = new Graph(Graph.DIRECTED).getAdjacencyMatrix()
        matrixGraph.addEdge(1, 2)
        expect(matrixGraph.matrix).toEqual([
            [undefined, 1],
            [undefined, undefined],
        ])
        matrixGraph.addEdge(2, 3)
        expect(matrixGraph.matrix).toEqual([
            [undefined, 1],
            [undefined, undefined, 1],
            [undefined, undefined, undefined],
        ])
        matrixGraph.removeEdge(2, 3)
        expect(matrixGraph.matrix).toEqual([
            [undefined, 1],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
        ])
        matrixGraph.addEdge(2, 3)
        matrixGraph.addEdge(2, 1)
        matrixGraph.addEdge(3, 2)
        matrixGraph.addEdge(1, 4)
        matrixGraph.addEdge(5, 6)

        expect(matrixGraph.nodeTraversalDFS(1)).toEqual([1, 2, 3, 4, 5, 6])
        expect(matrixGraph.nodeTraversalDFS(5)).toEqual([5, 6, 1, 2, 3, 4])
        expect(matrixGraph.nodeTraversalDFS(2)).toEqual([2, 1, 4, 3, 5, 6])

        expect(matrixGraph.nodeTraversalBFS(1)).toEqual([1, 2, 4, 3, 5, 6])
        expect(matrixGraph.nodeTraversalBFS(5)).toEqual([5, 6, 1, 2, 4, 3])
        expect(matrixGraph.nodeTraversalBFS(2)).toEqual([2, 1, 3, 4, 5, 6])

        matrixGraph = new Graph(Graph.UNDIRECTED).getAdjacencyMatrix()
        matrixGraph.addEdge(1, 2)
        matrixGraph.addEdge(2, 3)
        matrixGraph.addEdge(3, 4)
        matrixGraph.addEdge(1, 4)
        expect(matrixGraph.nodeTraversalDFS(1)).toEqual([1, 2, 3, 4])
        expect(matrixGraph.nodeTraversalDFS(3)).toEqual([3, 2, 1, 4])
        expect(matrixGraph.nodeTraversalBFS(1)).toEqual([1, 2, 4, 3])
        expect(matrixGraph.nodeTraversalBFS(3)).toEqual([3, 2, 4, 1])
        expect(matrixGraph.matrix).toEqual([
            [undefined, 1, undefined, 1],
            [1, undefined, 1],
            [undefined, 1, undefined, 1],
            [1, undefined, 1, undefined],
        ])
        matrixGraph.removeNode(3)
        expect(matrixGraph.matrix).toEqual([
            [undefined, 1, 1],
            [1, undefined],
            [1, undefined, undefined],
        ])
        expect(matrixGraph.nodeTraversalBFS(1)).toEqual([1, 2, 4])

        matrixGraph = new Graph(Graph.DIRECTED).getAdjacencyMatrix()
        matrixGraph.addEdge(5, 2)
        matrixGraph.addEdge(5, 6)
        matrixGraph.addEdge(4, 6)
        matrixGraph.addEdge(4, 1)
        matrixGraph.addEdge(2, 3)
        matrixGraph.addEdge(3, 1)
        expect(matrixGraph.nodeTraversalTopological()).toEqual([
            4, 5, 6, 2, 3, 1,
        ])
        expect(matrixGraph.nodeTraversalDFS()).toEqual([5, 2, 3, 1, 6, 4])

        expect(matrixGraph.nodeTraversalBFS()).toEqual([5, 2, 6, 3, 1, 4])
    })

    test('graph by adjacency List', () => {
        let listGraph = new Graph(Graph.DIRECTED).getAdjacencyList()
        listGraph.addEdge(1, 2)

        listGraph.addEdge(2, 3)
        expect(listGraph.nodes.length).toEqual(3)
        expect(listGraph.getEdgeValue(2, 3)).toEqual(1)
        listGraph.removeEdge(2, 3)
        expect(listGraph.getEdgeValue(2, 3)).toEqual(null)
        listGraph.removeNode(1)
        expect(listGraph.nodes.length).toEqual(2)

        listGraph.addEdge(2, 3)
        listGraph.addEdge(2, 1)
        listGraph.addEdge(3, 2)
        listGraph.addEdge(1, 4)
        listGraph.addEdge(5, 6)

        expect(listGraph.nodeTraversalDFS(1)).toEqual([
            '1',
            '4',
            '2',
            '3',
            '5',
            '6',
        ])
        expect(listGraph.nodeTraversalDFS(5)).toEqual([
            '5',
            '6',
            '2',
            '1',
            '4',
            '3',
        ])
        expect(listGraph.nodeTraversalDFS(2)).toEqual([
            '2',
            '1',
            '4',
            '3',
            '5',
            '6',
        ])
        //
        expect(listGraph.nodeTraversalBFS(1)).toEqual([
            '1',
            '4',
            '2',
            '3',
            '5',
            '6',
        ])
        expect(listGraph.nodeTraversalBFS(5)).toEqual([
            '5',
            '6',
            '2',
            '1',
            '3',
            '4',
        ])
        expect(listGraph.nodeTraversalBFS(2)).toEqual([
            '2',
            '1',
            '3',
            '4',
            '5',
            '6',
        ])

        listGraph = new Graph(Graph.UNDIRECTED).getAdjacencyList()
        listGraph.addEdge(1, 2)
        listGraph.addEdge(2, 3)
        listGraph.addEdge(3, 4)
        listGraph.addEdge(1, 4)
        expect(listGraph.nodeTraversalDFS(1)).toEqual(['1', '2', '3', '4'])
        expect(listGraph.nodeTraversalDFS(3)).toEqual(['3', '2', '1', '4'])
        expect(listGraph.nodeTraversalBFS(1)).toEqual(['1', '2', '4', '3'])
        expect(listGraph.nodeTraversalBFS(3)).toEqual(['3', '2', '4', '1'])
        listGraph.removeNode(3)
        expect(listGraph.nodeTraversalDFS(1)).toEqual(['1', '2', '4'])

        listGraph = new Graph(Graph.DIRECTED).getAdjacencyList()
        listGraph.addEdge(5, 2)
        listGraph.addEdge(5, 0)
        listGraph.addEdge(4, 0)
        listGraph.addEdge(4, 1)
        listGraph.addEdge(2, 3)
        listGraph.addEdge(3, 1)
        expect(listGraph.nodeTraversalTopological()).toEqual([
            '4',
            '5',
            '2',
            '3',
            '1',
            '0',
        ])
        expect(listGraph.nodeTraversalDFS()).toEqual([
            '5',
            '0',
            '2',
            '3',
            '1',
            '4',
        ])

        expect(listGraph.nodeTraversalBFS()).toEqual([
            '5',
            '0',
            '2',
            '3',
            '4',
            '1',
        ])
    })
})
