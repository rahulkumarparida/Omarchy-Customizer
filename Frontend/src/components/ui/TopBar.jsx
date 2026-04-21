import { Link } from "react-router-dom";

const TopBar = ({ title, description, actions }) => (
  <header className="border-b border-[var(--border-0)] bg-black/40 px-4 py-4 backdrop-blur-sm md:px-6">
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Omarchy Customizer</p>
        <h1 className="ui-balance mt-1 text-xl font-semibold text-[var(--text-0)] md:text-2xl">{title}</h1>
        {description ? <p className="mt-1 max-w-3xl text-sm ui-muted">{description}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {actions}
        <Link className="ui-link" to="/collection">
          Collection
        </Link>
        <Link className="ui-link" to="/buckets">
          Buckets
        </Link>
        <Link className="ui-link" to="/docs">
          Docs
        </Link>
      </div>
    </div>
  </header>
);

export default TopBar;
