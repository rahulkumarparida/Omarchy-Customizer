import os
import json
from pathlib import Path
from app.services.command_services import run_command
from app.core.config_map import SETTINGS , HOME_DIR , BASE_DIR , ASSETS_LINK


github_url ='https://github.com/rahulkumarparida/Omarchy-fastfetch.git'
fast_fetch_store_path = Path(SETTINGS['fast_fetch']['fastfetch_theme_dir'])
pwd=f"{BASE_DIR}/scraper/fastfetch_json_scraper"
temp_dir = Path(str(pwd+"/tmp_fastfetch"))
fastfetch_assets = Path(BASE_DIR / 'store' / 'assets' / 'fast_fetch_images')
fastfetch_config_json = Path(SETTINGS['fast_fetch']['fastfetch_dir_maintainer'])
fastfetch_logo_json = Path(SETTINGS['fast_fetch']['fastfetch_logo_dir_maintainer'])

#after clone the repo 
# divide the config and logo    
config_dir = Path(str(temp_dir)+"/config")
logo_dir = Path(str(temp_dir)+"/logo")
readme_file = Path(str(temp_dir)+"/README.md")

# scan each file
# follow similar approach like walker


# creates the assets file URL to access from the frontend
def make_url(filepath,dir):
    parts = Path(*filepath.parts[-2:])
    # print('url:',parts)
    url = str(ASSETS_LINK+"/"+"fast_fetch_images"+"/"+f"{dir}"+"/"+str(parts))
    return url

# Stores the images to its specific dir
def asset_storer(current_img_location,dirname,dir,file):
    #function will get the dirname and file and then copy the the file to the dirname inside the store returning the path of the copied store  
    assets_dir = Path(str(fastfetch_assets)+"/"+f"{dir}"+"/"+dirname)
    assets_file = Path(str(assets_dir)+"/"+file)
    run_command(f'mkdir -p "{assets_dir}" && cp "{current_img_location}" "{assets_file}" ')
    
    return assets_file

# extracts image from the directory
def extract_image_file(dirname,dir):
    image = ''
    direc = Path(dirname)
    for i in direc.iterdir():
        if i.is_file() and i.suffix == ".png":
            # print("Extracting image: ",i.name)
            file_loc = asset_storer(i,direc.name,dir,i.name)
            image = make_url(file_loc,dir)
            break
    return image

# Creates the final obj for te list
def create_obj(i,id,dir):
    image_link = extract_image_file(i,dir)
    data = {
            'id':id,
            'name':i.name,
            'txt' :'arch',
            "image_link":f'{image_link}',
            "type":dir
        }
    return data

# Manage Config Dir 
def fastfetch_config_manage(temp_dirpath):
    list_configs = []
    temp = Path(temp_dirpath)
    id = 0
    for i in temp.iterdir():
        if i.is_dir() and i.name != '.git':
            id +=1
            data = create_obj(i , id , "config")
            list_configs.append(data)
    
    print("List Configs: ",list_configs)
    return list_configs

# Manage Logo Dir
def fastfetch_logo_manage(temp_dirpath):
    list_logo = []
    temp = Path(temp_dirpath)
    id = 0
    for i in temp.iterdir():
        if i.is_dir() and i.name != '.git':
            id +=1
            data = create_obj(i , id , "logo")
            list_logo.append(data)
    
    print("List logo: ",list_logo)
    return list_logo

def write_to_json(filepath,data,dir):
    file = Path(filepath)
    
    data = {
        "themes_for":dir,
        "gihublink": github_url,
        "theme_data":data
    }
    with open(file,'w') as f:
        json.dump(data,f,indent=4)

def fast_fetch_pipeline():
    # clone the repo to the required path
    cloning = run_command(f'git clone "{github_url}" {temp_dir}')
    if cloning.returncode != 0:
        return {"error":"error while cloning the repository"}
    
    config_list = fastfetch_config_manage(config_dir)
    write_to_json(fastfetch_config_json,config_list,"config")
    logo_list = fastfetch_logo_manage(logo_dir)
    write_to_json(fastfetch_logo_json,logo_list,"logo")
    
    run_command(f'rm -rf {temp_dir}')
    print("done.")


fast_fetch_pipeline()