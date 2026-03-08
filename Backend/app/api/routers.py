from fastapi import APIRouter
from app.api.routes.theme_routes import theme_router
from app.api.routes.fastfetch_routes import fastfetch_router

api_routers = APIRouter()

api_routers.include_router(theme_router, prefix="/api/theme")
api_routers.include_router(fastfetch_router, prefix="/api/fastfetch")
