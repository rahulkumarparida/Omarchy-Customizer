import os
import json
import shutil
from pathlib import Path
from app.config import ASSETS_LINK , BASE_DIR
from app.services.command_services import run_command
from app.core.config_map import FOLDER_PATHS , WALKER_THEMES , SETTINGS

github_url = "https://github.com/rahulkumarparida/Walker-themes.git"
pwd=f"{BASE_DIR}/scraper/walker_json_scraper"
script=pwd+"/clone_script.sh"
scraping_dirpath=Path(pwd+"/tmp-walker")
walker_assets = Path(FOLDER_PATHS['store']/ "assets" / "walker_images")
walker_json = Path(SETTINGS['walker']['file'])

# clones the repo to the provided folder
run_command(f"bash {script} {scraping_dirpath}")
print("start reading file")

# Makes url for the images path to access from frontend 
def make_url(filepath):
    parts = Path(*filepath.parts[-2:])
    print(parts)
    url = str(ASSETS_LINK+"/"+"walker_images"+"/"+str(parts))
    return url

# Creates the custom command for wach for the theme
def command_creator(git_url,dirname):
    cmd = f"git clone {git_url} /tmp/walker-repo && cp  /tmp/walker-repo/{dirname}/style.css  ~/.local/share/omarchy/default/walker/themes/omarchy-default/style.css  && rm -rf  /tmp/walker-repo && omarchy-restart-walker"
    return cmd

# stores the data to assetss/walker_images folder and return image url usin make_url
def asset_storer(current_img_location,dirname,file):
    #function will get the dirname and file and then copy the the file to the dirname inside the store returning the path of the copied store  

    
    assets_dir = Path(str(walker_assets)+"/"+dirname)
    assets_file = Path(str(assets_dir)+"/"+file)
    run_command(f'mkdir -p "{assets_dir}" && cp "{current_img_location}" "{assets_file}" ')
    
    return make_url(assets_file)
    
# Extracts image from the given directory -> then store it -> commad is created -> return a obj with all the data at once
def extract_img_files(dirname):
    img_list = []
    dir =Path(dirname)
    for i in dir.iterdir():
        if i.is_file() and i.suffix == ".png":
            print(i.name)
            # a function for copying to store
            file_loc=asset_storer(i,dir.name,i.name)
            img_list.append(file_loc)
    cmd = command_creator(github_url,dir.name)
    data = {
        "name":str(dir.name),
        "images":img_list,
        "command":cmd
    }
    return data

# writes the data to the json fil ekeep a {} in the given file before executing
def write_to_json_file(filepath,list_items):
    file = Path(filepath)
    data = {
        "gihublink": "https://github.com/rahulkumarparida/Walker-themes.git",
        "themes":list_items
    }
    with open(file,'w') as f:
        json.dump(data,f,indent=4)
    
        

# does everything starts executing everythin from this function return the created list
def walker_scraper_engine(dirPath):
    list_names = []
    id = 0
    for i in dirPath.iterdir():
        if i.is_dir() and i.name != '.git':
            id += 1
            image_list =extract_img_files(str(os.path.abspath(str(scraping_dirpath)+"/"+i.name))) # finds the absoulute path for the dir name and add itself and send to the image extractor
            image_list['id'] = id
            list_names.append(image_list) 
    write_to_json_file(walker_json,list_names)
    print("DONE")
    return list_names


 
# Only work for https://github.com/rahulkumarparida/Walker-themes.git this repository
walker_scraper_engine(scraping_dirpath)

# Once created the tmp-walker is deleted
run_command(f'rm -rf {scraping_dirpath}')
