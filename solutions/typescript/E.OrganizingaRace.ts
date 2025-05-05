function mostBeautifulRace(n: number, k: number, w: number[], g: number[]): number {
    const gasPrefixSum = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        gasPrefixSum[i] = gasPrefixSum[i - 1] + g[i - 1];
    }
    let maxBeauty = 0;
    for (let l = 1; l <= n; l++) {
        let remainingGas = gasPrefixSum[l];
        let currentBeauty = 0;
        for (let r = l; r <= n; r++) {
            currentBeauty = r - l + 1;
            const distanceToR = gasPrefixSum[r] - gasPrefixSum[l - 1];
            const distanceBackToL = gasPrefixSum[r] - gasPrefixSum[l - 1];
            if (remainingGas >= distanceToR + distanceBackToL) {
                maxBeauty = Math.max(maxBeauty, currentBeauty);
            } else {
                break;
            }
        }
    }
    return maxBeauty;
}
const n = 4;
const k = 4;
const w = [2, 2, 2];
const g = [1, 1, 1, 1];
console.log(mostBeautifulRace(n, k, w, g)); 
const n2 = 8;
const k2 = 5;
const w2 = [2, 2, 2, 3, 7, 3, 1];
const g2 = [1, 3, 1, 5, 4, 0, 2, 5];
console.log(mostBeautifulRace(n2, k2, w2, g2));