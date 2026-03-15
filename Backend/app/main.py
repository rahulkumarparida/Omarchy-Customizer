from fastapi import FastAPI 
from fastapi.staticfiles import  StaticFiles
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import api_routers
import json
from pathlib import Path
from app.config import URL , ASSETS_LINK
app = FastAPI()
print(Path("__main__").parent)
# static_dir = Path("__main__").parent / "app" / "store" / "assets" 

app.mount("/store", StaticFiles(directory="app/store"), name="store")

# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]  
origins=["*"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=api_routers)


@app.get("/")
def read_root():
    print(Path("__main__").parent)
    return Response(content=json.dumps({"status": f"up and running at: {URL} and static files at: {ASSETS_LINK}"}), status_code=200)