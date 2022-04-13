/**
 * Creates a tree node
 *
 * @param value
 * @param left
 * @param right
 */
export function TreeNode(value, left = null, right = null) {
    this.left = left
    this.right = right
    this.value = value
    this.description = function () {
        return `${this.toArray().join(', ')}`
    }
    this.toArray = function () {
        return _treeToArray(this)
    }
    this.findHeight = function () {
        return Math.max(
            pathToLeafNode(this, true).length,
            pathToLeafNode(this, false).length
        )
    }
    this.isLeafNode = function () {
        return this.left === null && this.right === null
    }
}

/**
 * Considering that tree is written in array format, it creates Binary tree and return root node.
 * @param array
 */
export function treeFromArray(array) {
    if (array && array.length > 0) {
        return _createTreeNode(array, null, 0)
    }
    return null
}

/**
 * Return tree representation in array format. BFS
 * @param root
 */
export function _treeToArray(root) {
    const outputArray = []
    const queue = []
    if (root !== null) {
        queue.push(root)
    }
    while (queue.length > 0) {
        const tempNode = queue.shift()
        if (tempNode === null) {
            outputArray.push(null)
            continue
        } else {
            outputArray.push(tempNode.value)
        }
        if (tempNode.left !== null) {
            queue.push(tempNode.left)
        } else {
            queue.push(null)
        }
        if (tempNode.right !== null) {
            queue.push(tempNode.right)
        } else {
            queue.push(null)
        }
    }
    // trim null from array output
    while (outputArray.length >= 0) {
        if (outputArray[outputArray.length - 1] === null) {
            outputArray.pop()
        } else {
            break
        }
    }

    return outputArray
}

/**
 * Create tree starting from index
 * @param array
 * @param root, if null node is created from array value
 * @param index, position from which node needs to be created
 * @returns {TreeNode|*}
 */
export function _createTreeNode(array, root, index) {
    if (array[index] === null) {
        return
    }
    const node = root === null ? new TreeNode(array[index]) : root
    let leftIndex = firstChildIndex(index)
    if (leftIndex < array.length) {
        const leftNode = _createTreeNode(array, null, leftIndex)
        if (leftNode != null) {
            node.left = leftNode
        }
    }
    let rightIndex = leftIndex + 1
    if (rightIndex < array.length) {
        const rightNode = _createTreeNode(array, null, rightIndex)
        if (rightNode != null) {
            node.right = rightNode
        }
    }
    return node
}

/**
 * Return left child index, right child is after that
 * 2k+1
 * @param parentIndex
 * @returns {number}
 */
export function firstChildIndex(parentIndex) {
    return (parentIndex << 1) | 1
}

/**
 * Check if valid index for array
 * @param index
 * @param array
 * @returns {number|*}
 */
export function validIndex(index, array) {
    if (index < array.length && index >= 0) {
        return index
    }
    return -1
}

/**
 * Return parent index
 * (k-1)/2
 * @param child
 * @returns {number|*}
 */
export function parentIndex(child) {
    return (child - 1) >> 1
}

/**
 * Return path to Left most leaf, 0 means go left and 1 means go right
 *
 * @param root
 * @param fromLeft, true follow left node
 * @returns {null|*[]}
 */
export function pathToLeafNode(root, fromLeft = true) {
    if (root === null) {
        return null
    }
    const path = [null]
    function _traverseToLeftMostLeafNode(node) {
        if (fromLeft) {
            if (node.left !== null) {
                path.push(0)
                return _traverseToLeftMostLeafNode(node.left)
            } else if (node.right !== null) {
                path.push(1)
                return _traverseToLeftMostLeafNode(node.right)
            }
        } else {
            if (node.right !== null) {
                path.push(1)
                return _traverseToLeftMostLeafNode(node.right)
            } else if (node.left !== null) {
                path.push(0)
                return _traverseToLeftMostLeafNode(node.left)
            }
        }
    }
    _traverseToLeftMostLeafNode(root)

    return path
}

/**
 * Traverse tree in LRT fashion
 *
 * @param root
 * @param onNodeReached
 * @returns {*[]}
 */
export function treeTraversalLRT(root, onNodeReached = null) {
    const nodes = []
    function traversal(node) {
        if (node.left !== null) {
            traversal(node.left)
        }
        if (node.right !== null) {
            traversal(node.right)
        }
        nodes.push(node.value)
        if (onNodeReached !== null) {
            onNodeReached(node)
        }
    }
    traversal(root)
    return nodes
}

/**
 * Traverse in LTR fashion
 * @param root
 * @param onNodeReached
 */
export function treeTraversalLTR(root, onNodeReached = null) {
    const nodes = []
    function traversal(node) {
        if (node.left !== null) {
            traversal(node.left)
        }
        nodes.push(node.value)
        if (onNodeReached !== null) onNodeReached(node)
        if (node.right !== null) {
            traversal(node.right)
        }
    }
    traversal(root)
    return nodes
}

/**
 * Traverse in TLR fashion
 * @param root
 * @param onNodeReached
 * @returns {*[]}
 */
export function treeTraversalTLR(root, onNodeReached = null) {
    const nodes = []
    function traversal(node) {
        nodes.push(node.value)
        if (onNodeReached !== null) onNodeReached(node)
        if (node.left !== null) {
            traversal(node.left)
        }
        if (node.right !== null) {
            traversal(node.right)
        }
    }
    traversal(root)
    return nodes
}

/**
 * if input is 2,2,0,0,0, tree formed is like below.
 *
 *    11
 *   11  00
 *  00 00
 *
 * @param array
 */
export function createTreeFromNumberElement(array) {
    let rootNode = new TreeNode(0)
    let queue = []
    queue.push(rootNode)
    for (let i = 0; i < array.length; i++) {
        let nextNode = queue.shift()
        switch (array[i]) {
            case 4:
                nextNode.left = new TreeNode(firstChildIndex(i))
                nextNode.right = new TreeNode(firstChildIndex(i) + 1)
                queue.push(nextNode.left)
                queue.push(nextNode.right)
                break
            case 2:
                nextNode.left = new TreeNode(firstChildIndex(i))
                queue.push(nextNode.left)
                break
            case 1:
                nextNode.right = new TreeNode(firstChildIndex(i) + 1)
                queue.push(nextNode.right)
                break
            case 0:
                break
        }
    }
    return rootNode
}

export function isCompleteBinaryTree(tree) {
    // if we check all leaf by left to right, and if it is complete, it is complete binary tree
    // Get path to left most leaf node
    // Go to parent
}
