def parse_input():
    matrix = []
    for _ in range(7):
        matrix.append(input().strip())
    d, h = map(int, input().strip().split())
    return matrix, d, h
def count_available_hours_per_day(matrix):
    available_hours_per_day = []
    for row in matrix:
        count = 0
        for char in row:
            if char == '.':
                count += 1
        available_hours_per_day.append(count)
    return available_hours_per_day
def count_available_days_per_hour(matrix):
    available_days_per_hour = [0] * 24
    for col in range(24):
        for row in matrix:
            if row[col] == '.':
                available_days_per_hour[col] += 1
    return available_days_per_hour
def select_top_k_elements(elements, k):
    sorted_elements = sorted(enumerate(elements), key=lambda x: x[1], reverse=True)
    top_k_indices = [index for index, value in sorted_elements[:k]]
    return top_k_indices
def calculate_probability(matrix, d, h):
    available_hours_per_day = count_available_hours_per_day(matrix)
    available_days_per_hour = count_available_days_per_hour(matrix)
    selected_days = select_top_k_elements(available_hours_per_day, d)
    selected_hours = select_top_k_elements(available_days_per_hour, h)
    total_possible_combinations = d * h
    total_available_combinations = 0
    for day in selected_days:
        for hour in selected_hours:
            if matrix[day][hour] == '.':
                total_available_combinations += 1
    probability = total_available_combinations / total_possible_combinations
    return probability
if __name__ == "__main__":
    matrix, d, h = parse_input()
    probability = calculate_probability(matrix, d, h)
    print(probability)