import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { ActionButton } from "./primitives.jsx";
import joinClasses from "../../utils/joinClasses.js";

let openDialogStack = [];
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isTopDialog = (id) => openDialogStack[openDialogStack.length - 1] === id;

const removeDialogFromStack = (id) => {
  openDialogStack = openDialogStack.filter((entry) => entry !== id);
};

const getFocusableItems = (container) => {
  if (!container) return [];

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((item) => {
    const rect = item.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
};

const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  contentClassName,
  showCloseButton = false,
}) => {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const dialogId = useId();
  const descriptionId = `${dialogId}-description`;
  const titleId = `${dialogId}-title`;

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    openDialogStack.push(dialogId);

    const focusable = getFocusableItems(dialogRef.current);
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      dialogRef.current?.focus();
    }

    const handleGlobalEscape = () => {
      if (isTopDialog(dialogId)) {
        onClose();
      }
    };

    window.addEventListener("app:escape", handleGlobalEscape);

    return () => {
      window.removeEventListener("app:escape", handleGlobalEscape);
      removeDialogFromStack(dialogId);
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [dialogId, isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClose = () => {
    if (!isTopDialog(dialogId)) return;
    onClose();
  };

  const handleKeyDown = (event) => {
    if (!isTopDialog(dialogId)) return;

    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableItems = getFocusableItems(dialogRef.current);
    if (focusableItems.length === 0) {
      event.preventDefault();
      return;
    }

    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  };

  return createPortal(
    <div
      className={joinClasses(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-[2px]",
        className,
      )}
      onClick={handleBackdropClose}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={joinClasses(
          "ui-panel w-full max-w-2xl p-4 md:p-5",
          contentClassName,
        )}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {(title || showCloseButton) && (
          <header className="mb-4 flex items-start justify-between gap-4 border-b border-[var(--border-0)] pb-3">
            <div>
              {title ? (
                <h2 id={titleId} className="text-base font-semibold text-[var(--text-0)]">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p id={descriptionId} className="mt-1 text-sm ui-muted">
                  {description}
                </p>
              ) : null}
            </div>
            {showCloseButton ? (
              <ActionButton
                aria-label="Close dialog"
                onClick={onClose}
                className="px-2 py-1 text-xs"
              >
                Esc
              </ActionButton>
            ) : null}
          </header>
        )}
        {children}
      </section>
    </div>,
    document.body,
  );
};

export default Dialog;
