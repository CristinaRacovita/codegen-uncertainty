using System;
class Program
{
    static void Main()
    {
        int t = int.Parse(Console.ReadLine());
        for (int i = 0; i < t; i++)
        {
            string[] input = Console.ReadLine().Split();
            int N = int.Parse(input[0]);
            int C = int.Parse(input[1]);
            int[] stalls = new int[N];
            for (int j = 0; j < N; j++)
            {
                stalls[j] = int.Parse(Console.ReadLine());
            }
            for (int j = 0; j < N - 1; j++)
            {
                for (int k = j + 1; k < N; k++)
                {
                    if (stalls[j] > stalls[k])
                    {
                        int temp = stalls[j];
                        stalls[j] = stalls[k];
                        stalls[k] = temp;
                    }
                }
            }
            int low = 0;
            int high = stalls[N - 1] - stalls[0];
            int result = 0;
            while (low <= high)
            {
                int mid = low + (high - low) / 2;
                if (CanPlaceCows(stalls, C, mid))
                {
                    result = mid;
                    low = mid + 1;
                }
                else
                {
                    high = mid - 1;
                }
            }
            Console.WriteLine(result);
        }
    }
    static bool CanPlaceCows(int[] stalls, int C, int minDist)
    {
        int count = 1;
        int lastPosition = stalls[0];
        for (int i = 1; i < stalls.Length; i++)
        {
            if (stalls[i] - lastPosition >= minDist)
            {
                count++;
                lastPosition = stalls[i];
                if (count == C)
                {
                    return true;
                }
            }
        }
        return false;
    }
}