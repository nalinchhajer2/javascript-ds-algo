/**
 * Given a pattern in {x,y} and string, find x = s0 and y = s1 and return [x,y]
 * @param pattern
 * @param string
 */
function patternMatcher(pattern, string) {
    // Soln 1 -> Fast but fail when x = a and y = aa
    // Calculate number of x and y  - o(p)
    // pointers = find all repeat strings with frequency, take first char as cue - o(s)
    // increment pointers until the condition is satisfied of substring.length === x. Create a stack to store the result
    // Assumption is so and s1 is not same
    // There should be a case when we have n(s1) === n(x) and in next n(s1) < n(x), we will find x
    // Do another 2 pointer to find y
    // Test cases
    // xyxyxy -> xyxyxy
    // x = a|abc | aba
    // y = aa|a | a
    // 2 pointer overlaps
    // xyx abaaaba
    // a -> [true, true, true, true, true] -> 5
    // ab -> [true, false, false, true, false] -> 2
    // aba -> [true, false, false, true, false] -> 2
    // abaa -> [true, false, false, false, false] -> 1
    // xyx -> aaaa
    // a -> [true, true,
}
