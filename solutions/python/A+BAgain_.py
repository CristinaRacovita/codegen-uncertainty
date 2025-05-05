t = int(input())
for _ in range(t):
    n = int(input())
    tens_digit = n // 10
    units_digit = n % 10
    sum_of_digits = tens_digit + units_digit
    print(sum_of_digits)