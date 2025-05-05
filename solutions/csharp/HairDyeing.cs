using System;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split();
        int N = int.Parse(input[0]);
        int Q = int.Parse(input[1]);
        int[] discounts = new int[N];
        input = Console.ReadLine().Split();
        for (int i = 0; i < N; i++)
        {
            discounts[i] = int.Parse(input[i]);
        }
        long[] dp = new long[10];
        Array.Fill(dp, 1);
        for (int i = 1; i < N; i++)
        {
            long[] newDp = new long[10];
            for (int j = 0; j < 10; j++)
            {
                if (j != discounts[i])
                {
                    foreach (int k in Enumerable.Range(0, 10))
                    {
                        if (k != j)
                        {
                            newDp[j] += dp[k];
                            newDp[j] %= (1UL << 64);
                        }
                    }
                }
            }
            dp = newDp;
        }
        long result = 0;
        foreach (long val in dp)
        {
            result += val;
            result %= (1UL << 64);
        }
        Console.WriteLine(result);
        for (int q = 0; q < Q; q++)
        {
            input = Console.ReadLine().Split();
            int i = int.Parse(input[0]) - 1;
            int v = int.Parse(input[1]);
            discounts[i] = v;
            dp = new long[10];
            Array.Fill(dp, 1);
            for (int j = 1; j <= i; j++)
            {
                long[] newDp = new long[10];
                for (int k = 0; k < 10; k++)
                {
                    if (k != discounts[j])
                    {
                        foreach (int l in Enumerable.Range(0, 10))
                        {
                            if (l != k)
                            {
                                newDp[k] += dp[l];
                                newDp[k] %= (1UL << 64);
                            }
                        }
                    }
                }
                dp = newDp;
            }
            result = 0;
            foreach (long val in dp)
            {
                result += val;
                result %= (1UL << 64);
            }
            Console.WriteLine(result);
        }
    }
}