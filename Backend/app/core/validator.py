from typing import Optional
from fastapi import UploadFile, File
from pydantic import BaseModel


class WaybarColorConfigRequest(BaseModel):
    foreground: str
    background: str

class WaybarThemeConfigRequest(BaseModel):
    theme_name : int

class ThemeConfigRequest(BaseModel):
    theme_name: int


class FastFetchConfigRequest(BaseModel):
    config_name: Optional[str] = None
    config_file: Optional[UploadFile] = File(None)
    logo_name: Optional[str] = None
    logo_file: Optional[UploadFile] = File(None)


class HyprLockConfigRequest(BaseModel):
    theme_id:int
    background_img: Optional[UploadFile] = File(None)
    user_img: Optional[UploadFile] = File(None)