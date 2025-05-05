using System;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split();
        int n = int.Parse(input[0]);
        int k = int.Parse(input[1]);
        input = Console.ReadLine().Split();
        long[] w = new long[n - 1];
        for (int i = 0; i < n - 1; i++)
        {
            w[i] = long.Parse(input[i]);
        }
        input = Console.ReadLine().Split();
        long[] g = new long[n];
        for (int i = 0; i < n; i++)
        {
            g[i] = long.Parse(input[i]);
        }
        long[] distPrefixSum = new long[n];
        long[] gasPrefixSum = new long[n + 1];
        for (int i = 1; i < n; i++)
        {
            distPrefixSum[i] = distPrefixSum[i - 1] + w[i - 1];
        }
        for (int i = 1; i <= n; i++)
        {
            gasPrefixSum[i] = gasPrefixSum[i - 1] + g[i - 1];
        }
        int maxBeauty = 0;
        for (int l = 0; l < n; l++)
        {
            int r = l;
            long currentGas = gasPrefixSum[l + 1];
            long currentDist = 0;
            while (r < n - 1)
            {
                r++;
                currentDist += w[r - 1];
                currentGas += g[r];
                if (currentGas < currentDist)
                {
                    break;
                }
            }
            int extraGasNeeded = (int)(currentDist - currentGas);
            if (extraGasNeeded > 0)
            {
                int presentsUsed = Math.Min(extraGasNeeded, k);
                currentGas += presentsUsed;
                k -= presentsUsed;
            }
            int beauty = r - l + 1;
            maxBeauty = Math.Max(maxBeauty, beauty);
        }
        Console.WriteLine(maxBeauty);
    }
}