using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        string[] input = Console.ReadLine().Split(' ');
        int n = int.Parse(input[0]);
        int m = int.Parse(input[1]);
        Console.ReadLine();
        List<WeatherData> dataPoints = new List<WeatherData>();
        for (int i = 0; i < n; i++)
        {
            string[] line = Console.ReadLine().Split(' ');
            if (line.Length == 4)
            {
                double temperature = ParseDouble(line[0]);
                int windDirection = ParseInt(line[1]);
                double windSpeed = ParseDouble(line[2]);
                int humidity = ParseInt(line[3]);
                dataPoints.Add(new WeatherData(temperature, windDirection, windSpeed, humidity));
            }
            else
            {
                dataPoints.Add(new WeatherData(-1, -1, -1, -1));
            }
        }
        List<WeatherData> predictions = PredictWeather(dataPoints, m);
        foreach (var prediction in predictions)
        {
            Console.WriteLine($"{prediction.Temperature:F1} {prediction.WindDirection} {prediction.WindSpeed:F1} {prediction.Humidity}");
        }
    }
    static double ParseDouble(string value)
    {
        return value == "-" ? -1 : double.Parse(value);
    }
    static int ParseInt(string value)
    {
        return value == "-" ? -1 : int.Parse(value);
    }
}
class WeatherData
{
    public double Temperature { get; }
    public int WindDirection { get; }
    public double WindSpeed { get; }
    public int Humidity { get; }
    public WeatherData(double temperature, int windDirection, double windSpeed, int humidity)
    {
        Temperature = temperature;
        WindDirection = windDirection;
        WindSpeed = windSpeed;
        Humidity = humidity;
    }
}