from fastapi import APIRouter
from app.services.editor_services import get_file_path , save_edited_file , get_recent_file_paths
from app.core.validator import EditorGetFileRequest , EditorSaveFileRequest

editor_router = APIRouter()

@editor_router.get("/")
def get_recents():
    return get_recent_file_paths()

@editor_router.post("/")
def get_file_contents(data: EditorGetFileRequest):
    return get_file_path(data.path)

@editor_router.post("/save")
def save_file_content(data: EditorSaveFileRequest):
    return save_edited_file(data)