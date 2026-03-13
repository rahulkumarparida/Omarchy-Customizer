import os
import json
from fastapi import APIRouter
from fastapi.responses import Response
from app.services.fastfetch_services import get_fastfetch_theme_details
from app.services.theme_services import get_hyprlock_theme_details , get_omarchy_theme_details , get_waybar_theme_details

meta_router = APIRouter()


@meta_router.get("/collection")
def themecollection_meta():
    fastfetch = get_fastfetch_theme_details()
    hyprlock = get_hyprlock_theme_details()
    omarchy_themes= get_omarchy_theme_details()
    waybar = get_waybar_theme_details()

    response = [
        {"fastfetch":fastfetch},
        {"hyprlock":hyprlock},
        {"omarchy_themes":omarchy_themes},
        {"waybar":waybar}
    ]
    
# Response(content=json.dumps({"message": f"Theme {theme_name} not found"}), status_code=404)

    return Response(content=json.dumps(response), status_code=200)