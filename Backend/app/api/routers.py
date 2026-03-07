from fastapi import APIRouter
from app.api.routes.theme_routes import theme_router

api_routers = APIRouter()

api_routers.include_router(theme_router, prefix="/api/theme")
