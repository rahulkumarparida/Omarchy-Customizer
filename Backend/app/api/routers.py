from fastapi import APIRouter
from app.api.routes.theme_routes import theme_router
from app.api.routes.fastfetch_routes import fastfetch_router
from app.api.routes.meta_routes import meta_router
from app.api.routes.bucket_routes import bucket_router
from app.api.routes.backup_routes import backup_router
api_routers = APIRouter()

api_routers.include_router(theme_router, prefix="/api/theme")
api_routers.include_router(fastfetch_router, prefix="/api/fastfetch")
api_routers.include_router(meta_router,prefix="/api/meta")
api_routers.include_router(bucket_router,prefix="/api/bucket")
api_routers.include_router(backup_router,prefix="/api/backup")