
import api from "../api/api.js";
function bucketPayloadCreate(obj, feature, payload) {
    const newPayload = { ...payload };

    if (feature === "fastfetch") {
        
        newPayload.config_name = payload.config_name ?? obj[feature]?.config_name;
        newPayload.logo_name = payload.logo_name ?? obj[feature]?.logo_name;
    }

    return {
        ...obj,
        [feature]: newPayload
    };
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

async function removeBucket(id) {

    try {
        let response =await api.delete(`/api/bucket/${id}`)
        location.reload()
        return response
    } catch (error) {
        return error
    }
}
    


export {getBuckets , addBucket ,getBucketObj, bucketPayloadCreate, applyBucket ,removeBucket}