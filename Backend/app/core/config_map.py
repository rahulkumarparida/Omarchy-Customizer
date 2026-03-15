#  Harcoded file paths
import json
import os
from pathlib import Path
from app.config import CONFIG_DIR, BASE_DIR , HOME_DIR


# Gets the file path of the theme change script
theme_script_file = os.path.abspath((os.path.join(BASE_DIR,"scripts","theme_change.sh")))

#  Gets the file path of the JSON containing the theme details scraped.
filepath = os.path.abspath((os.path.join(BASE_DIR,"store","omarchy-themes","omarchy_themes.json")))

if filepath and os.path.exists(filepath):
    with open(filepath, 'r') as f:
        THEMES = json.load(f)
else:
    THEMES = []

# Gets the file containf the JSON for waybar theme data
waybar_filepath = BASE_DIR / "store" / "waybar" / "waybar_theme.json"
if waybar_filepath and os.path.exists(waybar_filepath):
    with open(waybar_filepath,'r') as f:
        WAYBAR_THEMES = json.load(f)
else:
    WAYBAR_THEMES = []


# Gets the hyprlock file containg the JSON of the hyprlock theme
hyprlock_filepath = BASE_DIR / "store" / "hyprlock" / "hyprlock_themes.json"
if hyprlock_filepath and os.path.exists(hyprlock_filepath):
    with open(hyprlock_filepath, 'r') as f:
        HYPRLOCK_THEMES = json.load(f)
else:
    HYPRLOCK_THEMES = []


# Gets the walker file containing the JSON for walker
walker_filepath = BASE_DIR / "store" / "walker" / "walker_theme.json"
if walker_filepath and os.path.exists(walker_filepath):
    with open(walker_filepath , 'r') as f:
        WALKER_THEMES = json.load(f)
else:
    WALKER_THEMES = {}


FOLDER_PATHS = {
    "api" : Path(BASE_DIR / "api"),
    "core": Path(BASE_DIR / "core"),
    "scripts": Path(BASE_DIR / "scripts"),
    "scraper": Path(BASE_DIR / "scraper"),
    "store": Path(BASE_DIR / "store"),
    "services": Path(BASE_DIR / "services"),
    "utils": Path(BASE_DIR / "utils")
}

CUSTOMIZER_LOCALS = HOME_DIR / ".customizer"
CUSTOMIZER_LOCALS.mkdir(parents=True, exist_ok=True)
USER_ASSET_STORE = CUSTOMIZER_LOCALS / "assets"
USER_ASSET_STORE.mkdir(parents=True,exist_ok=True)

SETTINGS={
    "waybar_theme":{
        "file":"~/.config/omarchy/current/theme/waybar.css",
        "foreground":"#ffffff",
        "background":"#000000",
        "reload":"killall waybar && waybar &"
    },
    "theme_change_script":{
        "file":theme_script_file,
    },
    "fast_fetch":{
        "file": CONFIG_DIR / "fastfetch" / "config.jsonc",
        "fastfetch_theme_dir": BASE_DIR / "store" / "fastfetch",
        "fastfetch_logo_dir": BASE_DIR / "store" / "fastfetch" / "fastfetch_logos",
        "fastfetch_dir_maintainer": BASE_DIR / "store" / "fastfetch" / "fastfetch_data.json",
        "fastfetch_logo_dir_maintainer": BASE_DIR / "store" / "fastfetch" / "fastfetch_logo_data.json",
        "fastfetch_preview": "https://github.com/rahulkumarparida/Omarchy-Customizer/blob/main/Backend/app/store/assets/fastfetch_preview.png"
    },
    "waybar":{
        "dir" : CONFIG_DIR / "waybar" ,
        "temp_repo" : HOME_DIR / "temp_waybar_repo",
        "waybar_themes":WAYBAR_THEMES,
        "github_repo": "https://github.com/HANCORE-linux/waybar-themes.git",
    },
    "hyprlock":{
        "file":CONFIG_DIR / "hypr" / "hyprlock.conf",
        "asset_dir":USER_ASSET_STORE / "hyprlock",
        "default_img_file":CONFIG_DIR / "omarchy" / "current" / "background",
        "temp_repo":USER_ASSET_STORE / "temp_hyprlock_dir" ,
        "hyprlock_themes":HYPRLOCK_THEMES,
        "github_repo":"https://github.com/MrVivekRajan/Hyprlock-Styles"
    },
    "walker":{
        "file":"",
        "temp_repo":"",
        "walker_css":"",
        "walker_themes":WALKER_THEMES,
        "github_repo":"https://github.com/rahulkumarparida/Walker-themes.git"
    }
}


