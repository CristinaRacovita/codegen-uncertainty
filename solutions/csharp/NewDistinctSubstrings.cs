using System;
class Program
{
    static void Main()
    {
        int T = int.Parse(Console.ReadLine());
        for (int t = 0; t < T; t++)
        {
            string s = Console.ReadLine();
            Trie trie = new Trie();
            int n = s.Length;
            for (int i = 0; i < n; i++)
            {
                for (int j = i + 1; j <= n; j++)
                {
                    trie.Insert(s.Substring(i, j - i));
                }
            }
            Console.WriteLine(trie.CountDistinctSubstrings());
        }
    }
}
class TrieNode
{
    public TrieNode[] children;
    public bool isEndOfWord;
    public TrieNode()
    {
        children = new TrieNode[26];
        isEndOfWord = false;
    }
}
class Trie
{
    private TrieNode root;
    public Trie()
    {
        root = new TrieNode();
    }
    public void Insert(string word)
    {
        TrieNode current = root;
        for (int i = 0; i < word.Length; i++)
        {
            int index = word[i] - 'a';
            if (current.children[index] == null)
            {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }
    public int CountDistinctSubstrings()
    {
        return CountDistinctSubstrings(root);
    }
    private int CountDistinctSubstrings(TrieNode node)
    {
        int count = 0;
        for (int i = 0; i < 26; i++)
        {
            if (node.children[i] != null)
            {
                count += 1 + CountDistinctSubstrings(node.children[i]);
            }
        }
        return count;
    }
}