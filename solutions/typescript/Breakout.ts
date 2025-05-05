function simulateBreakout(b: number, w: number, h: number, balls: { t: number, p: number, d: number }[]): number[] {
    const wall = Array.from({ length: h }, () => Array(w).fill(true));
    const results: number[] = [];
    for (const { t, p, d } of balls) {
        let target = t;
        let bounces = 0;
        while (true) {
            const start = Math.max(0, target - p);
            const end = Math.min(w - 1, target + p);
            let destroyed = false;
            for (let i = start; i <= end; i++) {
                if (wall[h - 1][i]) {
                    destroyed = true;
                    break;
                }
            }
            if (!destroyed) {
                break;
            }
            for (let i = start; i <= end; i++) {
                if (wall[h - 1][i]) {
                    wall[h - 1][i] = false;
                    bounces++;
                }
            }
            for (let col = 0; col < w; col++) {
                let fallCount = 0;
                for (let row = h - 1; row >= 0; row--) {
                    if (!wall[row][col]) {
                        fallCount++;
                    } else {
                        wall[row + fallCount][col] = true;
                        if (fallCount > 0) {
                            wall[row][col] = false;
                        }
                    }
                }
            }
            target += d;
            if (target < 0 || target >= w) {
                break;
            }
        }
        results.push(bounces);
    }
    return results;
}
const input = `4 10 5
1 1 4
0 1 1
1 4 4
4 10 0`;
const lines = input.split('\n');
const [b, w, h] = lines[0].split(' ').map(Number);
const balls: { t: number, p: number, d: number }[] = [];
for (let i = 1; i <= b; i++) {
    const [t, p, d] = lines[i].split(' ').map(Number);
    balls.push({ t, p, d });
}
const results = simulateBreakout(b, w, h, balls);
console.log(results.join('\n'));