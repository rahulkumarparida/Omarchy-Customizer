import joinClasses from "../../utils/joinClasses.js";
import {Link} from "react-router-dom"


const DocsSidebar = ({ navigationItems, featureItems, activeSectionId, onNavigate }) => {
  const isFeatureActive = featureItems.some((feature) => feature.id === activeSectionId);

  return (
    <aside className="w-full border-b border-[var(--border-0)] bg-black/60 backdrop-blur-md lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="px-4 py-4 md:px-5">
        <Link to={"/"} className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Documentation</Link>
        <h2 className="mt-1 text-sm font-semibold text-[var(--text-0)]">Omarchy Customizer Docs</h2>
        <p className="mt-1 text-xs ui-muted">Ordered from onboarding to advanced workflows.</p>
      </div>

      <nav aria-label="Documentation Sections" className="max-h-[55vh] overflow-y-auto px-3 pb-4 lg:max-h-[calc(100vh-110px)]">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            if (item.id === "features") {
              return (
                <li key={item.id} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={joinClasses(
                      "ui-control ui-focus flex w-full items-center justify-between px-3 py-2 text-left text-sm",
                      isFeatureActive || activeSectionId === item.id
                        ? "border-[var(--accent)] text-[var(--text-0)]"
                        : "text-[var(--text-1)] hover:text-[var(--text-0)]",
                    )}
                    aria-current={isFeatureActive || activeSectionId === item.id ? "true" : undefined}
                  >
                    <span>{item.title}</span>
                    <span className="ui-pill text-[10px]">Section</span>
                  </button>

                  <ul className="space-y-1">
                    {featureItems.map((feature) => {
                      const active = activeSectionId === feature.id;

                      return (
                        <li key={feature.id}>
                          <button
                            type="button"
                            onClick={() => onNavigate(feature.id)}
                            className={joinClasses(
                              "ui-control ui-focus ml-3 w-[calc(100%-0.75rem)] px-3 py-2 text-left text-sm",
                              active
                                ? "border-[var(--accent)] text-[var(--text-0)]"
                                : "text-[var(--text-2)] hover:text-[var(--text-0)]",
                            )}
                            aria-current={active ? "true" : undefined}
                          >
                            {feature.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }

            const active = activeSectionId === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={joinClasses(
                    "ui-control ui-focus w-full px-3 py-2 text-left text-sm",
                    active
                      ? "border-[var(--accent)] text-[var(--text-0)]"
                      : "text-[var(--text-1)] hover:text-[var(--text-0)]",
                  )}
                  aria-current={active ? "true" : undefined}
                >
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DocsSidebar;
