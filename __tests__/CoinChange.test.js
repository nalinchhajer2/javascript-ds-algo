import getChange from '../ds/CoinChange';

describe('Coin Change', () => {
    test('getChange', () => {
        expect(getChange(5, 0.99)).toEqual([1,0,0,0,0,4]);
        expect(getChange(3.14, 1.99)).toEqual([0,1,1,0,0,1]);
        expect(getChange(0.45, 0.34)).toEqual([1,0,1,0,0,0]);
        expect(getChange(4, 3.14)).toEqual([1,0,1,1,1,0]);
    })
})
