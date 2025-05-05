using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        string[] luckinessStr = Console.ReadLine().Split(' ');
        long[] luckiness = new long[n];
        for (int i = 0; i < n; i++)
        {
            luckiness[i] = long.Parse(luckinessStr[i]);
        }
        double[] probabilities = new double[n];
        for (int i = 0; i < n; i++)
        {
            probabilities[i] = 1.0;
        }
        int k = n;
        while (k > 1)
        {
            int roundSize = k;
            if ((roundSize & (roundSize - 1)) != 0)
            {
                while ((roundSize & (roundSize - 1)) != 0)
                {
                    roundSize >>= 1;
                }
                roundSize <<= 1;
            }
            k = roundSize;
            for (int i = 0; i < k / 2; i++)
            {
                int player1 = i * 2;
                int player2 = i * 2 + 1;
                long totalLuck = luckiness[player1] + luckiness[player2];
                double winProb1 = (double)luckiness[player1] / totalLuck;
                double winProb2 = (double)luckiness[player2] / totalLuck;
                if (winProb1 > winProb2)
                {
                    probabilities[player2] = 0.0;
                    probabilities[player1] *= winProb1;
                    luckiness[player2] = 0;
                }
                else
                {
                    probabilities[player1] = 0.0;
                    probabilities[player2] *= winProb2;
                    luckiness[player1] = 0;
                }
            }
        }
        for (int i = 0; i < n; i++)
        {
            Console.Write($"{probabilities[i]:F9} ");
        }
    }
}