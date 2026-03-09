from fastapi import APIRouter
from app.services.theme_services import change_waybar_colors , change_theme , change_waybar_theme
from app.core.validator import WaybarColorConfigRequest , ThemeConfigRequest , WaybarThemeConfigRequest

theme_router = APIRouter()

def apply_theme(theme: str):
    
    print(f"Applying {theme} theme")

@theme_router.post("/waybar/colors")
def update_waybar_colors(config: WaybarColorConfigRequest):
    print("processing has started")
    return change_waybar_colors(config)

@theme_router.post("/waybar/change")
def change_waybar_themes(data: WaybarThemeConfigRequest):
    print("Waybar theme change processing has started")
    return change_waybar_theme(data)


@theme_router.post("/change")
def changes_theme(theme_config: ThemeConfigRequest):
    print(f"Changing theme to {theme_config.theme_name}")
    return change_theme(theme_config)