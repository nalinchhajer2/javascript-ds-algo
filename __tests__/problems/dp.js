import { selectItemWithMaxWeight } from '../../problems/DP/DP_01_KnapSnack'
import fs from 'fs';
import {
    initializaNutritionAutoComplete, InternalTrie,
} from '../../problems/NutritionAutoComplete';

describe('dp', () => {
    test('selectItemWithMaxWeight', () => {
        expect(
            selectItemWithMaxWeight(
                [
                    [1, 2],
                    [2, 3],
                    [5, 4],
                    [6, 5],
                ],
                8
            )
        ).toEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 2, 2, 3, 3, 3, 3],
            [0, 0, 1, 2, 5, 5, 6, 7, 7],
            [0, 0, 1, 2, 5, 6, 6, 7, 8],
        ])
    })

    test('nutrition autocomplete', () => {
        let nutritionWordTrie = new InternalTrie()
        nutritionWordTrie.insert('abc','1')
        expect(nutritionWordTrie.contains('abc')).toEqual(true);
        expect(nutritionWordTrie.contains('abcd')).toEqual(false);
        nutritionWordTrie.remove('abc');
        expect(nutritionWordTrie.contains('abc')).toEqual(false);

        nutritionWordTrie.insert('abc,?/', '2');
        expect(nutritionWordTrie.startWith('a')).toEqual(true);
        expect(nutritionWordTrie.contains('a')).toEqual(false);
        nutritionWordTrie.insert('123', '4')
        expect(nutritionWordTrie.contains('123')).toEqual(true);
        // expect(nutritionWordTrie.autoComplete('1')).toEqual(['123']);
        // expect(nutritionWordTrie.root).toEqual(null);

        const data = fs.readFileSync('./nutrition_trim.csv', 'utf8');
        nutritionWordTrie = initializaNutritionAutoComplete(data);
        expect(nutritionWordTrie.startWith('agu')).toEqual(true);
        fs.writeFileSync('./nutrition_trim.json', JSON.stringify(nutritionWordTrie.root),'utf8');
        // expect(nutritionWordTrie.autoComplete('fish')).toEqual([]);
    })
})
