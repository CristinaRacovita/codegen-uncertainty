// Define the TreeNode class
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

// Function to find lonely nodes
function getLonelyNodes(root: TreeNode | null): number[] {
    const lonelyNodes: number[] = [];

    // Helper function to perform DFS
    function dfs(node: TreeNode | null, parentHasOnlyOneChild: boolean): void {
        if (!node) {
            return;
        }

        // Check if the current node is lonely
        if (parentHasOnlyOneChild) {
            lonelyNodes.push(node.val);
        }

        // Determine if the current node has only one child
        const hasOnlyOneChild = (node.left != null && node.right === null) || (node.left === null && node.right !== null);

        // Traverse the left and right children
        dfs(node.left, hasOnlyOneChild);
        dfs(node.right, hasOnlyOneChild);
    }

    // Start DFS from the root
    dfs(root, false);

    return lonelyNodes;
}

// Example usage:
const root1 = new TreeNode(1, new TreeNode(2), new TreeNode(3, null, new TreeNode(4)));
console.log(getLonelyNodes(root1)); // Output: [4]

const root2 = new TreeNode(7, new TreeNode(1, new TreeNode(6)), new TreeNode(4, new TreeNode(5), new TreeNode(3, null, new TreeNode(2))));
console.log(getLonelyNodes(root2)); // Output: [6, 2]

const root3 = new TreeNode(11, new TreeNode(99, new TreeNode(77, new TreeNode(55, new TreeNode(33, new TreeNode(22))))), new TreeNode(88));
console.log(getLonelyNodes(root3)); // Output: [77, 55, 33, 66, 44, 22]

const root4 = new TreeNode(197);
console.log(getLonelyNodes(root4)); // Output: []

const root5 = new TreeNode(31, null, new TreeNode(78, null, new TreeNode(28)));
console.log(getLonelyNodes(root5)); // Output: [78, 28]"
