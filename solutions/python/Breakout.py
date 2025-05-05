def simulate_brick_wall(b, w, h, balls):
    wall = [[True] * w for _ in range(h)]
    results = []
    for t, p, d in balls:
        bounces = 0
        while 0 <= t < w:
            start = max(0, t - p)
            end = min(w, t + p + 1)
            for x in range(start, end):
                if wall[h-1][x]:
                    bounces += 1
                    wall[h-1][x] = False
            t += d
            if any(wall[y][t] for y in range(h)):
                continue
            else:
                break
        for x in range(w):
            for y in range(h-2, -1, -1):
                if not wall[y][x]:
                    wall[y+1][x] = False
                else:
                    wall[y+1][x] = wall[y][x]
                    wall[y][x] = False
        results.append(bounces)
    return results
import sys
input = sys.stdin.read
data = input().split()
b = int(data[0])
w = int(data[1])
h = int(data[2])
balls = []
index = 3
for i in range(b):
    t = int(data[index])
    p = int(data[index + 1])
    d = int(data[index + 2])
    balls.append((t, p, d))
    index += 3
results = simulate_brick_wall(b, w, h, balls)
for result in results:
    print(result)