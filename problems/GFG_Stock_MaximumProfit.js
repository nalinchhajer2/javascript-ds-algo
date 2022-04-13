/**
 * Maximum profit selling stick O(log n)
 * @param prices
 * @returns {*[]}
 */
export function maximumProfitSellingStock(prices) {
    // find minima and maxima
    // continue at end
    let solutions = []
    let i = 0
    let last = prices.length - 1
    while (i <= last) {
        // find next minima
        while (i < last && prices[i] >= prices[i + 1]) {
            i++
        }

        // Reached last element
        if (i === last) {
            break
        }

        let solution = [i, null, null]
        i++
        // Find next maxima
        while (i < last && prices[i] <= prices[i + 1]) {
            i++
        }

        solution[1] = i
        solution[2] = prices[solution[1]] - prices[solution[0]]
        solutions.push(solution)
        i++
    }
    return solutions
}

/**
 * Finds peak in o(log n)
 * https://youtu.be/HtSuA80QTyo?t=1149
 * @param elements
 * @returns {*}
 */
export function findPeak(elements) {
    const _peakCheck = function (array, low, high) {
        let l = low
        let r = high
        let mid
        while (l <= r) {
            mid = findMidIndex(l, r)
            // peek{a,b,c} => b>a & b>c
            if (
                (mid === 0 || array[mid - 1] < array[mid]) &&
                array[mid + 1] < array[mid]
            ) {
                break
            }

            if (mid > l && array[mid - 1] > array[mid]) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        return mid
    }

    return _peakCheck(elements, 0, elements.length - 1)
}

export function findMidIndex(left, right) {
    return (left + right) >> 1 // Math.floor(l + (r - l) / 2)
}
