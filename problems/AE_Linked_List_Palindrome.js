/**
 * Check if given linked list is palindrome or not
 */

export function linkedListPalindrome(head) {
    const _traverse = function (head, tail) {
        if (tail === null) return null
        let result = true
        if (tail.next !== null) {
            let { newHead, newResult } = _traverse(head, tail.next)
            head = newHead
            result = newResult
        }

        return {
            newHead: head.next,
            newResult: result && head.value === tail.value,
        }
    }
    let { newResult } = _traverse(head, head)
    return newResult
}
