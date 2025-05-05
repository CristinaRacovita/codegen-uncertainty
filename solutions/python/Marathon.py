def main():
    N, X, Y = map(int, input().split())
    H, S = map(int, input().split())
    refill_stations = [int(input()) for _ in range(N)]
    current_position = 0
    water_amount = X
    total_time = 0
    refill_stations.append(42195)
    for i in range(len(refill_stations)):
        next_station = refill_stations[i]
        distance_to_next = next_station - current_position
        max_run_distance = water_amount
        if max_run_distance >= distance_to_next:
            total_time += distance_to_next // H
            water_amount -= distance_to_next
        else:
            total_time += max_run_distance // H
            water_amount -= max_run_distance
            jogging_distance = distance_to_next - max_run_distance
            total_time += jogging_distance // S
            if i < N:
                water_amount = X
        current_position = next_station
    hours = total_time // 3600
    minutes = (total_time % 3600) // 60
    seconds = total_time % 60
    print(f"{hours:02}:{minutes:02}:{seconds:02}")
if __name__ == "__main__":
    main()