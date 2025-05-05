function sumOfDigits(n: number): number {
    const tensDigit = Math.floor(n / 10);
    const unitsDigit = n % 10;
    return tensDigit + unitsDigit;
}
function processTestCases(t: number, testCases: number[]): void {
    for (let i = 0; i < t; i++) {
        const result = sumOfDigits(testCases[i]);
        console.log(result);
    }
}
const input = `8
77
21
40
34
19
84
10
99`;
const lines = input.split('\n');
const t = parseInt(lines[0], 10);
const testCases = lines.slice(1).map(line => parseInt(line, 10));
processTestCases(t, testCases);