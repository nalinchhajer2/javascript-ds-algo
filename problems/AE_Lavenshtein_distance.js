/**
 * Lavenshtein Distance
 * Number of edits to get new String (insertion, deletion and substitution)
 *
 *  Sub problem -> Min [ top, left, Diagonal left] + { edit count }
 *  O (Min(n, m) ^ 2)
 *
 *   a s b n
 * s 1 2 3 4
 * a 1 2 3 4
 * p 2 2 3 4
 * ~ 3 3 3 4
 *
 *   a a b n
 * s 1 2 3 4
 * a 1 1 2 3
 * p 2 2 2 3
 * ~ 3 3 3 3
 *
 *   ~ a a b a
 * ~ 0 1 2 3 4
 * s 1 1 2 3 4
 * a 2 1 1 2 2
 * x 3 2 2 3
 * x 4 3 3 3
 *
 *
 */

export function lavenshteinDistance(str1, str2) {
    let matrix = []
    for (let i = 0; i <= str1.length; i++) {
        matrix[i] = []
        matrix[i].push(i)
    }
    for (let j = 0; j <= str2.length; j++) {
        matrix[0][j] = j
    }
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1]
            } else {
                matrix[i][j] = minTopLeftDiagonalLeft(matrix, i, j) + 1
            }
        }
    }
    return matrix[str1.length][str2.length]
}

export function minTopLeftDiagonalLeft(matrix, i, j) {
    const minValue = Math.min(
        i === 0 ? Infinity : matrix[i - 1][j],
        j === 0 ? Infinity : matrix[i][j - 1],
        i === 0 || j === 0 ? Infinity : matrix[i - 1][j - 1]
    )
    return minValue === Infinity ? 0 : minValue
}
