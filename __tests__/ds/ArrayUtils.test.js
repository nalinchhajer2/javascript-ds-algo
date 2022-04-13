import {
    binarySearch,
    leftjoin,
    quickSort,
    searchNewItem,
    searchNewPrinter,
} from '../../ds/ArrayUtils'

describe('ArrayUtils', () => {
    test('binarySearch', () => {
        let arr = [1, 8, 10, 100, 900]
        expect(binarySearch(arr, 100)).toEqual(true)
        expect(binarySearch(arr, 1)).toEqual(true)
        expect(binarySearch(arr, 900)).toEqual(true)
        expect(binarySearch(arr, 10)).toEqual(true)
        expect(binarySearch(arr, 102)).toEqual(false)
        expect(binarySearch(arr, 902)).toEqual(false)
        expect(binarySearch([], 902)).toEqual(false)
    })

    test('quickSort', () => {
        let arr = [9, 15, 3, 7, 4]
        expect(quickSort(arr)).toEqual(2)
        expect(arr).toEqual([15, 3, 7, 9, 4])
    })

    // to get the new printer
    // Fix the printer id address, usb address
    // Migration case for brand handling
    test('right join', () => {
        const airPrint = { id: 'x' }
        expect(
            leftjoin([{ id: 1 }, { id: 2 }, airPrint], [{ id: 1 }, airPrint])
        ).toEqual([{ id: 2 }])

        expect(
            leftjoin([{ id: 1 }, { id: 2 }], [{ id: 1 }, { id: 4 }])
        ).toEqual([{ id: 2 }])

        expect(leftjoin([{ id: 1 }, { id: 2 }], [])).toEqual([
            { id: 1 },
            { id: 2 },
        ])

        expect(leftjoin([], [])).toEqual([])

        const searchArray = new Array(100000).fill(null).map((_, index) => {
            return { id: index }
        })

        expect(leftjoin(searchArray, []).length).toEqual(searchArray.length)
        expect(leftjoin(searchArray, [...searchArray]).length).toEqual(0)
    })
})
