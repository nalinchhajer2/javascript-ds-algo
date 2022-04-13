/**
 * Directed graph containing "start" and "end"
 * A node is called critical if it appears on any single walk from "start" to "end" more than once.
 * Find all critical nodes.
 *
 * @param graph
 * @param startNode
 * @param endNode
 * @returns {*[]}
 */
export function criticalNodeByWalkOnDirectedGraph(graph, startNode, endNode) {
    const cyclicPath = findAllClosedPathInDirectedGraph(graph, startNode)
    const closed = new Set()
    for (let path of cyclicPath) {
        for (let node of path) {
            closed.add(node)
        }
    }
    let criticalNode = []
    for (let node of closed) {
        if (checkIfPathExist(graph, node, endNode)) {
            criticalNode.push(node)
        }
    }
    return criticalNode
}

/**
 * Check if there is a path from source and destination, uses DFS for Path O(V+E)
 */
function checkIfPathExist(graph, source, destination) {
    let visited = {}
    function _traversal(node) {
        if (node === destination) return true
        visited[node] = true
        let result = false
        let adjNode = graph.getEdges(node)
        for (let i = 0; i < adjNode.length; i++) {
            if (visited[adjNode[i]] !== true) {
                result = result || _traversal(adjNode[i])
                if (result === true) {
                    break
                }
            }
        }
        return result
    }
    return _traversal(source)
}

/**
 * Starting from source node, find all path that form cycle, visited all edges once
 *
 * It prepare a routeStack which saves { source : Destination }. if source already available, then cycle is found
 *
 * If cycle is found, it prints all cycle information
 *
 * @param graph
 * @param sourceNode
 * @returns {*[]}
 */
export function findAllClosedPathInDirectedGraph(graph, sourceNode) {
    let routeStack = {}
    let cycles = []
    function _printCycle(node) {
        const paths = []
        let nextNode = routeStack[node]
        while (nextNode !== node) {
            paths.push(nextNode)
            nextNode = routeStack[nextNode]
        }
        paths.push(node)
        cycles.push(paths)
    }
    function _traversal(node) {
        let adjNode = graph.getEdges(node)

        for (let i = 0; i < adjNode.length; i++) {
            routeStack[node] = adjNode[i]
            if (routeStack[adjNode[i]] === undefined) {
                _traversal(adjNode[i])
            } else {
                // mark as cyclic
                _printCycle(node)
            }
            delete routeStack[node]
        }
    }
    _traversal(sourceNode)
    return cycles
}
