using System;
class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        for (int i = 0; i < n; i++)
        {
            long k = long.Parse(Console.ReadLine());
            Console.WriteLine(GetKthAmusingNumber(k));
        }
    }
    static string GetKthAmusingNumber(long k)
    {
        if (k == 1) return "5"; 
        long num = k - 1;
        string amusingNumber = "";
        while (num > 0)
        {
            if (num % 2 == 0)
            {
                amusingNumber = "5" + amusingNumber;
            }
            else
            {
                amusingNumber = "6" + amusingNumber;
            }
            num /= 2;
        }
        return amusingNumber;
    }
}