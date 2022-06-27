
// 1. Minimum spanning tree
// 2. Maximum spanning tree
// 3. Dijkstra Algorithm
// 4. Bridges and Articulation point

import {HeapPriorityQueue} from '../ds/HeapPriorityQueue';

/**
 * Dijkstra Algorithm
 * Given a graph and a source vertex in the graph, find the shortest paths from the source to all vertices in the given graph.
 */
function findShortestPathToEachNode_dijkstra(graph, startNode) {
    // BFS
    // Path to all node will be infinity
    // Indexed priority queue
    // Go through all the path, update shortest path
    // Complete the operation
    const distance = {}
    graph.getNodes().forEach((node) => {
        distance[node] = Infinity;
    })
    const visited = {}
    const queue = new HeapPriorityQueue()

    function _traverse() {
        if (queue.length() === 0) return
        const node = queue.dequeue()
        const nodeObject = graph.getNode(node)
        if (nodeObject === null) {
            throw { type: 'INVALID_NODE_INDEX', node }
        }
        visited[node] = true

        const edges = nodeObject.getConnectedNodes()
        for (let i = 0; i < edges.length; i++) {
            if (visited[edges[i]] !== true) {
                const pathDistance = nodeObject.getEdgeValue(edges[i])
                distance[edges[i]] = distance[edges[i]] === Infinity ? 0 : distance[edges[i]] +
                    Math.min(distance[edges[i]], pathDistance)
                if (queue.contains(edges[i])) {
                    if (queue.getPriority(edges[i]) > distance[edges[i]]) {
                        queue.changePriority(edges[i], distance[edges[i]])
                    }
                } else {
                    queue.enqueue(edges[i], distance[edges[i]])
                }
            }
        }

        while (queue.length() > 0) {
            _traverse()
        }
    }

    if (startNode !== undefined) {
        queue.enqueue(startNode.toString())

        _traverse()
    }

    graph.nodeTraversalBFS(startNode, () => {

    })

}
