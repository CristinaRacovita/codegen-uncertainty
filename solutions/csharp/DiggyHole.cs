using System;
class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        int h = int.Parse(Console.ReadLine());
        int x = int.Parse(Console.ReadLine());
        int m = int.Parse(Console.ReadLine());
        int y = int.Parse(Console.ReadLine());
        double workRatePerWorkerPerHour = (double)x / (h * n);
        double combinedRateOfMWorkers = m * workRatePerWorkerPerHour;
        double timeRequired = y / combinedRateOfMWorkers;
        Console.WriteLine(timeRequired);
    }
}