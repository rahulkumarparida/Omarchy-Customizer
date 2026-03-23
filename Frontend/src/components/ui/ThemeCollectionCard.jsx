
import api from "../../api/api"
import { useTheme } from "../../context/ThemeContext.jsx"

export const ActionButton = ({ children }) => (
  <button className="w-full rounded-md bg-black px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-800 sm:w-auto">
    {children}
  </button>
);


// Omarchy theme collection cards
export const OmarchyCollectionCard = ({card}) => {
const { setIsWorking} = useTheme()

const url = card.github_repo ? card.github_repo :""
let splirArr = url.split('/')
const user_profile = splirArr[0]+"//"+splirArr[2]+"/"+splirArr[3]
const username = url ? url.split('/')[3] : url
const defaultImageUrl = 'https://images.unsplash.com/photo-1549497538-303791108f94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMTkyMXwwfDF8c2VhcmNofDExfHx0ZXJtaW5hbHxlbnwwfHx8fDE2MTE5NTMyMjE&ixlib=rb-1.2.1&q=80&w=400';
const effectiveImageUrl = card.theme_image || defaultImageUrl;


async function applyTheme(id) {
  try {
    console.log("process started")
    const res =await api.post("/api/theme/change",{
      "theme_id": id
    })
    console.log(res.status == 202)
    if (res.status == 202) {
      setIsWorking(false)
    }
  } catch (error) {
    
    console.error(error)
  }


}


  return (
     
      <div className={` ${card.github_repo == null?"hidden":"rounded-2xl bg-zinc-800 p-3 space-y-5"}`}>
        
        <div className="rounded-xl bg-[#111012] aspect-[16/9] flex items-center justify-center overflow-hidden">
          {card.theme_image ? (
            <img src={effectiveImageUrl} alt="Theme Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <span className="text-zinc-600 font-bold text-3xl font-mono">Theme Image</span>
              <p className="text-zinc-700 text-sm mt-2">Replace with dynamic image or use prop.</p>
            </div>
          )}
        </div>

        <div className="space-y-1 p-1">
          <p className="text-zinc-50 text-base font-semibold">{card.title}</p>
          <p className="text-zinc-400 text-sm">
            Credits to : <a href={user_profile} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-medium">{username}</a>
          </p>
        </div>

        <div className="space-y-2.5 px-1 pb-1">
          
          <a
            href={card.github_repo}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-full w-full p-2.5 text-zinc-50 bg-[#212121] border hover:border-cyan-400 hover:bg-[#2e2e2e] transition duration-150 text-sm font-medium cursor-pointer"
          >
            Theme Repository
          </a>

          <div className="grid grid-cols-3 gap-x-2.5">
   
            <button className="rounded-full p-2.5 text-zinc-50 bg-[#212121] hover:bg-[#2e2e2e] transition duration-150 text-sm font-medium" onClick={()=>{applyTheme(card.id); setIsWorking(true) }}>
              Apply
            </button>
            <button className="rounded-full p-2.5 text-zinc-50 bg-[#212121] hover:bg-[#2e2e2e] transition duration-150 text-sm font-medium">
              Details
            </button>
            <button className="rounded-full p-2.5 text-zinc-50 bg-[#212121] hover:bg-[#2e2e2e] transition duration-150 text-[10px] font-medium whitespace-nowrap">
              Add to Bucket
            </button>
          </div>
        </div>

      </div>
   
  );
};

// Waybar theme collection cards
export const WaybarCollectionCard = ({ data }) => {
  const { setIsWorking } = useTheme()

  async function changeWaybar(id) {
    console.log("process started")
  if (!Number.isInteger(id) && id < 0) {
    return {"error":"errro id should be an integer"}
  }

   try {
     const response = await api.post("/api/theme/waybar/change",{
      theme_id : id
    })
   
    if (response.status == 200) {
      setIsWorking(false)
    }
    return response.data
   } catch (error) {
    console.error("Error:",error)
   }
  }

  return (
  <article
    className="theme-card flex max-w-[400px] flex-col items-center gap-6 rounded-3xl border border-white/6 bg-[#1C1C1E] p-6 sm:gap-8 sm:p-8"
    id={data.id}
  >
    <div className="w-full aspect-[4/3] rounded-3xl border border-neutral-700 bg-neutral-900 p-2">
      <img
        src={data.image_link}
        alt={`Theme created by ${data.theme_name}`}
        loading="lazy"
        className="h-full w-full rounded-xl object-cover"
      />
    </div>

    <div className="w-full text-left" onClick={()=>{changeWaybar(data.id)}}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">
        Name
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{data.theme_name+data.id}</h3>
    </div>

    <div className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4">
      <ActionButton >Details</ActionButton>
      <button className="w-full rounded-md bg-black px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-800 sm:w-auto"  onClick={()=>{changeWaybar(data.id),setIsWorking(true)}}>
    Apply
  </button>
      <ActionButton>Add to Bucket</ActionButton>
    </div>
  </article>
);
}

// walker Collection Card
export const WalkerCollectionCard =({ data }) =>{
  const { setIsWorking } = useTheme()

  async function changeWalker(id) {
    console.log("process started")
  if (!Number.isInteger(id) && id < 0) {
    return {"error":"errro id should be an integer"}
  }

   try {
     const response = await api.post("/api/theme/walker/change",{
      theme_id : id
    })
    console.log(response)
    if (response.status == 200) {
      setIsWorking(false)
    }
    return response.data
   } catch (error) {
    console.error("Error:",error)
   }
  }

  return data && data.images ? <div className="w-[340px] bg-[#323235] rounded-[2rem] p-4 font-sans shadow-2xl">
      
      {/* Inner Image Container with Light Gray Background */}
      <div className="bg-[#cfcfd1] p-1.5 rounded-[1.25rem] flex gap-1.5 h-[220px]">
        
        {/* Image 1 (Active State with Blue Border) */}
        <div className="relative flex-1 bg-[#3a3a3d] rounded-xl flex items-center justify-center border-[1.5px] border-[#4fa1e0] overflow-hidden">
          {data.images[0] && (
            <img src={data.images[0]} alt="Theme 1" className="absolute inset-0 w-full h-full object-cover " />
          )}
        </div>

        {/* Image 2 (Inactive State) */}
        <div className="relative flex-1 bg-[#3a3a3d] rounded-xl flex items-center justify-center overflow-hidden">
          {data.images[1] && (
            <img src={data.images[1]} alt="Theme 2" className="absolute inset-0 w-full h-full object-cover " />
          )}
        </div>
      </div>

      {/* Theme Title */}
      <div className="mt-3 px-2">
        <h3 className="text-[#e2e2e2] text-[15px] font-bold tracking-wide">
          {data.name}
        </h3>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 mb-1 px-1 flex justify-between gap-3">
        <button className="flex-[1.2] bg-[#09090b] hover:bg-[#1a1a1c] transition-colors  py-3 rounded-[14px] text-[12px] font-normal" onClick={()=>{changeWalker(data.id);setIsWorking(true)}}>
          Apply
        </button>
        
        <button className="flex-1 bg-[#09090b] hover:bg-[#1a1a1c] transition-colors py-3 rounded-[14px] text-[12px] font-normal tracking-wide">
          Details
        </button>
        
        <button className="flex-[1.2] bg-[#09090b] hover:bg-[#1a1a1c] transition-colors  py-3 rounded-[14px] text-[12px] font-normal tracking-wide">
          Add to Bucket
        </button>
      </div>
      
    </div>:
    <div>
      Loading ...
    </div>
}

// Hyprlock Collection Card
export const HyprlockCollectionCard = ({ data }) =>{

  const { setIsWorking } = useTheme()

  async function changeHyprlock(id) {
    console.log("process started")
  if (!Number.isInteger(id) && id < 0) {
    return {"error":"errro id should be an integer"}
  }

   try {
     const response = await api.post("/api/theme/hyprlock/change",{
      theme_id : id
    })
    console.log(response)
    if (response.status == 200) {
      setIsWorking(false)
    }
    return response.data
   } catch (error) {
    console.error("Error:",error)
   }
  }


  return data && data.preview_image ? <div className="w-[340px] bg-[#323235] rounded-[2rem] p-4 font-sans shadow-2xl">
      
      {/* Inner Image Container with Light Gray Background */}
      <div className="bg-[#cfcfd1] p-1 rounded-[1.25rem] flex gap-1.5 h-[220px]">

        <div className="relative flex-1 bg-[#3a3a3d] rounded-xl flex items-center justify-center overflow-hidden">
          {data.preview_image && (
            <img src={data.preview_image} alt="Theme 2" className="absolute inset-0 w-full h-full object-contain " />
          )}
        </div>
      </div>

      {/* Theme Title */}
      <div className="mt-3 px-2">
        <h3 className="text-[#e2e2e2] text-[15px] font-bold tracking-wide">
          {data.name}
        </h3>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 mb-1 px-1 flex justify-between gap-3">
        <button className="flex-[1.2] bg-[#09090b] hover:bg-[#1a1a1c] transition-colors  py-3 rounded-[14px] text-[12px] font-normal" onClick={()=>{changeHyprlock(data.id);setIsWorking(true)}}>
          Apply
        </button>
        
        <button className="flex-1 bg-[#09090b] hover:bg-[#1a1a1c] transition-colors py-3 rounded-[14px] text-[12px] font-normal tracking-wide">
          Details
        </button>
        
        <button className="flex-[1.2] bg-[#09090b] hover:bg-[#1a1a1c] transition-colors  py-3 rounded-[14px] text-[12px] font-normal tracking-wide">
          Add to Bucket
        </button>
      </div>
      
    </div>:
    <div>
      Loading..
    </div>
}
// Fasfetch theme collection card
export const FastfetchCollectionCard=({data ,type}) =>{
const { setIsWorking } = useTheme()
  async function changeFastfetch(name , type) {
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
        if (response.status == 200) {
          setIsWorking(false)
        }
        return response.data
      } catch (error) {
        console.error("Error:",error)
      }

    }else{
      setIsWorking(false)
      return {"error":"error while sending request"}
    }
  }



  return <div className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-5 md:p-6 shadow-2xl font-sans">
      {/* Header */}
      <h2 className="text-neutral-400 text-lg md:text-xl font-medium tracking-wide mb-5">
        Theme : <span className="text-neutral-100">{data.name}</span>
      </h2>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-6">
        
        {/* Image Container */}
        <div className="flex-1 relative aspect-video md:aspect-auto md:min-h-[260px] bg-[#2a2a2a] rounded-xl border border-neutral-700/50 flex items-center justify-center overflow-hidden group">
          {data.image_link ? (
            <img 
              src={data.image_link} 
              alt={data.name} 
              className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
          ) : (
            <span className="text-neutral-300 text-lg tracking-wider font-light">Image here</span>
          )}
          
          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none rounded-xl"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-4 justify-center md:w-32 shrink-0">
          <button className="flex-1 md:flex-none py-2.5 px-4 bg-[#d1d1d1] hover:bg-white text-black font-medium text-sm rounded-lg transition-colors duration-200 active:scale-95" onClick={()=>{changeFastfetch(data.name,type);setIsWorking(true)}}>
            Apply
          </button>
          <button className="flex-1 md:flex-none py-2.5 px-4 bg-[#d1d1d1] hover:bg-white text-black font-medium text-sm rounded-lg transition-colors duration-200 active:scale-95">
            Details
          </button>
          <button className="flex-1 md:flex-none py-2.5 px-4 bg-[#d1d1d1] hover:bg-white text-black font-medium text-sm rounded-lg transition-colors duration-200 active:scale-95">
            Add to Bucket
          </button>
        </div>

      </div>
    </div>
}