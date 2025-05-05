function maxHotelValue(N: number, M: number, hotelValues: number[]): number {
    let maxValue = 0;
    let currentSum = 0;
    let left = 0;
    for (let right = 0; right < N; right++) {
        currentSum += hotelValues[right];
        while (currentSum > M && left <= right) {
            currentSum -= hotelValues[left];
            left++;
        }
        if (currentSum > maxValue) {
            maxValue = currentSum;
        }
    }
    return maxValue;
}
const input1 = "5 12\n2 1 3 4 5";
const input2 = "4 9\n7 3 5 6";
function parseInput(input: string): [number, number, number[]] {
    const lines = input.split('\n');
    const [N, M] = lines[0].split(' ').map(Number);
    const hotelValues = lines[1].split(' ').map(Number);
    return [N, M, hotelValues];
}
console.log(maxHotelValue(...parseInput(input1))); 
console.log(maxHotelValue(...parseInput(input2)));