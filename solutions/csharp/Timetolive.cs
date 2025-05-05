using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        int c = int.Parse(Console.ReadLine());
        for (int i = 0; i < c; i++)
        {
            SolveTestcase();
        }
    }
    static void SolveTestcase()
    {
        int n = int.Parse(Console.ReadLine());
        List<int>[] network = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            network[i] = new List<int>();
        }
        for (int i = 0; i < n - 1; i++)
        {
            string[] input = Console.ReadLine().Split(' ');
            int a = int.Parse(input[0]);
            int b = int.Parse(input[1]);
            network[a].Add(b);
            network[b].Add(a);
        }
        int[] maxDistances = new int[n];
        for (int i = 0; i < n; i++)
        {
            int[] distances = new int[n];
            Array.Fill(distances, -1);
            distances[i] = 0;
            DFS(network, distances, i);
            int maxDistance = 0;
            for (int j = 0; j < n; j++)
            {
                if (distances[j] > maxDistance)
                {
                    maxDistance = distances[j];
                }
            }
            maxDistances[i] = maxDistance;
        }
        int optimalTTL = int.MaxValue;
        for (int i = 0; i < n; i++)
        {
            if (maxDistances[i] < optimalTTL)
            {
                optimalTTL = maxDistances[i];
            }
        }
        Console.WriteLine(optimalTTL);
    }
    static void DFS(List<int>[] network, int[] distances, int currentNode)
    {
        foreach (int neighbor in network[currentNode])
        {
            if (distances[neighbor] == -1)
            {
                distances[neighbor] = distances[currentNode] + 1;
                DFS(network, distances, neighbor);
            }
        }
    }
}