import os
import json
from fastapi.responses import Response
from app.services.file_services import replace_line
from app.core.config_map import SETTINGS ,THEMES
from app.services.command_services import run_command
from app.core.validator import WaybarColorConfigRequest , ThemeConfigRequest , WaybarThemeConfigRequest
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
def change_waybar_theme(data: WaybarThemeConfigRequest):
    config_folder = SETTINGS["waybar"]["dir"]
    temp_dir = SETTINGS["waybar"]["temp_repo"]
    waybar_themes = SETTINGS["waybar"]["waybar_themes"]
    github_repo = SETTINGS["waybar"]["github_repo"]
    requested_theme_name = data.theme_name
    theme_data = None
    
    for theme in waybar_themes:
        if theme["theme_name"].lower() == requested_theme_name.lower():
            theme_data = theme
            break
    
    if theme_data is None:
        return {"error":"requested theme not found"}
    
    result = run_command(f"git clone {github_repo} {temp_dir} && cp -rf {temp_dir}/config/{theme_data["theme_name"]}/. {config_folder} && rm -rf {temp_dir} && omarchy-restart-waybar")

    if result.returncode != 0:
        return {"error":"some error occured while executing the command"}
    
    return {"message":"Waybar theme changed sucessfully."}




# Theme Change with omarchy-theme-install script
def find_theme_file_details(name):
    theme_data= None
    for theme in THEMES:
        if theme['title'].lower() == name.lower():
            theme_data = {
                "title":theme['title'],
                "github_repo":theme['github_repo']
             }
            break
            
    return theme_data

def change_theme(theme_config: ThemeConfigRequest):
    theme_name = theme_config.theme_name
    theme_detail = find_theme_file_details(theme_name)
    print(theme_detail)
    if not theme_detail or theme_detail["github_repo"] is None:
        return Response(content=json.dumps({"message": f"Theme {theme_name} not found"}), status_code=404)

    run_command(f'bash {SETTINGS["theme_change_script"]["file"]} "{theme_detail["title"]}" "{theme_detail["github_repo"]}"')

    return Response(content=json.dumps({"message": f"Theme changed to {theme_name} successfully"}), status_code=202)
