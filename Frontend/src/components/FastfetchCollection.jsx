import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useTheme } from "../context/ThemeContext.jsx";
import LoadingScreen from "./ui/Loadingscreen.jsx";
import Sidebar from "./ui/Sidebar.jsx";
import {FastfetchCollectionCard } from "./ui/ThemeCollectionCard.jsx"

const FastfetchCollection = () => {
    const { isWorking} = useTheme()
    const [themesData, setThemesData] = useState(null)
    const [fastfetchConfigData,setFastfetchConfigData] = useState([])
    const [fastfetchLogoData,setFastfetchLogoData] = useState([])
    
      async function fetchWalkerCollection() {
    try {
    const response =await api.get("/api/fastfetch") 
    return response
    } catch (error) {
      console.error("Error:",error)
    }
  }

  useEffect(() => {
    fetchWalkerCollection().then((response) => {
 
      setThemesData(response.data)
      // fastfetch_data.theme_data
      setFastfetchConfigData(response.data.fastfetch_data.theme_data)
      // fastfetch_logo_data.theme_data
      setFastfetchLogoData(response.data.fastfetch_logo_data.theme_data)
      
    }).catch((err) => {
       console.error("Error:",err)
    });
  }, [])

  


      return !isWorking ? themesData && (
        <div
        
        className="min-h-screen bg-black text-white font-sans antialiased"
        >
        <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col lg:flex-row">
            <Sidebar />
            <main className="flex-1 p-8 sm:p-12 lg:p-20 ">
            <div
            
                className="flex flex-col gap-4 border-b border-white/6 pb-10"
            >
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/75">
                Theme collection
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Fastfetch Collection Themes
                </h1>
                <p className="flex flex-col gap-1.5 text-lg font-semibold text-neutral-300 sm:flex-row sm:items-center sm:gap-3">
                <span>Themes developed by {themesData.credits_to}</span>
                <span className="hidden text-neutral-600 sm:inline">:</span>
                <a
                href={themesData.follow}
                target="_blank"
                className="text-neutral-100 underline decoration-neutral-600 transition-colors duration-300 hover:text-white hover:decoration-white"
              >
                Github Link
              </a>
            </p>
          </div>

          <div className="flex flex-col pt-8 gap-4 border-b border-white/6 pb-10" >
            <p className="text-xl text-gray-300 font-extrabold tracking-tight sm:text-2xl lg:text-3xl">Config Collection</p>
            <p className="text-gray-400">This changes the theme and style of the fastfetch system configs.</p>
          </div>

          <div
            
            className="mx-auto mt-12 w-full grid  grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-1 xl:gap-12"
          >
            {themesData && fastfetchConfigData.map((theme) => (
              <FastfetchCollectionCard key={theme.id}
                data={theme} type={themesData.fastfetch_data.themes_for} />
            ))}
          </div>


            <div className="flex flex-col pt-8 gap-4 border-y mt-6 border-white/6 pb-10" >
            <p className="text-xl text-gray-300 font-extrabold tracking-tight sm:text-2xl lg:text-3xl">Logo Collection</p>
            <p className="text-gray-400">This changes the default logo of the fastfetch to th few created by me.</p>
          </div>

            <div
            
            className="mx-auto mt-12 grid  grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-1 xl:gap-12"
          >
            {themesData && fastfetchLogoData.map((theme) => (
              <FastfetchCollectionCard key={theme.id}
                data={theme} type={themesData.fastfetch_logo_data.themes_for} />
            ))}
          </div>

        </main>
      </div>
    </div>
  ):
  <div className="text-3xl text-white ">
   <LoadingScreen />
  </div>

}

export default FastfetchCollection