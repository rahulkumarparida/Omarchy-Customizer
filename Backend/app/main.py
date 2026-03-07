from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import api_routers

app = FastAPI()

origins = [
    "http://localhost",

]   

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
    return {"status": "up and running"}