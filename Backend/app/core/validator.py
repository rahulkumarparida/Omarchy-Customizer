from pydantic import BaseModel


class WaybarColorConfigRequest(BaseModel):
    foreground: str
    background: str

class ThemeConfigRequest(BaseModel):
    theme_name: str