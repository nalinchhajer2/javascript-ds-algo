import fs from 'fs';
import {csvToObj} from 'csv-to-js-parser';
import {
    initializaNutritionAutoComplete,
} from '../../problems/NutritionAutoComplete';
import {AVLTree} from '../../ds/AVLTree';
import {
    pathToLeafNode,
    treeTraversalLRT,
    treeTraversalLTR,
    treeTraversalTLR,
} from '../../ds/Tree';

/**
 * Javascript Data structure and Algorithm :-
 *
 * Everything you need to learn for improving performance in your app
 *
 * Javascript is the easiest and flexible.
 *
 * 1. why
 * 2. Big O -
 * 3. types of data structure -> Array, set, object, heap, trie
 * 4. How to learn - tree, graph
 */
describe('Tech talk', () => {

    const testSize = 100000;
    describe('Remove all duplicate', () => {
        // https://bobbyhadz.com/blog/javascript-remove-duplicates-from-array-of-objects#:~:text=To%20remove%20all%20duplicate%20objects%20from%20an%20array%3A&text=Call%20the%20filter()%20method,object%20to%20the%20results%20array.
        const maxValue = 50000;
        const testArray = []
        for (let i = 0; i < testSize; i++) {
            testArray.push({id: i % maxValue})
        }
        test('method 1', () => {
            // Method 1 : on 5000 (164 ms), 500 (21 ms)
            const uniqueIds = [];

            const unique = testArray.filter(element => {
                const isDuplicate = uniqueIds.includes(element.id);

                if (!isDuplicate) {
                    uniqueIds.push(element.id);

                    return true;
                }

                return false;
            });
            expect(unique.length).toEqual(maxValue);
        })

        test('method 2', () => {
            // Method 2 : on 5000 (5 ms), 500 (5 ms)
            const uniqueIds = new Set();

            const unique = testArray.filter(element => {
                const isDuplicate = uniqueIds.has(element.id);

                if (!isDuplicate) {
                    uniqueIds.add(element.id);

                    return true;
                }

                return false;
            });
            expect(unique.length).toEqual(maxValue);
        })

        test('method 3', () => {
            // Method 3: 5000 (6 ms) and 500 (6 ms)
            const uniqueIds = {};

            const unique = testArray.filter(element => {
                const isDuplicate = uniqueIds[element.id] === true;

                if (!isDuplicate) {
                    uniqueIds[element.id] = true;

                    return true;
                }

                return false;
            });
            expect(unique.length).toEqual(maxValue);
        })
    })

    describe('autocomplete menu item', () => {
        const data = fs.readFileSync('./nutrition_trim.csv', 'utf8');
        const description = {
            '0':     {type: 'number',group: 1},
            '1':         {type: 'string',group: 1},
            '2':      {type: 'string',group: 1},
            '3':   {type: 'number',group: 1}
        };
        let foodObject = csvToObj(data,',',description)
        foodObject = [...foodObject, ...foodObject, ...foodObject]
        const nutritionWordTrie  = initializaNutritionAutoComplete(foodObject);

        test('method 1', () => {
            function method1(searchString) {
                return foodObject.filter((foodItem) => {
                    return foodItem['1'].toLowerCase().startsWith(searchString);
                })
            }
            expect(method1('a').length > 1).toEqual(true);
            expect(method1('al').length > 1).toEqual(true);
            expect(method1('alc').length > 1).toEqual(true);
            expect(method1('alco').length > 1).toEqual(true);
            expect(method1('alcoh').length > 1).toEqual(true);
            expect(method1('alcoho').length > 1).toEqual(true);
            expect(method1('alcohol').length > 1).toEqual(true);
        })

        test('method 2', () => {
            function method2(searchString) {
                return nutritionWordTrie.autoComplete(searchString);
            }

            expect(method2('a').length > 1).toEqual(true);
            expect(method2('al').length > 1).toEqual(true);
            expect(method2('alc').length > 1).toEqual(true);
            expect(method2('alco').length > 1).toEqual(true);
            expect(method2('alcoh').length > 1).toEqual(true);
            expect(method2('alcoho').length > 1).toEqual(true);
            expect(method2('alcohol').length > 1).toEqual(true);
        })
    })


})

test('AVL Tree', () => {
    let tree = new AVLTree()
    tree.insert(7)
    tree.insert(8)
    tree.insert(9)
    tree.insert(10)
    tree.insert(11)
    tree.insert(12)
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(5)
    tree.insert(6)
    expect(Math.abs(tree.root.bf())).toBeLessThan(2)
    expect(tree.max()).toEqual(12)
    expect(tree.min()).toEqual(1)
    expect(tree.findNode(12).value).toEqual(12)
    expect(tree.findNode(1).value).toEqual(1)
    expect(tree.findNode(8).value).toEqual(8)
    expect(tree.findNode(13)).toEqual(null)

    expect(treeTraversalLTR(tree.root)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ])
    expect(treeTraversalLRT(tree.root)).toEqual([
        1, 3, 2, 6, 5, 4, 9, 8, 12, 11, 10, 7,
    ])
    expect(treeTraversalTLR(tree.root)).toEqual([
        7, 4, 2, 1, 3, 5, 6, 10, 8, 9, 11, 12,
    ])
    expect(pathToLeafNode(tree.root)).toEqual([null, 0, 0, 0])

    tree = new AVLTree()
    for (let x of 'VSXQGJPLNVCDF') {
        tree.insert(x)
    }
    expect(treeTraversalLTR(tree.root)).toEqual([
        'C',
        'D',
        'F',
        'G',
        'J',
        'L',
        'N',
        'P',
        'Q',
        'S',
        'V',
        'X',
    ])
})
