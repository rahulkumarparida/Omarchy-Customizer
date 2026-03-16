
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
    console.log(response)
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
        src={data.theme_image}
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


