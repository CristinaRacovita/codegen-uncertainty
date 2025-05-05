using System;
class Program
{
    static void Main()
    {
        int t = int.Parse(Console.ReadLine());
        for (int i = 0; i < t; i++)
        {
            string[] input = Console.ReadLine().Split(' ');
            int n = int.Parse(input[0]);
            int u = int.Parse(input[1]);
            int[] array = new int[n];
            for (int j = 0; j < u; j++)
            {
                input = Console.ReadLine().Split(' ');
                int l = int.Parse(input[0]);
                int r = int.Parse(input[1]);
                int val = int.Parse(input[2]);
                for (int k = l; k <= r; k++)
                {
                    array[k] += val;
                }
            }
            int q = int.Parse(Console.ReadLine());
            for (int j = 0; j < q; j++)
            {
                int index = int.Parse(Console.ReadLine());
                Console.WriteLine(array[index]);
            }
        }
    }
}