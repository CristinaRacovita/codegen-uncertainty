class Graph:
    def __init__(self, n):
        self.n = n
        self.edges = [[] for _ in range(n + 1)]
    def add_edge(self, u, v, w):
        self.edges[u].append((v, w))
        self.edges[v].append((u, w))
def dijkstra(graph, start):
    distances = [float('inf')] * (graph.n + 1)
    previous = [-1] * (graph.n + 1)
    distances[start] = 0
    unvisited = set(range(1, graph.n + 1))
    while unvisited:
        min_distance = float('inf')
        current = None
        for node in unvisited:
            if distances[node] < min_distance:
                min_distance = distances[node]
                current = node
        if current is None:
            break
        unvisited.remove(current)
        for neighbor, weight in graph.edges[current]:
            distance = distances[current] + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current
    return distances, previous
def reconstruct_path(previous, start, end):
    path = []
    at = end
    while at != -1:
        path.append(at)
        at = previous[at]
    if path[-1] == start:
        return path[::-1]
    else:
        return []
def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    index = 0
    n = int(data[index])
    m = int(data[index + 1])
    index += 2
    graph = Graph(n)
    for _ in range(m):
        u = int(data[index])
        v = int(data[index + 1])
        w = int(data[index + 2])
        index += 3
        graph.add_edge(u, v, w)
    distances, previous = dijkstra(graph, 1)
    if distances[n] == float('inf'):
        print(-1)
    else:
        path = reconstruct_path(previous, 1, n)
        print(" ".join(map(str, path)))
if __name__ == "__main__":
    main()