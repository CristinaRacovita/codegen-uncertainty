def max_happiness(N, friday_matrix, saturday_matrix):
    def calculate_happiness(friday_perm, saturday_perm):
        total_happiness = 0
        for i in range(N // 2):
            total_happiness += friday_matrix[i][friday_perm[i]]
            total_happiness += saturday_matrix[i][saturday_perm[i]]
        return total_happiness
    from itertools import permutations
    friday_perms = list(permutations(range(N // 2)))
    saturday_perms = list(permutations(range(N // 2)))
    max_happiness = 0
    for friday_perm in friday_perms:
        for saturday_perm in saturday_perms:
            current_happiness = calculate_happiness(friday_perm, saturday_perm)
            if current_happiness > max_happiness:
                max_happiness = current_happiness
    return max_happiness
N = 4
friday_matrix = [
    [1, 2, 3, 4],
    [2, 3, 4, 1],
    [3, 4, 1, 2],
    [4, 1, 2, 3]
]
saturday_matrix = [
    [5, 8, 7, 1],
    [6, 9, 81, 3],
    [55, 78, 1, 6],
    [1, 1, 1, 1]
]
print(max_happiness(N, friday_matrix, saturday_matrix))