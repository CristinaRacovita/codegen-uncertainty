def find_power_of_two(n):
    power = 0
    while (1 << power) <= n:
        power += 1
    return power - 1
def calculate_probabilities(n, luckiness):
    probabilities = [0.0] * n
    for i in range(n):
        probabilities[i] = luckiness[i]
    power = find_power_of_two(n)
    k = n - (1 << power)
    participants = list(range(k, n))
    while len(participants) > 1:
        next_participants = []
        for i in range(0, len(participants), 2):
            p1 = participants[i]
            p2 = participants[i + 1]
            prob_p1 = probabilities[p1]
            prob_p2 = probabilities[p2]
            win_prob_p1 = prob_p1 / (prob_p1 + prob_p2)
            win_prob_p2 = prob_p2 / (prob_p1 + prob_p2)
            if win_prob_p1 > win_prob_p2:
                next_participants.append(p1)
                probabilities[p1] = win_prob_p1 * probabilities[p1]
            else:
                next_participants.append(p2)
                probabilities[p2] = win_prob_p2 * probabilities[p2]
        participants = next_participants
    total_probability = sum(probabilities)
    normalized_probabilities = [prob / total_probability for prob in probabilities]
    return normalized_probabilities
n = int(input().strip())
luckiness = list(map(int, input().strip().split()))
result = calculate_probabilities(n, luckiness)
for prob in result:
    print(f"{prob:.9f}", end=" ")
print()