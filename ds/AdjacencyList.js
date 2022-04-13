import { Graph } from './Graph'
import assert from 'assert'

/**
 * Create a graph using Adjacency list internally
 */
export class AdjacencyList {
    constructor(graph = null) {
        this.graph = graph ? graph : new Graph()
        this.nodeList = {}
        this.nodes = []
        for (let i = 0; i < graph.edgeList.length; i++) {
            let edge = graph.edgeList[i]
            this.addEdge(edge.left, edge.right, edge.val)
        }
    }

    /**
     * Add Edge
     * @param node1
     * @param node2
     * @param val
     */
    addEdge(node1, node2, val = 1) {
        let leftNode = this._addNode(node1.toString())
        let rightNode = this._addNode(node2.toString())
        leftNode.addEdge(rightNode, val)
        if (Graph.UNDIRECTED === this.graph.directionType) {
            rightNode.addEdge(leftNode, val)
        }
    }

    getType() {
        return this.graph.directionType
    }

    /**
     * Remove Edge
     * @param node1
     * @param node2
     */
    removeEdge(node1, node2) {
        let leftNode = this._addNode(node1)
        let rightNode = this._addNode(node2)
        leftNode.removeEdge(rightNode)
        if (Graph.UNDIRECTED === this.graph.directionType) {
            rightNode.removeEdge(leftNode)
        }
    }

    nodeLength() {
        return this.nodes.length
    }

