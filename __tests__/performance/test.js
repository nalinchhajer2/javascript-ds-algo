import { Graph } from '../../ds/Graph'
import { HeapPriorityQueue } from '../../ds/HeapPriorityQueue'
import { suffixTrie, wordTrie } from '../../ds/Trie'
import {
    arrayComparison,
    checkObjectEqual,
    isObjectEquals,
} from '../../ds/ArrayUtils'

describe('Performance Test', () => {
    const testSize = 100000
    // 11ms
    test('parents - sequence heap', () => {
        let set = new Set()
        for (let i = 0; i < testSize; i++) {
            set.add(i)
        }
        expect(set.size).toEqual(testSize)
        let count = 0
        for (let i = 0; i < testSize; i++) {
            if (set.has(i)) {
                count++
            }
        }
        expect(count).toEqual(testSize)
        let sum = 0
        for (let i = 0; i < testSize; i++) {
            sum = set.keys().next().value
        }
        expect(sum).toEqual(0)
    })

    // 3 sec
    test('array - sequence heap', () => {
        let array = []
        for (let i = 0; i < testSize; i++) {
            array.push(i)
        }
        expect(array.length).toEqual(testSize)

        let sum = 0
        for (let i = 0; i < testSize; i++) {
            sum = array[0]
        }
        expect(sum).toEqual(0)

        expect(Array(testSize).fill(undefined).length).toEqual(testSize)
    })

    test('map - sequence heap', () => {
        let map = {}
        for (let i = 0; i < testSize; i++) {
            map[i] = 1
        }
        expect(Object.keys(map).length).toEqual(testSize)
        let count = 0
        for (let i = 0; i < testSize; i++) {
            if (map[i] === 1) {
                count++
            }
        }
        expect(count).toEqual(testSize)
    })

    test('array delete', () => {
        let array = []
        for (let i = 0; i < testSize; i++) {
            array.push(i)
        }
        expect(array.length).toEqual(testSize)
        let copyArray = [...array]
        for (let i = testSize - 1; i >= 0; i--) {
            copyArray.splice(i, 1)
        }
        expect(copyArray.length).toEqual(0)
    })

    let graphLimit = 1000
    test('Graph - adjacency matrix', () => {
        let matrixGraph = new Graph(Graph.UNDIRECTED).getAdjacencyMatrix()

        for (let i = 1; i < graphLimit; i++) {
            matrixGraph.addEdge(i, i + 1)
        }
        expect(matrixGraph.matrix.length).toEqual(graphLimit)

        for (let i = 1; i < 5; i++) {
            expect(matrixGraph.nodeTraversalDFS(i).length).toEqual(graphLimit)
        }

        for (let i = 1; i < 5; i++) {
            expect(matrixGraph.nodeTraversalBFS(i).length).toEqual(graphLimit)
        }

        for (let i = 1; i < graphLimit; i++) {
            matrixGraph.removeEdge(i, i + 1)
        }

        for (let i = 1; i < 1000; i++) {
            matrixGraph.removeNode(i)
        }
        expect(matrixGraph.matrix.length).toEqual(1)
    })

    test('Graph - adjacency list', () => {
        let listGraph = new Graph(Graph.UNDIRECTED).getAdjacencyList()

        for (let i = 1; i < graphLimit; i++) {
            listGraph.addEdge(i, i + 1)
        }
        expect(listGraph.nodes.length).toEqual(graphLimit)

        for (let i = 1; i < 5; i++) {
            expect(listGraph.nodeTraversalDFS(i).length).toEqual(graphLimit)
        }

        for (let i = 1; i < 5; i++) {
            expect(listGraph.nodeTraversalBFS(i).length).toEqual(graphLimit)
        }

        for (let i = 1; i < graphLimit; i++) {
            listGraph.removeEdge(i, i + 1)
        }

        for (let i = 1; i < 1000; i++) {
            listGraph.removeNode(i)
        }
        expect(listGraph.nodes.length).toEqual(1)
    })

    test('Array in reverse order', () => {
        let array = []
        // Worst case
        // for (let i = 0; i < testSize; i++) {
        //     array.unshift(i)
        // }
        // expect(array[0]).toEqual(testSize - 1)

        for (let i = 0; i < testSize; i++) {
            array.push(i)
        }
        let newArray = []
        for (let i = testSize - 1; i >= 0; i--) {
            newArray.push(i)
        }
        expect(newArray[0]).toEqual(testSize - 1)
    })

    test('Priority Queue', () => {
        let queue = new HeapPriorityQueue()
        for (let i = 0; i < testSize; i++) {
            queue.enqueue(i)
        }
        expect(queue.length()).toEqual(testSize)
        for (let i = 0; i < testSize / 2; i++) {
            queue.dequeue()
        }
        for (let i = 0; i < testSize / 2; i++) {
            queue.remove(queue.heap[0].value)
        }
        expect(queue.length()).toEqual(0)
    })

    test('trie ds', () => {
        let words = []
        let chars =
            'Education means considerably more than just teaching a student to read, write, and\n' +
            'manipulate numbers. Computers, the Internet, and advanced electronic devices are\n' +
            'becoming essential in everyday life and have changed the way information is gathered.\n' +
            'How this new technology is utilized in the curriculum and managed by teachers will have an\n' +
            'important role to play in widening the resource and knowledge base for all students.\n' +
            'Technology affects the way teachers teach and students learn. To make the best use of\n' +
            'information technology (IT), schools need a workable plan to fully integrate it into all\n' +
            'aspects of the curriculum so students are taught how, why, and when to use technology to\n' +
            'further enhance their learning.' +
            'If a school does not have a clear plan of how and why it wishes to implement IT, then it\n' +
            'runs the risk of wasting money. In schools today, nearly all classrooms have access to a\n' +
            'computer. However, many schools mistake this as incorporating information technology\n' +
            'into the curriculum. School staff need to research what IT is available and what would best\n' +
            "serve the school's purpose, not simply purchase the latest equipment. There should be a\n" +
            "policy stating how IT is going to assist pupils' development and what teachers want pupils\n" +
            'to achieve (Reksten, 2000). Staff members need to be clear about what they want IT to do\n' +
            'for them before they can start incorporating it into their lessons.\n' +
            'The only way information technology is going to be useful to schools is if all staff members\n' +
            "are well-informed and fully supported. It is the principal's responsibility, and should be part\n" +
            "of the school's plan, to ensure that all staff are consulted about the changes, and that the\n" +
            'change is carefully organised. Some teachers may be resistant, especially if they have not\n' +
            'had much experience with computers, so training teachers is essential in implementing IT\n' +
            'into the school curriculum. Staff members must feel involved in the process of acquiring\n' +
            'technology, and in learning how to operate it, in order for them to increase their confidence\n' +
            'in using IT as a curriculum tool. Teachers are only going to be able to incorporate IT into\n' +
            'their lessons if they are competent users themselves (Reksten, 2000).'

        chars = chars.replaceAll('\n', ' ').replaceAll(/[^a-zA-Z0-9 ]/g, '')
        console.log(chars)
        for (let i = 0; i < 100; i++) {
            words.push(chars)
        }
        let sentence = words.join(' ')
        let trie = suffixTrie(sentence)
        expect(trie.startWith('abc')).toEqual(false)
        expect(trie.autoComplete('care')).toEqual(['carefully'])
        expect(trie.autoComplete('ho')).toEqual([
            'how',
            'however',
            'hools',
            'hool',
            'hould',
        ])

        trie = wordTrie(sentence)
        expect(trie.autoComplete('ho')).toEqual(['how', 'however'])
        expect(trie.words().length).toEqual(174)
    })

    test('arrayComparison', () => {
        let elem = {}
        for (let i = 0; i < 10; i++) {
            elem[i] = i
        }

        let leftArray = []
        for (let i = 0; i < testSize; i++) {
            leftArray.push({ id: i, ...elem })
        }

        let rightArray = []
        for (let i = testSize - 1; i >= 0; i--) {
            rightArray.push({ id: i, ...elem })
        }

        expect(arrayComparison(leftArray, rightArray)).toEqual(true)
        expect(arrayComparison(leftArray, leftArray)).toEqual(true)
        expect(arrayComparison(leftArray, leftArray.slice(2, 2))).toEqual(false)
        rightArray[4] = 108
        expect(arrayComparison(leftArray, rightArray)).toEqual(false)
    })

    test('object equality', () => {
        let result = false
        for (let i = 0; i < testSize; i++) {
            result = result || checkObjectEqual({ id: 1 }, { id: 2 })
        }
        expect(result).toEqual(false)

        expect(checkObjectEqual({ b: { c: 2 } }, { b: { c: 2 } })).toEqual(true)
        expect(checkObjectEqual({ b: { c: 3 } }, { b: { c: 2 } })).toEqual(
            false
        )
        expect(
            checkObjectEqual({ b: { c: { k: 3 } } }, { b: { c: 2 } })
        ).toEqual(false)
        expect(checkObjectEqual({}, { b: { c: 2 } })).toEqual(false)
        // expect(isObjectEquals({}, { b: { c: 2 } })).toEqual(false)
    })
})
