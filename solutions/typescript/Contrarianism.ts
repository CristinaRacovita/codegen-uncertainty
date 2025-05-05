python
def generate_response(input_string):
    if input_string == "":
        return "not empty"
    elif input_string == "not empty":
        return "empty"
    else:
        return "something else"
# Example usage
input_string = input().strip()
output_string = generate_response(input_string)
print(output_string)