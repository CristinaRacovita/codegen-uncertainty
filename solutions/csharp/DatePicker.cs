using System;
class Program
{
    static void Main()
    {
        string[] availability = new string[7];
        for (int i = 0; i < 7; i++)
        {
            availability[i] = Console.ReadLine();
        }
        string[] dh = Console.ReadLine().Split(' ');
        int d = int.Parse(dh[0]);
        int h = int.Parse(dh[1]);
        int[] dayAvailability = new int[7];
        int[] hourAvailability = new int[24];
        for (int i = 0; i < 7; i++)
        {
            for (int j = 0; j < 24; j++)
            {
                if (availability[i][j] == '.')
                {
                    dayAvailability[i]++;
                    hourAvailability[j]++;
                }
            }
        }
        Array.Sort(dayAvailability);
        Array.Sort(hourAvailability);
        int[] selectedDays = new int[d];
        int[] selectedHours = new int[h];
        for (int i = 0; i < d; i++)
        {
            selectedDays[i] = dayAvailability[6 - i]; 
        }
        for (int i = 0; i < h; i++)
        {
            selectedHours[i] = hourAvailability[23 - i]; 
        }
        int totalPossibleMeetings = d * h;
        int freeMeetings = 0;
        for (int i = 0; i < d; i++)
        {
            for (int j = 0; j < h; j++)
            {
                if (availability[selectedDays[i]][selectedHours[j]] == '.')
                {
                    freeMeetings++;
                }
            }
        }
        double probability = (double)freeMeetings / totalPossibleMeetings;
        Console.WriteLine(probability);
    }
}