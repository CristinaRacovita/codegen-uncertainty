function parseInput(input: string): {
    n: number;
    m: number;
    latitude: number;
    longitude: number;
    height: number;
    initialDate: string;
    initialTime: string;
    measurements: { temperature: number | null; windDirection: number | null; windSpeed: number | null; humidity: number | null }[];
} {
    const lines = input.split('\n');
    const [nStr, mStr] = lines[0].split(' ');
    const n = parseInt(nStr, 10);
    const m = parseInt(mStr, 10);
    const [latitudeStr, longitudeStr, heightStr, initialDate, initialTime] = lines[1].split(' ');
    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);
    const height = parseFloat(heightStr);
    const measurements: { temperature: number | null; windDirection: number | null; windSpeed: number | null; humidity: number | null }[] = [];
    for (let i = 2; i < 2 + n; i++) {
        const [temperatureStr, windDirectionStr, windSpeedStr, humidityStr] = lines[i].split(' ');
        const temperature = temperatureStr === '-' ? null : parseFloat(temperatureStr);
        const windDirection = windDirectionStr === '-' ? null : parseInt(windDirectionStr, 10);
        const windSpeed = windSpeedStr === '-' ? null : parseFloat(windSpeedStr);
        const humidity = humidityStr === '-' ? null : parseInt(humidityStr, 10);
        measurements.push({ temperature, windDirection, windSpeed, humidity });
    }
    return { n, m, latitude, longitude, height, initialDate, initialTime, measurements };
}
function calculateAverages(measurements: { temperature: number | null; windDirection: number | null; windSpeed: number | null; humidity: number | null }[]): {
    tempChange: number;
    windDirChange: number;
    windSpeedChange: number;
    humidityChange: number;
} {
    let tempSum = 0;
    let windDirSum = 0;
    let windSpeedSum = 0;
    let humiditySum = 0;
    let count = 0;
    for (let i = 1; i < measurements.length; i++) {
        if (measurements[i].temperature !== null && measurements[i - 1].temperature !== null) {
            tempSum += measurements[i].temperature - measurements[i - 1].temperature;
            count++;
        }
        if (measurements[i].windDirection !== null && measurements[i - 1].windDirection !== null) {
            const dirDiff = (measurements[i].windDirection - measurements[i - 1].windDirection + 180) % 360 - 180;
            windDirSum += dirDiff;
            count++;
        }
        if (measurements[i].windSpeed !== null && measurements[i - 1].windSpeed !== null) {
            windSpeedSum += measurements[i].windSpeed - measurements[i - 1].windSpeed;
            count++;
        }
        if (measurements[i].humidity !== null && measurements[i - 1].humidity !== null) {
            humiditySum += measurements[i].humidity - measurements[i - 1].humidity;
            count++;
        }
    }
    return {
        tempChange: count > 0 ? tempSum / count : 0,
        windDirChange: count > 0 ? windDirSum / count : 0,
        windSpeedChange: count > 0 ? windSpeedSum / count : 0,
        humidityChange: count > 0 ? humiditySum / count : 0,
    };
}
function predictWeather(
    measurements: { temperature: number | null; windDirection: number | null; windSpeed: number | null; humidity: number | null }[],
    averages: { tempChange: number; windDirChange: number; windSpeedChange: number; humidityChange: number; },
    m: number
): { temperature: number | null; windDirection: number | null; windSpeed: number | null; humidity: number | null }[] {
    const predictions: { temperature: number | null; windDirection: number | null; windSpeed: number | null; humidity: number | null }[] = [];
    for (let i = 0; i < m; i++) {
        const lastMeasurement = measurements[measurements.length - 1];
        let temperature: number | null = null;
        if (lastMeasurement.temperature !== null) {
            temperature = Math.max(-50, Math.min(50, lastMeasurement.temperature + averages.tempChange));
        }
        let windDirection: number | null = null;
        if (lastMeasurement.windDirection !== null) {
            windDirection = ((lastMeasurement.windDirection + averages.windDirChange + 360) % 360);
        }
        let windSpeed: number | null = null;
        if (lastMeasurement.windSpeed !== null) {
            windSpeed = Math.max(0, lastMeasurement.windSpeed + averages.windSpeedChange);
        }
        let humidity: number | null = null;
        if (lastMeasurement.humidity !== null) {
            humidity = Math.max(0, Math.min(110, lastMeasurement.humidity + averages.humidityChange));
        }
        predictions.push({ temperature, windDirection, windSpeed, humidity });
    }
    return predictions;
}
function formatPredictions(predictions: { temperature: number | null; windDirection: number | null; windSpeed: number | null; humidity: number | null }[]): string[] {
    return predictions.map(prediction => {
        const temperature = prediction.temperature !== null ? prediction.temperature.toFixed(1) : '-';
        const windDirection = prediction.windDirection !== null ? prediction.windDirection.toString() : '-';
        const windSpeed = prediction.windSpeed !== null ? prediction.windSpeed.toFixed(1) : '-';
        const humidity = prediction.humidity !== null ? prediction.humidity.toString() : '-';
        return `${temperature} ${windDirection} ${windSpeed} ${humidity}`;
    });
}
function main(input: string): string {
    const parsedInput = parseInput(input);
    const averages = calculateAverages(parsedInput.measurements);
    const predictions = predictWeather(parsedInput.measurements, averages, parsedInput.m);
    return formatPredictions(predictions).join('\n');
}
const sampleInput = `
72 1
63.9829 22.600517 50.9 2024-02-26 16:00:00
5.4 187 4.1 93
5.2 186 3.9 94
4.6 187 3.0 94
3.9 173 2.0 95
3.2 77 0.7 95
2.7 353 2.4 96
3.8 302 8.1 91
3.4 305 9.4 88
3.8 296 11.3 85
3.5 284 10.2 85
2.9 276 10.7 87
3.0 269 10.1 82
2.6 290 10.0 83
2.1 281 11.7 83
1.2 274 12.9 92
1.8 260 12.6 90
2.4 263 12.8 72
2.1 262 12.8 78
2.2 257 15.6 74
2.1 260 14.9 75
2.4 263 14.1 69
2.4 266 14.3 72
2.5 271 14.5 85
2.4 277 12.9 79
1.8 293 14.3 86
0.9 300 10.7 93
0.7 304 8.4 89
0.8 308 6.3 85
0.8 302 5.5 82
0.4 324 5.7 79
0.0 312 5.1 78
-0.3 301 5.7 77
0.0 308 4.9 70
-0.7 296 4.3 72
-0.9 314 2.2 73
-1.3 45 2.7 83
-1.2 45 2.7 83
-1.6 55 3.0 84
-2.0 102 2.3 86
-2.1 80 2.5 88
-1.6 88 3.2 86
-1.2 83 3.6 85
-0.6 60 3.9 84
-0.3 82 3.8 83
-0.1 77 2.8 77
0.9 61 3.9 70
0.7 73 4.7 74
1.1 79 3.1 71
1.1 71 2.3 73
1.1 49 1.8 70
0.3 39 2.1 78
-0.2 14 2.5 77
-0.3 21 2.2 75
-0.4 29 2.4 71
-0.8 23 2.4 72
-1.3 4 2.1 71
-1.7 21 2.8 73
-2.3 31 2.2 72
-2.4 59 2.7 67
-2.0 40 2.7 67
-1.9 38 2.7 68
-2.1 30 2.6 64
-2.1 44 3.4 60
-2.7 30 3.3 62
-2.8 30 3.9 64
-2.6 27 4.1 62
-1.8 27 4.8 53
-1.4 11 6.0 54
-0.9 18 6.6 58
-1.0 22 8.3 55
-1.0 10 8.1 52
-1.5 4 9.2 62
`;
console.log(main(sampleInput));