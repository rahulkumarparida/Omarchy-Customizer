import { useEffect, useState } from "react";
// import exampleThemeImage from "../assets/examp.png"

import api from "../api/api.js";
import { useTheme } from "../context/ThemeContext.jsx";
import LoadingScreen from "./ui/Loadingscreen.jsx";
import Sidebar from "./ui/Sidebar.jsx";
import { HyprlockCollectionCard } from "./ui/ThemeCollectionCard.jsx";

import { CreateModal } from './ui/CreateModal.jsx'
import AddToBucket from './ui/AddToBucket.jsx'
import { getBuckets } from '../utils/bucket.utils.js'


const HyprlockCollection = () => {
  const { isWorking} = useTheme()

  const [themesData,setThemesData] = useState(null)
  const [hyprlockCardData,setHyprlockCardData] = useState([])


      const [open, setOpen] = useState(false);
  const [bucket , setBuckets] = useState()
const [payload , setPayload ] = useState(null)

  async function fetchHyprlockCollection() {
    try {
    const response =await api.get("/api/theme/hyprlock") 
    
      return response
    } catch (error) {
      console.error("Error:",error)
    }
  }


    function handleAddToBuckets(id) {
      getBuckets().then((result) => {
        console.log(result.data.buckets)
        setBuckets(result.data.buckets)
        setOpen(true)
        
      }).catch((err) => {
        return err
      });
      let req = {
        theme_id:id
      }
      setPayload(req)
  }

  useEffect(() => {
    fetchHyprlockCollection().then((response) => {
      setThemesData(response.data)
  
      setHyprlockCardData(response.data.hyprlock_themes)
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
              Hyprlock Themes 
            </h1>
            (Work still to be done so user can add there custom images...)
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

          <div
            
            className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-3 xl:gap-12"
          >
            {themesData && hyprlockCardData.map((theme) => (
              <HyprlockCollectionCard key={theme.id}
                data={theme} addToBucket={handleAddToBuckets} />
            ))}
          </div>
        </main>

          <CreateModal isOpen={open} onClose={() => setOpen(false)}>
            <div >
                    <AddToBucket payload={payload} featureName={"hyprlock"} data={bucket} onClose={() => setOpen(false)}   />
            </div>

          </CreateModal>

      </div>
    </div>
  ):
  <div className="text-3xl text-white ">
   <LoadingScreen />
  </div>
}

export default HyprlockCollection