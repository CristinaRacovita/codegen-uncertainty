def dfs(node, parent, path, tree):
    path[node] = parent
    for child in tree[node]:
        if child != parent:
            dfs(child, node, path, tree)
def find_lca(v, w, path):
    depth_v = 0
    temp = v
    while temp != -1:
        depth_v += 1
        temp = path[temp]
    depth_w = 0
    temp = w
    while temp != -1:
        depth_w += 1
        temp = path[temp]
    while depth_v > depth_w:
        v = path[v]
        depth_v -= 1
    while depth_w > depth_v:
        w = path[w]
        depth_w -= 1
    while v != w:
        v = path[v]
        w = path[w]
    return v
def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    index = 0
    test_case_number = 1
    while index < len(data):
        num_test_cases = int(data[index])
        index += 1
        for _ in range(num_test_cases):
            N = int(data[index])
            index += 1
            tree = [[] for _ in range(N + 1)]
            for _ in range(N):
                M = int(data[index])
                index += 1
                children = [int(data[index + i]) for i in range(M)]
                index += M
                tree[data[index - M - 1]].extend(children)
            Q = int(data[index])
            index += 1
            queries = []
            for _ in range(Q):
                v = int(data[index])
                w = int(data[index + 1])
                index += 2
                queries.append((v, w))
            root = None
            for i in range(1, N + 1):
                if not tree[i]:
                    root = i
                    break
            path = [-1] * (N + 1)
            dfs(root, -1, path, tree)
            print(f"Case {test_case_number}:")
            for v, w in queries:
                lca = find_lca(v, w, path)
                print(lca)
            test_case_number += 1
if __name__ == "__main__":
    main()