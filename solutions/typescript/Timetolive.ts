function readInput(): string[] {
    return require('fs').readFileSync(0, 'utf8').trim().split('\n');
}
function parseInput(input: string[]): { testCases: number[], networks: { n: number, edges: [number, number][] }[] } {
    const testCases: number[] = [];
    const networks: { n: number, edges: [number, number][] }[] = [];
    let index = 0;
    const c = parseInt(input[index++]);
    for (let i = 0; i < c; i++) {
        const n = parseInt(input[index++]);
        const edges: [number, number][] = [];
        for (let j = 0; j < n - 1; j++) {
            const [a, b] = input[index++].split(' ').map(Number);
            edges.push([a, b]);
        }
        testCases.push(n);
        networks.push({ n, edges });
    }
    return { testCases, networks };
}
function buildGraph(n: number, edges: [number, number][]): Map<number, number[]> {
    const graph = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        graph.set(i, []);
    }
    for (const [a, b] of edges) {
        graph.get(a)!.push(b);
        graph.get(b)!.push(a);
    }
    return graph;
}
function bfs(graph: Map<number, number[]>, start: number): number[] {
    const distances = new Array(graph.size).fill(-1);
    distances[start] = 0;
    const queue: number[] = [start];
    while (queue.length > 0) {
        const node = queue.shift()!;
        for (const neighbor of graph.get(node)!) {
            if (distances[neighbor] === -1) {
                distances[neighbor] = distances[node] + 1;
                queue.push(neighbor);
            }
        }
    }
    return distances;
}
function findOptimalTTL(n: number, edges: [number, number][]): number {
    const graph = buildGraph(n, edges);
    let minMaxDistance = Infinity;
    for (let i = 0; i < n; i++) {
        const distances = bfs(graph, i);
        const maxDistance = Math.max(...distances);
        if (maxDistance < minMaxDistance) {
            minMaxDistance = maxDistance;
        }
    }
    return minMaxDistance;
}
function main() {
    const input = readInput();
    const { testCases, networks } = parseInput(input);
    for (let i = 0; i < testCases.length; i++) {
        const n = testCases[i];
        const { edges } = networks[i];
        const optimalTTL = findOptimalTTL(n, edges);
        console.log(optimalTTL);
    }
}
main();