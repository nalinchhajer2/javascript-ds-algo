/**
 * Shorten the given file path
 * @param path
 */
const TOKEN_FILE_DELIM = 'file_delim'
const TOKEN_FILE_DOT = 'file_dot'
const TOKEN_CHAR = 'char'
export function shortenPath(path) {
    let stack = []
    let token = ''
    let lastTokenType = null
    function appendBackslash() {
        if (stack.length > 0) {
            if (stack[stack.length - 1] !== '/') {
                stack.push('/')
            }
        } else {
            stack.push('/')
        }
    }
    function saveToken() {
        switch (token) {
            case '/':
                appendBackslash()
                break
            case '.':
                break
            case '..':
                if (stack.length > 0) {
                    if (stack[stack.length - 1] === '/') {
                        stack.pop()
                    }
                }
                stack.pop()
                appendBackslash()
                break
            default:
                if (token !== '') stack.push(token)
        }

        token = ''
    }
    function addTokenChar(character) {
        if (character === '/') {
            saveToken()
            lastTokenType = TOKEN_FILE_DELIM
        } else if (character === '.') {
            if (lastTokenType !== TOKEN_FILE_DOT) {
                saveToken()
            }
            lastTokenType = TOKEN_FILE_DOT
        } else {
            if (lastTokenType !== TOKEN_CHAR) {
                saveToken()
            }
            lastTokenType = TOKEN_CHAR
        }

        token = token + character
    }

    for (let i = 0; i < path.length; i++) {
        let character = path[i]
        addTokenChar(character)
    }

    saveToken()

    return stack.join('')
}
