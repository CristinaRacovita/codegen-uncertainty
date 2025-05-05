using System;
class Program
{
    static void Main()
    {
        string input = Console.ReadLine();
        string output = GenerateDifferentString(input);
        Console.WriteLine(output);
    }
    static string GenerateDifferentString(string input)
    {
        if (string.IsNullOrEmpty(input))
        {
            return "anything";
        }
        char[] outputChars = new char[input.Length];
        for (int i = 0; i < input.Length; i++)
        {
            char c = input[i];
            if (char.IsLetter(c))
            {
                outputChars[i] = char.IsUpper(c) ? char.ToLower(c) : char.ToUpper(c);
                outputChars[i] = (char)(outputChars[i] + 1);
            }
            else if (char.IsDigit(c))
            {
                outputChars[i] = (char)((c - '0' + 1) % 10 + '0');
            }
            else
            {
                outputChars[i] = '*';
            }
        }
        return new string(outputChars);
    }
}