using System;
class BreakoutGame {
    static void Main(string[] args) {
        string[] input = Console.ReadLine().Split(' ');
        int b = int.Parse(input[0]);
        int w = int.Parse(input[1]);
        int h = int.Parse(input[2]);
        char[,] wall = new char[h, w];
        for (int i = 0; i < h; i++) {
            for (int j = 0; j < w; j++) {
                wall[i, j] = 'x';
            }
        }
        for (int i = 0; i < b; i++) {
            input = Console.ReadLine().Split(' ');
            int t = int.Parse(input[0]);
            int p = int.Parse(input[1]);
            int d = int.Parse(input[2]);
            int bricksBounced = 0;
            while (t >= 0 && t < w) {
                bool destroyedBrick = false;
                for (int j = Math.Max(0, t - p); j <= Math.Min(w - 1, t + p); j++) {
                    if (wall[h - 1, j] == 'x') {
                        wall[h - 1, j] = ' ';
                        bricksBounced++;
                        destroyedBrick = true;
                    }
                }
                if (!destroyedBrick) {
                    break;
                }
                t += d;
                for (int col = 0; col < w; col++) {
                    int emptyRow = h - 1;
                    while (emptyRow >= 0 && wall[emptyRow, col] != ' ') {
                        emptyRow--;
                    }
                    if (emptyRow >= 0) {
                        for (int row = emptyRow - 1; row >= 0; row--) {
                            if (wall[row, col] != ' ') {
                                wall[row + 1, col] = wall[row, col];
                                wall[row, col] = ' ';
                            }
                        }
                    }
                }
            }
            Console.WriteLine(bricksBounced);
        }
    }
}