# SERVICE

## A. Project Overview

**ConfigAPI** is a full-stack configuration management application focused on desktop Linux theme customization and config operations. It combines a FastAPI backend with a React + Vite frontend to let users discover themes, apply them, group them into reusable presets, manage backups, and edit config files.

### What problem it solves

Manual desktop customization usually requires editing multiple files, running theme-specific commands, and remembering previous states. This project solves that by providing:

- A single UI to browse and apply themes
- Reusable preset buckets for grouped changes
- Backup and restore workflows for safer experimentation
- A direct file editor flow for quick config adjustments

## B. Core Services

### 1. Theme Service (`/api/theme`)
Provides theme collection and apply operations for:

- Waybar
- Walker
- Hyprlock
- Omarchy themes

Responsibilities include listing themes, fetching per-theme details, and applying selected themes through backend service logic.

### 2. Fastfetch Service (`/api/fastfetch`)
Handles Fastfetch theme data and apply operations for:

- Fastfetch config themes
- Fastfetch logo themes

### 3. Metadata Service (`/api/meta`)
Provides collection-level metadata used to render the main theme collection overview in the frontend.

### 4. Bucket Service (`/api/bucket`)
Manages user-defined preset buckets:

- List buckets
- Read bucket contents
- Create/update bucket data
- Apply a bucket
- Delete a bucket

### 5. Backup Service (`/api/backup`)
Provides backup lifecycle operations for user config files:

- List existing backups
- Discover available config files
- Create a backup from selected items
- Apply a backup
- Delete a backup

### 6. Editor Service (`/api/editor`)
Provides file reading and saving features plus recent-path tracking for in-app editing workflows.

## C. Features

### Theme Browsing and Applying

- Category-based collections (Waybar, Walker, Hyprlock, Omarchy, Fastfetch)
- Theme detail pages with preview and metadata
- One-click apply actions

### Bucket Presets

- Create named buckets
- Add selected theme payloads into buckets
- Apply full bucket presets
- Delete outdated buckets

### Backup Management

- Select config files/directories to snapshot
- Create named backups
- Restore from a backup
- Remove old backups

### File Editor

- Load file by path
- Edit file content in-app
- Save updated content back to disk
- Use recent path history for quick access

### Frontend UX and Accessibility

- Route-based React UI with shared app shell
- Keyboard shortcut support (global focus, modal escape, editor save)
- Accessible dialogs and control labeling
- Dark mode design system with consistent visual tokens

## D. Usage Guide

## 1. Prerequisites

- Python 3.10+ (recommended)
- Node.js 18+ and npm

## 2. Backend Setup

1. Go to backend:
   - `cd Backend`
2. Create and activate virtual environment (if needed):
   - `python -m venv venv`
   - `source venv/bin/activate`
3. Install backend dependencies:
   - `pip install -r requirements.txt`
4. Start backend:
   - `python run.py`

Backend runs on `http://0.0.0.0:8000`.

## 3. Frontend Setup

1. Open a new terminal and go to frontend:
   - `cd Frontend`
2. Install dependencies:
   - `npm install`
3. Set frontend API URL (example):
   - create/update `.env` with `VITE_CUSTOMIZER_API_URL=http://127.0.0.1:8000`
4. Start frontend:
   - `npm run dev`

## 4. Basic User Flow

1. Open the app and navigate to a collection.
2. View a theme and apply it directly, or add it to a bucket.
3. Create backup snapshots before major changes.
4. Use the editor page for direct file-level tweaks.
5. Restore backups or apply bucket presets when needed.

## E. Technical Notes

- **Backend:** FastAPI, route modules under `Backend/app/api/routes`, service modules under `Backend/app/services`.
- **Frontend:** React + Vite + TailwindCSS.
- **API client:** Axios (`Frontend/src/api/api.js`) using `VITE_CUSTOMIZER_API_URL`.
- **Static assets:** Backend exposes `app/store` via `/store`.
- **Architecture style:** Frontend route-driven UI + backend service-layer orchestration for config operations.
