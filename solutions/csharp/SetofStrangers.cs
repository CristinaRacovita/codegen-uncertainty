using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        int t = int.Parse(Console.ReadLine());
        for (int tc = 0; tc < t; tc++)
        {
            string[] nm = Console.ReadLine().Split();
            int n = int.Parse(nm[0]);
            int m = int.Parse(nm[1]);
            int[,] table = new int[n, m];
            for (int i = 0; i < n; i++)
            {
                string[] row = Console.ReadLine().Split();
                for (int j = 0; j < m; j++)
                {
                    table[i, j] = int.Parse(row[j]);
                }
            }
            Console.WriteLine(MinStepsToUniformColor(table, n, m));
        }
    }
    static int MinStepsToUniformColor(int[,] table, int n, int m)
    {
        int maxColor = n * m;
        bool[,] visited = new bool[n, m];
        int steps = 0;
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (!visited[i, j])
                {
                    int currentColor = table[i, j];
                    Queue<(int, int)> queue = new Queue<(int, int)>();
                    queue.Enqueue((i, j));
                    visited[i, j] = true;
                    bool needsPainting = false;
                    while (queue.Count > 0)
                    {
                        (int x, int y) = queue.Dequeue();
                        for (int dx = -1; dx <= 1; dx++)
                        {
                            for (int dy = -1; dy <= 1; dy++)
                            {
                                if (dx == 0 && dy == 0) continue;
                                if (dx != 0 && dy != 0) continue; 
                                int nx = x + dx;
                                int ny = y + dy;
                                if (nx >= 0 && nx < n && ny >= 0 && ny < m && !visited[nx, ny] && table[nx, ny] == currentColor)
                                {
                                    queue.Enqueue((nx, ny));
                                    visited[nx, ny] = true;
                                }
                                else if (nx >= 0 && nx < n && ny >= 0 && ny < m && table[nx, ny] != currentColor)
                                {
                                    needsPainting = true;
                                }
                            }
                        }
                    }
                    if (needsPainting)
                    {
                        steps++;
                    }
                }
            }
        }
        return steps;
    }
}