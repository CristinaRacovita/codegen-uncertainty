function countZebraValues(t: number, testCases: [number, number, number][]): number[] {
    const results: number[] = [];
    const zebraLikeNumbers: number[] = [];
    let power = 1;
    while (power < 1e18) {
        zebraLikeNumbers.push(power);
        power *= 4; 
    }
    const dp: number[] = Array(1e18 + 1).fill(Infinity);
    dp[0] = 0;
    for (const num of zebraLikeNumbers) {
        for (let i = dp.length - 1; i >= num; i--) {
            dp[i] = Math.min(dp[i], dp[i - num] + 1);
        }
    }
    for (const [l, r, k] of testCases) {
        let count = 0;
        for (let x = l; x <= r; x++) {
            if (dp[x] === k) {
                count++;
            }
        }
        results.push(count);
    }
    return results;
}
const input = [
    [1, 100, 3],
    [1, 1, 1],
    [15, 77, 2],
    [2, 10, 100],
    [1234567, 123456789101112131, 12]
];
console.log(countZebraValues(5, input));