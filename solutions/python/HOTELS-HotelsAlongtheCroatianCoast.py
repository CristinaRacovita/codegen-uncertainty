def max_hotel_value(N, M, hotel_values):
    max_sum = 0
    current_sum = 0
    left = 0
    for right in range(N):
        current_sum += hotel_values[right]
        while current_sum > M:
            current_sum -= hotel_values[left]
            left += 1
        if current_sum > max_sum:
            max_sum = current_sum
    return max_sum
if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split()
    N = int(data[0])
    M = int(data[1])
    hotel_values = list(map(int, data[2:]))
    result = max_hotel_value(N, M, hotel_values)
    print(result)