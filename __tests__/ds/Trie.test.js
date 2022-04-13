import { suffixTrie, Trie, wordTrie } from '../../ds/Trie'

describe('Trie', () => {
    test('trie', () => {
        expect(wordTrie('abc').contains('abc')).toEqual(true)
        expect(wordTrie('abc def').contains('def')).toEqual(true)
        expect(wordTrie('abc def').contains('de')).toEqual(false)
        expect(suffixTrie('abc').contains('bc')).toEqual(true)
        let trie = suffixTrie('abc def ghi')
        expect(trie.contains('ghi')).toEqual(true)
        trie.remove('ghi')
        expect(trie.contains('ghi')).toEqual(false)
        expect(wordTrie('abc def abcd abd').autoComplete('ab')).toEqual([
            'abc',
            'abcd',
            'abd',
        ])
        expect(wordTrie('abc def abcd abd').autoComplete('xy')).toEqual([])

        expect(wordTrie('abc def abcd abd').words()).toEqual([
            'abc',
            'abcd',
            'abd',
            'def',
        ])
    })
})
