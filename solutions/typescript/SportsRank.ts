function parseInput(input: string): { d: number, datasets: { n: number, scores: number[] }[] } {
    const lines = input.trim().split('\n');
    const d = parseInt(lines[0], 10);
    const datasets: { n: number, scores: number[] }[] = [];
    for (let i = 1; i <= d; i++) {
        const parts = lines[i].trim().split(' ');
        const n = parseInt(parts[0], 10);
        const scores = parts.slice(1).map(Number);
        datasets.push({ n, scores });
    }
    return { d, datasets };
}
function competitionRanking(scores: number[]): number[] {
    const sortedScores = [...scores].sort((a, b) => b - a);
    const rankMap: { [key: number]: number } = {};
    let rank = 1;
    for (let i = 0; i < sortedScores.length; i++) {
        if (!rankMap[sortedScores[i]]) {
            rankMap[sortedScores[i]] = rank;
        }
        rank++;
    }
    return scores.map(score => rankMap[score]);
}
function denseRanking(scores: number[]): number[] {
    const sortedScores = [...scores].sort((a, b) => b - a);
    const rankMap: { [key: number]: number } = {};
    let rank = 1;
    for (let i = 0; i < sortedScores.length; i++) {
        if (!rankMap[sortedScores[i]]) {
            rankMap[sortedScores[i]] = rank;
        }
        if (i > 0 && sortedScores[i] !== sortedScores[i - 1]) {
            rank++;
        }
    }
    return scores.map(score => rankMap[score]);
}
function countBeneficiaries(competitionRanks: number[], denseRanks: number[]): number {
    let count = 0;
    for (let i = 0; i < competitionRanks.length; i++) {
        if (denseRanks[i] < competitionRanks[i]) {
            count++;
        }
    }
    return count;
}
function processDatasets(datasets: { n: number, scores: number[] }[]): number[] {
    const results: number[] = [];
    for (const dataset of datasets) {
        const competitionRanks = competitionRanking(dataset.scores);
        const denseRanks = denseRanking(dataset.scores);
        const beneficiaries = countBeneficiaries(competitionRanks, denseRanks);
        results.push(beneficiaries);
    }
    return results;
}
const input = `
3
3 80 70 70
10 50 60 70 10 20 30 40 30 80 90
5 50 50 50 50 50
`;
const parsedInput = parseInput(input);
const results = processDatasets(parsedInput.datasets);
console.log(results.join('\n'));