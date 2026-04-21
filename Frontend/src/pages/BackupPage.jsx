import { useState, useEffect } from "react";
import AppShell from "../components/ui/AppShell.jsx";
import {
  getAllBackupFiles,
  getAllConfigFiles,
  applyBackup,
  deleteBackup,
} from "../utils/backup.utils.js";
import LoadingScreen from "../components/ui/Loadingscreen.jsx";
import BackupFilesModal from "../components/ui/BackupFilesModal.jsx";
import { ActionButton, Card, EmptyState } from "../components/ui/primitives.jsx";
import { announcePolite } from "../utils/a11y.js";


const BackupCard = ({ name, onApply, onDelete }) => (
  <Card className="flex h-full flex-col gap-3">
    <h2 className="text-lg font-semibold break-words">{name}</h2>
    <div className="grid gap-2 sm:grid-cols-2">
      <ActionButton onClick={onApply} variant="primary" aria-label={`Apply backup ${name}`}>
        Apply
      </ActionButton>
      <ActionButton onClick={onDelete} variant="danger" aria-label={`Delete backup ${name}`}>
        Delete
      </ActionButton>
    </div>
  </Card>
);

const BackupPage = () => {
  const [fetchData, setFetchData] = useState(null);
  const [open, setOpen] = useState(false);
  const [fetchFilesData, setFetchFilesData] = useState([]);
  const [changesDone, setChangesDone] = useState(false);

  const refreshBackupData = async () => {
    try {
      const backupResult = await getAllBackupFiles();
      setFetchData(backupResult);
    } catch {
      setFetchData({ backups: [] });
    }

    try {
      const configResult = await getAllConfigFiles();
      setFetchFilesData(configResult || []);
    } catch {
      setFetchFilesData([]);
    }
  };

  useEffect(() => {
    refreshBackupData();
  }, []);

  useEffect(() => {
    if (!changesDone) {
      refreshBackupData();
    }
  }, [changesDone]);

  const handleApply = async (name) => {
    setChangesDone(true);
    try {
      await applyBackup(name);
      announcePolite("Backup applied.");
    } finally {
      setChangesDone(false);
      await refreshBackupData();
    }
  };

  const handleDelete = async (name) => {
    setChangesDone(true);
    try {
      await deleteBackup(name);
      announcePolite("Backup deleted.");
    } finally {
      setChangesDone(false);
      await refreshBackupData();
    }
  };

  if (!fetchData || changesDone) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppShell
        title="My Backups"
        description="Create, apply, and clean backup snapshots for your config files."
        actions={
          <ActionButton onClick={() => setOpen(true)} variant="primary" aria-label="Create new backup">
            New Backup
          </ActionButton>
        }
      >
        {fetchData.backups?.length ? (
          <section className="ui-card-grid" aria-label="Backup list">
            {fetchData.backups.map((backup) => (
              <BackupCard
                key={backup}
                name={backup}
                onApply={() => handleApply(backup)}
                onDelete={() => handleDelete(backup)}
              />
            ))}
          </section>
        ) : (
          <EmptyState title="No Backups Yet" description="Create a backup to protect your current config state." />
        )}
      </AppShell>

      <BackupFilesModal
        fetchFilesData={fetchFilesData}
        open={open}
        setOpen={setOpen}
        setChangesDone={setChangesDone}
      />
    </>
  );
};

export default BackupPage;
