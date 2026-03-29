
import api from "../api/api.js";

async function getBuckets(){

    try {
        let response = api.get("/api/bucket/");
        return response
    } catch (error) {
        return error
    }

}



async function addBucket(payload) {

    try {
    
        const res =await api.post("/api/bucket/add",payload)

        console.log(res)
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

export {getBuckets , addBucket , applyBucket}