def dfs(node, parent, graph, depths):
    max_depth = 0
    for neighbor in graph[node]:
        if neighbor != parent:
            depth = dfs(neighbor, node, graph, depths) + 1
            depths[node] = max(depths[node], depth)
            max_depth = max(max_depth, depth)
    return max_depth
def find_optimal_ttl(n, edges):
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    depths = [0] * n
    for node in range(n):
        dfs(node, -1, graph, depths)
    optimal_ttl = min(depths)
    return optimal_ttl
def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    index = 0
    c = int(data[index])
    index += 1
    results = []
    for _ in range(c):
        n = int(data[index])
        index += 1
        edges = []
        for _ in range(n - 1):
            a = int(data[index])
            b = int(data[index + 1])
            edges.append((a, b))
            index += 2
        optimal_ttl = find_optimal_ttl(n, edges)
        results.append(optimal_ttl)
    for result in results:
        print(result)
if __name__ == "__main__":
    main()