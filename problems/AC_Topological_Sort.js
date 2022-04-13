/**
 * https://www.youtube.com/watch?v=09_LlHjoEiY
 * Topological Sort from Directed Graph :
 * A topological ordering is an ordering of the nodes in the directed graph
 * where from each directed edge from node A to node B, node A appears before node B in the ordering
 *
 * Note: Topological ordering is not unique
 */
import { HeapPriorityQueue } from '../ds/HeapPriorityQueue'

export function findShortestPathToEachNode(graph) {
    let topologicalSorting = graph.nodeTraversalTopological()
    let shortedDistance = {}
    for (let i = 0; i < topologicalSorting.length; i++) {
        shortedDistance[topologicalSorting[i]] = Infinity
    }
    shortedDistance[topologicalSorting[0]] = 0
    for (let i = 0; i < topologicalSorting.length; i++) {
        let currentNodeShortestPath = shortedDistance[topologicalSorting[i]]
        let node = graph.getNode(topologicalSorting[i])
        let nodes = node.getConnectedNodes()
        for (let j = 0; j < nodes.length; j++) {
            shortedDistance[nodes[j]] = Math.min(
                shortedDistance[nodes[j]],
                currentNodeShortestPath === Infinity
                    ? node.getEdgeValue(graph.getNode(nodes[j]))
                    : currentNodeShortestPath +
                          node.getEdgeValue(graph.getNode(nodes[j]))
            )
        }
    }

    return {
        getShortestPath: function (node1, node2) {
            return shortedDistance[node2] - shortedDistance[node1]
        },
        getAllShortestPath: function () {
            return shortedDistance
        },
    }
}

/**
 * Greedy approximation, always take only the shortest path
 * @param graph
 * @param startNode
 */
export function shortestPathDijkstra(graph, startNode = undefined) {
    let visited = {}
    let shorterDistance = {}
    let prev = {}
    for (let i = 0; i < graph.nodes.length; i++) {
        shorterDistance[graph.nodes[i].value] = Infinity
    }
    if (startNode === undefined) {
        startNode = graph.nodes[0].value
    }
    shorterDistance[startNode] = 0
    let queue = new HeapPriorityQueue(true)
    queue.enqueue(startNode, 0)

    while (queue.length() > 0) {
        let node = queue.dequeue()
        visited[node] = true
        let edges = graph.getEdges(node)
        for (let i = 0; i < edges.length; i++) {
            if (visited[edges[i]] === true) continue
            let newDist =
                shorterDistance[node] === Infinity
                    ? graph.getEdgeValue(node, edges[i])
                    : shorterDistance[node] + graph.getEdgeValue(node, edges[i])
            if (newDist < shorterDistance[edges[i]]) {
                shorterDistance[edges[i]] = newDist
                prev[edges[i]] = node
                if (queue.contains(edges[i])) {
                    queue.changePriority(edges[i], newDist)
                } else {
                    queue.enqueue(edges[i], newDist)
                }
            }
        }
    }
    return {
        getShortestDistance: function (node) {
            return shorterDistance[node]
        },
        getAllShortestPath: function () {
            return shorterDistance
        },
        getShortestPath: function (node) {
            if (shorterDistance[node] === Infinity) return []
            let path = []
            let current = node
            while (prev[current] !== undefined) {
                path.push(current)
                current = prev[current]
            }
            path.push(startNode)
            let result = []
            while (path.length > 0) {
                result.push(path.pop())
            }
            return result
        },
    }
}

export function shortestDistanceDijkstra(graph, startNode = undefined) {}
