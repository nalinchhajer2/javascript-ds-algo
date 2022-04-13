/**
 *
 * @param bigString 'abc'
 * @param smallStrings ['abc]
 */
import { suffixTrie, Trie } from '../ds/Trie'

export function multiStringSearch(bigString, smallStrings) {
    let trie = suffixTrie(bigString)
    return smallStrings.map((text) => {
        return trie.startWith(text)
    })
}
