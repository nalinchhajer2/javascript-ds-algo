/**
 * Trie DS, contains trie nodes.
 * Create using given sentence
 *
 * Word Trie. Suffix trie
 */
const WORD_INDICATOR = '*'

export function wordTrie(sentence) {
    let words = sentence.split(' ')
    let trie = new Trie()
    for (let x of words) {
        trie.insert(x)
    }
    return trie
}

export function suffixTrie(sentence) {
    let words = sentence.split(' ')
    let trie = new Trie()
    for (let x of words) {
        trie.insertSuffix(x)
    }
    return trie
}

export class Trie {
    constructor() {
        this.root = {}
    }

    /**
     * Insert the given word
     * Iterate through each word, if found a non word character, it will start from start. Saves only in lower case
     * @param word
     * @param fromCharacter
     */
    insert(word, fromCharacter = 0) {
        let lowerCaseSentence = word.toLowerCase()
        let pointer = this.root
        for (let i = fromCharacter; i < word.length; i++) {
            let x = lowerCaseSentence[i]
            if (!pointer[x]) {
                pointer[x] = {}
            }
            pointer = pointer[x]
        }
        pointer[WORD_INDICATOR] = 1
    }

    insertSuffix(word) {
        for (let i = 0; i < word.length; i++) {
            this.insert(word, i)
        }
    }

    /**
     * Check if contains word
     *
     * @param pattern
     * @returns {boolean}
     */
    contains(pattern) {
        return this._contains(pattern, true)
    }

    startWith(pattern) {
        return this._contains(pattern, false)
    }

    remove(pattern) {
        return this._remove(pattern, 0, this.root)
    }

    /** remove word if found
     *
     * @param pattern
     * @param index
     * @param node
     * @private
     */
    _remove(pattern, index, node) {
        if (!node) {
            throw 'Pattern not found'
        }
        if (index === pattern.length) {
            delete node[WORD_INDICATOR]
        }
        if (index < pattern.length) {
            this._remove(pattern, index + 1, node[pattern[index]])
        }
        if (node[WORD_INDICATOR] !== 1) {
            delete node[pattern[index]]
        }
    }

    words() {
        const arr = []
        this._traverse(arr, this.root, '')
        return arr
    }

    _traverse(output, node, prefix) {
        for (let x in node) {
            if (x === WORD_INDICATOR) {
                output.push(prefix)
            } else {
                this._traverse(output, node[x], prefix + x)
            }
        }
    }

    autoComplete(pattern) {
        const arr = []
        if (pattern.length === 0) {
            return arr
        }
        let pointer = this._pointerToPattern(pattern)
        if (pointer === null) {
            return arr
        }

        this._traverse(arr, pointer, pattern)
        return arr
    }

    _pointerToPattern(pattern) {
        let pointer = this.root
        for (let x of pattern.toLowerCase()) {
            if (pointer[x]) {
                pointer = pointer[x]
            } else {
                return null
            }
        }
        return pointer
    }

    _contains(pattern, checkWordEnd = true) {
        let pointer = this.root
        for (let x of pattern.toLowerCase()) {
            if (pointer[x]) {
                pointer = pointer[x]
            } else {
                return false
            }
        }
        if (checkWordEnd) {
            return pointer[WORD_INDICATOR] === 1
        } else {
            return true
        }
    }
}
