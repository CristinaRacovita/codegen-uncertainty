function largestMinimumDistance(t: number, testCases: { N: number, C: number, stalls: number[] }[]): number[] {
    const results: number[] = [];
    for (let i = 0; i < t; i++) {
        const { N, C, stalls } = testCases[i];
        stalls.sort((a, b) => a - b);
        let low = 1;
        let high = stalls[N - 1] - stalls[0];
        let result = 0;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            let count = 1; 
            let lastPosition = stalls[0];
            for (let j = 1; j < N; j++) {
                if (stalls[j] - lastPosition >= mid) {
                    count++;
                    lastPosition = stalls[j];
                }
            }
            if (count >= C) {
                result = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        results.push(result);
    }
    return results;
}
const input = [
    { N: 5, C: 3, stalls: [1, 2, 8, 4, 9] }
];
console.log(largestMinimumDistance(1, input));