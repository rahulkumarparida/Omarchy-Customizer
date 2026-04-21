export const overviewSection = {
  id: "overview",
  title: "Overview",
  summary:
    "Omarchy Customizer is a focused workspace for managing Linux desktop theme modules, reusable presets, backups, and file-level edits in one flow.",
  whatItIs:
    "The project combines collection browsing, module-specific theme customization, preset bundling, and direct editor tooling so teams can tune their Omarchy setup without jumping between scripts and scattered config directories.",
  problemItSolves: [
    "Reduces context switching between separate tools for Waybar, Walker, Hyprlock, Omarchy themes, and Fastfetch.",
    "Removes manual trial-and-error by giving users a guided, repeatable path for applying and validating changes.",
    "Makes personalization safer with bucket presets and backup workflows before risky edits.",
  ],
  whoItIsFor: [
    "Developers and Linux power users customizing Omarchy environments.",
    "Maintainers who need a predictable process for applying UI and config updates.",
    "Anyone who wants a keyboard-friendly interface to browse, test, save, and restore theme changes.",
  ],
  imagePlaceholders: ["![Dashboard UI Screenshot Placeholder]()"],
};

export const gettingStartedSection = {
  id: "getting-started",
  title: "Getting Started",
  summary:
    "Use this setup path to move from first launch to your first applied customization with minimal risk.",
  prerequisites: [
    "Run backend and frontend services successfully.",
    "Confirm the target Omarchy config paths are accessible.",
    "Start with a backup before applying any persistent changes.",
  ],
  steps: [
    {
      id: "getting-started-step-open-workspace",
      title: "Open the workspace",
      details: [
        "Launch the app and open the main workspace from the home screen.",
        "Verify that Collection, Buckets, Backups, and Editor sections are visible.",
      ],
    },
    {
      id: "getting-started-step-review-collection",
      title: "Review available collections",
      details: [
        "Navigate to Collection and inspect modules you plan to customize.",
        "Open one module detail page to confirm metadata and preview context.",
      ],
    },
    {
      id: "getting-started-step-create-safety-backup",
      title: "Create a safety backup",
      details: [
        "Open Backups and create a snapshot before applying modifications.",
        "Name backups using date + module scope to simplify rollbacks.",
      ],
    },
    {
      id: "getting-started-step-apply-first-theme",
      title: "Apply your first theme update",
      details: [
        "Choose a module and apply a single change first.",
        "Validate output in your desktop environment before stacking more edits.",
      ],
    },
  ],
  imagePlaceholders: ["![Theme Customization Panel Placeholder]()"],
};

