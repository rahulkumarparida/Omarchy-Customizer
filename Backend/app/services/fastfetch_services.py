import os 
import json
import shutil
from pathlib import Path
from app.core.config_map import SETTINGS , FOLDER_PATHS , CONFIG_DIR
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

def change_fastfetch_config(data: FastFetchConfigRequest):
    
    config_name = data.config_name 
    config_file = data.config_file 
    logo_name  = data.logo_name 
    logo_file = data.logo_file 

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
        for config in config_list:
            if config["name"].lower() == config_name.lower():
                config_metadata = config
                break
                
        if config_metadata is None:
            return {"error":"requested theme not found in the directories"}
        
        config_theme_dir =SETTINGS["fast_fetch"]["fastfetch_theme_dir"]
        config_theme = config_theme_dir / config_metadata["path"]
        print(config_theme)
        result = run_command(f"cp {config_theme} {fastfetch_config_file}")

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
        fastfetch_logo_file = CONFIG_DIR / "fastfetch" / "fastfetch_logos" / logo_file.filename

        result = run_command(f"cp -f {user_logo_file} {fastfetch_logo_file}")

        if result.returncode != 0:
            return {"error": "some error occured while copying the files"}
        

        

# for logo name
    if logo_name:
        
        with open(logo_json, "r") as f:
            logo_list = json.load(f)
        
        if len(logo_list) <= 0:
            return {"message":"the logo list is empty"}

        for logo in logo_list:
            if logo["name"].lower() == logo_name.lower():
                logo_data = logo
                break
        
        if not logo_data:
            return {"message":"no such logo found"}
        
        logo_filepath = SETTINGS["fast_fetch"]["fastfetch_theme_dir"] / logo_data["path"]
        file_to_change = CONFIG_DIR / "fastfetch" / "logo.txt"

        result = run_command(f"cp -f {logo_filepath} {file_to_change}")
        
        if result.returncode != 0:
            return {"error":"some error while running copy"}
        
    
    
    return {"message":"sucessfully changed the fastfetch theme style"}
    
        






        
        







        


        
    


