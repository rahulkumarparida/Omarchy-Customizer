
import { useParams } from "react-router-dom";
import api from '../../api/api.js'
import { useEffect , useState } from "react";
import { changeHyprlockTheme } from "../../utils/themeUpdateCalls.js";
import {useTheme} from "../../context/ThemeContext.jsx"
import bgimg2 from "../../assets/bgimg2.png"; 
import LoadingScreen from "./Loadingscreen.jsx"


const HyprlockDetailsPage = () => {
 
   const { id } = useParams();
   const {isWorking,setIsWorking} = useTheme()
   const [fetchDetail, setFetchDetail] = useState(null)

  

      async function fetchHyprlockDetails() {
        let response =await api.get(`/api/theme/hyprlock/${id}`)
        console.log(response.data.data)
        
        return response.data
        
      }

      useEffect(() => {
        fetchHyprlockDetails().then((result) => {
          setFetchDetail(result.data)
        }).catch((err) => {
          return err
        });
      }, [])

      function handleClick(id){
      changeHyprlockTheme(id).then((result) => {
        if (result){
          setIsWorking(false)
          
        }
      }).catch((err) => {
        
        console.error(err)
      });
    }
      


  return fetchDetail && !isWorking ? (
    <div 
      className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-black bg-center bg-cover bg-no-repeat relative font-sans text-gray-100"
      style={{ backgroundImage: `url(${bgimg2})` }}
    >

      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 w-full max-w-5xl p-8 sm:p-12 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        
        <h1 className="text-3xl sm:text-4xl font-medium tracking-wide mb-8">
          Name: {fetchDetail.name}
        </h1>

        
        <div className=" h-48 sm:h-72 rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-lg relative bg-black/40 backdrop-blur-md group">
          <img 
            src={fetchDetail.preview_image} 
            alt={"waybar image"} 
            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />

          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] pointer-events-none"></div>
        </div>

       

        <div className="flex w-full mt-5 bg-black p-2 rounded-2xl gap-2 border border-white/5 shadow-lg backdrop-blur-md">
            <button className="flex-1 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-gray-200 hover:text-white py-3 sm:py-4 px-4 rounded-xl transition-all duration-200 text-base sm:text-lg font-medium shadow-sm border border-black/50" onClick={()=>{handleClick(id);setIsWorking(true)}}>
              Apply
            </button>
            <button className="flex-1 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-gray-200 hover:text-white py-3 sm:py-4 px-4 rounded-xl transition-all duration-200 text-base sm:text-lg font-medium shadow-sm border border-black/50">
              Add to Bucket
            </button>
          </div>

      </div>
    </div>
  ) :
  <div>
    <LoadingScreen />
  </div>
}

export default HyprlockDetailsPage