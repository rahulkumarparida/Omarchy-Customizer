import os
from pathlib import Path 

APP_NAME = "Omarchy Control"
VERSION = "0.1"

BASE_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
HOME_DIR = Path.home()
CONFIG_DIR = HOME_DIR / ".config" 

BACKUP_CONFIG_DIR = "~/.config_backup"
