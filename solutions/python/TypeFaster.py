def calculate_time_penalty(words, speed):
    total_penalty = 0
    for w in words:
        if w > 0:
            total_penalty += (w + speed - 1) // speed  
    return total_penalty
def find_minimum_typing_speed(n, T, words):
    low = 1
    high = 10**18  
    while low < high:
        mid = (low + high) // 2
        total_penalty = calculate_time_penalty(words, mid)
        if total_penalty < T:
            high = mid  
        else:
            low = mid + 1  
    return low
n, T = map(int, input().split())
words = list(map(int, input().split()))
result = find_minimum_typing_speed(n, T, words)
print(result)