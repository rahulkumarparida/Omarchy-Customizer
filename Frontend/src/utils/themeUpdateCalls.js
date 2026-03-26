import api from "../api/api.js";
async function applyOmarchyTheme(id) {
    
  try {
    console.log("process started")
    const res =await api.post("/api/theme/hypr/change",{
      "theme_id": id
    })
    return res
  } catch (error) {
    
    console.error(error)
  }


}



  async function changeWaybarTheme(id) {
    console.log("process started")
  if (!Number.isInteger(id) && id < 0) {
    return {"error":"errro id should be an integer"}
  }

   try {
     const response = await api.post("/api/theme/waybar/change",{
      theme_id : id
    })
   
   
    return response.data
   } catch (error) {
    console.error("Error:",error)
   }
  }


   async function changeWalkerTheme(id) {
    console.log("process started")
  if (!Number.isInteger(id) && id < 0) {
    return {"error":"errro id should be an integer"}
  }

   try {
     const response = await api.post("/api/theme/walker/change",{
      theme_id : id
    })
    console.log(response)

    return response.data
   } catch (error) {
    console.error("Error:",error)
   }
  }

    async function changeHyprlockTheme(id) {
    console.log("process started")
  if (!Number.isInteger(id) && id < 0) {
    return {"error":"errro id should be an integer"}
  }

   try {
     const response = await api.post("/api/theme/hyprlock/change",{
      theme_id : id
    })
    console.log(response)
  
    return response.data
   } catch (error) {
    console.error("Error:",error)
   }
  }


  async function changeFastfetchTheme(name , type) {
    console.log("process started")
  // logo_name
  // config_name
  let payload = type == "config" ? {
    config_name : name
  }  : type == "logo"?{
    logo_name : name
  }:null
  console.log(payload)
    if (payload !== null){
     

      try {
        const response = await api.post("/api/fastfetch/change",payload)
        console.log(response)
       
        return response.data
      } catch (error) {
        console.error("Error:",error)
      }

    }else{
      return {"error":"error while sending request"}
    }
  }

export { applyOmarchyTheme , changeWaybarTheme , changeWalkerTheme , changeHyprlockTheme , changeFastfetchTheme }