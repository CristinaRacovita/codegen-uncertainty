class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        current_node = self.root
        for char in word:
            if char not in current_node.children:
                current_node.children[char] = TrieNode()
            current_node = current_node.children[char]
        current_node.is_end_of_word = True
    def count_unique_nodes(self):
        def dfs(node):
            count = 1 if node.children else 0
            for child in node.children.values():
                count += dfs(child)
            return count
        return dfs(self.root)
def count_distinct_substrings(s):
    trie = Trie()
    n = len(s)
    for i in range(n):
        for j in range(i + 1, n + 1):
            substring = s[i:j]
            trie.insert(substring)
    return trie.count_unique_nodes()
import sys
input = sys.stdin.read
data = input().split()
T = int(data[0])
results = []
index = 1
for _ in range(T):
    string = data[index]
    index += 1
    results.append(count_distinct_substrings(string))
for result in results:
    print(result)