function findKthAmusingNumber(k: number): string {
    let count = 0;
    let queue: string[] = ['5', '6'];
    while (true) {
        const current = queue.shift()!;
        if (count === k - 1) {
            return current;
        }
        count++;
        queue.push(current + '5');
        queue.push(current + '6');
    }
}
function main() {
    const input = `2
1
5`;
    const lines = input.split('\n');
    const N = parseInt(lines[0], 10);
    for (let i = 1; i <= N; i++) {
        const k = parseInt(lines[i], 10);
        console.log(findKthAmusingNumber(k));
    }
}
main();