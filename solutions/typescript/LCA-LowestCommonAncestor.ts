function readInput(): string[] {
    return require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n');
}
function parseInput(input: string[]): { testCases: TestCase[] } {
    let index = 0;
    const testCases: TestCase[] = [];
    const numTestCases = parseInt(input[index++], 10);
    for (let i = 0; i < numTestCases; i++) {
        const N = parseInt(input[index++], 10);
        const tree: number[][] = [];
        for (let j = 0; j < N; j++) {
            const [M, ...children] = input[index++].split(' ').map(Number);
            tree.push(children);
        }
        const Q = parseInt(input[index++], 10);
        const queries: [number, number][] = [];
        for (let j = 0; j < Q; j++) {
            const [v, w] = input[index++].split(' ').map(Number);
            queries.push([v, w]);
        }
        testCases.push({ N, tree, Q, queries });
    }
    return { testCases };
}
interface TestCase {
    N: number;
    tree: number[][];
    Q: number;
    queries: [number, number][];
}
function preprocessTree(N: number, tree: number[][]): { depth: number[], parent: number[][] } {
    const depth: number[] = new Array(N + 1).fill(0);
    const parent: number[][] = Array.from({ length: N + 1 }, () => new Array(20).fill(-1));
    const dfs = (node: number, d: number, par: number) => {
        depth[node] = d;
        parent[node][0] = par;
        for (let k = 1; k < 20; k++) {
            if (parent[node][k - 1] !== -1) {
                parent[node][k] = parent[parent[node][k - 1]][k - 1];
            }
        }
        for (const child of tree[node]) {
            dfs(child, d + 1, node);
        }
    };
    dfs(1, 0, -1);
    return { depth, parent };
}
function lca(u: number, v: number, depth: number[], parent: number[][]): number {
    if (depth[u] > depth[v]) {
        [u, v] = [v, u];
    }
    for (let k = 19; k >= 0; k--) {
        if (parent[v][k] !== -1 && depth[parent[v][k]] >= depth[u]) {
            v = parent[v][k];
        }
    }
    if (u === v) return u;
    for (let k = 19; k >= 0; k--) {
        if (parent[u][k] !== -1 && parent[u][k] !== parent[v][k]) {
            u = parent[u][k];
            v = parent[v][k];
        }
    }
    return parent[u][0];
}
function solve(testCases: TestCase[]) {
    const results: string[] = [];
    for (let i = 0; i < testCases.length; i++) {
        const { N, tree, Q, queries } = testCases[i];
        const { depth, parent } = preprocessTree(N, tree);
        const caseResults: string[] = [`Case ${i + 1}:`];
        for (const [u, v] of queries) {
            const result = lca(u, v, depth, parent);
            caseResults.push(result.toString());
        }
        results.push(caseResults.join('\n'));
    }
    console.log(results.join('\n'));
}
const input = readInput();
const parsedInput = parseInput(input);
solve(parsedInput.testCases);