import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import api from "../api/api.js"
// Adjust these imports based on your actual file structure
import bgimg2 from "../assets/bgimg2.png"; // The background watermark/image
import exmp from "../assets/examp.png"; // The theme preview image

// Mock data for the cards
const themeCards = [
  { id: 1, title: "Waybar themes", description: "This is the collection of waybar themes available." },
  { id: 2, title: "Waybar themes", description: "This is the collection of waybar themes available." },
  { id: 3, title: "Waybar themes", description: "This is the collection of waybar themes available." },
  { id: 4, title: "Waybar themes", description: "This is the collection of waybar themes available." },
];

const SidebarLink = ({ children }) => (
  <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer text-[15px]">
    {children}
  </a>
);

const ThemeCollection = () => {
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [themeCollectionData,setThemeCollection] = useState(null)

  async function fetchCollection() {

    try {
      let res = await api.get("/api/meta/collection")
    
    if (res.data) {
      setThemeCollection(await res.data)
    }
    } catch (error) {
     return error 
    }

  }


  useEffect(() => {
    fetchCollection()
    if (!themeCollectionData) return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // --- Sidebar Initial Slide-in ---
      gsap.fromTo(
        sidebarRef.current.children,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" }
      );

      // --- Main Title Fade-in ---
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // --- Theme Cards Staggered Reveal ---
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: mainContentRef.current,
            start: "top 75%",
          },
        }
      );

      // --- Background Parallax Effect ---
      gsap.to(".bg-watermark", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: mainContentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // Helper to add refs to the array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };



const ThemeCard = ({card}) =>{
  
  let body=Object.values(card)[0]
  return <div
                key={card.id}
                ref={addToCardsRef}
                className="bg-[#121212]/80 backdrop-blur-md rounded-3xl p-6 border border-white/5 flex flex-col gap-6 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Card Image Area */}
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xl bg-black flex items-center justify-center p-2 border border-white/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={exmp} 
                    alt={body.title} 
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Card Text Area */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {body.title}
                  </h3>
                  <p className="text-[11px] text-white/50 leading-relaxed max-w-[80%]">
                    {body.description}
                  </p>
                </div>

                
                <div className="flex flex-col gap-1 text-[10px] text-white tracking-wide">
                  <span>
                    <span className="text-white/60">Collection:</span> {body.collection_name}
                  </span>
                  <span>
                    <span className="text-white/60">Credits:</span> {body.credits_to}
                  </span>
                </div>

                {/* Explore Button */}
                <button className="mt-auto w-full bg-black hover:bg-white hover:text-black border border-white/10 text-white font-semibold py-3 rounded-xl transition-all duration-300">
                  Explore
                </button>
              </div>
}


  return (
    <div ref={containerRef} className="flex min-h-screen bg-[#0A0A0A] text-white font-mono selection:bg-cyan-500/30">
      
      {/* --- SIDEBAR --- */}
      <aside 
        ref={sidebarRef}
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
      <main ref={mainContentRef} className="flex-1 lg:ml-[320px] relative min-h-screen p-8 lg:p-16 overflow-hidden">
        
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
          <div ref={titleRef} className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-wide mb-6">
              Explore different themes
            </h1>
            <div className="w-full max-w-[600px] h-px bg-white/20" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {themeCollectionData && themeCollectionData.map((card,idx) => (
              <div key={idx}>
              <ThemeCard  card={card} />
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ThemeCollection