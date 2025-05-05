using System;
class Program
{
    static int N;
    static int[,] fridayPreferences;
    static int[,] saturdayPreferences;
    static int[] fridayAssignments;
    static int[] saturdayAssignments;
    static int maxHappiness = 0;
    static void Main()
    {
        N = int.Parse(Console.ReadLine());
        fridayPreferences = new int[N, N];
        saturdayPreferences = new int[N, N];
        fridayAssignments = new int[N];
        saturdayAssignments = new int[N];
        for (int i = 0; i < N; i++)
        {
            string[] fridayLine = Console.ReadLine().Split();
            for (int j = 0; j < N; j++)
            {
                fridayPreferences[i, j] = int.Parse(fridayLine[j]);
            }
        }
        for (int i = 0; i < N; i++)
        {
            string[] saturdayLine = Console.ReadLine().Split();
            for (int j = 0; j < N; j++)
            {
                saturdayPreferences[i, j] = int.Parse(saturdayLine[j]);
            }
        }
        Backtrack(0, 0, 0);
        Console.WriteLine(maxHappiness);
    }
    static void Backtrack(int employeeIndex, int fridayCount, int currentHappiness)
    {
        if (employeeIndex == N)
        {
            if (fridayCount == N / 2)
            {
                maxHappiness = Math.Max(maxHappiness, currentHappiness);
            }
            return;
        }
        for (int club = 0; club < N; club++)
        {
            if (fridayAssignments[club] == 0)
            {
                fridayAssignments[club] = 1;
                Backtrack(employeeIndex + 1, fridayCount + 1, currentHappiness + fridayPreferences[employeeIndex, club]);
                fridayAssignments[club] = 0;
            }
        }
        for (int club = 0; club < N; club++)
        {
            if (saturdayAssignments[club] == 0)
            {
                saturdayAssignments[club] = 1;
                Backtrack(employeeIndex + 1, fridayCount, currentHappiness + saturdayPreferences[employeeIndex, club]);
                saturdayAssignments[club] = 0;
            }
        }
    }
}