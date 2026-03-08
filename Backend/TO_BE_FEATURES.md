
# Features of omarchy customizer 
This file containt the features that i have implemented up until now my thought process and how will be executing this features.

---

## Project Philosophy
The goal of this project is to make customizing **Omarchy setups easier and safer** for users. Many beginners struggle with searching themes, editing config files and understanding where each configuration lives inside `.config`.

This project tries to solve that by providing tools that automate those tasks while still keeping everything **local to the users machine**.

Main ideas behind the project:

- reduce manual searching for themes and configs
- allow users to customise their system with simple commands
- provide safe experimentation through config backups
- support both **GUI users and terminal lovers**
- keep everything **local first so user data never leaves their machine**

---

## 1. Waybar Customisation
This feature i have started with only background and foreground color change but will soon try to add curtom configs for the waybar and all

endpoint : `/api/theme/waybar/change`

---

## 2. Theme Installation and showcase
This feature installs the theme that user wants and can change theme on one click rather than seraching for all the themes github repo i have scraped and accumulated the data for all the themes that were avaliable in some websites.

endpoint : `/api/theme/change`

---

## 3. Fastfetch configurations
This feature changes the fastfetch config file according to the style selected by the user. Instead of editing the config.jsonc dynamically i will provide preset templates which will replace the users config.

Each template will contain

```

config.jsonc
logo.txt

```

Users can also modify the `logo.txt` file if they want to customise their ascii logo.

endpoint : `/api/fastfetch/change`

---

# Upcoming Features (Easy → Hard)

## 4. Central Path Management
This feature will store all the paths that are required across the project. Instead of writing the paths in multiple scripts they will be stored in a single file and imported wherever needed.

This helps prevent path related errors and keeps the project structure cleaner.

Example paths

```

~/.config
~/.config/waybar
~/.config/fastfetch

```

endpoint : internal use

---

## 5. Config Backup System
Before modifying any configuration file the system will create a snapshot of the current `.config` directory. This ensures that the user can restore their previous configuration if something breaks.

Backups will be stored in a folder managed by the application.

Example structure

```

~/.config/omarchy-customizer/backups/

```

endpoint : `/api/backup/create`

---

## 6. Snapshot Version Control
This feature will maintain the **last 10 snapshots** of configuration changes. Every change will generate a snapshot with a unique id similar to a git commit id.

Example snapshot id

```

snapshot_id : a83c2d

```

Users can restore previous states using the snapshot id.

endpoint : `/api/backup/restore`

---

## 7. CLI Interface
This feature will allow users to interact with the system directly from the terminal. Users will be able to run commands instead of using the graphical interface.

Example commands

```

omarchy theme apply tokyo-night
omarchy waybar change purple
omarchy fastfetch style neon

```

This will make the tool easier to use for terminal focused users.

---

## 8. Terminal UI (TUI)
This feature will provide a **GUI style interface inside the terminal**. Users will be able to navigate through menus and apply themes or change configs interactively.

Example interface

```

Omarchy Customizer

1. Change Theme
2. Waybar Customisation
3. Fastfetch Styles
4. Backup / Restore
5. Exit

```

---

## 9. Theme Preview System
Since the theme dataset contains preview image links scraped from the website the system will allow users to preview themes before applying them.

Users will be able to browse themes and choose one visually.

endpoint : `/api/theme/list`

---

## 10. Local Application Interface
This feature will provide a graphical application running locally on the users machine. This will allow beginners to customise their system without manually editing configuration files.

The interface will allow

- browsing themes
- applying themes
- changing configs
- restoring backups

All operations will run locally so that **user data does not leave the system**.

