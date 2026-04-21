import { Link } from "react-router-dom";
import { Card } from "../components/ui/primitives.jsx";

const actions = [
  {
    title: "Browse Theme Collection",
    description: "Explore all customization categories and open detailed pages.",
    to: "/collection",
    label: "Open Collection",
  },
  {
    title: "Manage Buckets",
    description: "Save reusable combinations and apply them in one click.",
    to: "/buckets",
    label: "Open Buckets",
  },
  {
    title: "Backup Configs",
    description: "Create and restore backups for selected config files.",
    to: "/backups",
    label: "Open Backups",
  },
  {
    title: "Open Editor",
    description: "Load files by path and save updates with keyboard support.",
    to: "/editor",
    label: "Open Editor",
  },
  {
    title: "Read Documentation",
    description: "Browse complete feature docs with sidebar navigation and Ctrl/Cmd + K search.",
    to: "/docs",
    label: "Open Docs",
  },
];

const Homepage = () => {
  return (
    <div className="app-shell min-h-screen">
      <main id="main-content" className="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10">
        <header className="ui-panel mb-6 grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Command Hub</p>
            <h1 className="ui-balance mt-2 text-3xl font-semibold md:text-4xl" translate="no">
              Omarchy Customizer Workspace
            </h1>
            <p className="mt-2 max-w-2xl text-sm ui-muted">
              Navigate every tool from one place. The layout is optimized for keyboard-driven flow with
              accessible controls and consistent focus states.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/collection" className="ui-link">
              Explore Themes
            </Link>
            <span className="ui-muted">|</span>
            <Link to="/editor" className="ui-link">
              Open Editor
            </Link>
          </div>
        </header>

        <section aria-label="Quick Actions" className="mb-6">
          <div className="ui-card-grid">
            {actions.map((action) => (
              <Card key={action.to} className="flex flex-col gap-3">
                <h2 className="text-lg font-medium text-[var(--text-0)]">{action.title}</h2>
                <p className="min-w-0 flex-1 break-words text-sm ui-muted">{action.description}</p>
                <Link
                  to={action.to}
                  aria-label={action.label}
                  className="ui-control ui-focus ui-button-primary inline-flex w-full items-center justify-center px-3 py-2 text-sm font-medium"
                >
                  {action.label}
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
