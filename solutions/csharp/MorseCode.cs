using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        string[] freqStrs = Console.ReadLine().Split(' ');
        double[] frequencies = new double[n];
        for (int i = 0; i < n; i++)
        {
            frequencies[i] = double.Parse(freqStrs[i]);
        }
        List<Node> nodes = new List<Node>();
        for (int i = 0; i < n; i++)
        {
            nodes.Add(new Node(frequencies[i], i));
        }
        while (nodes.Count > 1)
        {
            nodes.Sort((a, b) => a.Frequency.CompareTo(b.Frequency));
            Node left = nodes[0];
            Node right = nodes[1];
            Node parent = new Node(left.Frequency + right.Frequency, -1);
            parent.Left = left;
            parent.Right = right;
            nodes.RemoveAt(0);
            nodes.RemoveAt(0);
            nodes.Add(parent);
        }
        string[] morseCodes = new string[n];
        AssignMorseCodes(nodes[0], "", morseCodes);
        for (int i = 0; i < n; i++)
        {
            Console.WriteLine(morseCodes[i]);
        }
    }
    static void AssignMorseCodes(Node node, string code, string[] morseCodes)
    {
        if (node.Left == null && node.Right == null)
        {
            morseCodes[node.Index] = code.Replace('0', '.').Replace('1', '-');
            return;
        }
        if (node.Left != null)
        {
            AssignMorseCodes(node.Left, code + "0", morseCodes);
        }
        if (node.Right != null)
        {
            AssignMorseCodes(node.Right, code + "1", morseCodes);
        }
    }
}
class Node
{
    public double Frequency;
    public int Index;
    public Node Left;
    public Node Right;
    public Node(double frequency, int index)
    {
        Frequency = frequency;
        Index = index;
    }
}