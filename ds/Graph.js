/**
 * Create a Graph instant and perform graph operation
 */
import { AdjacencyMatrix } from './AdjacencyMatrix'
import { AdjacencyList } from './AdjacencyList'

export class Graph {
    static DIRECTED = 0
    static UNDIRECTED = 1
    static DEFAULT_VALUE = 1
    constructor(directionType = Graph.UNDIRECTED) {
        this.nodes = {}
        this.nodeIndex = []
        this.edgeList = []
        this.directionType = directionType
        this.nextNodeNumber = 0
    }

    /**
     * Add a given vertex
     * @param node1
     * @param node2
     * @param val
     * time: O(1)
     * space: O(1)
     */
    addEdge(node1, node2, val = Graph.DEFAULT_VALUE) {
        this.edgeList.push({ left: node1, right: node2, val: val })
        const newNodes = []
        if (!this.containsNode(node1)) {
            this._addNode(node1)
            newNodes.push(node1)
        }
        if (!this.containsNode(node2)) {
            this._addNode(node2)
            newNodes.push(node2)
        }
        return newNodes
    }

    /**
     * Removing node
     * @param node
     */
    removeNode(node) {
        let nodeObject = this.nodes[node]
        if (nodeObject != null) {
            delete this.nodes[node]
            this.nodeIndex.splice(nodeObject.index, 1)
            this.nextNodeNumber--
            this._refreshNodeIndex()
        }
    }

    _refreshNodeIndex() {
        for (let i = 0; i < this.nodeIndex.length; i++) {
            this.nodes[this.nodeIndex[i]].index = i
        }
    }

    _addNode(node) {
        this.nodes[node] = { index: this.nextNodeNumber, value: node }
        this.nodeIndex.push(node)
        this.nextNodeNumber++
        return this.nodes[node]
    }

    /**
     * Clears Edges
     */
    clearEdges() {
        this.edgeList = []
    }

    /**
     * Set Graph type
     * @param type = DIRECTED_GRAPH | UNDIRECTED
     */
    setGraphType(type) {
        this.directionType =
            type === Graph.UNDIRECTED ? Graph.UNDIRECTED : Graph.DIRECTED
    }

    /**
     * Check if contains node
     * @param node
     */
    containsNode(node) {
        return this.nodes.hasOwnProperty(node)
    }

    /**
     * Returns Adjacency Matrix
     * @returns {AdjacencyMatrix}
     */
    getAdjacencyMatrix() {
        return new AdjacencyMatrix(this)
    }

    getAdjacencyList() {
        return new AdjacencyList(this)
    }

    getNode(node) {
        return this.nodes[node] ? this.nodes[node] : null
    }

    getNodeAtIndex(index) {
        return this.nodeIndex[index] ? this.nodeIndex[index] : null
    }

    getNodeCount() {
        return this.nextNodeNumber
    }
}
