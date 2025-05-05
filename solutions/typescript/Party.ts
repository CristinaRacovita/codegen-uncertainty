function maxHappiness(N: number, friday_matrix: number[][], saturday_matrix: number[][]): number {
    let max_happiness = 0;
    const friday_club = new Array(N).fill(-1);
    const saturday_club = new Array(N).fill(-1);
    let friday_count = 0;
    function backtrack(employee: number): void {
        if (employee === N) {
            let total_happiness = 0;
            for (let i = 0; i < N; i++) {
                total_happiness += friday_matrix[i][friday_club[i]];
                total_happiness += saturday_matrix[i][saturday_club[i]];
            }
            if (total_happiness > max_happiness) {
                max_happiness = total_happiness;
            }
            return;
        }
        for (let club = 0; club < N; club++) {
            if (friday_club[club] === -1) {
                friday_club[club] = employee;
                friday_count++;
                if (friday_count <= N / 2) {
                    backtrack(employee + 1);
                }
                friday_club[club] = -1;
                friday_count--;
            }
        }
        for (let club = 0; club < N; club++) {
            if (saturday_club[club] === -1) {
                saturday_club[club] = employee;
                backtrack(employee + 1);
                saturday_club[club] = -1;
            }
        }
    }
    backtrack(0);
    return max_happiness;
}
const N = 4;
const friday_matrix = [
    [1, 2, 3, 4],
    [2, 3, 4, 1],
    [3, 4, 1, 2],
    [4, 1, 2, 3]
];
const saturday_matrix = [
    [5, 8, 7, 1],
    [6, 9, 81, 3],
    [55, 78, 1, 6],
    [1, 1, 1, 1]
];
console.log(maxHappiness(N, friday_matrix, saturday_matrix));