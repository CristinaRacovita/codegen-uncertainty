function countPlans(N: number, Q: number, discounts: number[], updates: [number, number][]): number[] {
    const MOD = BigInt(2 ** 64);
    let dp: bigint[][] = Array.from({ length: N + 1 }, () => Array(10).fill(BigInt(0)));
    for (let j = 0; j < 10; j++) {
        if (j !== discounts[0]) {
            dp[0][j] = BigInt(1);
        }
    }
    for (let i = 1; i <= N; i++) {
        for (let j = 0; j < 10; j++) {
            if (j === discounts[i - 1]) {
                for (let k = 0; k < 10; k++) {
                    if (k !== j) {
                        dp[i][j] = (dp[i][j] + dp[i - 1][k]) % MOD;
                    }
                }
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    let result: bigint = BigInt(0);
    for (let j = 0; j < 10; j++) {
        result = (result + dp[N][j]) % MOD;
    }
    const results: number[] = [Number(result)];
    for (const [i, v] of updates) {
        for (let j = 0; j < 10; j++) {
            if (j !== discounts[i - 1]) {
                dp[i - 1][j] = BigInt(1);
            } else {
                dp[i - 1][j] = BigInt(0);
            }
        }
        for (let j = i; j <= N; j++) {
            for (let k = 0; k < 10; k++) {
                if (k === discounts[j - 1]) {
                    for (let l = 0; l < 10; l++) {
                        if (l !== k) {
                            dp[j][k] = (dp[j][k] + dp[j - 1][l]) % MOD;
                        }
                    }
                } else {
                    dp[j][k] = dp[j - 1][k];
                }
            }
        }
        result = BigInt(0);
        for (let j = 0; j < 10; j++) {
            result = (result + dp[N][j]) % MOD;
        }
        results.push(Number(result));
    }
    return results;
}
const N = 4;
const Q = 2;
const discounts = [1, 2, 3, 4];
const updates: [number, number][] = [[2, 0], [3, 1]];
console.log(countPlans(N, Q, discounts, updates));