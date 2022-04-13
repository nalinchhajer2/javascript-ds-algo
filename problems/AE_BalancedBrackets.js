/**
 * Balance Brackets
 * @param string
 * @returns {boolean}
 */
export function balancedBrackets(string) {
    // Write your code here.
    let stack = []
    let openBrackets = { '(': ')', '[': ']', '{': '}' }
    let closeBrackets = { ')': '(', ']': '[', '}': '{' }
    for (let char of string) {
        if (openBrackets[char]) {
            stack.push(char)
        } else if (closeBrackets[char]) {
            const lastChar = stack.pop()
            if (lastChar !== closeBrackets[char]) {
                return false
            }
        }
    }
    return stack.length === 0
}
