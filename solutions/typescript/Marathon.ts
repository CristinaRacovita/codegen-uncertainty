function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
function marathon(N: number, X: number, Y: number, H: number, S: number, stations: number[]): string {
    const totalDistance = 42195;
    let currentPosition = 0;
    let currentTime = 0;
    let currentWater = X;
    stations.sort((a, b) => a - b);
    for (let i = 0; i < totalDistance; i++) {
        if (currentWater === 0) {
            let nextStationIndex = 0;
            while (nextStationIndex < stations.length && stations[nextStationIndex] <= currentPosition) {
                nextStationIndex++;
            }
            if (nextStationIndex >= stations.length) {
                const remainingDistance = totalDistance - currentPosition;
                currentTime += remainingDistance / S;
                break;
            }
            const nextStation = stations[nextStationIndex];
            const distanceToStation = nextStation - currentPosition;
            currentTime += distanceToStation / S; 
            currentPosition = nextStation;
            currentWater = X; 
            currentTime += Y; 
        } else {
            currentTime += 1 / H;
            currentPosition++;
            currentWater--;
        }
    }
    return formatTime(currentTime);
}
console.log(marathon(1, 1000, 40, 10, 5, [1000])); 
console.log(marathon(5, 500, 20, 8, 3, [100, 800, 1200, 20000, 30000]));