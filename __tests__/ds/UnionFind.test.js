import { UnionFind } from '../../ds/UnionFind'

describe('Union Find', () => {
    test('basic', () => {
        let set = new UnionFind(10)
        set.union(0, 1)
        set.union(0, 2)
        set.union(1, 3)
        expect(set.find(0)).toEqual(set.find(3))
        expect(set.find(0)).not.toEqual(set.find(4))
        expect(set.parents).toEqual([0, 0, 0, 0, 4, 5, 6, 7, 8, 9])
        set.union(8, 9)
        set.union(5, 6)
        set.union(4, 7)
        expect(set.parents).toEqual([0, 0, 0, 0, 4, 5, 5, 4, 8, 8])
        set.union(6, 7)
        expect(set.parents).toEqual([0, 0, 0, 0, 5, 5, 5, 4, 8, 8])
        set.union(9, 7)
        expect(set.parents).toEqual([0, 0, 0, 0, 5, 8, 5, 5, 8, 8])
    })

    let limit = 100000
    test('performance', () => {
        let set = new UnionFind(limit)
        for (let i = 0; i < limit; i += 2) {
            set.union(i, i + 1)
        }
        for (let i = 2; i < limit; i += 2) {
            set.union(i - 1, i)
        }
        expect(set.parents[0]).toEqual(0)
        expect(set.parents[set.parents.length - 1]).toEqual(limit - 2)
        // expect(set.ranks[0]).toEqual(limit / 2)
        expect(set.find(9)).toEqual(set.find(1))
    })
})
