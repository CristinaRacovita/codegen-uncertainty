function solve() {
    const input = `1
3
1 2 1
2 3 2
QUERY 1 2
CHANGE 1 3
QUERY 1 2
DONE`;
    const lines = input.split('\n');
    let index = 0;
    function readLine() {
        return lines[index++];
    }
    function readInt() {
        return parseInt(readLine(), 10);
    }
    function readIntArray() {
        return readLine().split(' ').map(Number);
    }
    const t = readInt();
    for (let test = 0; test < t; test++) {
        const N = readInt();
        const edges: { u: number, v: number, cost: number }[] = [];
        const adjacencyList: Map<number, { neighbor: number, edgeIndex: number }[]> = new Map();
        for (let i = 0; i < N - 1; i++) {
            const [u, v, cost] = readIntArray();
            edges.push({ u, v, cost });
            if (!adjacencyList.has(u)) adjacencyList.set(u, []);
            if (!adjacencyList.has(v)) adjacencyList.set(v, []);
            adjacencyList.get(u)!.push({ neighbor: v, edgeIndex: i });
            adjacencyList.get(v)!.push({ neighbor: u, edgeIndex: i });
        }
        while (true) {
            const command = readLine();
            if (command === 'DONE') break;
            if (command.startsWith('CHANGE')) {
                const [_, i, ti] = readIntArray();
                edges[i - 1].cost = ti;
            } else if (command.startsWith('QUERY')) {
                const [_, a, b] = readIntArray();
                const maxCost = findMaxEdgeCost(a, b, edges, adjacencyList);
                console.log(maxCost);
            }
        }
    }
}
function findMaxEdgeCost(a: number, b: number, edges: { u: number, v: number, cost: number }[], adjacencyList: Map<number, { neighbor: number, edgeIndex: number }[]>): number {
    const visited = new Set<number>();
    const queue: { node: number, maxCost: number }[] = [{ node: a, maxCost: 0 }];
    while (queue.length > 0) {
        const { node, maxCost } = queue.shift()!;
        if (node === b) return maxCost;
        visited.add(node);
        for (const { neighbor, edgeIndex } of adjacencyList.get(node)!) {
            if (!visited.has(neighbor)) {
                const currentEdgeCost = edges[edgeIndex].cost;
                queue.push({ node: neighbor, maxCost: Math.max(maxCost, currentEdgeCost) });
            }
        }
    }
    return 0; 
}
solve();