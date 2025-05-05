function parseInput(input: string): { matrix: string[][], d: number, h: number } {
    const lines = input.trim().split('\n');
    const matrix = lines.slice(0, 7).map(line => line.split(''));
    const [d, h] = lines[7].split(' ').map(Number);
    return { matrix, d, h };
}
function countAvailableDaysAndHours(matrix: string[][]): { availableDays: number[], availableHours: number[] } {
    const availableDays: number[] = [];
    const availableHours: number[] = [];
    for (let i = 0; i < 7; i++) {
        let count = 0;
        for (let j = 0; j < 24; j++) {
            if (matrix[i][j] === '.') {
                count++;
            }
        }
        if (count > 0) {
            availableDays.push(count);
        }
    }
    for (let j = 0; j < 24; j++) {
        let count = 0;
        for (let i = 0; i < 7; i++) {
            if (matrix[i][j] === '.') {
                count++;
            }
        }
        if (count > 0) {
            availableHours.push(count);
        }
    }
    availableDays.sort((a, b) => b - a);
    availableHours.sort((a, b) => b - a);
    return { availableDays, availableHours };
}
function calculateProbability(matrix: string[][], d: number, h: number, availableDays: number[], availableHours: number[]): number {
    const selectedDays = availableDays.slice(0, d);
    const selectedHours = availableHours.slice(0, h);
    let availableTimeSlots = 0;
    for (const dayCount of selectedDays) {
        for (const hourCount of selectedHours) {
            availableTimeSlots += Math.min(dayCount, hourCount);
        }
    }
    const totalCombinations = d * h;
    return totalCombinations > 0 ? availableTimeSlots / totalCombinations : 0;
}
function main(input: string): number {
    const { matrix, d, h } = parseInput(input);
    const { availableDays, availableHours } = countAvailableDaysAndHours(matrix);
    return calculateProbability(matrix, d, h, availableDays, availableHours);
}
const input = `
xxxxxx..xx..xxxxxxxxxxxx
xxxxxxxxxxxxx....xxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxx
xxxxxx..xx..xxxxxxxxxxxx
xxxxxxxxxxxxx...x..xxxxx
xxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxx
2 5
`;
console.log(main(input));