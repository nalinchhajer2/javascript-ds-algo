/**
 *
 * @param tree
 * @returns {number}
 */
import { treeTraversalLRT, treeTraversalLTR } from '../ds/Tree'

export function binaryTreeDiameter(tree) {
    treeTraversalLRT(tree, (node) => {
        let leftDiameter = 0
        let height = 0
        let heightDia = 0
        if (node.left !== null) {
            leftDiameter = node.left.diameter
            height = Math.max(height, node.left.height)
            heightDia = heightDia + node.left.height
        }
        let rightDiameter = 0
        if (node.right !== null) {
            rightDiameter = node.right.diameter
            height = Math.max(height, node.right.height)
            heightDia = heightDia + node.right.height
        }

        node.diameter = Math.max(leftDiameter, rightDiameter, heightDia)
        node.height = height + 1
    })
    return tree.diameter
}

/**
 * Find node after the particular node
 * @param tree
 * @param node
 */
export function findSuccessor(tree, node) {
    let isFound = false
    let successor = null
    treeTraversalLTR(tree, (traverseNode) => {
        if (isFound) {
            successor = traverseNode
            isFound = false
        }
        if (traverseNode.value === node.value) {
            isFound = true
        }
    })
    if (successor === null) {
        return null
    }
    return successor.value
}

/**
 * Check if all element have findHeight balanced
 *
 * @param tree
 * @returns {*}
 */
export function heightBalancedBinaryTree(tree) {
    // Write your code here.
    treeTraversalLRT(tree, (node) => {
        let leftHeight = node.left?.height ?? 0
        let rightHeight = node.right?.height ?? 0
        node.height = Math.max(leftHeight, rightHeight) + 1
        node.diff = Math.abs(leftHeight - rightHeight)
        node.isBalanced =
            (node.left?.isBalanced ?? true) &&
            (node.right?.isBalanced ?? true) &&
            node.diff <= 1
    })

    return tree.isBalanced
}
