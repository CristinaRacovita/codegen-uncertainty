type Event = {
    timestamp: number;
    type: 'CAUGHT' | 'MISS';
    cheese: number;
    glory: number;
};
function parseInput(input: string): [Event[], number] {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0], 10);
    const events: Event[] = [];
    for (let i = 1; i <= n; i++) {
        const [type, s, c, g] = lines[i].trim().split(' ');
        const timestamp = parseInt(s, 10);
        const cheese = parseInt(c, 10);
        const glory = parseInt(g, 10);
        events.push({ timestamp, type: type as 'CAUGHT' | 'MISS', cheese, glory });
    }
    const k = parseInt(lines[n + 1], 10);
    return [events, k];
}
function sortEvents(events: Event[]): Event[] {
    for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
            if (events[i].timestamp < events[j].timestamp) {
                const temp = events[i];
                events[i] = events[j];
                events[j] = temp;
            }
        }
    }
    return events;
}
function calculateTotalCheeseAndGlory(events: Event[], k: number): [number, number] {
    let totalCheese = 0;
    let totalGlory = 0;
    for (const event of events) {
        if (event.timestamp > k) {
            continue;
        }
        if (event.type === 'CAUGHT') {
            totalCheese += event.cheese;
            totalGlory += event.glory;
        } else if (event.type === 'MISS') {
            totalCheese -= event.cheese;
            totalGlory -= event.glory;
        }
    }
    return [totalCheese, totalGlory];
}
function main(input: string) {
    const [events, k] = parseInput(input);
    const sortedEvents = sortEvents(events);
    const [totalCheese, totalGlory] = calculateTotalCheeseAndGlory(sortedEvents, k);
    console.log(`${totalCheese} ${totalGlory}`);
}
const sampleInput = `
3
CAUGHT 1 6 5
MISS 4 1 2
CAUGHT 8 0 3
5
`;
main(sampleInput);