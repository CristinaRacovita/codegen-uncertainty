n = int(input())
h = int(input())
x = int(input())
m = int(input())
y = int(input())
rate_per_worker_per_hour = x / (n * h)
total_rate_m_workers = m * rate_per_worker_per_hour
time_required = y / total_rate_m_workers
print(f"{time_required:.16f}")