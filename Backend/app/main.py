from fastapi import FastAPI 
from fastapi.staticfiles import  StaticFiles
from fastapi.responses import Response , FileResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import api_routers
import json
from pathlib import Path
from app.config import URL , ASSETS_LINK
app = FastAPI()
print(Path("__main__").parent)
# static_dir = Path("__main__").parent / "app" / "store" / "assets" 

app.mount("/store", StaticFiles(directory="app/store"), name="store")

# serve static assets
app.mount("/assets", StaticFiles(directory="../dist/assets"), name="assets")


origins=["*"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=api_routers)

# serve main app
@app.get("/")
def serve_app():
    return FileResponse("../dist/index.html")