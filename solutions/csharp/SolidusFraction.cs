using System;
class Program
{
    static void Main()
    {
        string numeratorLine = Console.ReadLine();
        string vinculumLine = Console.ReadLine();
        string denominatorLine = Console.ReadLine();
        long n = long.Parse(numeratorLine.Trim());
        long d = long.Parse(denominatorLine.Trim());
        long gcd = GCD(Math.Abs(n), Math.Abs(d));
        n /= gcd;
        d /= gcd;
        bool isNegative = (n < 0 && d > 0) || (n > 0 && d < 0);
        if (d == 1)
        {
            Console.WriteLine(isNegative ? "-" + Math.Abs(n) : Math.Abs(n).ToString());
        }
        else
        {
            Console.WriteLine(isNegative ? "-" + Math.Abs(n) + "/" + Math.Abs(d) : n + "/" + d);
        }
    }
    static long GCD(long a, long b)
    {
        while (b != 0)
        {
            long temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}