import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useTheme } from "../context/ThemeContext.jsx";
import LoadingScreen from "./ui/Loadingscreen.jsx";
import { OmarchyCollectionCard } from "./ui/ThemeCollectionCard.jsx";
import { CreateModal } from "./ui/CreateModal.jsx";
import AddToBucket from "./ui/AddToBucket.jsx";
import { getBuckets } from "../utils/bucket.utils.js";
import AppShell from "./ui/AppShell.jsx";

const OmarchyThemeCollection = () => {
  const { isWorking } = useTheme();
  const [themesData, setThemesData] = useState([]);
  const [fetchData, setFetchData] = useState({});
  const [open, setOpen] = useState(false);
  const [bucket, setBuckets] = useState([]);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const fetchOmarchyCollection = async () => {
      try {
        const response = await api.get("/api/theme/hypr");
        setThemesData(response.data.omarchy_themes || []);
        setFetchData(response.data || {});
      } catch {
        setThemesData([]);
        setFetchData({});
      }
    };

    fetchOmarchyCollection();
  }, []);

  const handleAddToBuckets = async (id) => {
    try {
      const result = await getBuckets();
      setBuckets(result.data.buckets || []);
    } catch {
      setBuckets([]);
    }

    setPayload({ theme_id: id });
    setOpen(true);
  };

  if (isWorking) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppShell
        title="Omarchy Themes"
        description={`Themes developed by ${fetchData?.credits_to || "community maintainers"}.`}
      >
        <section className="space-y-4" aria-label="Omarchy themes list">
          {fetchData?.follow ? (
            <a
              href={fetchData.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-link inline-flex text-sm"
              aria-label="Open Omarchy author profile"
            >
              Open Creator Profile
            </a>
          ) : null}

          {themesData.length ? (
            <div className="ui-card-grid">
              {themesData.map((theme) => (
                <OmarchyCollectionCard key={theme.id} card={theme} addToBucket={handleAddToBuckets} />
              ))}
            </div>
          ) : (
            <p className="ui-muted">No Omarchy themes were returned by the API.</p>
          )}
        </section>
      </AppShell>

      <CreateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Theme to Bucket"
        description="Choose one bucket destination."
      >
        <AddToBucket
          payload={payload}
          featureName="omarchy-theme"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default OmarchyThemeCollection;
