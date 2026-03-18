import os
import json
from pathlib import Path

# First we will get the file that we require

maintainer_json = os.path.join(os.getcwd(),"fastfetch_data.json")
configs_directory_path = Path("./fastfetch_configs")


id = 0
json_file = []



for file in configs_directory_path.glob("*.jsonc"): 
    print(f"Processing file: {str(file)}")
    id += 1
    
    data = {
        "id": id,
        "name": str(file).strip('.jsonc').split('/')[-1],
        "path": str(file),
        "img_options":["arch"]
    }
    with open(maintainer_json, 'r') as f:
        json_data = json.load(f)
        json_data.append(data)
    with open(maintainer_json, 'w') as f:
        json.dump(json_data, f,indent=4)

#  only for the config file maintainenece
