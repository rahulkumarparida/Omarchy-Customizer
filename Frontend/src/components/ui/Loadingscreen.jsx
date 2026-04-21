const LoadingScreen = () => {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center px-4">
      <div className="ui-panel flex w-full max-w-md flex-col items-center gap-4 p-6 text-center">
        <div className="h-10 w-10 animate-spin rounded-[var(--radius-control)] border-2 border-[var(--border-1)] border-t-[var(--accent)]" />
        <h2 className="text-lg font-semibold">Applying Theme…</h2>
        <p className="text-sm ui-muted">Please wait while the configuration updates.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
