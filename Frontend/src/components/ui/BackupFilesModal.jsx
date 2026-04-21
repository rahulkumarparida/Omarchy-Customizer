import { useState } from "react";
import { CreateModal } from "./CreateModal.jsx";
import { createBackupFile } from "../../utils/backup.utils.js";
import { ActionButton, InputField } from "./primitives.jsx";
import { announcePolite } from "../../utils/a11y.js";
import { toast } from "react-toastify";

const BackupFilesModal = ({ fetchFilesData, open, setOpen, setChangesDone }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [backupFilename, setBackupFilename] = useState("");

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  
  const handleAddToBackup = async () => {
    if (!backupFilename.trim()) {
      announcePolite("Backup name is required.");
      return;
    }

    const selectedObjects = (fetchFilesData.data || []).filter((item) => selectedIds.includes(item.id));
    const payload = {
      selected_items_list: selectedObjects,
      filename: backupFilename.trim(),
    };

    setChangesDone(true);
    setOpen(false);

    try {
      await createBackupFile(payload);
      announcePolite("Backup file created.");
      setSelectedIds([]);
      setBackupFilename("");
      toast.success("Backup is saved in the Downloads/ directory.")
    } catch {
      announcePolite("Failed to create backup file.");
      toast.error("Failed to create backup file.")
    } finally {
      setChangesDone(false);
    }
  };

  return (
    <CreateModal
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Create Backup"
      description="Select files and create a new backup set."
      contentClassName="max-w-4xl"
    >
      <div className="space-y-4">
        <InputField
          id="backup-name"
          label="Backup Name"
          name="backup_name"
          autoComplete="off"
          aria-label="Backup name"
          value={backupFilename}
          onChange={(event) => setBackupFilename(event.target.value)}
          placeholder="daily-config-backup…"
        />

        <ul className="grid max-h-[45vh] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {fetchFilesData && (fetchFilesData.data || []).map((option) => {
            const isSelected = selectedIds.includes(option.id);
             
              
            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => handleToggle(option.id)}
                  className={`ui-control ui-focus flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm ${
                    isSelected ? "border-[var(--accent)] text-[var(--text-0)]" : "text-[var(--text-1)]"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Toggle ${option.item_name}`}
                >
                  <span className="min-w-0 truncate">{option.item_name}</span>
                  <span className="ui-pill">{isSelected ? "Selected" : "Add"}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <ActionButton
          onClick={handleAddToBackup}
          variant="primary"
          className="w-full justify-center"
          aria-label="Create backup with selected files"
        >
          Create Backup
        </ActionButton>
      </div>
    </CreateModal>
  );
};

export default BackupFilesModal;
