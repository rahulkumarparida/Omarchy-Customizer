import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { InputField } from "./primitives.jsx";
import joinClasses from "../../utils/joinClasses.js";

const sidebarItems = [
  { id: 1, name: "Collection Home", location: "/collection" },
  { id: 2, name: "Waybar", location: "/collection/waybar" },
  { id: 3, name: "Walker", location: "/collection/walker" },
  { id: 4, name: "Hyprlock", location: "/collection/hyprlock" },
  { id: 5, name: "Omarchy", location: "/collection/omarchy-themes" },
  { id: 6, name: "Fastfetch", location: "/collection/fastfetch" },
  { id: 7, name: "Buckets", location: "/buckets" },
  { id: 8, name: "Backups", location: "/backups" },
  { id: 9, name: "Editor", location: "/editor" },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return sidebarItems;

    const normalized = query.trim().toLowerCase();
    return sidebarItems.filter((item) => item.name.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <aside className="w-full border-b border-[var(--border-0)] bg-black/60 px-4 py-4 backdrop-blur-md lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-5">
      <div className="flex items-center justify-between border-b border-[var(--border-0)] pb-3">
        <div>
          <Link to={"/"} className="text-xs font-semibold uppercase cursor-pointer tracking-[0.14em] text-[var(--accent)]">Omarchy Customizer</Link>
          <p className="mt-1 text-sm text-[var(--text-1)]" translate="no">
            Customizer workspace
          </p>
        </div>
        <span className="ui-pill" aria-label="Keyboard shortcut hint">
          ⌘/Ctrl K
        </span>
      </div>

      <div className="mt-4">
        <InputField
          id="global-nav-search"
          label="Search Navigation"
          type="search"
          name="nav_search"
          autoComplete="off"
          inputMode="search"
          spellCheck={false}
          data-global-search="true"
          placeholder="ctrl/cmd+K"
          value={query}
          aria-label="Search routes"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <nav className="mt-4" aria-label="Primary">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = pathname === item.location;
            return (
              <li key={item.id}>
                <Link
                  to={item.location}
                  className={joinClasses(
                    "ui-control ui-focus block px-3 py-2 text-sm",
                    isActive
                      ? "border-[var(--accent)] text-[var(--text-0)]"
                      : "text-[var(--text-1)] hover:text-[var(--text-0)]",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
