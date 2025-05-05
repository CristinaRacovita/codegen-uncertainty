def can_place_cows(stalls, C, min_dist):
    count = 1
    last_position = stalls[0]
    for i in range(1, len(stalls)):
        if stalls[i] - last_position >= min_dist:
            count += 1
            last_position = stalls[i]
            if count == C:
                return True
    return False
def largest_minimum_distance(N, C, stalls):
    stalls.sort()
    low = 1
    high = stalls[-1] - stalls[0]
    while low <= high:
        mid = (low + high) // 2
        if can_place_cows(stalls, C, mid):
            low = mid + 1
        else:
            high = mid - 1
    return high
import sys
input = sys.stdin.read
data = input().split()
index = 0
t = int(data[index])
index += 1
results = []
for _ in range(t):
    N = int(data[index])
    C = int(data[index + 1])
    index += 2
    stalls = []
    for _ in range(N):
        stalls.append(int(data[index]))
        index += 1
    result = largest_minimum_distance(N, C, stalls)
    results.append(result)
for result in results:
    print(result)