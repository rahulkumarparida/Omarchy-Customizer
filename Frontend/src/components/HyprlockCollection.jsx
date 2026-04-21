import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useTheme } from "../context/ThemeContext.jsx";
import LoadingScreen from "./ui/Loadingscreen.jsx";
import { HyprlockCollectionCard } from "./ui/ThemeCollectionCard.jsx";
import { CreateModal } from "./ui/CreateModal.jsx";
import AddToBucket from "./ui/AddToBucket.jsx";
import { getBuckets } from "../utils/bucket.utils.js";
import AppShell from "./ui/AppShell.jsx";

const HyprlockCollection = () => {
  const { isWorking } = useTheme();
  const [themesData, setThemesData] = useState(null);
  const [hyprlockCardData, setHyprlockCardData] = useState([]);
  const [open, setOpen] = useState(false);
  const [bucket, setBuckets] = useState([]);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const fetchHyprlockCollection = async () => {
      try {
        const response = await api.get("/api/theme/hyprlock");
        setThemesData(response.data);
        setHyprlockCardData(response.data.hyprlock_themes || []);
      } catch {
        setThemesData({});
        setHyprlockCardData([]);
      }
    };

    fetchHyprlockCollection();
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
        title="Hyprlock Themes"
        description={`Themes developed by ${themesData?.credits_to || "community maintainers"}.`}
      >
        <section className="space-y-4" aria-label="Hyprlock themes list">
          <p className="text-sm ui-muted">Custom user image mapping is still in progress for this category.</p>

          {themesData?.follow ? (
            <a
              href={themesData.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-link inline-flex text-sm"
              aria-label="Open Hyprlock author profile"
            >
              Open Creator Profile
            </a>
          ) : null}

          {hyprlockCardData.length ? (
            <div className="ui-card-grid">
              {hyprlockCardData.map((theme) => (
                <HyprlockCollectionCard key={theme.id} data={theme} addToBucket={handleAddToBuckets} />
              ))}
            </div>
          ) : (
            <p className="ui-muted">No hyprlock themes were returned by the API.</p>
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
          featureName="hyprlock"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default HyprlockCollection;
