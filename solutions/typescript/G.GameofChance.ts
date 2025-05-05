function tournamentProbabilities(n: number, a: number[]): number[] {
    const probabilities = new Array(n).fill(1);
    function calculateWinProbability(x: number, y: number): number {
        return x / (x + y);
    }
    let participants = a.slice();
    let remaining = n;
    while (remaining > 1) {
        const nextRoundParticipants: number[] = [];
        const nextRoundProbabilities: number[] = [];
        for (let i = 0; i < remaining; i += 2) {
            const x = participants[i];
            const y = participants[i + 1];
            const px = probabilities[i];
            const py = probabilities[i + 1];
            const winProbX = calculateWinProbability(x, y);
            const winProbY = 1 - winProbX;
            if (winProbX > winProbY) {
                nextRoundParticipants.push(x);
                nextRoundProbabilities.push(px * winProbX);
            } else {
                nextRoundParticipants.push(y);
                nextRoundProbabilities.push(py * winProbY);
            }
        }
        participants = nextRoundParticipants;
        probabilities = nextRoundProbabilities;
        remaining /= 2;
    }
    const totalProbability = probabilities.reduce((sum, prob) => sum + prob, 0);
    const normalizedProbabilities = probabilities.map(prob => prob / totalProbability);
    return normalizedProbabilities;
}
const n = 5;
const a = [1, 4, 1, 1, 4];
const result = tournamentProbabilities(n, a);
console.log(result.join(' '));