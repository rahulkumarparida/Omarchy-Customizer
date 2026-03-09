#  Harcoded file paths
import json
import os
from pathlib import Path
from app.config import CONFIG_DIR, BASE_DIR , HOME_DIR


# Gets the file path of the theme change script
theme_script_file = os.path.abspath((os.path.join(BASE_DIR,"scripts","theme_change.sh")))

#  Gets the file path of the JSON containing the theme details scraped.
filepath = os.path.abspath((os.path.join(BASE_DIR,"scraper","omarchy-theme-scraper","omarchy_dumps","omarchy_themes.json")))

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

FOLDER_PATHS = {
    "api" : Path(BASE_DIR / "api"),
    "core": Path(BASE_DIR / "core"),
    "scripts": Path(BASE_DIR / "scripts"),
    "scraper": Path(BASE_DIR / "scraper"),
    "store": Path(BASE_DIR / "store"),
    "services": Path(BASE_DIR / "services"),
    "utils": Path(BASE_DIR / "utils")
}


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
    },
    "waybar":{
        "dir" : CONFIG_DIR / "waybar" ,
        "temp_repo" : HOME_DIR / "temp_repo",
        "waybar_themes":WAYBAR_THEMES,
        "github_repo": "https://github.com/HANCORE-linux/waybar-themes.git",
    }
}


