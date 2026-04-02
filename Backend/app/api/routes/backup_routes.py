from fastapi import APIRouter , Request
from app.services.backup_service import get_dir_and_files_from_config ,backup_files
from app.core.validator import SelectedBackupFilesRequest
backup_router = APIRouter()


@backup_router.get('/')
def get_dirs_and_files():
    return get_dir_and_files_from_config()

@backup_router.post('/')
def backup_selected_files(data:SelectedBackupFilesRequest):
    return backup_files(data)

