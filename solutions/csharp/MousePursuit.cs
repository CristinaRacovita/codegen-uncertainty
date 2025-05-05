using System;
using System.Collections.Generic;
class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());
        List<Event> events = new List<Event>();
        for (int i = 0; i < n; i++)
        {
            string[] parts = Console.ReadLine().Split();
            Event e = new Event
            {
                Type = parts[0],
                Time = int.Parse(parts[1]),
                Cheese = int.Parse(parts[2]),
                Glory = int.Parse(parts[3])
            };
            events.Add(e);
        }
        int k = int.Parse(Console.ReadLine());
        events.Sort((a, b) => b.Time.CompareTo(a.Time));
        PriorityQueue<Event> pq = new PriorityQueue<Event>(new EventComparer());
        long totalCheese = 0;
        long totalGlory = 0;
        foreach (var e in events)
        {
            pq.Enqueue(e);
            totalCheese += e.Cheese;
            totalGlory += e.Glory;
            while (pq.Count > 0 && pq.Peek().Time + k < e.Time)
            {
                Event removedEvent = pq.Dequeue();
                totalCheese -= removedEvent.Cheese;
                totalGlory -= removedEvent.Glory;
            }
        }
        Console.WriteLine(totalCheese + " " + totalGlory);
    }
}
class Event
{
    public string Type { get; set; }
    public int Time { get; set; }
    public int Cheese { get; set; }
    public int Glory { get; set; }
}
class EventComparer : IComparer<Event>
{
    public int Compare(Event x, Event y)
    {
        return x.Time.CompareTo(y.Time);
    }
}
class PriorityQueue<T> where T : IComparable<T>
{
    private List<T> items = new List<T>();
    public void Enqueue(T item)
    {
        items.Add(item);
        int childIndex = items.Count - 1;
        while (childIndex > 0)
        {
            int parentIndex = (childIndex - 1) / 2;
            if (items[parentIndex].CompareTo(items[childIndex]) <= 0) break;
            Swap(parentIndex, childIndex);
            childIndex = parentIndex;
        }
    }
    public T Dequeue()
    {
        int lastIndex = items.Count - 1;
        T frontItem = items[0];
        items[0] = items[lastIndex];
        items.RemoveAt(lastIndex);
        RebuildHeap();
        return frontItem;
    }
    public T Peek()
    {
        return items[0];
    }
    public int Count
    {
        get { return items.Count; }
    }
    private void RebuildHeap()
    {
        int index = 0;
        while (index < items.Count / 2)
        {
            int leftChildIndex = index * 2 + 1;
            int rightChildIndex = index * 2 + 2;
            int smallerChild = leftChildIndex;
            if (rightChildIndex < items.Count && items[rightChildIndex].CompareTo(items[leftChildIndex]) < 0)
            {
                smallerChild = rightChildIndex;
            }
            if (items[index].CompareTo(items[smallerChild]) <= 0) break;
            Swap(index, smallerChild);
            index = smallerChild;
        }
    }
    private void Swap(int i, int j)
    {
        T temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
}