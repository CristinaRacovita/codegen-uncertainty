def generate_response(input_string):
    if input_string == "":
        return "not empty\n"
    response = ""
    for char in input_string:
        if char.isalpha():
            if char.islower():
                response += chr((ord(char) - ord('a') + 1) % 26 + ord('a'))
            else:
                response += chr((ord(char) - ord('A') + 1) % 26 + ord('A'))
        elif char.isdigit():
            response += str((int(char) + 1) % 10)
        else:
            response += char
    return response + "\n"
input_string = ""
for _ in range(11):  
    input_char = input()
    if input_char == '\n':
        break
    input_string += input_char
output = generate_response(input_string)
print(output)