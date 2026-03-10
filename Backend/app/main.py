from fastapi import FastAPI 
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import api_routers
import json

app = FastAPI()

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
    return Response(content=json.dumps({"status": "up and running"}), status_code=200)