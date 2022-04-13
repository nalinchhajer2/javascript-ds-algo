/**
 * This is 0/1 Knapsnack problem. Given items and weight, we need to find out max number of items with lower weight
 *
 * @param items
 * @param totalWeight
 */
export function selectItemWithMaxWeight(items, totalWeight) {
    let wt = []
    let profit = []
    let result = []
    items.forEach((item) => {
        profit.push(item[0])
        wt.push(item[1])
    })

    let matrix = new Array(items.length + 1)
        .fill(0)
        .map(() => new Array(totalWeight + 1).fill(0))

    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix[i].length; j++) {
            matrix[i][j] = Math.max(
                matrix[i - 1][j],
                j - wt[i - 1] >= 0
                    ? matrix[i - 1][j - wt[i - 1]] + profit[i - 1]
                    : 0
            )
        }
    }

    return matrix
}
