#  Harcoded file paths
import json
import os

# nvim .config/omarchy/branding/filename -- path to keep text file for omarchy and e.g. like fastfetch images 
# we will first try only to accept txt files and change them and once that is done we later try to use diffrent extension of images


# Present file path this file.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Gets the file path of the theme change script
theme_script_file = os.path.abspath((os.path.join(BASE_DIR,"..","scripts","theme_change.sh")))

SETTINGS={
    "waybar_theme":{
        "file":"~/.config/omarchy/current/theme/waybar.css",
        "foreground":"#ffffff",
        "background":"#000000",
        "reload":"killall waybar && waybar &"
    },
    "theme_change_script":{
        "file":theme_script_file,
    }
}


#  Gets the file path of the JSON containing the theme details scraped.
filepath = os.path.abspath((os.path.join(BASE_DIR,"..","scraper","omarchy-theme-scraper","omarchy_dumps","omarchy_themes.json")))
if filepath and os.path.exists(filepath):
    with open(filepath, 'r') as f:
        THEMES = json.load(f)
else:
    THEMES = []
