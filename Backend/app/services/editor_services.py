import os
import json
from pathlib import Path
from datetime import datetime    
from app.core.config_map import SETTINGS
from app.core.validator import EditorSaveFileRequest

store_path = Path(SETTINGS['editor']['store_path'])
edit_log_file = Path(SETTINGS['editor']['edited_logs'])
recently_visited_file = Path(SETTINGS['editor']['recently_visited'])

def read_default(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()


'''
# Will save only the just-previous file content of the particular file , keeps the conetents of all the rpevoius file just in case of backups. Max last 10 files will be saved if exceeds the oldest one will be deleted.

{
 all_edited_files: ['file1','file2','file3','file4','file5','file6'],
 'file1':{
     updated_at:"time",
     previous_content:"",
 },
 ...
    
}
'''
 
def create_obj(contents):
    print(datetime.now())
    data_obj = {
        'updated_at':datetime.now().isoformat(),
        'previous_content':contents,
    }    
    return data_obj


def recent_history(path):
    if not os.path.exists(path):
        return {"error": "Path does not exist"}
    
    if not os.path.exists(recently_visited_file):
        recents =[]
    else:
        with open(recently_visited_file,'r') as f:
            recents = json.load(f)
    
    if len(recents) >= 10:
        recents.pop(0)
        
    
    if path not in recents:
        recents.append(path)
    
    
    
    with open(recently_visited_file,'w') as f:
        json.dump(recents,f,indent=4)
    
    
    return recents

def get_recent_file_paths():
    if not os.path.exists(recently_visited_file):
        recents =[]
    else:
        with open(recently_visited_file,'r') as f:
            recents = json.load(f)
    return recents
          
        
def get_file_path(input_path):
    response = {
        "type": None,
        "content": None,
        "history":None
    }

    if not os.path.exists(input_path):
        return {"error": "Path does not exist"}

    history = recent_history(input_path)

    if os.path.isfile(input_path):
        response["type"] = "file"

        try:
            content = read_default(input_path)
        except Exception as e:
            content = f"Error reading file: {str(e)}"

        response["content"] = content

    elif os.path.isdir(input_path):
        response["type"] = "folder"
        
        # iterate the dir and get all the file and folder name
        
        dir_files = []
        for files in Path(input_path).iterdir():
            data = {
                'name':files.name,
                'path':files
            }
            dir_files.append(data)
        
        response["content"] = dir_files 
        
        
    response['history'] = history
    
    return response



def save_backup_path(path): 
    if not os.path.exists(edit_log_file): 
        json_file={
            'all_edited_files':[]
        }
    else:
        with open(edit_log_file,'r') as f:
            log_file = json.load(f)
        json_file= log_file
                  
    if not os.path.exists(path):
        return {"error":"path does not exist."}
    with open(path,"r") as f:
        data = f.read()
    
    data_obj = create_obj(data)
     
       
    json_file['all_edited_files'].append(str(path))
    json_file[str(path)] = data_obj 
    
    with open(edit_log_file,'w') as f:
        json.dump(json_file,f,indent=4)
    
  
def save_edited_file(data:EditorSaveFileRequest):
    path = Path(data.path)
    content = data.contents
    
    if not os.path.exists(path):
        return {"error":"no such file path found"}
    
    save_backup_path(path)
    
        
    with open(path,'w') as f:
        f.write(content)
    
    return {"msg":"file successfully updated"}
        

