import { Graph } from './Graph'

/**
 * Create graph with using adjacency matrix internally
 *
 * addNode = O(n^2)
 * addEdge =
 */
export class AdjacencyMatrix {
    static UNVISITED_VALUE = undefined
    constructor(graph = null) {
        this.graph = graph ? graph : new Graph()
        this.matrix = []
        let nodeSize = graph.nextNodeNumber
        for (let i = 0; i < nodeSize; i++) {
            this.matrix[i] = this._arrayWithDefaultValue(nodeSize)
        }
        for (let i = 0; i < graph.edgeList.length; i++) {
            let edge = graph.edgeList[i]
            this._addEdgeInGraph(graph, edge.left, edge.right, edge.val)
        }
        this.graph.clearEdges() // Saving memory
    }

    /**
     * Returns array with given default value, ensure default value is non primitive type
     * @param length
     * @param value
     * @returns {any[]|*[]}
     * @private
     */
    _arrayWithDefaultValue(length, value = AdjacencyMatrix.UNVISITED_VALUE) {
        if (!Array.prototype.fill) {
            let array = []
            for (let j = 0; j < length; j++) {
                array[j] = value
            }
            return array
        } else {
            return new Array(length).fill(value)
        }
    }

    /**
     * Add edge
     * @param node1
     * @param node2
     * @param val
     * time: O(n)
     */
    addEdge(node1, node2, val = 1) {
        // if new vertex added, change the size of array
        let newNodes = this.graph.addEdge(node1, node2, val)
        this._addNewNodesInMatrix(newNodes.length)
        this._addEdgeInGraph(this.graph, node1, node2, val)
        this.graph.clearEdges()
    }

    /**
     * Removes the edges
     *
     * @param node1
     * @param node2
     * time: O(1)
     */
    removeEdge(node1, node2) {
        this._addEdgeInGraph(
            this.graph,
            node1,
            node2,
            AdjacencyMatrix.UNVISITED_VALUE
        )
    }

    /**
     * Remove node and all the edges attached to it
     * @param node
     * time: O(n)
     */
    removeNode(node) {
        const nodeIndex = this.graph.getNode(node).index
        this.matrix.splice(nodeIndex, 1)
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].splice(nodeIndex, 1)
        }
        this.graph.removeNode(node)
    }

    /**
     * Add Edge from the given graph
     * @param graph
     * @param node1
     * @param node2
     * @param val
     * @private
     */
    _addEdgeInGraph(graph, node1, node2, val) {
        let leftIndex = graph.getNode(node1).index
        let rightIndex = graph.getNode(node2).index
        this.matrix[leftIndex][rightIndex] = val
        if (Graph.UNDIRECTED === graph.directionType) {
            this.matrix[rightIndex][leftIndex] = val
        }
    }

    /**
     * Increment matrix by adding more row and column to matrix
     * @param increment, specify how much new row and column need to be added
     * @private
     */
    _addNewNodesInMatrix(increment) {
        let newLength = this.matrix.length + increment
        // Add Extra Row
        for (let i = 0; i < increment; i++) {
            this.matrix.push(this._arrayWithDefaultValue(newLength))
        }
    }

    /**
     * Provide node traversal across edges based on DFS
     * @param startNode
     * @param onTraverse
     * @returns {*[]}
     * time: O(n)
     */
    nodeTraversalDFS(startNode = undefined, onTraverse = undefined) {
        let nodes = []
        let visited = this._arrayWithDefaultValue(this.matrix.length, false)
        function _traverse(graph, matrix, node) {
            let nodeIndex = graph.getNode(node)?.index ?? -1
            if (nodeIndex === -1) {
                throw { type: 'INVALID_NODE_INDEX', node }
            }
            if (visited[nodeIndex] === true) {
                return
            }
            visited[nodeIndex] = true
            onTraverse && onTraverse(node)
            nodes.push(node)
            let edgeArray = matrix[nodeIndex]
            for (let i = 0; i < matrix.length; i++) {
                if (edgeArray[i] !== AdjacencyMatrix.UNVISITED_VALUE) {
                    _traverse(graph, matrix, graph.getNodeAtIndex(i))
                }
            }
        }

        if (startNode !== undefined) {
            _traverse(this.graph, this.matrix, startNode)
        }

        // Lets visit all unvisited
        for (let i = 0; i < visited.length; i++) {
            if (visited !== true) {
                _traverse(this.graph, this.matrix, this.graph.getNodeAtIndex(i))
            }
        }

        return nodes
    }

    nodeTraversalBFS(startNode = undefined, onTraverse = undefined) {
        let nodes = []
        let queue = [] // search in heap and fifo
        let visited = this._arrayWithDefaultValue(this.matrix.length, false)
        function _traverse(graph, matrix) {
            if (queue.length === 0) return
            let node = queue.shift()
            let nodeIndex = graph.getNode(node)?.index ?? -1
            if (nodeIndex === -1) {
                throw { type: 'INVALID_NODE_INDEX', node }
            }
            if (visited[nodeIndex] === true) {
                return
            }
            visited[nodeIndex] = true
            onTraverse && onTraverse(node)
            nodes.push(node)
            let edgeArray = matrix[nodeIndex]
            for (let i = 0; i < matrix.length; i++) {
                if (
                    edgeArray[i] !== AdjacencyMatrix.UNVISITED_VALUE &&
                    visited[i] !== true
                ) {
                    queue.push(graph.getNodeAtIndex(i))
                }
            }
            while (queue.length > 0) {
                _traverse(graph, matrix)
            }
        }
        if (startNode !== undefined) {
            queue.push(startNode)
            _traverse(this.graph, this.matrix)
        }

        function _checkUnvisitedNodes(visited) {
            for (let i = 0; i < visited.length; i++) {
                if (visited[i] !== true) {
                    return i
                }
            }
            return null
        }
        let unvisitedNode = _checkUnvisitedNodes(visited)
        while (unvisitedNode !== null) {
            queue.push(this.graph.getNodeAtIndex(unvisitedNode))
            _traverse(this.graph, this.matrix)
            unvisitedNode = _checkUnvisitedNodes(visited)
        }

        return nodes
    }

    nodeTraversalTopological(onTraverse = undefined) {
        let nodes = []
        let visited = this._arrayWithDefaultValue(this.matrix.length, false)
        function _traverse(graph, matrix, node) {
            let nodeIndex = graph.getNode(node)?.index ?? -1
            if (nodeIndex === -1) {
                throw { type: 'INVALID_NODE_INDEX', node }
            }
            if (visited[nodeIndex] === true) {
                return
            }
            visited[nodeIndex] = true

            let edgeArray = matrix[nodeIndex]
            for (let i = 0; i < matrix.length; i++) {
                if (edgeArray[i] !== AdjacencyMatrix.UNVISITED_VALUE) {
                    _traverse(graph, matrix, graph.getNodeAtIndex(i))
                }
            }

            onTraverse && onTraverse(node)
            nodes.push(node)
        }

        // Lets visit all unvisited
        for (let i = 0; i < visited.length; i++) {
            if (visited !== true) {
                _traverse(this.graph, this.matrix, this.graph.getNodeAtIndex(i))
            }
        }

        let result = []
        for (let i = nodes.length - 1; i >= 0; i--) {
            result.push(nodes[i])
        }

        return result
    }
}
