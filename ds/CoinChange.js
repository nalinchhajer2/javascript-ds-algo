const CURRENCY = [1,5,10,25,50,100].reverse()

const getChange = function(money, price) {
    let change = Math.floor(((money * 100) - (price * 100)))
    const resultArray = new Array(CURRENCY.length).fill(0)
    while (change > 0) {
        for (let i = 0; i < CURRENCY.length; i++) {
            if (change - CURRENCY[i] >= 0) {
                change = change - CURRENCY[i]
                resultArray[i] = resultArray[i] + 1
                break;
            }
        }

    }
    return resultArray.reverse();
}

export default getChange;
