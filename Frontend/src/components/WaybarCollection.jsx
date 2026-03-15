import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
// import exampleThemeImage from "../assets/examp.png"
import bgimg2 from "../assets/bgimg2.png";
import api from "../api/api.js";
import { useTheme } from "../context/ThemeContext.jsx";
import LoadingScreen from "./ui/loadingscreen.jsx";

const sidebarItems = [
  "Waybar",
  "Walker",
  "Hyprlock",
  "Omarchy themes",
  "Fastfetch",
];

const sidebarUtilities = ["Backup Configs", "Get the file", "My Bucket"];

const SidebarItem = ({ children }) => (
  <div className="cursor-pointer text-neutral-400 transition-colors duration-300 hover:text-white">
    {children}
  </div>
);


  
  const ActionButton = ({ children }) => (
  <button className="w-full rounded-md bg-black px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-800 sm:w-auto">
    {children}
  </button>
);



const ThemeCard = ({ data, cardRef }) => {
  const { isWorking , setIsWorking } = useTheme()

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
    ref={cardRef}
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

const WaybarThemeCollection = () => {
  const { isWorking , setIsWorking } = useTheme()
  const pageRef = useRef(null);
  const sidebarRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const [themesData,setThemesData] = useState(null)
  const [waybarCardData,setWaybarCardData] = useState([])
  async function fetchWaybarCollection() {
    try {
    const response =await api.get("/api/theme/waybar") 
    console.log(response.data)
    setThemesData(response.data)
      setWaybarCardData(response.data.waybar)
    } catch (error) {
      console.error("Error:",error)
    }
  }
  useEffect(() => {
    fetchWaybarCollection()
  }, [])
  



  useEffect(() => {
    if (!themesData) return;
    if(isWorking) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
    });
    lenis.scrollTo(0, { immediate: true })

    const onFrame = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -56, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.95, ease: "power3.out" }
      );

      gsap.fromTo(
        headerRef.current?.children,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        gridRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.25,
        }
      );

      cardRefs.current.forEach((card) => {
        if (!card) {
          return;
        }

        gsap.fromTo(
          card,
          { y: 72, opacity: 0, rotateX: -8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            ease: "power3.out",
            
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );

        const image = card.querySelector("img");
        if (image) {
          gsap.to(image, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          });
        }
      });
    }, pageRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(onFrame);
    };
  }, [themesData]);


  return !isWorking ? themesData && (
    <div
      ref={pageRef}
      className="min-h-screen bg-black text-white font-sans antialiased"
    >
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col lg:flex-row">
        <aside
          ref={sidebarRef}
          className="lg:w-1/4 xl:w-1/5 border-b border-white/6 bg-black p-8 sm:p-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:border-white/6 lg:overflow-y-auto"
        >

                    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex items-center justify-center overflow-hidden">
                    <img 
                      src={bgimg2} 
                      alt="Background graphic" 
                      className="bg-watermark w-[80%] max-w-[800px] object-contain mix-blend-screen"
                    />
            </div>

          <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5">
            <input
              type="search"
              placeholder="Search what you want to customize"
              className="w-full rounded-xl border border-white/6 bg-[#1C1C1E] px-5 py-3 pr-12 text-sm text-white placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none"
            />
          </div>

          <nav className="mt-12 flex flex-col gap-5 text-lg font-medium">
            {sidebarItems.map((item) => (
              <SidebarItem key={item}>{item}</SidebarItem>
            ))}
          </nav>

          <div className="my-10 border-t border-neutral-800" />

          <nav className="flex flex-col gap-5 text-lg font-medium">
            {sidebarUtilities.map((item) => (
              <SidebarItem key={item}>{item}</SidebarItem>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8 sm:p-12 lg:p-20 ">
          <div
            ref={headerRef}
            className="flex flex-col gap-4 border-b border-white/6 pb-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/75">
              Theme collection
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Waybar Themes
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

          <div
            ref={gridRef}
            className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-3 xl:gap-12"
          >
            {themesData && waybarCardData.map((theme, index) => (
              <ThemeCard
                key={theme.id}
                data={theme}
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  ):
  <div className="text-3xl text-white ">
   <LoadingScreen />
  </div>
};

export default WaybarThemeCollection;
