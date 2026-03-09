from fastapi import APIRouter
from app.services.theme_services import change_waybar_colors , change_theme , change_waybar_theme , change_hyprlock_theme
from app.core.validator import WaybarColorConfigRequest , ThemeConfigRequest , WaybarThemeConfigRequest , HyprLockConfigRequest

theme_router = APIRouter()

# Changes the colors of the waybar
@theme_router.post("/waybar/colors")
def update_waybar_colors(config: WaybarColorConfigRequest):
    print("processing has started")
    return change_waybar_colors(config)

# Chnages the Waybar Themes
@theme_router.post("/waybar/change")
def change_waybar_themes(data: WaybarThemeConfigRequest):
    print("Waybar theme change processing has started")
    return change_waybar_theme(data)

# Changes the wallpaper and overall theme stuff
@theme_router.post("/change")
def changes_theme(theme_config: ThemeConfigRequest):
    print(f"Changing theme to {theme_config.theme_name}")
    return change_theme(theme_config)

# Changes the hyprlock theme
@theme_router.post("/hyprlock/change")
def changes_hyprlock_themes(data: HyprLockConfigRequest):
    print("Processing for changing hyprlock started")
    return change_hyprlock_theme(data)