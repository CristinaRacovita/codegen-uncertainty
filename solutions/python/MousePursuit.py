def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])
    events = []
    index = 1
    for _ in range(n):
        event_type = data[index]
        s = int(data[index + 1])
        c = int(data[index + 2])
        g = int(data[index + 3])
        events.append((s, event_type, c, g))
        index += 4
    k = int(data[index])
    events.sort(key=lambda x: x[0], reverse=True)
    cheese = 0
    glory = 0
    for event in events:
        s, event_type, c, g = event
        if s > k:
            continue
        if event_type == 'CAUGHT':
            cheese += c
            glory += g
        elif event_type == 'MISS':
            cheese -= c
            glory -= g
    print(cheese, glory)
if __name__ == "__main__":
    main()