export const featureSections = [
  {
    id: "feature-theme-collection-browser",
    title: "Theme Collection Browser",
    whatItDoes:
      "Provides one place to explore all available customization modules and open each module's detailed collection view.",
    whyUseful:
      "It creates a clear discovery flow so users can quickly compare modules and start in the right place instead of searching config files manually.",
    steps: [
      {
        id: "feature-theme-collection-browser-step-open-collection",
        title: "Open the collection hub",
        details: [
          "From the workspace, select Collection to load all module cards.",
          "Use card metadata to compare collection type and creator references.",
        ],
      },
      {
        id: "feature-theme-collection-browser-step-enter-module",
        title: "Enter a module collection",
        details: [
          "Select Explore on the module you want to configure.",
          "Scan available items and pick one candidate for testing.",
        ],
      },
      {
        id: "feature-theme-collection-browser-step-validate-choice",
        title: "Validate your selection",
        details: [
          "Confirm credits and preview details before applying a change.",
          "Move to module-specific steps only after selecting a target theme.",
        ],
      },
    ],
  },
  {
    id: "feature-waybar-customization",
    title: "Waybar Customization",
    whatItDoes:
      "Lets you browse and apply Waybar configurations with a structured UI instead of editing templates by hand.",
    whyUseful:
      "It shortens styling iteration time and helps keep top-bar changes consistent across sessions.",
    steps: [
      {
        id: "feature-waybar-customization-step-open-waybar",
        title: "Open the Waybar collection",
        details: [
          "Navigate to Collection > Waybar.",
          "Review available theme entries and choose one baseline.",
        ],
      },
      {
        id: "feature-waybar-customization-step-apply-theme",
        title: "Apply a Waybar theme",
        details: [
          "Use the apply action from the detail page.",
          "Wait for update confirmation before running additional changes.",
        ],
      },
      {
        id: "feature-waybar-customization-step-verify-status-bar",
        title: "Verify status bar output",
        details: [
          "Check spacing, icons, and text contrast in your live bar.",
          "If needed, restore from backup and retry with another variant.",
        ],
      },
    ],
  },
  {
    id: "feature-walker-customization",
    title: "Walker Launcher Themes",
    whatItDoes:
      "Enables theme application for Walker launcher layouts and styling presets through a guided list + detail flow.",
    whyUseful:
      "Makes launcher theming repeatable while reducing accidental formatting mistakes in config files.",
    steps: [
      {
        id: "feature-walker-customization-step-open-walker",
        title: "Open Walker themes",
        details: [
          "Navigate to Collection > Walker.",
          "Pick a theme candidate from the current list.",
        ],
      },
      {
        id: "feature-walker-customization-step-preview-config",
        title: "Review configuration context",
        details: [
          "Inspect theme details and confirm it matches your desktop style direction.",
          "Use a backup checkpoint if this is your first launcher change.",
        ],
      },
      {
        id: "feature-walker-customization-step-apply-and-test",
        title: "Apply and test launcher behavior",
        details: [
          "Apply the selected Walker theme.",
          "Open Walker and validate readability, spacing, and interaction states.",
        ],
      },
    ],
  },
  {
    id: "feature-hyprlock-customization",
    title: "Hyprlock Screen Styling",
    whatItDoes:
      "Supports lock-screen theming so you can align Hyprlock visuals with the rest of your Omarchy setup.",
    whyUseful:
      "Helps maintain design consistency and avoids manual lock-screen config drift over time.",
    steps: [
      {
        id: "feature-hyprlock-customization-step-open-hyprlock",
        title: "Open Hyprlock themes",
        details: [
          "Navigate to Collection > Hyprlock.",
          "Review lock-screen variants and select a preferred style.",
        ],
      },
      {
        id: "feature-hyprlock-customization-step-apply-lockscreen",
        title: "Apply lock-screen configuration",
        details: [
          "Trigger the apply action from the selected theme detail.",
          "Confirm update success before locking your session for validation.",
        ],
      },
      {
        id: "feature-hyprlock-customization-step-validate-lockscreen",
        title: "Validate lock-screen usability",
        details: [
          "Check font clarity, prompt placement, and contrast.",
          "If usability drops, roll back with Backups and test a second variant.",
        ],
      },
    ],
  },
  {
    id: "feature-omarchy-theme-packs",
    title: "Omarchy Theme Packs",
    whatItDoes:
      "Manages Omarchy theme pack selection and application for broader visual identity changes.",
    whyUseful:
      "Makes full theme switches faster and safer than manually replacing multiple config files.",
    steps: [
      {
        id: "feature-omarchy-theme-packs-step-open-theme-packs",
        title: "Open Omarchy theme packs",
        details: [
          "Navigate to Collection > Omarchy.",
          "Select a pack that matches your target aesthetic.",
        ],
      },
      {
        id: "feature-omarchy-theme-packs-step-apply-pack",
        title: "Apply selected theme pack",
        details: [
          "Apply one pack at a time to isolate impact.",
          "Allow the workflow to finish before starting additional changes.",
        ],
      },
      {
        id: "feature-omarchy-theme-packs-step-review-desktop",
        title: "Review desktop consistency",
        details: [
          "Check panel, launcher, lock screen, and accent color alignment.",
          "Capture working states in Buckets for repeatable reuse.",
        ],
      },
    ],
  },
  {
    id: "feature-fastfetch-personalization",
    title: "Fastfetch Personalization",
    whatItDoes:
      "Provides a way to customize Fastfetch logo and output presentation from the same workspace.",
    whyUseful:
      "Keeps system identity output aligned with your visual setup and team conventions.",
    steps: [
      {
        id: "feature-fastfetch-personalization-step-open-fastfetch",
        title: "Open Fastfetch module",
        details: [
          "Navigate to Collection > Fastfetch.",
          "Inspect available preview options before generating output.",
        ],
      },
      {
        id: "feature-fastfetch-personalization-step-generate-output",
        title: "Generate Fastfetch output",
        details: [
          "Apply or generate the selected configuration.",
          "Run Fastfetch in terminal and verify branding visibility.",
        ],
      },
      {
        id: "feature-fastfetch-personalization-step-save-standard",
        title: "Save as a reusable standard",
        details: [
          "Store stable combinations in Buckets for reuse.",
          "Document your approved variation in team docs if shared.",
        ],
      },
    ],
  },
  {
    id: "feature-bucket-presets",
    title: "Bucket Presets",
    whatItDoes:
      "Allows grouping multiple selected configurations into reusable bundles for one-click re-application.",
    whyUseful:
      "Speeds up environment setup and helps teams share consistent personalization sets.",
    steps: [
      {
        id: "feature-bucket-presets-step-open-buckets",
        title: "Open Buckets workspace",
        details: [
          "Navigate to Buckets from the main navigation.",
          "Review existing bucket names to avoid duplicate intent.",
        ],
      },
      {
        id: "feature-bucket-presets-step-create-bucket",
        title: "Create a new preset bucket",
        details: [
          "Add selected module configs to a new bucket.",
          "Use naming conventions that describe purpose and scope.",
        ],
      },
      {
        id: "feature-bucket-presets-step-apply-bucket",
        title: "Apply and verify the bucket",
        details: [
          "Apply the bucket in one action.",
          "Validate all included modules in desktop and terminal contexts.",
        ],
      },
    ],
  },
  {
    id: "feature-backup-restore",
    title: "Backup and Restore",
    whatItDoes:
      "Creates backup snapshots and restores previous states when applied theme changes need rollback.",
    whyUseful:
      "Protects working setups from accidental breakage and encourages safe experimentation.",
    steps: [
      {
        id: "feature-backup-restore-step-open-backups",
        title: "Open Backups module",
        details: [
          "Navigate to Backups before applying major updates.",
          "Review existing snapshots and retention strategy.",
        ],
      },
      {
        id: "feature-backup-restore-step-create-snapshot",
        title: "Create a snapshot checkpoint",
        details: [
          "Create a new snapshot with a descriptive name.",
          "Include date and change intent for easier tracking.",
        ],
      },
      {
        id: "feature-backup-restore-step-restore-when-needed",
        title: "Restore when needed",
        details: [
          "If a change fails validation, restore the latest stable snapshot.",
          "Confirm restored output before applying additional edits.",
        ],
      },
    ],
  },
];

