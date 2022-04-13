import { TreeNode } from './Tree'

/**
 * Self balancing tree
 */
export class AVLTree {
    constructor() {
        this.root = null
    }

    /**
     * Insert in BST
     * @param value
     */
    insert(value) {
        this.root = this._insertInBST(this.root, value)
    }

    /**
     * max
     * @returns {number|*}
     */
    max() {
        if (this.root !== null) {
            let pointer = this.root
            while (pointer.right !== null) {
                pointer = pointer.right
            }
            return pointer.value
        }
        return 0
    }

    /**
     * Min
     * @returns {number|*}
     */
    min() {
        if (this.root !== null) {
            let pointer = this.root
            while (pointer.left !== null) {
                pointer = pointer.left
            }
            return pointer.value
        }
        return 0
    }

    /**
     * Find number of nodes greater than a value
     * @param value
     */
    greaterThan(value) {
        // if child is in between of parent and child or is Equal
        // 8 -> 4 -> 18
        // 9 -> 18
        // 5 -> 8, 4
    }

    findNode(value) {
        if (this.root !== null) {
            return this._findNode(this.root, value)
        }
        return null
    }

    _findNode(pointer, value) {
        if (pointer === null) return null
        if (pointer.value === value) {
            return pointer
        } else if (pointer.value > value) {
            return this._findNode(pointer.left, value)
        } else {
            return this._findNode(pointer.right, value)
        }
    }

    /**
     * Insert value in BST and update all nodes with problems
     * @param node
     * @param value
     * @private
     */
    _insertInBST(node, value) {
        if (node === null) {
            return this._generateNode(value)
        }
        if (node.value === value) {
            node.count = node.count + 1
            return node
        }
        if (node.value < value) {
            node.right = this._insertInBST(node.right, value)
        } else {
            node.left = this._insertInBST(node.left, value)
        }
        node.height = node.maxChildHeight() + 1

        // Balancing
        if (Math.abs(node.bf()) > 1) {
            return this._rotate(node, value)
        }
        return node
    }

    _rotate(node, value) {
        let balance = node.bf()
        if (balance > 1) {
            if (node.left.value > value) {
                // left left
                return this._rightRotate(node)
            } else {
                // left right
                node.left = this._leftRotate(node.left)
                return this._rightRotate(node)
            }
        } else {
            if (node.right.value < value) {
                // right right
                return this._leftRotate(node)
            } else {
                // right left
                node.right = this._rightRotate(node.right)
                return this._leftRotate(node)
            }
        }
    }

    // [c] -> [b,x] -> [a,y]
    // [b] -> [a,c] -> [y,x]
    _rightRotate(parent) {
        let child = parent.left
        parent.left = child.right
        child.right = parent

        parent.height = parent.maxChildHeight() + 1
        child.height = child.maxChildHeight() + 1

        return child
    }

    _leftRotate(parent) {
        let child = parent.right
        parent.right = child.left
        child.left = parent

        parent.height = parent.maxChildHeight() + 1
        child.height = child.maxChildHeight() + 1

        return child // child becomes parent
    }

    _generateNode(value) {
        let node = new TreeNode(value)
        node.height = 1
        node.count = 1 // to handle duplicate
        node.bf = function () {
            return (this.left?.height ?? 0) - (this.right?.height ?? 0)
        }
        node.maxChildHeight = function () {
            return Math.max(node.left?.height ?? 0, node.right?.height ?? 0)
        }
        return node
    }
}
