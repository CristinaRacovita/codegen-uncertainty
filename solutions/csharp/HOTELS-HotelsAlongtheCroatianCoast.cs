using System;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split();
        int N = int.Parse(input[0]);
        int M = int.Parse(input[1]);
        input = Console.ReadLine().Split();
        int[] hotels = new int[N];
        for (int i = 0; i < N; i++)
        {
            hotels[i] = int.Parse(input[i]);
        }
        int max_sum = 0;
        int current_sum = 0;
        int left = 0;
        for (int right = 0; right < N; right++)
        {
            current_sum += hotels[right];
            while (current_sum > M)
            {
                current_sum -= hotels[left];
                left++;
            }
            if (current_sum > max_sum)
            {
                max_sum = current_sum;
            }
        }
        Console.WriteLine(max_sum);
    }
}