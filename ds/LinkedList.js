/**
 * Link list
 */
export class LinkedList {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

/**
 * Convert given array to linked list
 * @param array
 * @returns {null}
 */
export function arrayToLinkedList(array) {
    let head = null
    let pointer = null
    for (let i = 0; i < array.length; i++) {
        if (pointer === null) {
            pointer = new LinkedList(array[i])
            head = pointer
        } else {
            pointer.next = new LinkedList(array[i])
            pointer = pointer.next
        }
    }

    return head
}
