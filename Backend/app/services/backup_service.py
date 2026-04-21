import os
import json
import random
import string
from pathlib import Path
from datetime import datetime
from app.core.config_map import SETTINGS , BASE_DIR , HOME_DIR , CONFIG_DIR , FOLDER_PATHS
from app.core.validator import SelectedBackupFilesRequest
from app.services.command_services import run_command

backup_store = Path(SETTINGS['backups']['store_path'])
backup_store.mkdir(parents=True,exist_ok=True)
selected_backup_items_file = Path(SETTINGS['backups']['selected_items_files'])
omarchy_reload = Path(FOLDER_PATHS['scripts'] / 'reload_omarchy.sh')

items_in_backup = [i.name for i in backup_store.iterdir()]

# Gets all the files avaliable in .config directory
def get_dir_and_files_from_config():
    config_path = Path(CONFIG_DIR)
    items_list=[]
    id = 0
    for items in config_path.iterdir():
        id +=1
        data = {
            'id':id,
            'item_name':items.name
        }
        items_list.append(data)
        
    return {'message':'successfully fetched files and dirs','data':items_list}


# Saves the selected data along with the fielname (for easy access)
def selected_files(data:SelectedBackupFilesRequest , filename):
    selected_data = {}
    if os.path.exists(selected_backup_items_file):
        with open(selected_backup_items_file,'r') as f:
            selected_data = json.load(f)
            
    print(data.__dict__)
    selected_data[filename]= data.__dict__
    
    with open(selected_backup_items_file , 'w') as f:
        json.dump(selected_data, f , indent=4)
    print("writing Done")
    return selected_data

# Copies to the .customizer dir
def copy_files(item , store_path):
    item_path = CONFIG_DIR / item 
    run_command(f'rsync -av --exclude=".git" "{item_path}" "{store_path}" ')
    

# creates a random filename
def create_filename():
    charac = ''.join(random.sample(string.ascii_letters, 2))
    num = random.randint(1, 50)
    file = f"config_backup_{charac}_{num}"
    print(file)
    return file

def backup_move_to_destintion(backup:Path,destination:Path):
    if not os.path.exists(backup) or not os.path.exists(destination):
        return {"error":"one of the paths doesn't exist please make sure both are avaliable"}
    time = str(datetime.now())
    name = f'Backup-{time}.zip'
    res = run_command(f"zip '{destination / name}' '{backup}'")
    
    if res.returncode != 0:
        return {'error':'Some error occured while compressing the file'}
    return {'msg':f'Check the {destination} for '}

# Backsup the files and folder upon one click
def backup_files(data: SelectedBackupFilesRequest):
    backup_store.mkdir(parents=True,exist_ok=True)
    filename = data.filename
    if not filename:
        filename = str(create_filename())   
    
    selected_data = selected_files(data,filename)
    print(selected_data)
    files = [i['item_name'] for i in selected_data[f'{filename}']['selected_items_list'] ]
    backup_file_name = backup_store / filename 
    backup_file_name.mkdir(parents=True,exist_ok=True)
    for i in files:
        copy_files(i , backup_file_name)
    
    print("done")
    common_folder_path = HOME_DIR / "Downloads"
    compressed = backup_move_to_destintion(backup_file_name,common_folder_path)
    return {'message':f"successfully created the backup of the current configs in : {filename}",'compress':compressed}

#  Will return all the backups dirs avaliable in the .customizer dir
def saved_backups():
    list_name = []
    if os.path.exists(backup_store):
        for i in backup_store.iterdir():
            if i.suffix != ".jsonc":
                list_name.append(i.name)
    
        return {'backups':list_name}
    return {'msg':'directory not found'}


# Applies back the backup file and fodlers to .config
def apply_the_config(filename:str):
    config_path = Path(CONFIG_DIR)
    if os.path.exists(backup_store):
        file = None
        for i in backup_store.iterdir():
            if i.name == filename:
                file = i
                break
        
        if not file:
            return {'msg':'the backup file not found'}
            
        res = run_command(f'rsync -av --delete --exclude=".git" {file}/*  {config_path}/  && hyprctl reload && omarchy-theme-bg-next')
        # rsync -av --exclude=".git" backup/ ~/.config/
        # reload = run_command(f'bash  {omarchy_reload}')
        
        if res.returncode != 0 :
            return {'error':'error while copying the file'}

        return {'mesage':'successfully copied the backed up files.'}
 
    return {'msg':'directory not found'}
    
# Deletes one of the backup files
def delete_a_backup_file(directory:str):
    if os.path.exists(backup_store) and os.path.exists(Path(backup_store / directory)):
        result = run_command(f'rm -rf "{backup_store}/{directory}" ')
        if result.returncode != 0:
            return {'error':'error while removing the directory'}
        
        # selected_backup_items_file 
        with open(selected_backup_items_file,'r') as f:
            selecteds_json = json.load(f)
        
        if not selecteds_json:
            return {'msg':'selected file does not exists'}
        
        selecteds_json.pop(directory)
        
        with open(selected_backup_items_file,'w') as f:
            json.dump(selecteds_json,f,indent=4)
        
        


        return {'msg':'directory successfully removed'}


    return {'msg':'directory not found'}