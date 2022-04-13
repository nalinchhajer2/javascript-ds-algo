import {
    countWays,
    minCoins,
    minRewards,
} from '../../problems/AE_DynamicProgramming'

describe('Dynamic programming', () => {
    test('minRewards', () => {
        expect(minRewards([1, 2, 1])).toEqual(4)
        expect(minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5])).toEqual(25)
    })

    test('countWays', () => {
        expect(countWays([1, 2, 3], 4)).toEqual(4)
        expect(countWays([1, 4, 8], 98)).toEqual(169)
    })

    test('minCoins', () => {
        expect(minCoins([2, 3], 4)).toEqual(2)
        expect(minCoins([1, 2, 4], 8)).toEqual(2)
        expect(minCoins([25, 10, 5], 30)).toEqual(2)
        expect(minCoins([25, 10, 5], 11)).toEqual(-1)
    })
})
