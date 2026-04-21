import { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "../ui/Dialog.jsx";
import joinClasses from "../../utils/joinClasses.js";

const DocsSearchModal = ({
  isOpen,
  query,
  results,
  onClose,
  onQueryChange,
  onSelectResult,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const safeIndex = useMemo(() => {
    if (!results.length) return -1;
    return Math.max(0, Math.min(activeIndex, results.length - 1));
  }, [activeIndex, results.length]);

  const handleInputKeyDown = (event) => {
    if (!results.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((previous) => (previous + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((previous) => (previous - 1 + results.length) % results.length);
      return;
    }

    if (event.key === "Enter" && safeIndex >= 0) {
      event.preventDefault();
      onSelectResult(results[safeIndex].id);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Search Documentation"
      description="Find sections, feature names, and step titles."
      contentClassName="max-w-3xl"
    >
      <div className="space-y-3">
        <label className="sr-only" htmlFor="docs-search-input">
          Search documentation
        </label>
        <input
          ref={inputRef}
          id="docs-search-input"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search by heading, feature, or step..."
          className="ui-control ui-focus w-full px-3 py-2 text-sm"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="max-h-[55vh] overflow-y-auto rounded-[var(--radius-surface)] border border-[var(--border-0)] bg-[var(--surface-1)]">
          {results.length ? (
            <ul className="divide-y divide-[var(--border-0)]">
              {results.map((result, index) => {
                const active = safeIndex === index;

                return (
                  <li key={`${result.id}-${result.type}`}>
                    <button
                      type="button"
                      className={joinClasses(
                        "w-full px-3 py-2 text-left transition-colors",
                        active ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--surface-2)]",
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => onSelectResult(result.id)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-[var(--text-0)]">{result.title}</p>
                        <span className="ui-pill text-[10px]">{result.type}</span>
                      </div>
                      {result.parentTitle ? <p className="mt-1 text-xs ui-muted">{result.parentTitle}</p> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-3 py-4 text-sm ui-muted">No matching sections found.</p>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default DocsSearchModal;