export const editorsSection = {
  id: "editors",
  title: "Editors",
  summary:
    "The editor workflow provides direct file-level control for advanced adjustments that are not covered by module-level actions.",
  capabilities: [
    "Load a target file path directly into the editor.",
    "Review and edit configuration content in one screen.",
    "Save quickly with keyboard shortcuts for a faster iteration loop.",
  ],
  usageSteps: [
    {
      id: "editors-step-load-file",
      title: "Load a configuration file",
      details: [
        "Open Editor from navigation and provide the file path.",
        "Load file contents and confirm the expected file is opened.",
      ],
    },
    {
      id: "editors-step-edit-safely",
      title: "Edit with a safe workflow",
      details: [
        "Make small, focused updates to isolate risk.",
        "Keep backups current before large refactors.",
      ],
    },
    {
      id: "editors-step-save-and-validate",
      title: "Save and validate",
      details: [
        "Save using the save action or `Ctrl/Cmd + S`.",
        "Re-check module behavior immediately after each save.",
      ],
    },
  ],
  imagePlaceholders: ["![Editor Interface Placeholder]()"],
};

export const docsNavigationOrder = [
  {
    id: overviewSection.id,
    title: overviewSection.title,
    type: "section",
  },
  {
    id: gettingStartedSection.id,
    title: gettingStartedSection.title,
    type: "section",
  },
  {
    id: "features",
    title: "Features",
    type: "section",
    children: featureSections.map((feature) => ({
      id: feature.id,
      title: feature.title,
      type: "feature",
    })),
  },
  {
    id: editorsSection.id,
    title: editorsSection.title,
    type: "section",
  },
];
