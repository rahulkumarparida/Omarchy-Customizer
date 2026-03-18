import os 
import json
from pathlib import Path

logo_maintainer = os.path.join(os.getcwd(),"fastfetch_logo_data.json")
logo_dir_path = Path("./fastfetch_logos")

id = 0
json_file = []

for file in logo_dir_path.glob("*"):
    print("Processing file: ", str(file))
    id +=1

    data = {
        "id":id,
        "name":str(file).strip(".txt").split('/')[1],
        "path": str(file)
    }
    with open(logo_maintainer, 'r') as f:
        
        json_file.append(data)
    
    with open(logo_maintainer, 'w') as f:
        json.dump(json_file , f , indent=4)

print("Process Done.")