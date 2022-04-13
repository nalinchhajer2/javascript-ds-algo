import { selectItemWithMaxWeight } from '../../problems/DP/DP_01_KnapSnack'

describe('dp', () => {
    test('selectItemWithMaxWeight', () => {
        expect(
            selectItemWithMaxWeight(
                [
                    [1, 2],
                    [2, 3],
                    [5, 4],
                    [6, 5],
                ],
                8
            )
        ).toEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 2, 2, 3, 3, 3, 3],
            [0, 0, 1, 2, 5, 5, 6, 7, 7],
            [0, 0, 1, 2, 5, 6, 6, 7, 8],
        ])
    })
})
