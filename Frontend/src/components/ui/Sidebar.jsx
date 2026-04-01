import bgimg2 from "../../assets/bgimg2.png";
import { Link } from "react-router-dom";

const sidebarItems = [
  { id: 1, name: "Waybar", location: "/collection/waybar" },
  { id: 2, name: "Walker", location: "/collection/walker" },
  { id: 3, name: "Hyprlock", location: "/collection/hyprlock" },
  { id: 4, name: "Omarchy themes", location: "/collection/omarchy-themes" },
  { id: 5, name: "Fastfetch", location: "/collection/fastfetch" },
  { id: 6, name: "My Bucket", location: "/buckets"}
];

const sidebarUtilities = ["Backup Configs", "Get the file"];

const SidebarItem = ({ children }) => (
  <div className="cursor-pointer transition-colors duration-300 hover:text-white">
    {children}
  </div>
);

const Sidebar = () => {
const path = window.location.pathname

  return (
    <aside className="lg:w-1/4 xl:w-1/5 border-b border-white/6 bg-black p-8 sm:p-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:border-white/6 lg:overflow-y-auto">
      
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
          <Link key={item.id} to={item.location}  >
            <SidebarItem className={`${path == item.location ?"text-white":"text-neutral-500"}`}>{item.name}</SidebarItem>
          </Link>
        ))}
      </nav>

      <div className="my-10 border-t border-neutral-800" />

      <nav className="flex flex-col gap-5 text-lg font-medium">
        <span className="text-neutral-500 text-sm">Currently on Work</span>
        {sidebarUtilities.map((item, index) => (
          <SidebarItem key={index}>{item}</SidebarItem>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;