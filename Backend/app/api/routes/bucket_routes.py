from fastapi import APIRouter , Request
from app.services.bucket_service import get_all_bucket_theme,save_bucket_theme,apply_bucket_theme,get_bucket_data
from app.core.validator import BucketSaveRequest , ApplyBucketRequest


bucket_router = APIRouter()


@bucket_router.get('/')
def get_bucket_names():
    return get_all_bucket_theme()

@bucket_router.get('/{id}')
def get_details_bucket_data(id:int):
    return  get_bucket_data(id)

@bucket_router.post('/add')
def add_bucket(bucket: BucketSaveRequest):
    return save_bucket_theme(bucket)

@bucket_router.post('/apply')
def apply_bucket(data: ApplyBucketRequest):
    return apply_bucket_theme(data)