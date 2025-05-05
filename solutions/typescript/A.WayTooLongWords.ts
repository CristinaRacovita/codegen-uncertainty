function main() {
    const n = parseInt(readline(), 10);
    const results: string[] = [];
    for (let i = 0; i < n; i++) {
        const word = readline();
        const length = word.length;
        if (length > 10) {
            const firstLetter = word[0];
            const lastLetter = word[length - 1];
            const middleCount = length - 2; 
            const abbreviatedWord = firstLetter + middleCount.toString() + lastLetter;
            results.push(abbreviatedWord);
        } else {
            results.push(word);
        }
    }
    results.forEach(result => console.log(result));
}
function readline(): string {
    const inputs = [
        "4",
        "word",
        "localization",
        "internationalization",
        "pneumonoultramicroscopicsilicovolcanoconiosis"
    ];
    return inputs.shift()!;
}
main();