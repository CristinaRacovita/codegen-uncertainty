def read_input():
    import sys
    input = sys.stdin.read
    data = input().split()
    index = 0
    d = int(data[index])
    index += 1
    datasets = []
    for _ in range(d):
        n = int(data[index])
        index += 1
        scores = list(map(int, data[index:index + n]))
        index += n
        datasets.append(scores)
    return datasets
def competition_ranking(scores):
    sorted_scores = sorted([(score, i) for i, score in enumerate(scores)], reverse=True)
    ranks = [0] * len(scores)
    current_rank = 1
    for i, (_, original_index) in enumerate(sorted_scores):
        if i > 0 and sorted_scores[i][0] != sorted_scores[i - 1][0]:
            current_rank = i + 1
        ranks[original_index] = current_rank
    return ranks
def dense_ranking(scores):
    sorted_scores = sorted([(score, i) for i, score in enumerate(scores)], reverse=True)
    ranks = [0] * len(scores)
    current_rank = 1
    for i, (_, original_index) in enumerate(sorted_scores):
        if i > 0 and sorted_scores[i][0] < sorted_scores[i - 1][0]:
            current_rank += 1
        ranks[original_index] = current_rank
    return ranks
def count_beneficiaries(competition_ranks, dense_ranks):
    count = 0
    for c, d in zip(competition_ranks, dense_ranks):
        if d < c:
            count += 1
    return count
def main():
    datasets = read_input()
    results = []
    for scores in datasets:
        comp_ranks = competition_ranking(scores)
        dense_ranks = dense_ranking(scores)
        beneficiaries = count_beneficiaries(comp_ranks, dense_ranks)
        results.append(beneficiaries)
    for result in results:
        print(result)
if __name__ == "__main__":
    main()