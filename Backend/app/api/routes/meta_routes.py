import os
import json
from fastapi import APIRouter
from fastapi.responses import Response
from app.services.fastfetch_services import get_fastfetch_theme_details
from app.services.theme_services import get_hyprlock_theme_details , get_omarchy_theme_details , get_waybar_theme_details
from app.core.config_map import SETTINGS
meta_router = APIRouter()


@meta_router.get("/collection")
def themecollection_meta():
    fastfetch = get_fastfetch_theme_details()
    hyprlock = get_hyprlock_theme_details()
    omarchy_themes= get_omarchy_theme_details()
    waybar = get_waybar_theme_details()
    
    response = [
        {
            "id":1,
            "follow":"https://github.com/rahulkumarparida", 
            "collection_name":"fastfetch collection","credits_to":"rahulkumarparida",
            "goto":"/fastfetch",
            "preview_image":SETTINGS["fast_fetch"]["fastfetch_preview"]
         },
        {
            "id":2,
            "follow":"https://github.com/MrVivekRajan", 
            "collection_name":"Hyprlock Themes",    
            "credits_to":"MrVivekRajan",
            "goto":"/hyprlock",
            "preview_image":"https://github.com/user-attachments/assets/50826322-b565-4a5a-af0b-70dda399fd1a"
        },
        {
            "id":3,
            "follow":"https://github.com/mubashariqbal",
            "collection_name":"Omarchy Hyprland Themes", 
            "credits_to":"omarchythemes.com and the devlopers", 
            "goto":"/omarchy-themes",
            "preview_image":"https://omarchythemes.com/storage/42/conversions/01K2GEE94WCYJGT27GA9FWBXFP-thumb.jpg"
        },
        {
            "id":4,
            "follow":"https://github.com/HANCORE-linux",
            "collection_name":"Waybar themes","credits_to":"HANCORE-linux",
            "goto":"/waybar",
            "preview_image":"https://github.com/user-attachments/assets/9e5f77ec-ba1f-42c0-810d-46f5327ed3f4"
        },
        {
            "id":5,
            "follow":"https://github.com/rahulkumarparida",
            "collection_name":"Walker themes","credits_to":"rahulkumarparida",
            "goto":"/walker",
            "preview_image":"http://0.0.0.0:8000/store/assets/walker_images/22_catppuchino/image-copy.png"
            
        }
    ]
    


    return Response(content=json.dumps(response), status_code=200)