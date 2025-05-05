def min_steps_to_uniform_color(t, test_cases):
    def bfs(start, grid, n, m):
        from collections import deque
        queue = deque([start])
        visited = set()
        visited.add(start)
        component = []
        while queue:
            x, y = queue.popleft()
            component.append((x, y))
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == grid[x][y] and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    queue.append((nx, ny))
        return component
    results = []
    for case in test_cases:
        n, m = case[0], case[1]
        grid = case[2:]
        components = {}
        visited = set()
        for i in range(n):
            for j in range(m):
                if (i, j) not in visited:
                    color = grid[i][j]
                    component = bfs((i, j), grid, n, m)
                    if color not in components:
                        components[color] = []
                    components[color].append(component)
                    for cell in component:
                        visited.add(cell)
        min_steps = float('inf')
        total_cells = n * m
        for color, comp_list in components.items():
            if len(comp_list) == 1:
                continue  
            steps = 0
            for comp in comp_list:
                steps += len(comp)
            other_steps = 0
            for other_color, other_comp_list in components.items():
                if other_color != color:
                    for other_comp in other_comp_list:
                        other_steps += len(other_comp)
            total_steps = steps + other_steps
            min_steps = min(min_steps, total_steps)
        results.append(min_steps)
    return results
t = 4
test_cases = [
    [(1, 1), [1]],
    [(3, 3), [1, 2, 1], [2, 3, 2], [1, 3, 1]],
    [(1, 6), [5, 4, 5, 4, 4, 5]],
    [(3, 4), [1, 4, 2, 2], [1, 4, 3, 5], [6, 6, 3, 5]]
]
print(min_steps_to_uniform_color(t, test_cases))