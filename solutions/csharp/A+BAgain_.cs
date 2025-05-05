using System;
class Program {
    static void Main() {
        int t = int.Parse(Console.ReadLine());
        for (int i = 0; i < t; i++) {
            int n = int.Parse(Console.ReadLine());
            int sum = SumOfDigits(n);
            Console.WriteLine(sum);
        }
    }
    static int SumOfDigits(int n) {
        int tens = n / 10;
        int units = n % 10;
        return tens + units;
    }
}