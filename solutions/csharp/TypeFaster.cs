using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split();
        int n = int.Parse(input[0]);
        long T = long.Parse(input[1]);
        long[] words = new long[n];
        input = Console.ReadLine().Split();
        for (int i = 0; i < n; i++)
        {
            words[i] = long.Parse(input[i]);
        }
        long low = 1;
        long high = 0;
        for (int i = 0; i < n; i++)
        {
            if (words[i] > high)
            {
                high = words[i];
            }
        }
        while (low < high)
        {
            long mid = low + (high - low) / 2;
            long totalTimePenalty = 0;
            for (int i = 0; i < n; i++)
            {
                totalTimePenalty += (words[i] + mid - 1) / mid;
            }
            if (totalTimePenalty < T)
            {
                high = mid;
            }
            else
            {
                low = mid + 1;
            }
        }
        Console.WriteLine(low);
    }
}