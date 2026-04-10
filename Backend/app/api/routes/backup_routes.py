from fastapi import APIRouter , Request
from app.services.backup_service import get_dir_and_files_from_config ,backup_files ,saved_backups , apply_the_config , delete_a_backup_file
from app.core.validator import SelectedBackupFilesRequest
backup_router = APIRouter()

# Returns all the saved backup folders 
@backup_router.get('/')
def saved_backup_files():
    return saved_backups()

# all the files and folder in the .config directory
@backup_router.get('/files')
def get_dirs_and_files():
    return get_dir_and_files_from_config()

# backsUp the selected files into a new file
@backup_router.post('/')
def backup_selected_files(data:SelectedBackupFilesRequest):
    return backup_files(data)

# applies back the previous files into curretn .config
@backup_router.post('/apply')
def apply_backup_files(filename:str):
    
    return apply_the_config(filename)


# deletes the backup directories
@backup_router.delete('/')
def delete_backup(dirname:str):
    return delete_a_backup_file(dirname)