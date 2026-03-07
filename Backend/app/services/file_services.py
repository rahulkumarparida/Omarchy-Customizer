import os

def replace_line(file_path,keyword,new_line):
    print("replacing line")
    path = os.path.expanduser(file_path)
    lines = None
    with open(path, 'r') as file:
        lines = file.readlines()
        print(lines)
    print("line read successfully, starting replacement")
    with open(file_path, 'w') as file:
        # Loops through each line , seraches for it and changes or writes a new line if now avaliable
        for line in lines:
            print(lines)
            if keyword in line:
                file.write(new_line + '\n')
            else:
                file.write(line)
    print("line replaced")
    return True