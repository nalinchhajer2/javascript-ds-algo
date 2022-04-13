/**
 * Array is sorted
 * @param array
 * @param target
 */
export function binarySearch(array, target) {
    if (array.length === 0) return false

    function _traversal(array, start, end, target) {
        if (start > end) return false
        let halfIndex = Math.floor((start + end) / 2)
        if (array[halfIndex] === target) return true
        if (array[halfIndex] > target) {
            // left
            return _traversal(array, start, halfIndex - 1, target)
        } else {
            // right
            return _traversal(array, halfIndex + 1, end, target)
        }
    }
    return _traversal(array, 0, array.length - 1, target)
}

export function quickSort(array) {
    // pivot element
    // move all element smaller to left
    // move all element greater to right
    // quick sort on both the array

    function sort(array, left, right) {
        let pivotIndex = (left + right) >> 1 // mid element
        let pivotValue = array[pivotIndex]
        let smallIndex = left
        swap(array, pivotIndex, right)
        let end = right - 1

        while (smallIndex < end) {
            if (array[smallIndex] <= pivotValue) {
                smallIndex++
            } else {
                swap(array, smallIndex, end)
                end--
            }
        }

        if (array[right] < array[smallIndex + 1]) {
            swap(array, right, smallIndex + 1)
        }
        return pivotIndex
    }
    return sort(array, 0, array.length - 1)
}

export function swap(array, i, j) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
}

/**
 * array1 = [1,2,3]
 * array2 = [3,2,1]
 *
 * @param array1
 * @param array2
 * @returns {boolean}
 */
export function arrayComparison(array1, array2) {
    const array2Sorted = array2.slice().sort((a, b) => a.id - b.id)
    return (
        array1.length === array2.length &&
        array1
            .slice()
            .sort((a, b) => a.id - b.id)
            .every(function (value, index) {
                return checkObjectEqual(value, array2Sorted[index])
            })
    )
}

export function checkObjectEqual(object1, object2) {
    return (
        object1 === object2 ||
        (isObjectEquals(object1, object2) && isObjectEquals(object2, object1))
    )
}

// { } , {id: 2, a:'a'}}
export function isObjectEquals(object1, object2) {
    // if (Object.keys(object1).length !== Object.keys(object2).length)
    //     return false
    // let keys = Object.keys(object1)
    for (let k in object1) {
        // let k = keys[i]
        if (object1[k] !== object2[k]) {
            if (
                typeof object1[k] === 'object' &&
                typeof object2[k] === 'object'
            ) {
                if (!isObjectEquals(object1[k], object2[k])) {
                    return false
                }
            } else {
                return false
            }
        }
    }

    return true

    // return _.isEqual(object1, object2)
}

export function searchNewPrinter(searchItem, includedItems) {
    searchItem.forEach((item) => {
        item.new_key = findUnique(item)
    })

    const newIncludedItem = includedItems.map((item) => {
        const metadata = JSON.parse(item.metadata)
        metadata.new_key = findUnique(metadata)
        return metadata
    })
    return leftjoin(searchItem, newIncludedItem, 'new_key')
}

export function searchNewItem(searchItem, includedItems) {
    searchItem.forEach((item) => {
        item.id = findUnique(item)
    })

    includedItems.forEach((item) => {
        item.id = findUnique(item)
    })
    return leftjoin(searchItem, includedItems)
}

export function findUnique(item) {
    if (item.new_key) {
        return item.new_key
    }
    let name = ''
    if (item.type) {
        name += item.type + ' '
    }
    if (item.mac) {
        name += item.mac + ' '
    }
    if (item.usb) {
        name += 'usb '
    }
    return name.trim()
}

export function leftjoin(searchItem, includedItems, id = 'id') {
    // const uniqueId = includedItems.map((item) => item.id)
    const set = new Set()
    for (let i = 0; i < includedItems.length; i++) {
        set.add(includedItems[i][id])
    }

    return searchItem.filter((allItem) => {
        // const available = uniqueId.includes(allItem.id)
        const available = set.has(allItem[id])
        return !available
    })
}
