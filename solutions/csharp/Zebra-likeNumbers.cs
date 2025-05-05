using System;
class ZebraValueCalculator {
    static void Main(string[] args) {
        int t = int.Parse(Console.ReadLine());
        for (int i = 0; i < t; i++) {
            string[] input = Console.ReadLine().Split(' ');
            long l = long.Parse(input[0]);
            long r = long.Parse(input[1]);
            long k = long.Parse(input[2]);
            Console.WriteLine(CalculateZebraValueInRange(l, r, k));
        }
    }
    static long CalculateZebraValueInRange(long l, long r, long k) {
        return 0;
    }
}