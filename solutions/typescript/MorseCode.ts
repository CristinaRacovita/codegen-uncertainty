class Node {
    char: string;
    freq: number;
    left: Node | null;
    right: Node | null;
    constructor(char: string, freq: number) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}
function huffmanCoding(n: number, frequencies: number[]): string[] {
    const nodes: Node[] = [];
    for (let i = 0; i < n; i++) {
        nodes.push(new Node(String.fromCharCode(65 + i), frequencies[i]));
    }
    function minHeapify(arr: Node[], n: number, i: number): void {
        let smallest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < n && arr[left].freq < arr[smallest].freq) {
            smallest = left;
        }
        if (right < n && arr[right].freq < arr[smallest].freq) {
            smallest = right;
        }
        if (smallest !== i) {
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
            minHeapify(arr, n, smallest);
        }
    }
    function buildMinHeap(arr: Node[]): void {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            minHeapify(arr, n, i);
        }
    }
    while (nodes.length > 1) {
        buildMinHeap(nodes);
        const left = nodes.shift()!;
        const right = nodes.shift()!;
        const newNode = new Node('', left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;
        nodes.push(newNode);
    }
    const codes: string[] = new Array(n).fill('');
    function assignCodes(node: Node | null, code: string): void {
        if (node === null) return;
        if (node.char !== '') {
            codes[node.char.charCodeAt(0) - 65] = code;
        }
        assignCodes(node.left, code + '.');
        assignCodes(node.right, code + '-');
    }
    assignCodes(nodes[0], '');
    return codes;
}
const n = 3;
const frequencies = [0.3000, 0.6000, 0.1000];
const result = huffmanCoding(n, frequencies);
console.log(result.join('\n'));