def kth_amusing_number(k):
    binary_representation = ""
    while k > 0:
        remainder = k % 2
        binary_representation = str(remainder) + binary_representation
        k = k // 2
    amusing_number = ""
    for digit in binary_representation:
        if digit == '0':
            amusing_number += '5'
        else:
            amusing_number += '6'
    return amusing_number
def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    N = int(data[0])
    results = []
    index = 1
    for _ in range(N):
        k = int(data[index])
        results.append(kth_amusing_number(k))
        index += 1
    for result in results:
        print(result)
if __name__ == "__main__":
    main()