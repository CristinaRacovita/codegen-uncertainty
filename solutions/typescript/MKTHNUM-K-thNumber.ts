function quickSelect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) {
        return arr[left];
    }
    const pivotIndex = partition(arr, left, right);
    if (k === pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return quickSelect(arr, left, pivotIndex - 1, k);
    } else {
        return quickSelect(arr, pivotIndex + 1, right, k);
    }
}
function partition(arr: number[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}
function solveKthOrderStatistics(n: number, m: number, array: number[], queries: number[][]): number[] {
    const results: number[] = [];
    for (const [i, j, k] of queries) {
        const subArray = array.slice(i - 1, j);
        const kthElement = quickSelect(subArray, 0, subArray.length - 1, k - 1);
        results.push(kthElement);
    }
    return results;
}
const input = `7 3
1 5 2 6 3 7 4
2 5 3
4 4 1
1 7 3`;
const lines = input.split('\n');
const [n, m] = lines[0].split(' ').map(Number);
const array = lines[1].split(' ').map(Number);
const queries = lines.slice(2).map(line => line.split(' ').map(Number));
const results = solveKthOrderStatistics(n, m, array, queries);
console.log(results.join('\n'));