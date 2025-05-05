using System;
class Program
{
    static void Main()
    {
        int d = int.Parse(Console.ReadLine());
        for (int i = 0; i < d; i++)
        {
            string[] input = Console.ReadLine().Split(' ');
            int n = int.Parse(input[0]);
            int[] scores = new int[n];
            for (int j = 0; j < n; j++)
            {
                scores[j] = int.Parse(input[j + 1]);
            }
            int[] competitionRanks = GetCompetitionRanking(scores);
            int[] denseRanks = GetDenseRanking(scores);
            int benefitCount = 0;
            for (int j = 0; j < n; j++)
            {
                if (denseRanks[j] < competitionRanks[j])
                {
                    benefitCount++;
                }
            }
            Console.WriteLine(benefitCount);
        }
    }
    static int[] GetCompetitionRanking(int[] scores)
    {
        int n = scores.Length;
        int[] sortedScores = new int[n];
        Array.Copy(scores, sortedScores, n);
        for (int i = 0; i < n - 1; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (sortedScores[i] < sortedScores[j])
                {
                    int temp = sortedScores[i];
                    sortedScores[i] = sortedScores[j];
                    sortedScores[j] = temp;
                }
            }
        }
        int[] ranks = new int[n];
        for (int i = 0; i < n; i++)
        {
            ranks[i] = 1;
            for (int j = 0; j < i; j++)
            {
                if (sortedScores[j] > sortedScores[i])
                {
                    ranks[i]++;
                }
            }
        }
        return ranks;
    }
    static int[] GetDenseRanking(int[] scores)
    {
        int n = scores.Length;
        int[] sortedScores = new int[n];
        Array.Copy(scores, sortedScores, n);
        for (int i = 0; i < n - 1; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (sortedScores[i] < sortedScores[j])
                {
                    int temp = sortedScores[i];
                    sortedScores[i] = sortedScores[j];
                    sortedScores[j] = temp;
                }
            }
        }
        int[] ranks = new int[n];
        ranks[0] = 1;
        for (int i = 1; i < n; i++)
        {
            if (sortedScores[i] == sortedScores[i - 1])
            {
                ranks[i] = ranks[i - 1];
            }
            else
            {
                ranks[i] = ranks[i - 1] + 1;
            }
        }
        return ranks;
    }
}