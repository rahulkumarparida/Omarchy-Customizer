const joinClasses = (...parts) => parts.filter(Boolean).join(" ");

export const Card = ({ as = "article", className, children, ...props }) => {
  const Component = as;
  return (
    <Component className={joinClasses("ui-panel p-4", className)} {...props}>
      {children}
    </Component>
  );
};

export const ActionButton = ({
  type = "button",
  variant = "ghost",
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: "ui-button-primary",
    danger: "ui-button-danger",
    ghost: "ui-button-ghost",
  };

  return (
    <button
      type={type}
      className={joinClasses(
        "ui-control ui-focus inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium",
        variants[variant] || variants.ghost,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const InputField = ({
  id,
  label,
  className,
  inputClassName,
  containerClassName,
  description,
  required,
  ...props
}) => {
  const describedBy = description ? `${id}-description` : undefined;

  return (
    <div className={joinClasses("flex flex-col gap-2", containerClassName)}>
      {label ? (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.12em] ui-muted">
          {label}
          {required ? <span className="ml-1 text-[var(--accent)]">*</span> : null}
        </label>
      ) : null}
      <input
        id={id}
        className={joinClasses(
          "ui-control ui-focus w-full px-3 py-2 text-sm",
          inputClassName,
          className,
        )}
        aria-describedby={describedBy}
        {...props}
      />
      {description ? (
        <p id={describedBy} className="text-xs ui-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export const TextAreaField = ({ id, label, className, description, ...props }) => {
  const describedBy = description ? `${id}-description` : undefined;

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.12em] ui-muted">
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        className={joinClasses("ui-control ui-focus min-h-[260px] w-full p-3 text-sm", className)}
        aria-describedby={describedBy}
        {...props}
      />
      {description ? (
        <p id={describedBy} className="text-xs ui-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export const SectionHeader = ({ eyebrow, title, description, actions }) => (
  <header className="mb-6 flex flex-col gap-4 border-b border-[var(--border-0)] pb-4 md:flex-row md:items-end md:justify-between">
    <div className="min-w-0 space-y-2">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">{eyebrow}</p>
      ) : null}
      <h1 className="ui-balance text-2xl font-semibold text-[var(--text-0)] md:text-3xl">{title}</h1>
      {description ? <p className="max-w-3xl text-sm ui-muted">{description}</p> : null}
    </div>
    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
  </header>
);

export const EmptyState = ({ title, description }) => (
  <Card className="flex min-h-36 flex-col items-center justify-center gap-2 text-center">
    <p className="text-base font-medium">{title}</p>
    <p className="text-sm ui-muted">{description}</p>
  </Card>
);

export const PageContainer = ({ children, className }) => (
  <div className={joinClasses("mx-auto w-full max-w-[1400px] px-4 py-6 md:px-6", className)}>{children}</div>
);
