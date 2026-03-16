from fastapi import APIRouter , Request
from app.services.theme_services import change_waybar_colors , change_theme , change_waybar_theme , change_hyprlock_theme , get_waybar_theme_details , get_hyprlock_theme_details , get_omarchy_theme_details, get_walker_theme_details,change_walker_theme
from app.core.validator import WaybarColorConfigRequest , ThemeConfigRequest , WaybarThemeConfigRequest , HyprLockConfigRequest , WalkerConfigRequest

theme_router = APIRouter()

# Changes the colors of the waybar
@theme_router.post("/waybar/colors")
def update_waybar_colors(config: WaybarColorConfigRequest):
    print("processing has started")
    return change_waybar_colors(config)

# Chnages the Waybar Themes
@theme_router.get("/waybar")
def get_waybar_theme(request: Request):
    waybar = get_waybar_theme_details()
    return waybar


@theme_router.post("/waybar/change")
def change_waybar_themes(data: WaybarThemeConfigRequest):
    print("Waybar theme change processing has started")
    return change_waybar_theme(data)

# Changes the wallpaper and overall theme stuff
@theme_router.get("/")
def get_omarchy_themes(request:Request):
    return get_omarchy_theme_details()
@theme_router.post("/change")
def changes_theme(theme_config: ThemeConfigRequest):
    print(f"Changing theme to {theme_config.theme_id}")
    return change_theme(theme_config)

# Changes the hyprlock theme
@theme_router.get("/hyprlock")
def get_hyprlock_theme(request:Request):
    return get_hyprlock_theme_details()

@theme_router.post("/hyprlock/change")
def changes_hyprlock_themes(data: HyprLockConfigRequest):
    print("Processing for changing hyprlock started")
    return change_hyprlock_theme(data)


# Changes the Walker theme
@theme_router.get("/walker")
def get_walker_themes():
    
    return get_walker_theme_details()

@theme_router.post("/walker/change")
def change_walker_themes(data:WalkerConfigRequest):
    print("Processing Walker themes")
    return change_walker_theme(data)
    
