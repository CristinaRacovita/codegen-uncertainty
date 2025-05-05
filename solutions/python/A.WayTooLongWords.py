def abbreviate(word):
    if len(word) > 10:
        first_letter = word[0]
        last_letter = word[-1]
        middle_length = len(word) - 2
        abbreviated_word = first_letter + str(middle_length) + last_letter
        return abbreviated_word
    else:
        return word
def main():
    n = int(input())
    words = []
    for _ in range(n):
        words.append(input().strip())
    results = []
    for word in words:
        results.append(abbreviate(word))
    for result in results:
        print(result)
if __name__ == "__main__":
    main()