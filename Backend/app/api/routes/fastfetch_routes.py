from fastapi import APIRouter
from app.services.fastfetch_services import change_fastfetch_config , get_fastfetch_theme_details
from app.core.validator import FastFetchConfigRequest

fastfetch_router = APIRouter()

@fastfetch_router.get("")
def get_fastfetch_data():
    return get_fastfetch_theme_details()

@fastfetch_router.post("")
def fastfetch_changes(data: FastFetchConfigRequest):
    print("processing for fastfetch has started")
    return change_fastfetch_config(data)
