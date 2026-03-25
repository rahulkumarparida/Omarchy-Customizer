import os 
import json
import re
import shutil
from pathlib import Path
from app.core.config_map import SETTINGS , FOLDER_PATHS , CONFIG_DIR , HOME_DIR
from app.core.validator import FastFetchConfigRequest
from app.services.command_services import run_command

def filetoJson(filepath):
    print("This is the filepath",filepath)
    if not filepath or not os.path.exists(filepath):
        return
    with open(filepath,'r') as f:
        data = json.load(f)
    return data


def get_fastfetch_theme_details():
    
    fastfetch_data_json = filetoJson(SETTINGS["fast_fetch"]["fastfetch_dir_maintainer"])
    fastfetch_logodata_json = filetoJson(SETTINGS["fast_fetch"]["fastfetch_logo_dir_maintainer"])
    data = {
        "credits_to":"rahulkumarparida",
        "follow":"https://github.com/rahulkumarparida",
        "collection_name":"fastfetch collection",
        "fastfetch_data":fastfetch_data_json,
        "fastfetch_logo_data":fastfetch_logodata_json,
    }
    return data




def strip_jsonc_comments(text):
    # Remove // comments
    text = re.sub(r'//.*', '', text)
    # Remove /* */ comments
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    return text

def update_config_file_for_logo_source(filepath, logo):
    new_source = f"~/.config/fastfetch/{logo}.txt"

    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            raw = f.read()
            clean = strip_jsonc_comments(raw)
            try:
                config = json.loads(clean)
            except json.JSONDecodeError:
                raise ValueError("Invalid JSON/JSONC structure")
    else:
        config = {}

    if "logo" not in config or not isinstance(config["logo"], dict):
        config["logo"] = {
            "type": "auto",
            "source": new_source,
            "padding": {"top": 2}
        }
    else:
        logo_obj = config["logo"]
        logo_obj["source"] = new_source

        if "type" not in logo_obj:
            logo_obj["type"] = "auto"
        if "padding" not in logo_obj:
            logo_obj["padding"] = {"top": 2}

    with open(filepath, "w") as f:
        json.dump(config, f, indent=2)

    return True





def change_fastfetch_config(data: FastFetchConfigRequest):
    
    config_name = data.config_name 
    config_file = data.config_file 
    logo_name  = data.logo_name 
    logo_file = data.logo_file 
    github_url = "https://github.com/rahulkumarparida/Omarchy-fastfetch.git"

    if config_name and config_file:
        return {"error":"either select theme name or provide a file not both at once"}
    
    if logo_name and logo_file:
        return {"error":"either select logo name or provide a file not both at once"}

    # will generate the .config/fastfetch folder containing config.jsonc
    script  = FOLDER_PATHS["scripts"] / "generate_fastfetch.sh"
    cmd = run_command(f'bash {script}')
    if cmd.returncode != 0:
        return {"status":"error","message":"Failed to generate Fastfetch config","details":cmd.stderr}
    
    
    # Now we have to manually write all the conditions for which ever could be possible for each of the data that came.
    fastfetch_maintainer = SETTINGS["fast_fetch"]["fastfetch_dir_maintainer"]
    fastfetch_config_file = SETTINGS["fast_fetch"]["file"]
    fastfetch_dir = HOME_DIR / ".config" / "fastfetch"


    with open(fastfetch_maintainer, "r") as f:
        config_list = json.load(f)
        

    if len(config_list) <= 0:
        return {"error":"list not found or is empty"}



#  this will add the new file to the folder and then to jsonc
    if config_file:
        file_name = Path(config_file)

        if file_name.suffix != ".jsonc":
            return {"error": "file must be of .jsonc format and according to fastfetch schema format"}
        
        user_config_file_path = Path(SETTINGS["fast_fetch"]["fastfetch_theme_dir"] / "fastfetch_configs" / "user" / config_file.filename)

        with open(user_config_file_path , "wb") as f:
            shutil.copyfileobj(config_file.file , f)

        result = run_command(f"cp -f {user_config_file_path} {fastfetch_config_file}")

        if result.returncode != 0:
            return {"error":"some error occurred while copying the files to the config.jsonc file"}
        
        


#  Will only work for theme avaliable in our local files 
    if config_name:
        config_metadata = None
        for config in config_list["theme_data"]:
            if config["name"].lower() == config_name.lower():
                config_metadata = config
                break
                
        if config_metadata is None:
            return {"error":"requested theme not found in the directories"}
        
        # config_theme_dir =SETTINGS["fast_fetch"]["fastfetch_theme_dir"]
        # config_theme = config_theme_dir / config_metadata["path"]
        print(config_metadata)
        result = run_command(config_metadata["command"])

        if result.returncode != 0:
            return {"error":"some error occurred while copying the files to the config.jsonc file"}
        
        
        
#  for logo file
    logo_json =SETTINGS["fast_fetch"]["fastfetch_logo_dir_maintainer"]

    if logo_file:
        logo_file_t = Path(logo_file)

        if logo_file_t.suffix != ".txt":
            return {"error": "logo must be of txt format use ASCII values to create a logo"}
        
        # logo_file_t.filename and .file

        user_logo_file = Path(SETTINGS['fast_fetch']['fastfetch_logo_dir'] / "user" / logo_file.filename)
        with open(user_logo_file , 'wb') as f:
            shutil.copyfileobj(logo_file.file , f)  
        fastfetch_logo_file = CONFIG_DIR / "fastfetch" /  logo_file.filename

           
        result = run_command(f"cp -f {user_logo_file} {fastfetch_logo_file}")

        if result.returncode != 0:
            return {"error": "some error occured while copying the files"}
        
        update_config_file_for_logo_source(fastfetch_dir , logo_file.filename)

        

# for logo name
    if logo_name:
        
        with open(logo_json, "r") as f:
            logo_list = json.load(f)
        
        if len(logo_list) <= 0:
            return {"message":"the logo list is empty"}

        for logo in logo_list["theme_data"]:
            if logo["name"].lower() == logo_name.lower():
                logo_data = logo
                break
        
        if not logo_data:
            return {"message":"no such logo found"}
        # logo_filepath = SETTINGS["fast_fetch"]["fastfetch_theme_dir"] / ""
        tmp_dir = HOME_DIR / "tmp" / "fastfetch_repo" 
        tmp_dir.mkdir(parents=True, exist_ok=True)
        result = run_command(f'git clone "{github_url}" "{tmp_dir}" && cp "{tmp_dir}/"logo"/{logo_name}/{logo_name}.txt"  "{CONFIG_DIR}/fastfetch/" && rm -rf "{tmp_dir}"')
        # file_to_change = CONFIG_DIR / "fastfetch" / "logo.txt"
        if result.returncode != 0:
            return {"error":"some error while running copy"}
        

        # result = run_command(f"cp -f {logo_filepath} {file_to_change}")
        update_config_file_for_logo_source(fastfetch_config_file,logo_name) 
        
        
        
    
    
    return {"message":"sucessfully changed the fastfetch theme style"}
    

        
        







        


        
    


