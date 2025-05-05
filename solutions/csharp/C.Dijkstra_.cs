using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split();
        int n = int.Parse(input[0]);
        int m = int.Parse(input[1]);
        List<List<(int, int)>> graph = new List<List<(int, int)>>();
        for (int i = 0; i <= n; i++)
        {
            graph.Add(new List<(int, int)>());
        }
        for (int i = 0; i < m; i++)
        {
            input = Console.ReadLine().Split();
            int ai = int.Parse(input[0]);
            int bi = int.Parse(input[1]);
            int wi = int.Parse(input[2]);
            graph[ai].Add((bi, wi));
            graph[bi].Add((ai, wi));
        }
        int[] distances = new int[n + 1];
        int[] previousVertices = new int[n + 1];
        for (int i = 1; i <= n; i++)
        {
            distances[i] = int.MaxValue;
        }
        distances[1] = 0;
        PriorityQueue<int, int> priorityQueue = new PriorityQueue<int, int>();
        priorityQueue.Enqueue(1, 0);
        while (priorityQueue.Count > 0)
        {
            int currentVertex = priorityQueue.Dequeue();
            foreach (var neighbor in graph[currentVertex])
            {
                int neighborVertex = neighbor.Item1;
                int weight = neighbor.Item2;
                if (distances[currentVertex] + weight < distances[neighborVertex])
                {
                    distances[neighborVertex] = distances[currentVertex] + weight;
                    previousVertices[neighborVertex] = currentVertex;
                    priorityQueue.Enqueue(neighborVertex, distances[neighborVertex]);
                }
            }
        }
        if (distances[n] == int.MaxValue)
        {
            Console.WriteLine(-1);
        }
        else
        {
            List<int> path = new List<int>();
            int currentVertex = n;
            while (currentVertex != 0)
            {
                path.Insert(0, currentVertex);
                currentVertex = previousVertices[currentVertex];
            }
            Console.WriteLine(string.Join(" ", path));
        }
    }
}