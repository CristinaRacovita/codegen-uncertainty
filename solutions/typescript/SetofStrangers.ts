function minStepsToUniformColor(t: number, testCases: { n: number, m: number, grid: number[][] }[]): number[] {
    const results: number[] = [];
    for (const { n, m, grid } of testCases) {
        const colorGroups: Map<number, { x: number, y: number }[]> = new Map();
        const uniqueColors = new Set<number>();
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const color = grid[i][j];
                uniqueColors.add(color);
                if (!colorGroups.has(color)) {
                    colorGroups.set(color, []);
                }
                colorGroups.get(color)!.push({ x: i, y: j });
            }
        }
        let minSteps = 0;
        for (const [color, cells] of colorGroups.entries()) {
            const visited = Array.from({ length: n }, () => Array(m).fill(false));
            let maxComponentSize = 0;
            for (const { x, y } of cells) {
                if (!visited[x][y]) {
                    let componentSize = 0;
                    const queue: { x: number, y: number }[] = [{ x, y }];
                    visited[x][y] = true;
                    componentSize++;
                    while (queue.length > 0) {
                        const { x, y } = queue.shift()!;
                        for (let dx = -1; dx <= 1; dx++) {
                            for (let dy = -1; dy <= 1; dy++) {
                                if (dx === 0 && dy === 0) continue; 
                                const nx = x + dx;
                                const ny = y + dy;
                                if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx][ny] && grid[nx][ny] === color) {
                                    visited[nx][ny] = true;
                                    queue.push({ x: nx, y: ny });
                                    componentSize++;
                                }
                            }
                        }
                    }
                    maxComponentSize = Math.max(maxComponentSize, componentSize);
                }
            }
            minSteps += cells.length - maxComponentSize;
        }
        results.push(minSteps);
    }
    return results;
}
const input = [
    { n: 1, m: 1, grid: [[1]] },
    { n: 3, m: 3, grid: [
        [1, 2, 1],
        [2, 3, 2],
        [1, 3, 1]
    ] },
    { n: 1, m: 6, grid: [
        [5, 4, 5, 4, 4, 5]
    ] },
    { n: 3, m: 4, grid: [
        [1, 4, 2, 2],
        [1, 4, 3, 5],
        [6, 6, 3, 5]
    ] }
];
console.log(minStepsToUniformColor(4, input));