    /**
     * Remove Node
     * @param node
     */
    removeNode(node) {
        let nodeObject = this.getNode(node)
        if (nodeObject !== null) {
            let index = -1
            for (let i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i] === nodeObject) {
                    index = i
                }
                this.nodes[i].removeEdge(nodeObject)
            }
            assert(index !== -1, 'INVALID_NODE_INDEX_FOUND')
            this.nodes.splice(index, 1)
            delete this.nodeList[node]
        } else {
            throw 'INVALID_REMOVE_NODE_REQUESTED'
        }
    }

    _addNode(node) {
        if (this.getNode(node) === null) {
            let nodeObj = new Node(node)
            this.nodes.push(nodeObj)
            this.nodeList[node] = nodeObj
        }
        return this.getNode(node)
    }

    /**
     * Get node
     * @param node
     * @returns {*|null}
     */
    getNode(node) {
        return this.nodeList[node] ? this.nodeList[node] : null
    }

    getEdges(node) {
        return this.nodeList[node]
            ? this.nodeList[node].getConnectedNodes()
            : null
    }

    /**
     * Get Edge Value
     * @param node1
     * @param node2
     * @returns {null|*|null}
     */
    getEdgeValue(node1, node2) {
        let leftNode = this.getNode(node1)
        let rightNode = this.getNode(node2)
        if (leftNode !== null && rightNode !== null) {
            return leftNode.getEdgeValue(rightNode)
        }
        return null
    }

    /**
     * Traverse node by DFS
     * @param startNode
     * @param onTraverse
     * @returns {*[]}
     */
    nodeTraversalDFS(startNode = undefined, onTraverse = undefined) {
        let nodes = []
        let visited = {}
        let edgesVisited = 0
        function _traverse(node, getNode) {
            let nodeObject = getNode(node)
            if (nodeObject === null) {
                throw { type: 'INVALID_NODE_INDEX', node }
            }
            node = nodeObject.value
            if (visited[node] === true) {
                return
            }
            visited[node] = true
            onTraverse && onTraverse(node)
            nodes.push(node)

            let edges = nodeObject.getConnectedNodes()
            for (let i = 0; i < edges.length; i++) {
                edgesVisited++
                _traverse(edges[i], getNode)
            }
        }

        if (startNode !== undefined) {
            _traverse(startNode, this.getNode.bind(this))
        }

        // Lets visit all unvisited
        for (let i = 0; i < this.nodes.length; i++) {
            if (visited[this.nodes[i].value] !== true) {
                _traverse(this.nodes[i].value, this.getNode.bind(this))
            }
        }
        return nodes
    }

    /**
     * Traverse node by BFS
     * @param startNode
     * @param onTraverse
     * @returns {*[]}
     */
    nodeTraversalBFS(startNode = undefined, onTraverse = undefined) {
        let nodes = []
        let visited = {}
        let queue = new Set()
        function _traverse(getNode) {
            if (queue.length === 0) return
            let node = queue.keys().next().value
            queue.delete(node)
            let nodeObject = getNode(node)
            if (nodeObject === null) {
                throw { type: 'INVALID_NODE_INDEX', node }
            }
            visited[node] = true
            onTraverse && onTraverse(node)
            nodes.push(node)

            let edges = nodeObject.getConnectedNodes()
            for (let i = 0; i < edges.length; i++) {
                if (visited[edges[i]] !== true) {
                    queue.add(edges[i])
                }
            }

            while (queue.length > 0) {
                _traverse(getNode)
            }
        }

        if (startNode !== undefined) {
            queue.add(startNode.toString())

            _traverse(this.getNode.bind(this))
        }

        // Lets visit all unvisited
        // for (let i = 0; i < this.nodes.length; i++) {
        //     if (visited[this.nodes[i].value] !== true) {
        //         heap.add(this.nodes[i].value)
        //         _traverse(this.getNode.bind(this))
        //     }
        // }

        function _checkUnvisitedNodes(nodes, visited) {
            for (let i = 0; i < nodes.length; i++) {
                if (visited[nodes[i].value] !== true) {
                    return nodes[i].value
                }
            }
            return null
        }
        let unvisitedNode = _checkUnvisitedNodes(this.nodes, visited)
        while (unvisitedNode !== null) {
            queue.add(unvisitedNode)
            _traverse(this.getNode.bind(this))
            unvisitedNode = _checkUnvisitedNodes(this.nodes, visited)
        }

        return nodes
    }

    /**
     * https://www.youtube.com/watch?v=09_LlHjoEiY
     * Topological Sort from Directed Graph :
     * A topological ordering is an ordering of the nodes in the directed graph
     * where from each directed edge from node A to node B, node A appears before node B in the ordering
     *
     * Note: Topological ordering is not unique
     */
    nodeTraversalTopological(onTraverse = undefined) {
        let nodes = []
        let visited = {}
        let edgesVisited = 0
        function _traverse(node, getNode) {
            let nodeObject = getNode(node)
            if (nodeObject === null) {
                throw { type: 'INVALID_NODE_INDEX', node }
            }
            node = nodeObject.value
            if (visited[node] === true) {
                return
            }
            visited[node] = true

            let edges = nodeObject.getConnectedNodes()
            for (let i = 0; i < edges.length; i++) {
                edgesVisited++
                _traverse(edges[i], getNode)
            }

            onTraverse && onTraverse(node)
            nodes.push(node)
        }

        // Lets visit all unvisited
        for (let i = 0; i < this.nodes.length; i++) {
            if (visited[this.nodes[i].value] !== true) {
                _traverse(this.nodes[i].value, this.getNode.bind(this))
            }
        }
        let result = []
        for (let i = nodes.length - 1; i >= 0; i--) {
            result.push(nodes[i])
        }

        return result
    }
}

class Node {
    constructor(value) {
        this.value = value
        this.edgeList = {}
    }

    /**
     * Add Edge
     * @param node
     * @param value
     */
    addEdge(node, value) {
        this.edgeList[node.value] = { value }
    }

    /**
     * Remove Edge
     * @param node
     */
    removeEdge(node) {
        delete this.edgeList[node.value]
    }

    /**
     * Get Edge value
     * @param node
     * @returns {*|null}
     */
    getEdgeValue(node) {
        return this.edgeList[node.value]
            ? this.edgeList[node.value].value
            : null
    }

    /**
     * Get all connected nodes
     * @returns {string[]}
     */
    getConnectedNodes() {
        return Object.keys(this.edgeList)
    }
}
