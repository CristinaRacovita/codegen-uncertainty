import sys
input = sys.stdin.read
data = input().split()
index = 0
t = int(data[index])
index += 1
results = []
for _ in range(t):
    n = int(data[index])
    index += 1
    u = int(data[index])
    index += 1
    arr = [0] * n
    for _ in range(u):
        l = int(data[index])
        index += 1
        r = int(data[index])
        index += 1
        val = int(data[index])
        index += 1
        for i in range(l, r + 1):
            arr[i] += val
    q = int(data[index])
    index += 1
    for _ in range(q):
        query_index = int(data[index])
        index += 1
        results.append(arr[query_index])
for result in results:
    print(result)