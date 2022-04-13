import { Graph } from '../../ds/Graph'
import {
    findAllClosedPathInDirectedGraph,
    criticalNodeByWalkOnDirectedGraph,
} from '../../problems/GG_Critical_path'

describe('Google', () => {
    test('criticalPath', () => {
        const graph = new Graph(Graph.DIRECTED).getAdjacencyList()
        graph.addEdge('A', 'B')
        graph.addEdge('B', 'C')
        graph.addEdge('C', 'D')
        graph.addEdge('D', 'E')
        graph.addEdge('D', 'F')
        graph.addEdge('F', 'G')
        graph.addEdge('G', 'H')
        graph.addEdge('H', 'B')
        graph.addEdge('F', 'I')
        graph.addEdge('I', 'H')
        graph.addEdge('H', 'J')
        graph.addEdge('J', 'K')
        graph.addEdge('K', 'L')
        graph.addEdge('L', 'J')
        expect(criticalNodeByWalkOnDirectedGraph(graph, 'A', 'E')).toEqual([
            'B',
            'C',
            'D',
            'F',
            'G',
            'H',
            'I',
        ])
    })

    test('findAllClosedPathInDirectedGraph', () => {
        const graph = new Graph(Graph.DIRECTED).getAdjacencyList()
        graph.addEdge('E', 'A')
        graph.addEdge('A', 'B')
        graph.addEdge('B', 'C')
        graph.addEdge('C', 'D')
        graph.addEdge('D', 'A')
        graph.addEdge('B', 'F')
        graph.addEdge('A', 'C')
        graph.addEdge('A', 'G')
        graph.addEdge('G', 'H')
        graph.addEdge('H', 'G')
        graph.addEdge('D', 'D')
        // graph.addEdge('H', 'A') // It will add G and H also as critical

        expect(findAllClosedPathInDirectedGraph(graph, 'E')).toEqual([
            ['A', 'B', 'C', 'D'],
            ['D'],
            ['A', 'C', 'D'],
            ['D'],
            ['G', 'H'],
        ])
        expect(criticalNodeByWalkOnDirectedGraph(graph, 'E', 'F')).toEqual([
            'A',
            'B',
            'C',
            'D',
        ])
        expect(criticalNodeByWalkOnDirectedGraph(graph, 'B', 'F')).toEqual([
            'B',
            'C',
            'D',
            'A',
        ])
    })
})
