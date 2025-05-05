def minCost(grid):
    m, n = len(grid), len(grid[0])

    # Directions: right, left, down, up
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # Cost grid initialized with infinity
    cost_grid = [[float("inf")] * n for _ in range(m)]
    cost_grid[0][0] = 0

    # Priority queue to store (cost, i, j)
    pq = []
    pq.append((0, 0, 0))  # Start from (0, 0) with cost 0

    while pq:
        current_cost, i, j = pq.pop(0)

        # If we reach the bottom-right corner, return the cost
        if i == m - 1 and j == n - 1:
            return current_cost

        # Explore neighbors
        for k in range(4):
            di, dj = directions[k]
            ni, nj = i + di, j + dj

            # Check if the neighbor is within bounds
            if 0 <= ni < m and 0 <= nj < n:
                # Calculate the new cost
                new_cost = current_cost
                if grid[i][j] != k + 1:  # If the sign doesn't match the direction
                    new_cost += 1

                # Update the cost if the new cost is lower
                if new_cost < cost_grid[ni][nj]:
                    cost_grid[ni][nj] = new_cost
                    pq.append((new_cost, ni, nj))

    # If we exhaust the queue without reaching the end, return -1 (though the problem guarantees a path exists)
    return -1


# Example usage:
print(minCost([[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]]))  # Output: 3
print(minCost([[1, 1, 3], [3, 2, 2], [1, 1, 4]]))  # Output: 0
print(minCost([[1, 2], [4, 3]]))  # Output: 1
print(minCost([[2, 2, 2], [2, 2, 2]]))  # Output: 3
print(minCost([[4]]))  # Output: 0
