
import api from "../api/api.js";

function bucketPayloadCreate(obj,feature,payload){
    if (feature == "fastfetch") {
        obj[feature]['config_name'] = payload['config_name'] !== null ? payload['config_name'] : obj[feature]['config_name']
        obj[feature]['logo_name'] = payload['logo_name'] !== null ? payload['logo_name'] : obj[feature]['logo_name']
        
        return obj
    }
 obj[feature] = payload 
return obj


}

async function getBuckets(){

    try {
        let response = api.get("/api/bucket/");
        return response
    } catch (error) {
        return error
    }

}

async function getBucketObj(id) {

     try {
        let response = api.get(`/api/bucket/${id}`);
        return response
    } catch (error) {
        return error
    }

}



async function addBucket(filename,data = {}) {
    let payload =  {
        "filename": filename,
        "data": data
    }

    try {
    
        const res =await api.post("/api/bucket/add",payload)

        return res

    } catch (error) {
        return error
    }
    
}

async function applyBucket(id) {
    const payload = {
  "id": id
}
    try {
        let response =await api.post("/api/bucket/apply", payload)

        return response
    } catch (error) {
        return error
    }
}

export {getBuckets , addBucket ,getBucketObj, bucketPayloadCreate, applyBucket}