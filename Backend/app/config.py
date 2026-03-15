import os
from pathlib import Path 

APP_NAME = "Omarchy Control"
VERSION = "0.1"

URL="http://0.0.0.0:8000" # current serving url
BASE_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
HOME_DIR = Path.home()
CONFIG_DIR = HOME_DIR / ".config" 
ASSETS_LINK= URL+"/store/assets"
BACKUP_CONFIG_DIR = "~/.config_backup"
