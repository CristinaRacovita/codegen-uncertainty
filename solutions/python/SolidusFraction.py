def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
def main():
    numerator_str = input().strip()
    vinculum = input().strip()
    denominator_str = input().strip()
    numerator = int(numerator_str)
    denominator = int(denominator_str)
    gcd_value = gcd(abs(numerator), abs(denominator))
    reduced_numerator = numerator // gcd_value
    reduced_denominator = denominator // gcd_value
    if reduced_denominator == 1:
        print(reduced_numerator)
    else:
        print(f"{reduced_numerator}/{reduced_denominator}")
if __name__ == "__main__":
    main()