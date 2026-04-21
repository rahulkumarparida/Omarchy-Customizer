import { useState, useEffect } from "react";
import {
  getBuckets,
  getBucketObj,
  addBucket,
  applyBucket,
  removeBucket,
} from "../utils/bucket.utils.js";
import { useBucket } from "../context/BucketContext.jsx";
import LoadingScreen from "../components/ui/Loadingscreen.jsx";
import { CreateModal } from "../components/ui/CreateModal.jsx";
import AppShell from "../components/ui/AppShell.jsx";
import { ActionButton, Card, EmptyState, InputField } from "../components/ui/primitives.jsx";
import { announcePolite } from "../utils/a11y.js";

const BucketCard = ({ id, name, onApply, onDelete }) => {
  const [bucketData, setBucketData] = useState("");

  useEffect(() => {
    const fetchBucket = async () => {
      try {
        const result = await getBucketObj(id);
        setBucketData(JSON.stringify(result.data.data, null, 2));
      } catch {
        setBucketData("{}");
      }
    };

    fetchBucket();
  }, [id]);

  return (
    <Card className="flex h-full flex-col gap-3">
      <h2 className="text-lg font-semibold">
        {id}. {name.split(".")[0]}
      </h2>

      <pre className="ui-surface min-h-28 overflow-x-auto p-3 text-xs text-[var(--text-1)]">{bucketData}</pre>

      <div className="grid gap-2 sm:grid-cols-2">
        <ActionButton onClick={onApply} variant="primary" aria-label={`Apply bucket ${name}`}>
          Apply
        </ActionButton>
        <ActionButton onClick={onDelete} variant="danger" aria-label={`Delete bucket ${name}`}>
          Delete
        </ActionButton>
      </div>
    </Card>
  );
};

const BucketCollectionPage = () => {
  const { applyingBucket, setApplyingBucket } = useBucket();
  const [fetchData, setFetchData] = useState(null);
  const [bucketName, setBucketName] = useState("");
  const [open, setOpen] = useState(false);

  const refreshBuckets = async () => {
    try {
      const result = await getBuckets();
      setFetchData(result.data);
    } catch {
      setFetchData({ buckets: [] });
    }
  };

  useEffect(() => {
    refreshBuckets();
  }, []);

  const handleApplyTheme = async (id) => {
    setApplyingBucket(true);
    try {
      await applyBucket(id);
      announcePolite("Bucket applied.");
    } finally {
      setApplyingBucket(false);
    }
  };

  const handleDeleteBucket = async (id) => {
    await removeBucket(id);
    announcePolite("Bucket deleted.");
    await refreshBuckets();
  };

  const addBucketName = async () => {
    if (!bucketName.trim()) {
      announcePolite("Bucket name is required.");
      return;
    }

    await addBucket(bucketName.trim());
    setBucketName("");
    setOpen(false);
    announcePolite("Bucket created.");
    await refreshBuckets();
  };

  if (!fetchData || applyingBucket) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppShell
        title="My Buckets"
        description="Create reusable theme presets and apply them with one action."
        actions={
          <ActionButton onClick={() => setOpen(true)} aria-label="Create bucket" variant="primary">
            New Bucket
          </ActionButton>
        }
      >
        {fetchData.buckets?.length ? (
          <section className="ui-card-grid" aria-label="Bucket list">
            {fetchData.buckets.map((bucket) => (
              <BucketCard
                key={bucket.id}
                {...bucket}
                onApply={() => handleApplyTheme(bucket.id)}
                onDelete={() => handleDeleteBucket(bucket.id)}
              />
            ))}
          </section>
        ) : (
          <EmptyState title="No Buckets Yet" description="Create your first bucket to store multi-theme presets." />
        )}
      </AppShell>

      <CreateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create Bucket"
        description="Provide a file-friendly bucket name."
      >
        <div className="space-y-3">
          <InputField
            id="bucket-name"
            label="Bucket Name"
            name="bucket_name"
            autoComplete="off"
            placeholder="my-dev-setup…"
            value={bucketName}
            onChange={(event) => setBucketName(event.target.value)}
            aria-label="Bucket name"
          />
          <ActionButton onClick={addBucketName} variant="primary" className="w-full justify-center">
            Add Bucket
          </ActionButton>
        </div>
      </CreateModal>
    </>
  );
};

export default BucketCollectionPage;
