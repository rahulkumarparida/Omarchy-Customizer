import os
import json
from pathlib import Path
from app.services.theme_services import change_hyprlock_theme , change_theme , change_walker_theme , change_waybar_theme
from app.services.fastfetch_services import change_fastfetch_config 
from app.core.config_map import SETTINGS , CUSTOMIZER_LOCALS
from app.core.validator import BucketSaveRequest , ApplyBucketRequest , ThemeConfigRequest , HyprLockConfigRequest , WalkerConfigRequest, WaybarThemeConfigRequest , FastFetchConfigRequest

features = {
    'hyprlock':{"function":change_hyprlock_theme,"model":HyprLockConfigRequest},
    'waybar':{"function":change_waybar_theme,"model":WaybarThemeConfigRequest},
    'walker':{"function":change_walker_theme,"model":WalkerConfigRequest},
    'fastfetch':{"function":change_fastfetch_config,"model":FastFetchConfigRequest},
    'omarchy-theme':{"function":change_theme,"model":ThemeConfigRequest}
    }

store_path = SETTINGS['buckets']['store_path']



def get_all_bucket_theme():
    bucket_store = Path(store_path)
    bucket_store.mkdir(parents=True, exist_ok=True)
    bucket_names = []
    id = 0
    for file in bucket_store.iterdir():
        id += 1
        name = file.name
        data = {
            "id":id,
            "name":name
        }
        bucket_names.append(data)
    return {"message":"fetched all the buckets","buckets":bucket_names}



def save_bucket_theme(bucket: BucketSaveRequest):
    name = bucket.filename
    store_data = Path(store_path) / f"{name}.jsonc"
    store_data.parent.mkdir(parents=True, exist_ok=True)
    
    with open(store_data, 'w') as f:
        json.dump(bucket.data, f, indent=4)
    
    return {"message": "added the bucket"}
    

def orchestrate_themes_changes(data:dict):
    response_list = []
    priority = "omarchy-theme"
    if priority in data:
        func = features[priority].get('function')
        model = features[priority].get('model')
        if func:
            try:
                verified_data = model(**data[priority]) 
                response = func(verified_data)
                response_list.append({priority:response})
            except Exception as e:
                response_list.append({
                        "feature": priority,
                        "status": "error",
                        "error": str(e)
                })
        data.pop(priority)
    for key in data:
        print(key)
        if key in list(features.keys()):
            func = features[key]['function']
            model = features[key].get('model')
            if func:
                try:
                    verified_data = model(**data[key])
                    response = func(verified_data)
                    response_list.append({key:response})
                except Exception as e:
                    response_list.append({
                        "feature": key,
                        "status": "error",
                        "error": str(e)
                    })
    return response_list


def apply_bucket_theme(data:ApplyBucketRequest):
    buckets = get_all_bucket_theme()
    filename = None
    for bucket in buckets['buckets']:
        print(bucket)
        if bucket['id'] == data.id:
            filename = bucket['name']
            break
    
    if filename == None:
        return {'error':"no such file was found."}
    
    get_file = Path(store_path) / filename
    bucket_data = None
    with open(get_file, 'r') as f:
        bucket_data = json.load(f)
    
    if bucket_data == None:
        return {'error':'no such data found'}
    
    response = orchestrate_themes_changes(bucket_data)
    
    return response
        