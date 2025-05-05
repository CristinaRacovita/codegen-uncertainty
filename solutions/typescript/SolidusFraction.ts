function gcd(a: bigint, b: bigint): bigint {
    while (b !== BigInt(0)) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
function parseNumber(input: string): bigint {
    let numStr = '';
    for (const char of input) {
        if (char === '-' || char >= '0' && char <= '9') {
            numStr += char;
        }
    }
    return BigInt(numStr);
}
function main() {
    const numeratorLine = readline();
    const vinculumLine = readline();
    const denominatorLine = readline();
    const numerator = parseNumber(numeratorLine);
    const denominator = parseNumber(denominatorLine);
    const gcdValue = gcd(BigInt(Math.abs(Number(numerator))), BigInt(Math.abs(Number(denominator))));
    const reducedNumerator = numerator / gcdValue;
    const reducedDenominator = denominator / gcdValue;
    if (reducedDenominator === BigInt(1)) {
        console.log(reducedNumerator.toString());
    } else {
        console.log(`${reducedNumerator.toString()}/${reducedDenominator.toString()}`);
    }
}
function readline(): string {
    return process.stdin.readLine();
}
main();