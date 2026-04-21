import { ActionButton, Card } from "./primitives.jsx";

const ThemeDetailView = ({
  title,
  preview,
  previewAlt,
  detailLabel,
  detailValue,
  onPrimary,
  onSecondary,
  primaryLabel = "Apply",
  secondaryLabel = "Add to Bucket",
  children,
}) => {
  return (
    <Card className="space-y-4 p-4 md:p-5">
      <header className="space-y-1 border-b border-[var(--border-0)] pb-3">
        <h2 className="text-xl font-semibold text-[var(--text-0)]">{title}</h2>
      </header>

      <div className="ui-surface aspect-[16/10] overflow-hidden p-2">
        {preview ? (
          <img
            src={preview}
            alt={previewAlt}
            loading="lazy"
            width="960"
            height="600"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm ui-muted">No preview available</div>
        )}
      </div>

      {detailLabel && detailValue ? (
        <section aria-label={detailLabel} className="space-y-2">
          <h3 className="text-sm font-semibold text-[var(--text-1)]">{detailLabel}</h3>
          <code className="ui-surface block whitespace-pre-wrap break-words p-3 text-xs text-[var(--text-0)]">
            {detailValue}
          </code>
        </section>
      ) : null}

      {children}

      <div className="grid gap-2 sm:grid-cols-2">
        <ActionButton onClick={onPrimary} variant="primary" aria-label={primaryLabel} className="justify-center">
          {primaryLabel}
        </ActionButton>
        <ActionButton onClick={onSecondary} aria-label={secondaryLabel} className="justify-center">
          {secondaryLabel}
        </ActionButton>
      </div>
    </Card>
  );
};

export default ThemeDetailView;
