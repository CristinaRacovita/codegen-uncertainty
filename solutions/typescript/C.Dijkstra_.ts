type Edge = {
    to: number;
    weight: number;
};
function dijkstra(n: number, edges: Edge[][], start: number, end: number): number[] {
    const distances: number[] = new Array(n + 1).fill(Infinity);
    const previousVertices: number[] = new Array(n + 1).fill(-1);
    const priorityQueue: { vertex: number; distance: number }[] = [];
    distances[start] = 0;
    priorityQueue.push({ vertex: start, distance: 0 });
    while (priorityQueue.length > 0) {
        let minIndex = 0;
        for (let i = 1; i < priorityQueue.length; i++) {
            if (priorityQueue[i].distance < priorityQueue[minIndex].distance) {
                minIndex = i;
            }
        }
        const currentVertex = priorityQueue.splice(minIndex, 1)[0].vertex;
        if (currentVertex === end) {
            break;
        }
        for (const neighbor of edges[currentVertex]) {
            const distance = distances[currentVertex] + neighbor.weight;
            if (distance < distances[neighbor.to]) {
                distances[neighbor.to] = distance;
                previousVertices[neighbor.to] = currentVertex;
                priorityQueue.push({ vertex: neighbor.to, distance: distance });
            }
        }
    }
    if (distances[end] === Infinity) {
        return [-1];
    }
    const path: number[] = [];
    let at = end;
    while (at !== -1) {
        path.unshift(at);
        at = previousVertices[at];
    }
    return path;
}
function main() {
    const input = `5 6
1 2 2
2 5 5
2 3 4
1 4 1
4 3 3
3 5 1`;
    const [firstLine, ...lines] = input.split('\n');
    const [n, m] = firstLine.split(' ').map(Number);
    const edges: Edge[][] = Array.from({ length: n + 1 }, () => []);
    for (const line of lines) {
        const [ai, bi, wi] = line.split(' ').map(Number);
        edges[ai].push({ to: bi, weight: wi });
        edges[bi].push({ to: ai, weight: wi });
    }
    const result = dijkstra(n, edges, 1, n);
    console.log(result.join(' '));
}
main();