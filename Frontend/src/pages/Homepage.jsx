import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import bgimg from "../assets/bgimg.png"; 
import bgvid from "../assets/bgvideo.mp4";
import exmp from "../assets/examp.png";



const navItems = ["Docs", "Installation", "Collection", "Github"];
const quickLinks = ["Apps", "Trigger", "Learn", "Setup", "Themes"];

const Homepage = () => {
  const [videoFinished, setVideoFinished] = useState(false);
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const previewRef = useRef(null);
  const dockRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Smooth Scroll
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    const ctx = gsap.context(() => {
      // Intro animation for the pinned header
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 }
      );

      // Content reveal animations
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(sidebarRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 80%",
          },
        }
      );

      // Parallax effect on the preview image
      gsap.to(previewRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: previewRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, pageRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={pageRef} className="relative bg-black text-white selection:bg-cyan-500/30">
      
      {/* --- FIXED NAVBAR --- */}
      {/* 'fixed' keeps it in place, 'bg-transparent' ensures no background colors */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-8 lg:px-12 transition-opacity duration-1000 bg-transparent ${
          videoFinished ? "opacity-100" : "opacity-0"
        }`}
      >
        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
        
        {/* Transparent Nav Container */}
        <nav className="hidden md:block rounded-full border border-white/10 bg-black/60 px-10 py-4">
          <ul className="flex gap-12 font-mono text-[11px] uppercase tracking-[0.3em] text-white">
            {navItems.map((item) => (
              <Link key={item} className="hover:text-cyan-400 transition-colors cursor-pointer" to={"/collection"}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </Link>
            ))}
          </ul>
        </nav>

        <button className="rounded-full bg-white/5 border border-white/10 px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
          Control Room
        </button>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          {!videoFinished ? (
            <video
              autoPlay
              muted
              playsInline
              onEnded={() => setVideoFinished(true)}
              className="h-full w-full object-cover"
            >
              <source src={bgvid} type="video/mp4" />
            </video>
          ) : (
            <img
              src={bgimg}
              alt="Background"
              className="h-full w-full object-cover animate-in fade-in duration-1000"
            />
          )}
        </div>
      </section>

      {/* --- SCROLLABLE CONTENT --- */}
      <section 
        ref={contentRef}
        className="relative z-10 mx-auto max-w-7xl px-6 py-32"
      >
        <div ref={titleRef} className="text-center mb-24">
          <h2 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            Everything is customizable
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-white/50 text-lg">
            From the lockscreen to your waybar or your walker you just name it.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[350px_1fr]">
          {/* Sidebar */}
          <aside
            ref={sidebarRef}
            className="rounded-[2.5rem] border border-white/10 bg-[#121212]/80 p-8 backdrop-blur-md h-fit"
          >
            <div className="mb-8 rounded-2xl bg-[#2a2a2a] p-6 text-2xl font-mono tracking-widest text-white/90">
              Go..
            </div>
            <div className="space-y-5">
              {quickLinks.map((link, i) => (
                <div key={i} className="flex items-center gap-6 rounded-2xl border border-white/5 bg-black/40 p-5 hover:bg-white/10 transition-colors group">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[...Array(9)].map((_, j) => (
                      <div key={j} className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-cyan-400 transition-colors" />
                    ))}
                  </div>
                  <span className="font-mono text-sm uppercase tracking-[0.25em]">{link}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Visuals */}
          <div className="flex flex-col gap-8">
            <div ref={previewRef} className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl">
              <img src={exmp} alt="Preview" className="w-full object-cover" />
            </div>
            
            <div ref={dockRef} className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-[#121212] px-8 py-5 font-mono text-xs uppercase tracking-widest">
              <div className="flex items-center gap-6">
                <span className="text-white/40">1</span>
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md border border-cyan-500/30">2</span>
                <span className="text-white/40">3</span>
              </div>
              <span className="text-white/60 lowercase italic">chrome-figma.com</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;