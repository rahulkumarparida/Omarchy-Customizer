import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import api from "../../api/api.js";
import { changeWalkerTheme } from "../../utils/themeUpdateCalls.js";
import LoadingScreen from "./Loadingscreen.jsx";
import { announcePolite } from "../../utils/a11y.js";
import { getBuckets } from "../../utils/bucket.utils.js";
import AppShell from "./AppShell.jsx";
import ThemeDetailView from "./ThemeDetailView.jsx";
import { CreateModal } from "./CreateModal.jsx";
import AddToBucket from "./AddToBucket.jsx";

const WalkerDetailsPage = () => {
  const { id } = useParams();
  const { isWorking, setIsWorking } = useTheme();
  const [fetchDetail, setFetchDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [bucket, setBucket] = useState([]);

  useEffect(() => {
    const fetchWalkerDetails = async () => {
      try {
        const response = await api.get(`/api/theme/walker/${id}`);
        setFetchDetail(response.data.data);
      } catch {
        setFetchDetail(null);
      }
    };

    fetchWalkerDetails();
  }, [id]);

  const handleApply = async () => {
    setIsWorking(true);
    try {
      await changeWalkerTheme(Number(id));
      announcePolite("Walker theme applied.");
    } finally {
      setIsWorking(false);
    }
  };

  const openAddToBucket = async () => {
    try {
      const result = await getBuckets();
      setBucket(result.data.buckets || []);
    } catch {
      setBucket([]);
    }
    setOpen(true);
  };

  if (!fetchDetail || isWorking) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppShell
        title="Walker Theme Details"
        description="Review command output and apply the selected walker theme."
      >
        <ThemeDetailView
          title={fetchDetail.name}
          preview={fetchDetail.images?.[0]}
          previewAlt={`${fetchDetail.name} preview`}
          detailLabel="Theme Command"
          detailValue={fetchDetail.command}
          onPrimary={handleApply}
          onSecondary={openAddToBucket}
        >
          {fetchDetail.images?.length ? (
            <section aria-label="Additional previews" className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--text-1)]">Additional Previews</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {fetchDetail.images.map((img, idx) => (
                  <div key={`${img}-${idx}`} className="ui-surface aspect-[4/3] overflow-hidden p-1">
                    <img
                      src={img}
                      alt={`${fetchDetail.name} preview ${idx + 1}`}
                      loading="lazy"
                      width="320"
                      height="240"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </ThemeDetailView>
      </AppShell>

      <CreateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Theme to Bucket"
        description="Choose one bucket destination."
      >
        <AddToBucket
          payload={{ theme_id: Number(id) }}
          featureName="walker"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default WalkerDetailsPage;
