import React, { useEffect,useState } from "react";

import api from "../api/api.js"
import { Link } from "react-router-dom";

import bgimg2 from "../assets/bgimg2.png";

import { ThemeProvider } from "../context/ThemeContext.jsx";

const SidebarLink = ({ children }) => (
  <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer text-[15px]">
    {children}
  </a>
);

const ThemeCollection = () => {

  const [themeCollectionData,setThemeCollection] = useState(null)
  async function fetchCollection() {
    
    try {
      let res = await api.get("/api/meta/collection")
    console.log(res.data)
    if (res.data) {
      setThemeCollection(res.data)
    }
    } catch (error) {
     return error 
    }

  }

useEffect(() => {
  fetchCollection()   

  }, [])
  

 




const ThemeCard = ({card}) =>{
  
  

  return <div
                key={card.id}
                
                className="bg-[#121212]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 flex flex-col gap-6 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Card Image Area */}
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-black flex items-center justify-center p-2 border border-white/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={card.preview_image} 
                    alt={card.title} 
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                
                <div className="flex flex-col gap-1 text-[12px] text-white tracking-wide">
                  <span>
                    <span className="text-white/60">Collection:</span> {card.collection_name}
                  </span>
                  <span>
                    <span className="text-white/60">Credits:</span> {card.credits_to}
                  </span>
                  <span>
                    <span className="text-white/60">Github:</span> <a href={card.follow} target="_blank">{card.follow}</a>
                  </span>
                </div>
            

                <Link className="mt-auto w-full bg-black text-center hover:bg-white hover:text-black border border-white/10 text-white font-semibold py-3 rounded-xl transition-all duration-300" to={`/collection/${card.goto}`} >
                  Explore
                </Link>
              </div>
}


  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white font-mono selection:bg-cyan-500/30">
      
      {/* --- SIDEBAR --- */}
      <aside 
        
        className="hidden lg:flex flex-col w-[320px] fixed h-screen top-0 left-0 p-8 z-40 bg-[#0A0A0A]"
      >
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search what you want to customize"
            className="w-full bg-white text-black placeholder:text-black/60 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
        </div>

        <div className="w-full h-px bg-white/20 mb-6" />

        {/* Top Links */}
        <nav className="flex flex-col gap-5 mb-8">
          <SidebarLink>Waybar</SidebarLink>
          <SidebarLink>Walker</SidebarLink>
          <SidebarLink>Hyprlock</SidebarLink>
          <SidebarLink>Omarchy themes</SidebarLink>
          <SidebarLink>Fastfetch</SidebarLink>
        </nav>

        <div className="w-full h-px bg-white/20 mb-6" />

        {/* Bottom Links */}
        <nav className="flex flex-col gap-5">
          <SidebarLink>Backup Configs</SidebarLink>
          <SidebarLink>Get the file</SidebarLink>
          <SidebarLink>My Bucket</SidebarLink>
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main  className="flex-1 lg:ml-[320px] relative min-h-screen p-8 lg:p-16 overflow-hidden">
        
        {/* Background Graphic (bgimg2) */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center overflow-hidden">
          <img 
            src={bgimg2} 
            alt="Background graphic" 
            className="bg-watermark w-[80%] max-w-[800px] object-contain mix-blend-screen"
          />
        </div>

        {/* Content Wrapper (z-10 ensures it sits above the background) */}
        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Header section */}
          <div  className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-wide mb-6">
              Explore different themes
            </h1>
            <div className="w-full max-w-[600px] h-px bg-white/20" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {themeCollectionData && themeCollectionData.map((card,idx) => (
              <div key={idx}>
              <ThemeCard   card={card} />
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ThemeCollection