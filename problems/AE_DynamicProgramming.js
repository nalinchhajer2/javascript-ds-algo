/**
 * https://www.algoexpert.io/questions/Min%20Rewards
 * @param scores
 */
export function minRewards(scores) {
    let rewards = new Array(scores.length).fill(1)

    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > scores[i - 1]) {
            rewards[i] = Math.max(rewards[i], rewards[i - 1] + 1) //rewards[i - 1] + 1
        }
    }

    for (let i = scores.length - 2; i >= 0; i--) {
        if (scores[i] > scores[i + 1]) {
            rewards[i] = Math.max(rewards[i], rewards[i + 1] + 1)
        }
    }

    return rewards.reduce((t, x) => t + x, 0)
}

/**
 * https://www.geeksforgeeks.org/coin-change-dp-7/
 * @param coins
 * @param amount
 */
export function countWays(coins, amount) {
    let dp = new Array(amount + 1).fill(0)
    dp[0] = 1
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = dp[j] + dp[j - coins[i]]
        }
    }
    console.log(dp)
    return dp[amount]
}

export function minCoins(coins, amount) {
    let dp = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (coins[j] <= i) {
                let subResult = dp[i - coins[j]]
                if (subResult !== Infinity && subResult + 1 < dp[i]) {
                    dp[i] = subResult + 1
                }
            }
        }
        console.log(dp)
    }
    if (dp[amount] === Infinity) {
        return -1
    }
    return dp[amount]
}
