function calculateTime(n: number, h: number, x: number, m: number, y: number): number {
    const ratePerWorker = x / (n * h);
    const combinedRate = m * ratePerWorker;
    const timeRequired = y / combinedRate;
    return timeRequired;
}
const n = parseInt(readline());
const h = parseInt(readline());
const x = parseInt(readline());
const m = parseInt(readline());
const y = parseInt(readline());
console.log(calculateTime(n, h, x, m, y));