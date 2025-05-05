using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split(' ');
        int N = int.Parse(input[0]);
        int X = int.Parse(input[1]);
        int Y = int.Parse(input[2]);
        input = Console.ReadLine().Split(' ');
        int H = int.Parse(input[0]);
        int S = int.Parse(input[1]);
        List<int> refillStations = new List<int>();
        for (int i = 0; i < N; i++)
        {
            refillStations.Add(int.Parse(Console.ReadLine()));
        }
        refillStations.Sort();
        long[] dp = new long[42196];
        for (int i = 1; i <= 42195; i++)
        {
            dp[i] = long.MaxValue;
        }
        for (int i = 1; i <= 42195; i++)
        {
            if (i <= H)
            {
                dp[i] = i / H;
            }
            else
            {
                int j = refillStations.BinarySearch(i);
                if (j < 0)
                {
                    j = ~j;
                }
                if (j > 0)
                {
                    int prevStation = refillStations[j - 1];
                    long timeToRun = (i - prevStation) / H;
                    long timeToJog = (i - prevStation) / S;
                    long timeToRefill = (X / 1000.0 * Y) / H; 
                    dp[i] = Math.Min(dp[i], dp[prevStation] + timeToRun + timeToRefill);
                }
                if (j < refillStations.Count)
                {
                    int currStation = refillStations[j];
                    long timeToRun = (currStation - i) / H;
                    long timeToJog = (currStation - i) / S;
                    long timeToRefill = (X / 1000.0 * Y) / H;
                    dp[i] = Math.Min(dp[i], dp[currStation] + timeToRun + timeToRefill);
                }
            }
        }
        long totalTime = dp[42195];
        int hours = (int)(totalTime / 3600);
        int minutes = (int)((totalTime % 3600) / 60);
        int seconds = (int)(totalTime % 60);
        Console.WriteLine($"{hours:D2}:{minutes:D2}:{seconds:D2}");
    }
}