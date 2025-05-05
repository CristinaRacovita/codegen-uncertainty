using System;
class Program {
    static void Main(string[] args) {
        int n = Convert.ToInt32(Console.ReadLine());
        string[] words = new string[n];
        for (int i = 0; i < n; i++) {
            words[i] = Console.ReadLine();
        }
        for (int i = 0; i < n; i++) {
            if (words[i].Length > 10) {
                Console.Write(words[i][0]);
                Console.Write(words[i].Length - 2);
                Console.WriteLine(words[i][words[i].Length - 1]);
            } else {
                Console.WriteLine(words[i]);
            }
        }
    }
}