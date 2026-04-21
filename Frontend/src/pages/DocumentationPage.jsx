import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DocsSidebar from "../components/docs/DocsSidebar.jsx";
import DocsSearchModal from "../components/docs/DocsSearchModal.jsx";
import { Card } from "../components/ui/primitives.jsx";
import {
  docsNavigationOrder,
  editorsSection,
  featureSections,
  gettingStartedSection,
  overviewSection,
} from "../docs/content.js";
import { buildDocsSearchIndex, searchDocs } from "../docs/search.js";

const PlaceholderLine = ({ markdownText }) => (
  <p className="rounded-[var(--radius-control)] border border-dashed border-[var(--border-1)] bg-[var(--surface-1)] px-3 py-2 font-mono text-xs text-[var(--text-1)]">
    {markdownText}
  </p>
);

const ListBlock = ({ items, ordered = false }) => {
  if (!items?.length) return null;

  const Component = ordered ? "ol" : "ul";

  return (
    <Component className={ordered ? "ml-5 list-decimal space-y-1 text-sm ui-muted" : "ml-5 list-disc space-y-1 text-sm ui-muted"}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Component>
  );
};

const StepsList = ({ steps }) => (
  <ol className="ml-5 list-decimal space-y-4">
    {steps.map((step) => (
      <li key={step.id} id={step.id} className="scroll-mt-32 space-y-1">
        <h4 className="text-sm font-semibold text-[var(--text-0)]">{step.title}</h4>
        <ListBlock items={step.details} />
      </li>
    ))}
  </ol>
);

