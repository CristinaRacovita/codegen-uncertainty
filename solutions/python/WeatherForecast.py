def parse_input():
    import sys
    input = sys.stdin.read().splitlines()
    n, m = map(int, input[0].split())
    extra_info = input[1]
    data = []
    for i in range(2, 2 + n):
        row = input[i].split()
        if row[0] != '-':
            row[0] = float(row[0])
        else:
            row[0] = None
        if row[1] != '-':
            row[1] = int(row[1])
        else:
            row[1] = None
        if row[2] != '-':
            row[2] = float(row[2])
        else:
            row[2] = None
        if row[3] != '-':
            row[3] = int(row[3])
        else:
            row[3] = None
        data.append(row)
    return n, m, extra_info, data
def calculate_moving_average(data, window_size):
    averages = []
    for i in range(len(data)):
        window = data[max(0, i - window_size + 1):i + 1]
        valid_values = [x for x in window if x is not None]
        if valid_values:
            averages.append(sum(valid_values) / len(valid_values))
        else:
            averages.append(None)
    return averages
def predict_weather(data, m):
    window_size = 24  
    temp_averages = calculate_moving_average([row[0] for row in data], window_size)
    wind_dir_averages = calculate_moving_average([row[1] for row in data], window_size)
    wind_speed_averages = calculate_moving_average([row[2] for row in data], window_size)
    humidity_averages = calculate_moving_average([row[3] for row in data], window_size)
    predictions = []
    for i in range(m):
        temp = temp_averages[-1] if temp_averages[-1] is not None else '-'
        wind_dir = wind_dir_averages[-1] if wind_dir_averages[-1] is not None else '-'
        wind_speed = wind_speed_averages[-1] if wind_speed_averages[-1] is not None else '-'
        humidity = humidity_averages[-1] if humidity_averages[-1] is not None else '-'
        predictions.append(f"{temp:.1f} {wind_dir} {wind_speed:.1f} {humidity}")
    return predictions
def main():
    n, m, extra_info, data = parse_input()
    predictions = predict_weather(data, m)
    for prediction in predictions:
        print(prediction)
if __name__ == "__main__":
    main()