import os
import json
from pathlib import Path
from app.core.config_map import SETTINGS , BASE_DIR , HOME_DIR , CONFIG_DIR
from app.core.validator import SelectedBackupFilesRequest
from app.services.command_services import run_command

backup_store = Path(SETTINGS['backups']['store_path'])
backup_store.mkdir(parents=True,exist_ok=True)
selected_backup_items_file = Path(SETTINGS['backups']['selected_items_files'])


items_in_backup = [i.name for i in backup_store.iterdir()]


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
        
    return {'message':'successfull fetched files and dirs','data':items_list}

def selected_files(data:SelectedBackupFilesRequest):
    
    with open(selected_backup_items_file , 'w') as f:
        json.dump(data.selected_items_list, f , indent=True)
    print("writing Done")
    return data.selected_items_list


def copy_files(item , store_path):
    item_path = CONFIG_DIR / item 
    run_command(f'cp -r "{item_path}" "{store_path}" ')

def create_filename():
    num = len(items_in_backup)
    file = f"config_backup_{num}"
    return file

def backup_files(data: SelectedBackupFilesRequest):
    backup_store.mkdir(parents=True,exist_ok=True)
    selected_data = selected_files(data)

    files = [i['item_name'] for i in selected_data ]
    filename = str(create_filename())
    backup_file_name = backup_store / filename 
    backup_file_name.mkdir(parents=True,exist_ok=True)
    for i in files:
        copy_files(i , backup_file_name)
    print(files)
    print("done")
    return 




# backup_files()