def is_zebra_like(n):
    bin_rep = []
    while n > 0:
        bin_rep.append(n % 2)
        n //= 2
    if bin_rep[-1] == 0:
        return False
    for i in range(len(bin_rep) - 1):
        if bin_rep[i] == bin_rep[i + 1]:
            return False
    return True
def zebra_value(n):
    count = 0
    while n > 0:
        if is_zebra_like(n):
            count += 1
            n -= 1
        else:
            n -= 1
    return count
def count_integers_with_zebra_value(l, r, k):
    count = 0
    for x in range(l, r + 1):
        if zebra_value(x) == k:
            count += 1
    return count
t = int(input())
results = []
for _ in range(t):
    l, r, k = map(int, input().split())
    results.append(count_integers_with_zebra_value(l, r, k))
for result in results:
    print(result)