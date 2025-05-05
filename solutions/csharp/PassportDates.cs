using System;
class Program
{
    static void Main()
    {
        string input = "08 OKT /OCT 24";
        string day = input.Substring(0, 2);
        string icelandicMonth = input.Substring(3, 3);
        string year = input.Substring(input.Length - 2, 2);
        int monthNumber = GetMonthNumber(icelandicMonth);
        string isoDate = $"20{year}-{monthNumber:D2}-{day:D2}";
        Console.WriteLine(isoDate);
    }
    static int GetMonthNumber(string icelandicMonth)
    {
        switch (icelandicMonth)
        {
            case "JAN": return 1;
            case "FEB": return 2;
            case "MAR": return 3;
            case "APR": return 4;
            case "MAÍ": return 5;
            case "JÚN": return 6;
            case "JÚL": return 7;
            case "ÁGÚ": return 8;
            case "SEP": return 9;
            case "OKT": return 10;
            case "NÓV": return 11;
            case "DES": return 12;
            default: throw new ArgumentException("Invalid month abbreviation");
        }
    }
}