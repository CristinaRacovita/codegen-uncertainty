class Node:
    def __init__(self, char=None, freq=0, left=None, right=None):
        self.char = char
        self.freq = freq
        self.left = left
        self.right = right
def find_two_smallest(nodes):
    min1, min2 = float('inf'), float('inf')
    min1_node, min2_node = None, None
    for node in nodes:
        if node.freq < min1:
            min2 = min1
            min2_node = min1_node
            min1 = node.freq
            min1_node = node
        elif node.freq < min2:
            min2 = node.freq
            min2_node = node
    return min1_node, min2_node
def assign_codes(node, code, codes):
    if node is None:
        return
    if node.char is not None:
        codes[node.char] = code
    else:
        assign_codes(node.left, code + '.', codes)
        assign_codes(node.right, code + '-', codes)
def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])
    frequencies = [float(data[i]) for i in range(1, n + 1)]
    nodes = [Node(char=str(i), freq=freq) for i, freq in enumerate(frequencies)]
    while len(nodes) > 1:
        node1, node2 = find_two_smallest(nodes)
        nodes.remove(node1)
        nodes.remove(node2)
        new_node = Node(freq=node1.freq + node2.freq, left=node1, right=node2)
        nodes.append(new_node)
    root = nodes[0]
    codes = {}
    assign_codes(root, '', codes)
    for i in range(n):
        print(codes[str(i)])
if __name__ == "__main__":
    main()