const DocumentationPage = () => {
  const location = useLocation();
  const [activeSectionId, setActiveSectionId] = useState(overviewSection.id);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchIndex = useMemo(
    () =>
      buildDocsSearchIndex({
        overviewSection,
        gettingStartedSection,
        featureSections,
        editorsSection,
      }),
    [],
  );

  const searchResults = useMemo(
    () => searchDocs(searchIndex, searchQuery, 12),
    [searchIndex, searchQuery],
  );

  const trackedSectionIds = useMemo(
    () => [
      overviewSection.id,
      gettingStartedSection.id,
      "features",
      ...featureSections.map((feature) => feature.id),
      editorsSection.id,
    ],
    [],
  );

  const navigateToSection = useCallback((sectionId, behavior = "smooth") => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior, block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}#${sectionId}`);

    const trackedTargetId = trackedSectionIds.includes(sectionId)
      ? sectionId
      : target.closest("[data-doc-section='true']")?.id;

    setActiveSectionId(trackedTargetId || sectionId);
  }, [trackedSectionIds]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      setSearchOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const hashId = location.hash.replace("#", "");
    if (!hashId) return;

    const timer = window.setTimeout(() => {
      navigateToSection(hashId, "auto");
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.hash, navigateToSection]);

  useEffect(() => {
    const sectionElements = trackedSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const currentId = visibleEntries[0].target.id;
        setActiveSectionId(currentId);
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [trackedSectionIds]);

  const handleOpenSearch = () => setSearchOpen(true);
  const handleCloseSearch = () => setSearchOpen(false);

  const handleSearchSelect = (targetId) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigateToSection(targetId);
  };

  return (
    <div className="app-shell min-h-screen text-[var(--text-0)]">
      <DocsSearchModal
        isOpen={isSearchOpen}
        query={searchQuery}
        results={searchResults}
        onClose={handleCloseSearch}
        onQueryChange={setSearchQuery}
        onSelectResult={handleSearchSelect}
      />

      <div className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col lg:flex-row">
        <DocsSidebar
          navigationItems={docsNavigationOrder}
          featureItems={featureSections}
          activeSectionId={activeSectionId}
          onNavigate={navigateToSection}
        />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-[var(--border-0)] bg-black/70 px-4 py-4 backdrop-blur-sm md:px-6">
            <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Documentation
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-[var(--text-0)] md:text-3xl">
                  Omarchy Customizer Docs
                </h1>
                <p className="mt-1 max-w-3xl text-sm ui-muted">
                  Navigate core workflows, module features, and editor usage from a single reference.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  data-command-palette-trigger="true"
                  onClick={handleOpenSearch}
                  className="ui-control ui-focus inline-flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-1)] hover:text-[var(--text-0)]"
                >
                  <span>Search docs</span>
                  <kbd className="rounded border border-[var(--border-1)] px-1.5 py-0.5 text-[11px] ui-muted">
                    Ctrl + K
                  </kbd>
                </button>
                <Link to="/collection" className="ui-link text-sm">
                  Open Collection
                </Link>
              </div>
            </div>
          </header>

          <main id="main-content" className="px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto w-full max-w-[1180px] space-y-5">
              <Card
                id={overviewSection.id}
                data-doc-section="true"
                className="scroll-mt-32 space-y-4"
              >
                <h2 className="text-xl font-semibold text-[var(--text-0)]">{overviewSection.title}</h2>
                <p className="text-sm ui-muted">{overviewSection.summary}</p>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--text-0)]">What Omarchy Customizer Is</h3>
                  <p className="text-sm ui-muted">{overviewSection.whatItIs}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--text-0)]">What Problem It Solves</h3>
                  <ListBlock items={overviewSection.problemItSolves} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--text-0)]">Who It Is For</h3>
                  <ListBlock items={overviewSection.whoItIsFor} />
                </div>

                <div className="space-y-2">
                  {overviewSection.imagePlaceholders.map((placeholderText) => (
                    <PlaceholderLine key={placeholderText} markdownText={placeholderText} />
                  ))}
                </div>
              </Card>

              <Card
                id={gettingStartedSection.id}
                data-doc-section="true"
                className="scroll-mt-32 space-y-4"
              >
                <h2 className="text-xl font-semibold text-[var(--text-0)]">{gettingStartedSection.title}</h2>
                <p className="text-sm ui-muted">{gettingStartedSection.summary}</p>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--text-0)]">Prerequisites</h3>
                  <ListBlock items={gettingStartedSection.prerequisites} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--text-0)]">Step-by-Step Setup</h3>
                  <StepsList steps={gettingStartedSection.steps} />
                </div>

                <div className="space-y-2">
                  {gettingStartedSection.imagePlaceholders.map((placeholderText) => (
                    <PlaceholderLine key={placeholderText} markdownText={placeholderText} />
                  ))}
                </div>
              </Card>

              <Card id="features" data-doc-section="true" className="scroll-mt-32 space-y-3">
                <h2 className="text-xl font-semibold text-[var(--text-0)]">Features</h2>
                <p className="text-sm ui-muted">
                  Each feature section covers what the module does, why it is useful, and a practical usage path.
                </p>
              </Card>

              {featureSections.map((feature) => (
                <Card
                  key={feature.id}
                  id={feature.id}
                  data-doc-section="true"
                  className="scroll-mt-32 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-[var(--text-0)]">{feature.title}</h3>

                  <div className="space-y-2">
                    <h4 className="text-base font-semibold text-[var(--text-0)]">What It Does</h4>
                    <p className="text-sm ui-muted">{feature.whatItDoes}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-semibold text-[var(--text-0)]">Why It Is Useful</h4>
                    <p className="text-sm ui-muted">{feature.whyUseful}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-semibold text-[var(--text-0)]">Step-by-Step Usage Guide</h4>
                    <StepsList steps={feature.steps} />
                  </div>
                </Card>
              ))}

              <Card
                id={editorsSection.id}
                data-doc-section="true"
                className="scroll-mt-32 space-y-4"
              >
                <h2 className="text-xl font-semibold text-[var(--text-0)]">{editorsSection.title}</h2>
                <p className="text-sm ui-muted">{editorsSection.summary}</p>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--text-0)]">Core Capabilities</h3>
                  <ListBlock items={editorsSection.capabilities} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--text-0)]">Editor Workflow</h3>
                  <StepsList steps={editorsSection.usageSteps} />
                </div>

                <div className="space-y-2">
                  {editorsSection.imagePlaceholders.map((placeholderText) => (
                    <PlaceholderLine key={placeholderText} markdownText={placeholderText} />
                  ))}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
