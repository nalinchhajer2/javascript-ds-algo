/**
 * **Smallest Difference**
 * Pair of number whose absolute difference is small
 * */
export function smallestDifference(array1, array2) {
    const sortedArray1 = array1.sort((a, b) => a - b)
    const sortedArray2 = array2.sort((a, b) => a - b)
    let i = 0
    let j = 0
    let minValue = Infinity
    let minValueElement = []
    while (i < sortedArray1.length && j < sortedArray2.length) {
        const distance = distanceNumber(sortedArray1[i], sortedArray2[j])
        if (distance < minValue) {
            minValue = distance
            minValueElement = [sortedArray1[i], sortedArray2[j]]
        }
        if (sortedArray1[i] < sortedArray2[j]) {
            i++
        } else {
            j++
        }
    }
    return minValueElement
}

/**
 * Returns distance between 2 numbers
 * @param num1
 * @param num2
 */
export function distanceNumber(num1, num2) {
    return Math.abs(num2 - num1)
}

/**
 * Number of repeats possible. 4c1 => 4 | 4c2 => 12
 * @param total
 * @param repeats
 * @returns {number}
 */
export function numberOfPermutation(total, repeats) {
    if (repeats <= 0 || total === repeats) {
        return 1
    }

    if (total - repeats < repeats) {
        repeats = total - repeats
    }

    return (
        stepMultiplication(total, total - repeats) /
        stepMultiplication(repeats, 1)
    )
}

/**
 * Step multiplication till end number is reached. For eg. 4, 3 => 4*3 => 12
 * @param startNumber
 * @param endNumber, should be > 0 else result will be 0
 * @returns {number}
 */
export function stepMultiplication(startNumber, endNumber) {
    let product = 1
    while (startNumber > 1 && startNumber > endNumber) {
        product = product * startNumber
        startNumber--
    }
    return product
}
