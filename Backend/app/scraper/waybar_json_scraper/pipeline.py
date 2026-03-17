import os
import json
import re
from pathlib import Path
from app.services.command_services import run_command
from app.core.config_map import WAYBAR_THEMES , BASE_DIR , SETTINGS

# Start with cloning and adding it to a temp repo
# This is the Example of JSON data to be stored
# {
#     "id": 3,
#     "theme_name": "V1.2",
#     "theme_cmd": "git clone https://github.com/HANCORE-linux/waybar-themes.git /tmp/repo && cp -rf /tmp/repo/config/V1.2/. ~/.config/waybar && rm -rf /tmp/repo && omarchy-restart-waybar",
#     "theme_image": "https://github.com/user-attachments/assets/8e3e26d5-9929-496a-96f9-79b2efc92c32"
# }

# Iterate through all the files and list all the names store them in list
# create the json and add a list and then store the file in store area
# LINK : https://github.com/HANCORE-linux/waybar-themes.git

temp_dir = Path(BASE_DIR / 'scraper' / 'waybar_json_scraper' / 'temp')
config_dir = Path(temp_dir / "config")
readme_file = Path(temp_dir / 'README.md')
json_file_location = SETTINGS['waybar']['waybar_file_path']

def read_lines(file):
    lines = None
    with open(file,'r') as f:
        lines = f.readlines()
    return lines

def src_find(lines , id):
    pattern = r'src="(.*?)"'
    src_url = re.findall(pattern,lines)
    
    data = {
        "id":id,
        "src_url":src_url
    }
    return data
    

def extract_image_link(file):
    img_list = []
    lines_read = read_lines(file)
    id = 0
    for i , line in enumerate(lines_read):
        if "<img" in line.strip():
            id += 1
            print("index:",i,"img:",line)
            link_obj = src_find(line ,id)
            img_list.append(link_obj)
    print(img_list)
    return img_list
            

def create_data_object(filename , id):
    data =  {
     "id": id,
     "theme_name": filename,
     "theme_cmd": f"git clone https://github.com/HANCORE-linux/waybar-themes.git /tmp/repo && cp -rf /tmp/repo/config/{filename}/. ~/.config/waybar && rm -rf /tmp/repo && omarchy-restart-waybar"
}
    return data

def get_list_names(dirpath):
    config_directory = Path(dirpath)
    dir_list = []
    id = 1
    for dir in config_directory.iterdir():
        if dir.name != "test":
            print("listing: ",dir.name)
            obj = create_data_object(dir.name,id)
            id+=1
            dir_list.append(obj)
    return dir_list


def write_to_waybar_json(filepath,data):
    with open(Path(filepath), 'w') as f:
        json.dump(data,f,indent=4)
    return {"message":"write to file done"}

def waybar_json_pipeline():

    cloning = run_command(f'git clone https://github.com/HANCORE-linux/waybar-themes.git "{temp_dir}"')
    if cloning.returncode != 0:
        return {"error":"some error occurred while cloning the repository"}
    
    dir_names = get_list_names(config_dir)
    print("dirnames length:",len(dir_names))
    
    if len(dir_names) <= 0:
        return {"error":"error while listing files"}
    
    image_list = extract_image_link(readme_file)
    print("imageing length:",len(image_list))
    if len(image_list) <= 0:
        return {"error":"error while listing image obj"}
    

    if len(image_list) == len(dir_names):
        for image_obj in image_list:
            for dir_name in dir_names:
                if image_obj['id'] == dir_name['id']:
                    print("imaging: ",dir_name['theme_name'])
                    dir_name['image_link'] = image_obj['src_url'][0]
                    break
                
    write_to_waybar_json(json_file_location,dir_names)

    run_command(f'rm -rf "{temp_dir}"')
    print({"message":"successfully done scraping and data writing"})
    return {"message":"successfully done scraping and data writing"}
    
    
waybar_json_pipeline()