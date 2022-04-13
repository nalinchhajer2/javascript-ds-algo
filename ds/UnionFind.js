/***
 * 1. Union (A,B) -> Make A and B part of a group
 * 2. Find (A,B) -> Find if A and B are connected
 * 3. Find Parent (A) -> Find representative of parents
 */
export class UnionFind {
    constructor(nodes) {
        this.parents = []
        for (let i = 0; i < nodes; i++) {
            this.parents.push(i)
        }
    }

    union(elem1, elem2) {
        let left = this.find(elem1)
        let right = this.find(elem2)
        if (left === right) {
            return
        }
        this.parents[right] = left
    }

    find(node) {
        if (this.parents[node] !== node) {
            const result = this.find(this.parents[node])
            this.parents[node] = result
            return result
        }
        return this.parents[node]
    }
}

/**
 * Union by Rank
 */
