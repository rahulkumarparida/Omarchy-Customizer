import { useEffect } from "react";

const isEditableTarget = (target) => {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName.toLowerCase();
  if (target.isContentEditable) return true;

  return tagName === "input" || tagName === "textarea" || tagName === "select";
};

const focusGlobalSearch = () => {
  const searchField = document.querySelector('[data-global-search="true"]');
  if (searchField instanceof HTMLElement) {
    searchField.focus();
    return true;
  }

  return false;
};

const openCommandPalette = () => {
  const trigger = document.querySelector('[data-command-palette-trigger="true"]');
  if (trigger instanceof HTMLButtonElement) {
    trigger.click();
    return true;
  }

  return false;
};

const triggerEditorSave = () => {
  const saveButton = document.querySelector('[data-editor-save="true"]');
  if (saveButton instanceof HTMLButtonElement) {
    saveButton.click();
    return true;
  }

  return false;
};

export const useGlobalHotkeys = () => {
  useEffect(() => {
    const onKeyDown = (event) => {
      const lower = event.key.toLowerCase();
      const hasMeta = event.metaKey || event.ctrlKey;
      const editable = isEditableTarget(event.target);

      if (hasMeta && lower === "k") {
        event.preventDefault();
        const openedPalette = openCommandPalette();
        if (!openedPalette) {
          focusGlobalSearch();
        }
        return;
      }

      if (!hasMeta && event.key === "/" && !editable) {
        event.preventDefault();
        const openedPalette = openCommandPalette();
        if (!openedPalette) {
          focusGlobalSearch();
        }
        return;
      }

      if (event.key === "Escape") {
        window.dispatchEvent(new Event("app:escape"));
        return;
      }

      if (hasMeta && lower === "s") {
        const didSave = triggerEditorSave();
        if (didSave) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
};
