function processTestCase(input: string): string[] {
    const lines = input.split('\n');
    let index = 0;
    const t = parseInt(lines[index++]);
    const results: string[] = [];
    for (let tc = 0; tc < t; tc++) {
        const [n, u] = lines[index++].split(' ').map(Number);
        const updates: [number, number, number][] = [];
        const queries: number[] = [];
        for (let i = 0; i < u; i++) {
            const [l, r, val] = lines[index++].split(' ').map(Number);
            updates.push([l, r, val]);
        }
        const q = parseInt(lines[index++]);
        for (let i = 0; i < q; i++) {
            queries.push(parseInt(lines[index++]));
        }
        const arr = new Array(n).fill(0);
        for (const [l, r, val] of updates) {
            arr[l] += val;
            if (r + 1 < n) {
                arr[r + 1] -= val;
            }
        }
        for (let i = 1; i < n; i++) {
            arr[i] += arr[i - 1];
        }
        const answers: number[] = [];
        for (const query of queries) {
            answers.push(arr[query]);
        }
        results.push(...answers.map(String));
    }
    return results;
}
const input = `1
5 3
0 1 7
2 4 6
1 3 2
3
0
3
4`;
const output = processTestCase(input);
console.log(output.join('\n'));