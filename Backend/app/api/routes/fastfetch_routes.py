from fastapi import APIRouter
from app.services.fastfetch_services import change_fastfetch_config
from app.core.validator import FastFetchConfigRequest

fastfetch_router = APIRouter()


@fastfetch_router.post("/")
def fastfetch_changes(data: FastFetchConfigRequest):
    print("processing for fastfetch has started")
    return change_fastfetch_config(data)
