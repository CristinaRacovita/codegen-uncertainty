class TrieNode {
    children: { [key: string]: TrieNode };
    isEndOfWord: boolean;
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}
class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }
    insert(word: string): number {
        let currentNode = this.root;
        let newNodesCount = 0;
        for (let char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
                newNodesCount++;
            }
            currentNode = currentNode.children[char];
        }
        return newNodesCount;
    }
}
function countDistinctSubstrings(s: string): number {
    const trie = new Trie();
    let distinctCount = 0;
    for (let i = 0; i < s.length; i++) {
        distinctCount += trie.insert(s.substring(i));
    }
    return distinctCount;
}
function main() {
    const input = `2
CCCCC
ABABA`;
    const lines = input.split('\n');
    const T = parseInt(lines[0], 10);
    let index = 1;
    for (let i = 0; i < T; i++) {
        const s = lines[index++];
        console.log(countDistinctSubstrings(s));
    }
}
main();