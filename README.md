# Omarchy Customizer
[YouTube Video](https://youtu.be/haIAynKPt7Q?si=VIhI0_L3Wxvwt4vH)

## A. Opening Story

**Welcome to Omarchy Customizer.**

If you're a Hyprland user, you know the pain: You find an amazing theme on GitHub. You clone the repo, dig through folders, edit config files manually, copy things around, test if it works. Then you want to try something else? Repeat the entire process. Sometimes you break your config and spend an hour recovering.

Omarchy Customizer solves this with one simple idea: **Browse → Click → Apply.**

Instead of hunting for themes across GitHub and manually editing files, you open a web browser, see beautiful previews of themes for your entire desktop ecosystem (taskbar, lock screen, system info display, search UI, and main environment), click "Apply," and it just works. Your system changes instantly, safely, and locally—no accounts, no cloud uploads, no waiting.

This is a local-first desktop customization hub built for Linux enthusiasts who want their Hyprland setup to look and feel *exactly* how they want it—without the friction.

---

## B. What This Project Does

**Omarchy Customizer** is a full-stack web application that centralizes desktop customization for Hyprland users. It gives you control over five interconnected layers of your desktop:

1. **Omarchy** — The main Hyprland environment (colors, fonts, borders, gaps, animations)
2. **Waybar** — Your taskbar/panel (layout, colors, widgets)
3. **Hyprlock** — Your lock screen (appearance, animations)
4. **Walker** — Your application launcher (UI theme)
5. **Fastfetch** — Your system information display (layout, ASCII art, colors)

Traditionally, you'd manually manage each of these. Omarchy Customizer brings them all into one unified interface where you can:

- **Browse** hundreds of pre-built themes across all five components
- **Preview** themes before applying them (with images and metadata)
- **Apply** themes instantly with one click
- **Combine** multiple themes into reusable presets (called "Buckets")
- **Backup** your current configuration safely before making changes
- **Edit** raw config files directly within the app (with version history)
- **Restore** previous configurations if something goes wrong

**Core philosophy**: Your system stays your system. All changes happen locally on your machine. Internet only required cloning repos and themes. No data leaves your computer. Just you, your desktop, and your themes.

---

## C. How It Works (High-Level)

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  USER BROWSER                                           │
│  ┌─────────────────────────────────────────────────────┐│
│  │  React Frontend (served by FastAPI)                 ││
│  │  - Theme browsing UI                                ││
│  │  - Preset (Bucket) management                       ││
│  │  - File editor                                      ││
│  │  - Backup interface                                 ││
│  └─────────────────────────────────────────────────────┘│
└──────────────┬──────────────────────────────────────────┘
               │ HTTP/REST API
┌──────────────▼──────────────────────────────────────────┐
│  BACKEND SERVER (Python FastAPI, localhost:6969)       │
│  ┌─────────────────────────────────────────────────────┐│
│  │  API Routes                                         ││
│  │  - Theme routes (browse, apply)                     ││
│  │  - Bucket routes (save, apply presets)             ││
│  │  - Backup routes (create, restore)                 ││
│  │  - Editor routes (load, save files)                ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │  Service Layer                                      ││
│  │  - Execute shell commands                          ││
│  │  - Manage file operations                          ││
│  │  - Orchestrate multi-component changes            ││
│  └─────────────────────────────────────────────────────┘│
└──────────────┬──────────────────────────────────────────┘
               │ Exec (bash), File I/O, rsync
┌──────────────▼──────────────────────────────────────────┐
│  YOUR LINUX SYSTEM                                      │
│  ┌─────────────────────────────────────────────────────┐│
│  │  ~/.config/                                         ││
│  │  ├── omarchy/            (Hyprland main config)    ││
│  │  ├── waybar/             (Taskbar config)          ││
│  │  ├── hyprlock/           (Lock screen config)      ││
│  │  ├── fastfetch/          (System info config)      ││
│  │  └── walker/             (Launcher UI config)      ││
│  │                                                     ││
│  │  ~/.customizer/          (App data & backups)      ││
│  │  ├── buckets/            (Your saved presets)      ││
│  │  ├── backups/            (Config snapshots)        ││
│  │  └── editors/            (File history)            ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Data Flow: Step-by-Step Example

Let's trace what happens when you **apply an Omarchy theme**:

1. **Frontend**: You open the app, browse to "Theme Collections" → "Omarchy Themes" → click "Apply" on a theme card
2. **API Call**: Browser sends: `POST /api/theme/hypr/change { theme_id: "dracula-blue" }`
3. **Backend Route**: FastAPI endpoint receives the request, looks up the theme metadata in the local store
4. **Service Layer**: Calls `theme_services.change_theme()` which:
   - Reads the theme's GitHub repository URL from local storage
   - Creates a backup of your current `~/.config/omarchy/` (safety first)
   - Executes a system command: `omarchy-theme-install https://github.com/user/repo`
5. **System Execution**: The command runs on your machine:
   - Clones the theme repository
   - Copies theme files to `~/.config/omarchy/`
   - Reloads Hyprland configuration
6. **Response**: Backend sends success message back to frontend
7. **UI Update**: Frontend displays a toast notification "Theme applied successfully"
   - Your desktop environment updates in real-time
   - Taskbar, colors, fonts all change instantly

**Why local execution?** Because:
- **Speed**: Direct filesystem access = instant changes (no network latency)
- **Offline capability**: Once themes are downloaded once, you don't need the internet
- **System integration**: The backend can execute shell commands that only make sense on *your* specific machine
- **Privacy**: All data stays local; nothing is tracked or uploaded

---

## D. Features: Complete Breakdown

### Feature 1: Theme Management (5 Components)

**What it does**: Browse and apply pre-built themes for your entire desktop ecosystem.

**The 5 theme types**:

| Component | What it controls | Example change |
|-----------|-----------------|-----------------|
| **Omarchy** | Main Hyprland environment | Colors, fonts, window borders, gaps, animations, overall look |
| **Waybar** | Taskbar/panel | Layout, widget styling, colors, transparency |
| **Hyprlock** | Lock screen | Visual design, blur effects, text colors, unlock animation |
| **Walker** | Application launcher (search UI) | Theme colors, button styles, font sizing |
| **Fastfetch** | System info display | ASCII art style, color palette, information layout |

**How you use it**:

1. Navigate to **Theme Collections** from the homepage
2. Pick a category (e.g., "Omarchy Themes")
3. Browse a grid of theme cards with preview images
4. Click a theme to see details
5. Click **"Apply"** → theme instantly changes your system
   - OR click **"Add to Bucket"** to include it in a preset (see Feature 2)

**Behind the scenes**: 
- Theme metadata (names, preview images, GitHub URLs) is stored locally in `Backend/app/store/` as JSON files
- These were pre-scraped from GitHub repositories to avoid needing the internet at runtime
- Applying a theme triggers system commands that download and install the theme files to `~/.config/`

**Example workflow**: 
You want a dark theme with blue accents. You browse Omarchy Themes, find "Dracula Blue," apply it. Your desktop colors change immediately. Then you browse Waybar themes, find "Minimal Dark," apply it. Your taskbar updates. Two clicks, two theme changes, zero manual file editing.

---

### Feature 2: Bucket Presets (Save & Apply Theme Combinations)

**What it does**: Save combinations of themes as reusable presets, then apply your entire setup with one click.

**Problem it solves**: You've found the perfect Omarchy theme, Waybar, and Fastfetch combination. But next month you want to try something different. Then a month after that, you want your original setup back. Instead of remembering which themes to apply each time, save them as a "Bucket."

**How you use it**:

1. Browse and apply individual themes (Omarchy, Waybar, Fastfetch, etc.)
2. After you've selected multiple themes you like, click **"Add to Bucket"** on any theme
3. A modal pops up asking for a name: e.g., "Dark Minimal Setup" or "Cyberpunk Neon"
4. Click "Save Bucket"
5. Your preset is saved as a JSON file in `~/.customizer/buckets/`

**Later**: 
- Go to **Buckets** page
- See your saved presets listed
- Click "Apply" on any bucket
- All themes in that preset apply automatically (Omarchy first, then others)
- Your entire desktop changes to match that preset in seconds

**Real-world scenario**: You have three setups:
- "Dark Minimal" (Omarchy dark, Waybar minimal, Fastfetch compact)
- "Cyberpunk Neon" (Omarchy neon, Waybar glowing, Fastfetch matrix)
- "Light Productive" (Omarchy light, Waybar functional, Fastfetch detailed)

Each bucket is one click. Switch between your three favorite setups instantly.

**Technical detail**: Buckets are stored as JSON files with theme references. When you apply a bucket, the backend orchestrates applying each theme in the correct priority order (Omarchy first, since it's the foundation).

---

### Feature 3: Backup & Restore (Configuration Safety)

**What it does**: Snapshot your current configuration, then restore it if you break something or want to go back.

**Problem it solves**: You apply a theme and something looks off. Or you experiment with raw config editing and want your old setup back. Backups let you undo changes easily.

**How you use it**:

**Creating a backup**:
1. Go to **Backups** page
2. See a list of your `~/.config/` directories (omarchy, waybar, hyprlock, etc.)
3. Check the boxes for items you want to backup (or select all)
4. Click "Create Backup"
5. System snapshots those directories using `rsync`
6. A backup is saved in `~/.customizer/backups/` and also zipped to your `~/Downloads/`

**Restoring a backup**:
1. Go to **Backups** page
2. See your backup history (with timestamps)
3. Click "Restore" on a backup
4. Your `~/.config/` is replaced with that backup's contents (rsync again)
5. Your desktop reverts to how it looked at that time

**Safety features**:
- Before applying any theme, the app automatically creates a `.bak` backup file
- You can create manual backups anytime
- Restores are reversible (just create another backup first)

**Real scenario**: You apply a theme that breaks your lock screen. You restore a backup from 10 minutes ago. Lock screen works again.

---

### Feature 4: File Editor (Direct Config Editing with History)

**What it does**: Edit raw configuration files directly in the app, with keyboard shortcuts and version history.

**Problem it solves**: Sometimes you want fine-grained control—tweak a color value, adjust a spacing parameter, or add a custom setting that no pre-built theme provides. Instead of opening a text editor and navigating to the file, do it in the app.

**How you use it**:

1. Go to **Editor** page
2. Paste or type a file path: `/home/user/.config/omarchy/hyprland.conf`
3. Click "Load"
4. The file content appears in an editor textarea
5. Make changes directly in the app
6. Press **Cmd+S** (or Ctrl+S) to save
7. File is updated on your system instantly

**Bonus features**:
- **Recent files**: The app remembers the last 10 files you edited
- **History**: Previous content of each file is saved, so you can reference what changed
- **Keyboard shortcut**: Cmd/Ctrl+S works just like in your OS

**Real scenario**: You like a theme but want to tweak the window border color from red to purple. Instead of closing the app and opening a text editor, you load the config file in the Editor, change the color value, and save. Done.

---

### Feature 5: Collection Discovery (Browse Theme Metadata)

**What it does**: See information about each theme collection—who created it, where to find it, what components it includes.

**Problem it solves**: You want to explore themes but don't know where to start. Collections give you curated groups with metadata.

**How you use it**:

1. From homepage or "Theme Collections" page
2. You see 5 collection cards displayed:
   - Omarchy (main Hyprland environment themes)
   - Waybar (taskbar themes)
   - Hyprlock (lock screen themes)
   - Walker (launcher UI themes)
   - Fastfetch (system info themes)

Each card shows:
- Preview image
- Creator/community link
- Brief description
- Link to browse themes in that collection

**Behind the scenes**: Metadata is fetched from `/api/meta/collection` endpoint, which provides information about all available theme sources.

---

## E. Local-First Nature (Why This Design Matters)

### Why Does Everything Run Locally?

**1. Speed**
- No network latency. Apply a theme? Instant. Save a bucket? Instant.
- Your browser ↔ backend ↔ your system = all local, no internet round-trips for every action.Only internet required is for cloing the repos to you local to get the patricular theme you want to apply.

**2. Offline Capability**
- Once theme data is downloaded, the app works offline.
- You can browse, apply, and manage your setup even if your internet goes down.
- The app syncs theme data once (via scrapers), then operates independently.

**3. System Integration**
- The backend can execute shell commands (`omarchy-theme-install`, `hyprctl reload`, etc.)
- It can directly manipulate your `~/.config/` directory.
- It can read system information to understand what you have installed.
- This is *only* possible when running locally on your machine.

**4. Privacy**
- All your configuration files stay on your computer.
- No backup, preset, or edit history is uploaded anywhere.
- You are not tracked. Your settings are not profiled.
- 100% user-owned data.

### What Parts Depend on Your System?

For Omarchy Customizer to work, your system must have:

| Requirement | Why | Where it matters |
|-------------|-----|------------------|
| **Hyprland** | The main window manager being customized | Core feature; without it, most themes don't apply |
| **Waybar** | For taskbar customization | Waybar theme feature |
| **Hyprlock** | For lock screen customization | Hyprlock theme feature |
| **Fastfetch** | For system info display | Fastfetch feature |
| **Walker** | For launcher UI | Walker theme feature |
| **Python 3.10+** | Backend runtime | Server can't run without it |
| **Node.js 18+** | Frontend build tool | UI can't be developed/served without it |
| **~/.config/ directories** | Where user configs live | All changes applied here |
| **~/.customizer/ directory** | Where app stores buckets, backups, history | Created automatically on first run |

### Design Philosophy

**"Bring the themes to the user's system, not the user's system to the cloud."**

This means:
- Themes are discovered once, then stored locally
- Your configuration never leaves your computer
- The app adapts to *your* system, not vice versa
- You're always in control

### Impact on User Experience

Because of local-first design:

- ✅ **No loading screens**: Changes are instant
- ✅ **No latency**: No waiting for servers
- ✅ **No accounts**: No need to create or manage credentials
- ✅ **No tracking**: Your usage isn't logged anywhere
- ✅ **No limits**: Apply as many themes as you want, as many times as you want
- ✅ **No subscription**: It's genuinely yours, forever

---

## F. How to Run the Project Locally

### Prerequisites

Before starting, ensure you have:

```
- Linux OS (Ubuntu, Arch, Fedora, etc.)
- Hyprland installed and configured
- Python 3.10 or higher
- Node.js 18 or higher (npm included)
- git (for cloning themes)
- System tools: rsync, bash
- Note: `scripts/install.sh` currently targets Arch/Omarchy (uses `sudo` + `pacman`)
```

### Step 1: Clone or Navigate to Project

```bash
# Clone the repo
git clone https://github.com/rahulkumarparida/Omarchy-Customizer.git
cd Omarchy-Customizer
```

### Step 2: Install + Run (Recommended)

```bash
# If scripts are not executable on your system:
chmod +x omarchy-customizer.sh scripts/install.sh scripts/run.sh

# First run will install dependencies + build the frontend, then start the app
bash omarchy-customizer.sh
```

**Expected output**:
```
INFO:     Uvicorn running on http://0.0.0.0:6969 (Press CTRL+C to quit)
```

Open your browser to `http://localhost:6969/`.

To stop the app, focus the terminal and press `Ctrl+C`.

### Step 3 (Optional): Run Scripts Directly

```bash
./scripts/install.sh   # one-time install (uses sudo + pacman)
./scripts/run.sh       # start the app (FastAPI serves the built UI from ../dist/)
```

### Step 4 (Optional): Add a Shortcut Alias

After the first install completes (so `Backend/venv/` exists), you can add a shell alias to start the app with one command:

```bash
# zsh
echo 'alias editomarchy="cd /path/to/Omarchy-Customizer && bash omarchy-customizer.sh"' >> ~/.zshrc
source ~/.zshrc

# bash
# echo 'alias editomarchy="cd /path/to/Omarchy-Customizer && bash omarchy-customizer.sh"' >> ~/.bashrc
# source ~/.bashrc
```

Now you can run `editomarchy` to start the app, and press `Ctrl+C` to stop it.

### Troubleshooting

| Problem | Solution |
|---------|----------|
| App won't start (port 6969 in use) | Kill process on port 6969: `lsof -ti:6969 \| xargs kill -9` |
| Themes don't apply (permission denied) | Ensure `~/.config/` and `~/.customizer/` directories are writable |
| Modules not found errors | Ensure the install step completed successfully (`./scripts/install.sh`) |
| Hyprland commands not recognized | Ensure Hyprland is installed and in your PATH |

---

## G. How to Use: Typical User Flow

### Scenario: First-Time User Sets Up Dream Desktop

**Time to complete**: ~5-10 minutes

#### Step 1: Explore & Discover

1. Open app → **Homepage** appears with 6 command cards
   - "Browse Themes," "Manage Presets," "Backups," "Edit Config," "Documentation," etc.
2. Click **"Browse Themes"** → see 5 collection cards
3. Click **"Omarchy Themes"** → grid of theme cards with preview images loads
4. Scroll through, read theme names, preview different styles

#### Step 2: Apply Your First Theme

1. Find a theme you like (e.g., "Dracula Blue")
2. Click the theme card → theme details page opens
   - Shows preview image, description, creator link
3. Click **"Apply"** button
4. Backend executes commands, system reloads
5. Your desktop colors change instantly
6. Toast notification: "Theme applied successfully"

#### Step 3: Explore Another Component

1. Go back to collections
2. Click **"Waybar Themes"** to customize your taskbar
3. Browse and apply a Waybar theme
4. Your taskbar styling updates

#### Step 4: Create Your First Bucket (Preset)

1. You've now applied:
   - Omarchy theme (main desktop)
   - Waybar theme (taskbar)
2. You want to save this combination for later
3. Go to any theme detail page, click **"Add to Bucket"**
4. Modal pops up: "Enter bucket name"
5. Type: "My First Setup"
6. Click "Save Bucket"
7. Success! Your preset is saved

#### Step 5: Experiment Safely

1. Go to **Backups** page
2. Click "Create Backup" → your current setup is snapshot
3. Go back to themes, apply completely different themes
4. Customize your desktop some more
5. If you don't like it, go to **Backups** page
6. Click "Restore" on your earlier backup
7. Everything goes back to how it was

#### Step 6: Fine-Tune Config (Optional)

1. Go to **Editor** page
2. Paste a config file path: `/home/you/.config/omarchy/hyprland.conf`
3. Click "Load"
4. Edit the file directly (change a color, adjust spacing)
5. Press **Cmd+S** to save
6. Changes apply immediately

#### Step 7: Return to Bucket Setup

1. Go to **Buckets** page
2. See "My First Setup" listed
3. Click "Apply" → entire preset applies instantly
4. Desktop switches back to your saved configuration

### Advanced Usage: Power User Workflow

1. **Create multiple buckets** for different use cases:
   - "Work Mode" (minimal, productivity-focused)
   - "Gaming Mode" (vibrant, performance-focused)
   - "Relaxing" (calm colors, minimal distractions)
2. **Use keyboard shortcuts**:
   - `Cmd+K` (or `Ctrl+K`) to search documentation
   - `Cmd+S` (or `Ctrl+S`) in editor to save
3. **Automate with editor**: Load a config file, make bulk changes, save
4. **Backup before major changes**: Before trying 5 new themes, create a backup first
5. **Reference documentation** anytime for keyboard shortcuts and tips

---


## I. Project Structure Quick Reference

### Key Directories

**Frontend** (`Frontend/`)
- `src/pages/` — All 6 pages (Homepage, Collections, Buckets, Backups, Editor, Docs)
- `src/components/` — Theme collection UI components (OmarchyThemeCollection, WaybarCollection, etc.)
- `src/context/` — State management (ThemeContext, BucketContext)
- `src/api/api.js` — Axios HTTP client configuration

**Backend** (`Backend/`)
- `app/api/routes/` — All API endpoints (organized by feature)
- `app/services/` — Business logic (theme, bucket, backup, editor, file operations)
- `app/core/config_map.py` — System configuration and hardcoded paths
- `app/store/` — Static theme data (JSON files, images)
- `app/scraper/` — Tools that pre-populate theme data from GitHub

**Root**
- `package.json` — Project metadata
- `omarchy-customizer.sh` — One-command install + run (recommended)
- `scripts/` — `install.sh` (setup) and `run.sh` (start server)
- `runapplication.sh` — Legacy convenience script (optional)
- `SERVICE.md` — High-level service overview
- `README.md` — Quick start guide

---

## J. Accessing the Documentation

**In-app Documentation**:
- Press `Cmd+K` or `Ctrl+K` to open the searchable documentation page
- Documentation is viewable without leaving the app

**External Documentation**:
- `SERVICE.md` — Overview of services and features
- `README.md` — Quick start and setup
- `Frontend/DESIGN.md` — Design system and component documentation
- `Backend/TO_BE_FEATURES.md` — Planned features for future development

---

## Summary

**Omarchy Customizer** is a full-stack, local-first desktop customization application that solves the problem of manual Hyprland theme management. It provides:

✅ **Five integrated theme systems** (Omarchy, Waybar, Hyprlock, Walker, Fastfetch)  
✅ **Instant theme application** via local shell execution  
✅ **Bucket presets** for saving and reusing theme combinations  
✅ **Automatic backups** and one-click restoration  
✅ **In-app file editor** with history and keyboard shortcuts  
✅ **100% local operation** — no accounts, no cloud, no tracking  
✅ **Simple setup** — Python backend + Node frontend, both run locally  

The architecture is clean: React frontend sends API requests to a FastAPI backend, which executes system commands and manipulates configuration files directly. Everything is stored locally. Everything is instantaneous.

Whether you're recording a demo, onboarding a developer, or just understanding the full system, this document provides the complete picture.

---

**Ready to customize your desktop? Start with the setup instructions above, and you'll be applying themes in minutes.**
