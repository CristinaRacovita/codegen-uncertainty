class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [[] for _ in range(4 * self.n)]
        self.build(arr, 0, 0, self.n - 1)
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node].append(arr[start])
        else:
            mid = (start + end) // 2
            self.build(arr, 2 * node + 1, start, mid)
            self.build(arr, 2 * node + 2, mid + 1, end)
            self.merge(node, 2 * node + 1, 2 * node + 2)
    def merge(self, node, left_child, right_child):
        self.tree[node] = []
        i, j = 0, 0
        while i < len(self.tree[left_child]) and j < len(self.tree[right_child]):
            if self.tree[left_child][i] < self.tree[right_child][j]:
                self.tree[node].append(self.tree[left_child][i])
                i += 1
            else:
                self.tree[node].append(self.tree[right_child][j])
                j += 1
        self.tree[node].extend(self.tree[left_child][i:])
        self.tree[node].extend(self.tree[right_child][j:])
    def query(self, node, start, end, l, r, k):
        if start > end or start > r or end < l:
            return None
        if start >= l and end <= r:
            return self.tree[node][k - 1]
        mid = (start + end) // 2
        left_result = self.query(2 * node + 1, start, mid, l, r, k)
        if left_result is not None:
            return left_result
        right_result = self.query(2 * node + 2, mid + 1, end, l, r, k - (mid - start + 1))
        return right_result
def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    index = 0
    n = int(data[index])
    m = int(data[index + 1])
    index += 2
    arr = [int(data[index + i]) for i in range(n)]
    index += n
    segment_tree = SegmentTree(arr)
    results = []
    for _ in range(m):
        i = int(data[index]) - 1
        j = int(data[index + 1]) - 1
        k = int(data[index + 2])
        index += 3
        result = segment_tree.query(0, 0, n - 1, i, j, k)
        results.append(result)
    for result in results:
        print(result)
if __name__ == "__main__":
    main()