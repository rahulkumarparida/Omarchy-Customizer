import { toast } from "react-toastify";
import { getBucketObj, bucketPayloadCreate, addBucket } from "../../utils/bucket.utils.js";
import { announcePolite } from "../../utils/a11y.js";
import { ActionButton, Card, EmptyState } from "./primitives.jsx";

const AddToBucket = ({ data, onClose, payload, featureName }) => {
  const addDataToBucket = async (id) => {
    try {
      const result = await getBucketObj(id);
      const newData = bucketPayloadCreate(result.data.data, featureName, payload);
      await addBucket(result.data.filename, newData);
      toast.success("Theme added to bucket.");
      announcePolite("Theme added to selected bucket.");
      onClose();
    } catch {
      toast.error("Failed to add theme to bucket.");
      announcePolite("Failed to add theme to bucket.");
    }
  };

  if (!data?.length) {
    return <EmptyState title="No Buckets Available" description="Create a bucket first, then try again." />;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm ui-muted">Choose where this theme should be stored.</p>
      <ul className="grid gap-3 sm:grid-cols-2" role="list">
        {data.map((bucket) => (
          <li key={bucket.id}>
            <Card className="flex h-full flex-col gap-3">
              <p className="text-sm font-medium text-[var(--text-0)]">{bucket.name}</p>
              <ActionButton
                onClick={() => addDataToBucket(bucket.id)}
                aria-label={`Add to bucket ${bucket.name}`}
                className="justify-center"
              >
                Add to This Bucket
              </ActionButton>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddToBucket;
