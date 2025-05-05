using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        int t = int.Parse(Console.ReadLine());
        for (int tc = 0; tc < t; tc++)
        {
            if (tc > 0)
            {
                Console.WriteLine();
            }
            int n = int.Parse(Console.ReadLine());
            List<int>[] adjList = new List<int>[n + 1];
            for (int i = 1; i <= n; i++)
            {
                adjList[i] = new List<int>();
            }
            int[] edgeCosts = new int[n];
            for (int i = 0; i < n - 1; i++)
            {
                string[] parts = Console.ReadLine().Split();
                int a = int.Parse(parts[0]);
                int b = int.Parse(parts[1]);
                int c = int.Parse(parts[2]);
                adjList[a].Add(b);
                adjList[b].Add(a);
                edgeCosts[i] = c;
            }
            UnionFind uf = new UnionFind(n);
            int[] maxEdgeOnPath = new int[n + 1];
            Array.Fill(maxEdgeOnPath, int.MinValue);
            for (int i = 0; i < n - 1; i++)
            {
                int u = i + 1;
                int v = adjList[u][0];
                int w = edgeCosts[i];
                int rootU = uf.Find(u);
                int rootV = uf.Find(v);
                maxEdgeOnPath[rootU] = Math.Max(maxEdgeOnPath[rootU], w);
                maxEdgeOnPath[rootV] = Math.Max(maxEdgeOnPath[rootV], w);
                uf.Union(u, v);
            }
            while (true)
            {
                string[] instruction = Console.ReadLine().Split();
                if (instruction[0] == "DONE")
                {
                    break;
                }
                if (instruction[0] == "CHANGE")
                {
                    int i = int.Parse(instruction[1]) - 1;
                    int ti = int.Parse(instruction[2]);
                    edgeCosts[i] = ti;
                }
                else if (instruction[0] == "QUERY")
                {
                    int a = int.Parse(instruction[1]);
                    int b = int.Parse(instruction[2]);
                    int rootA = uf.Find(a);
                    int rootB = uf.Find(b);
                    if (rootA != rootB)
                    {
                        Console.WriteLine(-1); 
                    }
                    else
                    {
                        Console.WriteLine(maxEdgeOnPath[rootA]);
                    }
                }
            }
        }
    }
    class UnionFind
    {
        private int[] parent;
        private int[] rank;
        public UnionFind(int n)
        {
            parent = new int[n + 1];
            rank = new int[n + 1];
            for (int i = 1; i <= n; i++)
            {
                parent[i] = i;
                rank[i] = 0;
            }
        }
        public int Find(int x)
        {
            while (x != parent[x])
            {
                parent[x] = parent[parent[x]]; 
                x = parent[x];
            }
            return x;
        }
        public void Union(int x, int y)
        {
            int rootX = Find(x);
            int rootY = Find(y);
            if (rootX != rootY)
            {
                if (rank[rootX] > rank[rootY])
                {
                    parent[rootY] = rootX;
                }
                else if (rank[rootX] < rank[rootY])
                {
                    parent[rootX] = rootY;
                }
                else
                {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
            }
        }
    }
}