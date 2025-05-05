function main() {
    const input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
    const [n, T] = input[0].split(' ').map(Number);
    const words = input[1].split(' ').map(Number);
    let low = 1;
    let high = Math.max(...words);
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (isFeasible(mid, words, T)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    console.log(low);
}
function isFeasible(v: number, words: number[], T: number): boolean {
    let totalPenalty = 0;
    for (const w of words) {
        totalPenalty += Math.floor((w + v - 1) / v); 
    }
    return totalPenalty < T;
}
main();