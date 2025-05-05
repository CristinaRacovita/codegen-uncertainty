using System;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split();
        int n = int.Parse(input[0]);
        int m = int.Parse(input[1]);
        input = Console.ReadLine().Split();
        int[] a = new int[n];
        for (int i = 0; i < n; i++)
        {
            a[i] = int.Parse(input[i]);
        }
        Query[] queries = new Query[m];
        for (int i = 0; i < m; i++)
        {
            input = Console.ReadLine().Split();
            int iQuery = int.Parse(input[0]) - 1;
            int jQuery = int.Parse(input[1]) - 1;
            int kQuery = int.Parse(input[2]);
            queries[i] = new Query(iQuery, jQuery, kQuery);
        }
        SolveQueries(a, queries);
    }
    static void SolveQueries(int[] a, Query[] queries)
    {
        int n = a.Length;
        int maxVal = 0;
        foreach (var num in a)
        {
            if (num > maxVal)
            {
                maxVal = num;
            }
        }
        FenwickTree tree = new FenwickTree(maxVal);
        foreach (var query in queries)
        {
            int kthElement = FindKthSmallest(a, query.i, query.j, query.k, tree);
            Console.WriteLine(kthElement);
        }
    }
    static int FindKthSmallest(int[] a, int left, int right, int k, FenwickTree tree)
    {
        int[] copy = new int[right - left + 1];
        Array.Copy(a, left, copy, 0, copy.Length);
        Array.Sort(copy);
        int low = 0;
        int high = copy.Length - 1;
        while (low <= high)
        {
            int mid = low + (high - low) / 2;
            int count = tree.GetCount(copy[mid]);
            if (count >= k)
            {
                high = mid - 1;
            }
            else
            {
                low = mid + 1;
            }
        }
        return copy[low];
    }
}
class FenwickTree
{
    private int[] tree;
    public FenwickTree(int size)
    {
        tree = new int[size + 1];
    }
    public void Update(int index, int delta)
    {
        while (index < tree.Length)
        {
            tree[index] += delta;
            index += index & (-index);
        }
    }
    public int GetCount(int index)
    {
        int sum = 0;
        while (index > 0)
        {
            sum += tree[index];
            index -= index & (-index);
        }
        return sum;
    }
}
class Query
{
    public int i;
    public int j;
    public int k;
    public Query(int i, int j, int k)
    {
        this.i = i;
        this.j = j;
        this.k = k;
    }
}