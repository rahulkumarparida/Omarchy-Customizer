from fastapi import APIRouter , Request
from app.services.backup_service import get_dir_and_files_from_config ,backup_files ,saved_backups , apply_the_config
from app.core.validator import SelectedBackupFilesRequest
backup_router = APIRouter()

@backup_router.get('/')
def saved_backup_files():
    return saved_backups()


@backup_router.post('/')
def backup_selected_files(data:SelectedBackupFilesRequest):
    return backup_files(data)



@backup_router.get('/files')
def get_dirs_and_files():
    return get_dir_and_files_from_config()


@backup_router.post('/apply')
def apply_backup_files(filename:str):
    
    return apply_the_config(filename)