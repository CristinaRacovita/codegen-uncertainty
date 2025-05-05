class SegmentTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (4 * n)
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2 * node, start, mid)
            self.build(arr, 2 * node + 1, mid + 1, end)
            self.tree[node] = max(self.tree[2 * node], self.tree[2 * node + 1])
    def update(self, idx, val, node, start, end):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if start <= idx <= mid:
                self.update(idx, val, 2 * node, start, mid)
            else:
                self.update(idx, val, 2 * node + 1, mid + 1, end)
            self.tree[node] = max(self.tree[2 * node], self.tree[2 * node + 1])
    def query(self, l, r, node, start, end):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        p1 = self.query(l, r, 2 * node, start, mid)
        p2 = self.query(l, r, 2 * node + 1, mid + 1, end)
        return max(p1, p2)
def euler_tour(node, parent, depth, tour, depth_arr, pos_map, adj_list):
    global pos
    tour[pos] = node
    depth_arr[pos] = depth
    pos_map[node] = pos
    pos += 1
    for neighbor, edge_idx in adj_list[node]:
        if neighbor != parent:
            euler_tour(neighbor, node, depth + 1, tour, depth_arr, pos_map, adj_list)
            tour[pos] = node
            depth_arr[pos] = depth
            pos += 1
def heavy_path_decomposition(adj_list, root):
    size = [1] * len(adj_list)
    parent = [-1] * len(adj_list)
    heavy = [-1] * len(adj_list)
    def dfs(node):
        nonlocal adj_list, size, parent, heavy
        max_child_size = 0
        for neighbor, _ in adj_list[node]:
            if neighbor != parent[node]:
                parent[neighbor] = node
                size[node] += dfs(neighbor)
                if size[neighbor] > max_child_size:
                    max_child_size = size[neighbor]
                    heavy[node] = neighbor
        return size[node]
    dfs(root)
    chain_head = [0] * len(adj_list)
    chain_pos = [0] * len(adj_list)
    pos = 0
    for i in range(len(adj_list)):
        if parent[i] == -1 or heavy[parent[i]] != i:
            chain_head[i] = i
            chain_pos[i] = pos
            pos += 1
        else:
            chain_head[i] = chain_head[parent[i]]
            chain_pos[i] = chain_pos[parent[i]]
    return chain_head, chain_pos
def query_hld(u, v, chain_head, chain_pos, depth_arr, seg_tree):
    res = 0
    while chain_head[u] != chain_head[v]:
        if depth_arr[chain_head[u]] < depth_arr[chain_head[v]]:
            u, v = v, u
        res = max(res, seg_tree.query(chain_pos[chain_head[u]], chain_pos[u], 1, 0, len(depth_arr) - 1))
        u = parent[chain_head[u]]
    if chain_pos[u] > chain_pos[v]:
        u, v = v, u
    res = max(res, seg_tree.query(chain_pos[u], chain_pos[v], 1, 0, len(depth_arr) - 1))
    return res
def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    index = 0
    t = int(data[index])
    index += 1
    results = []
    for _ in range(t):
        N = int(data[index])
        index += 1
        adj_list = [[] for _ in range(N)]
        edge_costs = []
        for i in range(N - 1):
            a = int(data[index]) - 1
            b = int(data[index + 1]) - 1
            c = int(data[index + 2])
            index += 3
            adj_list[a].append((b, i))
            adj_list[b].append((a, i))
            edge_costs.append(c)
        tour = [0] * (2 * N - 1)
        depth_arr = [0] * (2 * N - 1)
        pos_map = [0] * N
        global pos
        pos = 0
        euler_tour(0, -1, 0, tour, depth_arr, pos_map, adj_list)
        chain_head, chain_pos = heavy_path_decomposition(adj_list, 0)
        seg_tree = SegmentTree(2 * N - 1)
        seg_tree.build(edge_costs, 1, 0, 2 * N - 2)
        parent = [-1] * N
        for i in range(1, len(tour)):
            if tour[i] != tour[i - 1]:
                parent[tour[i]] = tour[i - 1]
        while True:
            cmd = data[index]
            index += 1
            if cmd == "DONE":
                break
            if cmd == "CHANGE":
                i = int(data[index]) - 1
                ti = int(data[index + 1])
                index += 2
                seg_tree.update(i, ti, 1, 0, 2 * N - 2)
            elif cmd == "QUERY":
                a = int(data[index]) - 1
                b = int(data[index + 1]) - 1
                index += 2
                res = query_hld(a, b, chain_head, chain_pos, depth_arr, seg_tree)
                results.append(res)
    for result in results:
        print(result)
if __name__ == "__main__":
    main()