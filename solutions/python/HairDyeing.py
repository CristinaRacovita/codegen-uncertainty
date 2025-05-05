MOD = 2**64
def count_plans(N, schedule):
    dp_same = [0] * 10  
    dp_diff = [0] * 10  
    for i in range(10):
        dp_same[i] = 1
    for day in range(1, N):
        current_discount = schedule[day]
        new_dp_same = [0] * 10
        new_dp_diff = [0] * 10
        for color in range(10):
            if color == current_discount:
                new_dp_same[color] = sum(dp_diff) % MOD
            else:
                new_dp_diff[color] = dp_same[color]
        dp_same = new_dp_same
        dp_diff = new_dp_diff
    total_plans = sum(dp_same) + sum(dp_diff)
    return total_plans % MOD
N, Q = map(int, input().split())
schedule = list(map(int, input().split()))
initial_plans = count_plans(N, schedule)
print(initial_plans)
for _ in range(Q):
    i, v = map(int, input().split())
    schedule[i - 1] = v
    updated_plans = count_plans(N, schedule)
    print(updated_plans)