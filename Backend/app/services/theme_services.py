import os
import json
import shutil
from fastapi.responses import Response
from app.services.file_services import replace_line
from app.core.config_map import SETTINGS ,THEMES , CONFIG_DIR , HOME_DIR
from app.services.command_services import run_command
from app.core.validator import WaybarColorConfigRequest , ThemeConfigRequest , WaybarThemeConfigRequest , HyprLockConfigRequest
from app.config import BACKUP_CONFIG_DIR
from fastapi import status



def backup_file(file_path):
    path = os.path.expanduser(file_path)
    print(f"backing up file from {path}")
    backup_path = os.path.expanduser(BACKUP_CONFIG_DIR)
    if not os.path.exists(backup_path):
        os.mkdir(backup_path)
    file_name = os.path.basename(path)
    backup_file_path = os.path.join(backup_path, file_name+".bak")
    with open(path, 'r') as original_file:
        content = original_file.read()    
    with open(backup_file_path, 'w') as backup_file:
        backup_file.write(content)


# Change waybar background color and foreground color   
def change_waybar_colors(config: WaybarColorConfigRequest):
    file = os.path.expanduser(SETTINGS['waybar_theme']['file'])
    print(f"file found at {file}, Starting backup")
    backup_file(file)
    
    var1 = replace_line(file,"foreground",f"@define-color foreground {config.foreground};")
    var2 =replace_line(file,"background",f"@define-color background {config.background};")
    if var1 and var2:
        run_command(SETTINGS['waybar_theme']['reload'])

        return Response(content=json.dumps({"message":"color theme updated successfully"}),status_code=200)
    
    return Response(content=json.dumps({"message":"failed to update theme"}),status_code=404)


# Change waybar theme
def get_waybar_theme_details(request):
    waybar_themes = SETTINGS["waybar"]["waybar_themes"]
    return {
        "message":"sucessfully fetched waybar themes",
        "requested_source":request.client,
        "waybar_themes": waybar_themes
    }


def change_waybar_theme(data: WaybarThemeConfigRequest):
    config_folder = SETTINGS["waybar"]["dir"]
    temp_dir = SETTINGS["waybar"]["temp_repo"]
    waybar_themes = SETTINGS["waybar"]["waybar_themes"]
    github_repo = SETTINGS["waybar"]["github_repo"]
    requested_theme_name = data.theme_name
    theme_data = None
    if data.theme_name > len(waybar_themes):
        return {"error":"requested theme not found"}
    
    for theme in waybar_themes:
        if theme["id"] == requested_theme_name:
            theme_data = theme
            break
    
    if theme_data is None:
        return {"error":"requested theme not found"}
    
    result = run_command(f"git clone {github_repo} {temp_dir} && cp -rf {temp_dir}/config/{theme_data["theme_name"]}/. {config_folder} && rm -rf {temp_dir} && omarchy-restart-waybar")

    if result.returncode != 0:
        return {"error":"some error occured while executing the command"}
    
    return {"message":"Waybar theme changed sucessfully."}




# Theme Change with omarchy-theme-install script
def find_theme_file_details(num):
    theme_data= None
    for theme in THEMES:
        if theme['id'] == num:
            theme_data = {
                "title":theme['title'],
                "github_repo":theme['github_repo']
             }
            break        
    return theme_data

def get_omarchy_theme_details(request):
    omarchy_themes = THEMES
    return {
        "message":"successfully fetched omarchy themes",
        "requested_source":request.client,
        "omarchy_themes":omarchy_themes
    }

def change_theme(theme_config: ThemeConfigRequest):
    theme_name = theme_config.theme_name
    if theme_name > len(THEMES):
        return Response(content=json.dumps({"message": f"Theme {theme_name} not found"}), status_code=404)
    
    theme_detail = find_theme_file_details(theme_name)  
    print(theme_detail)
    if not theme_detail or theme_detail["github_repo"] is None:
        return Response(content=json.dumps({"message": f"Theme {theme_name} not found"}), status_code=404)

    run_command(f'bash {SETTINGS["theme_change_script"]["file"]} "{theme_detail["title"]}" "{theme_detail["github_repo"]}"')

    return Response(content=json.dumps({"message": f"Theme changed to {theme_name} successfully"}), status_code=202)



# Change Hyprlock theme

def copy_image_files(file , tofilepath):
    with open(tofilepath, 'wb') as b:
        shutil.copyfileobj(file.file ,b)

def find_hyprlock_file_data(id,themes):
    data = None
    if id > len(themes):
        return {"error":"theme not found"}
    for theme in themes:
        if int(theme["id"]) == int(id):
            data = theme
    return data

def search_replace_images_path(conf_path, new_wallpaper, new_image):
    block = None
    
    with open(conf_path , 'r') as f:
        
        lines = f.readlines()

    for i , line in enumerate(lines):
        if "background {" in line.strip():
            block = "background"

        elif "image {" in line.strip():
           
            block = "image"

        elif "}" in line.strip():
            block = None
        
        if "path = " in line.strip():
            
            if block == "background":
                lines[i] = f"    path = {new_wallpaper}\n"

            elif block == "image":
                lines[i] = f"    path = {new_image}\n"
        
    with open(conf_path, "w") as f:
        f.writelines(lines)
        
    return 200


def get_hyprlock_theme_details(request):
    hyprlock_themes = SETTINGS["hyprlock"]["hyprlock_themes"]
    return {
        "message":"successfully fetched omarchy themes",
        "requested_source":request.client,
        "omarchy_themes":hyprlock_themes
    }


def change_hyprlock_theme(data:HyprLockConfigRequest):
    file = SETTINGS["hyprlock"]["file"]
    hyprlock_asset_dir = SETTINGS["hyprlock"]["asset_dir"]
    hyprlock_asset_dir.mkdir(parents=True, exist_ok=True)
    temp_repo = SETTINGS["hyprlock"]["temp_repo"]
    
    github_repo = SETTINGS["hyprlock"]["github_repo"]
    hyprlock_themes = SETTINGS["hyprlock"]["hyprlock_themes"]
    
    requested_theme_id = data.theme_id
    background_img = data.background_img
    profile_img = data.user_img
    

    if background_img:
        bg_file_path = hyprlock_asset_dir / background_img.filename 
        copy_image_files(background_img,bg_file_path)
    else:
        # Defaults in case user does not provide
        bg_file_path =SETTINGS["hyprlock"]["default_img_file"]

    if profile_img:
        profile_file_path = hyprlock_asset_dir / profile_img.filename

        copy_image_files(profile_img,profile_file_path)
    else:
        # Defaults in case user does not provide
        profile_file_path = SETTINGS["hyprlock"]["default_img_file"]


    theme_data = find_hyprlock_file_data(requested_theme_id , hyprlock_themes)

    if not theme_data:
        return theme_data
    
    result = run_command(f'git clone "{github_repo}" "{temp_repo}/"')

    if result.returncode != 0:
        return {"error": "error occurred while cloning the repository"}
    
    get_temp_theme = temp_repo / theme_data["name"] / "hyprlock.conf"

    if not os.path.exists(get_temp_theme):
        return {"error": "theme does not exist in the directory"}


    res = search_replace_images_path(get_temp_theme , bg_file_path , profile_file_path)
    print(res)
    result = run_command(f'cp {get_temp_theme} {file}')

    run_command(f'rm -rf {temp_repo}')
    if result.returncode != 0:
        return {"error":"error while copying the file to the hyprlock"}
    
    return {"message":"successfully changed hyprlock theme"}
    
