import {Graph} from '../../ds/Graph';

describe('Graph Algorithm', () => {
    test('findShortestPathToEachNode_dijkstra', () => {
        const listGraph = new Graph(Graph.DIRECTED).getAdjacencyList()
        listGraph.addEdge(0, 1, 4)
        listGraph.addEdge(0, 7, 8)
        listGraph.addEdge(1, 2, 8)
        listGraph.addEdge(1, 7, 11)
        listGraph.addEdge(7, 6, 1)
        listGraph.addEdge(7, 8, 7)
        listGraph.addEdge(2, 8, 2)
        listGraph.addEdge(8, 6, 6)
        listGraph.addEdge(2, 5, 4)
        listGraph.addEdge(2, 3, 7)
        listGraph.addEdge(6, 5, 2)
        listGraph.addEdge(3, 5, 14)
        listGraph.addEdge(3, 4, 9)
        listGraph.addEdge(5, 4, 10)
        const result = findShortestPathToEachNode_dijkstra(listGraph, 0)
        expect(result[0][3]).toEqual(19)
    })
})
