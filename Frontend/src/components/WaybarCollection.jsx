import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useTheme } from "../context/ThemeContext.jsx";
import LoadingScreen from "./ui/Loadingscreen.jsx";
import { WaybarCollectionCard } from "./ui/ThemeCollectionCard.jsx";
import { CreateModal } from "./ui/CreateModal.jsx";
import { getBuckets } from "../utils/bucket.utils.js";
import AddToBucket from "./ui/AddToBucket.jsx";
import AppShell from "./ui/AppShell.jsx";

const WaybarThemeCollection = () => {
  const { isWorking } = useTheme();
  const [open, setOpen] = useState(false);
  const [bucket, setBuckets] = useState([]);
  const [payload, setPayload] = useState(null);
  const [themesData, setThemesData] = useState(null);
  const [waybarCardData, setWaybarCardData] = useState([]);

  useEffect(() => {
    const fetchWaybarCollection = async () => {
      try {
        const response = await api.get("/api/theme/waybar");
        setThemesData(response.data);
        setWaybarCardData(response.data.waybar_themes || []);
      } catch {
        setThemesData({});
        setWaybarCardData([]);
      }
    };

    fetchWaybarCollection();
  }, []);

  const handleAddToBuckets = async (id) => {
    try {
      const result = await getBuckets();
      setBuckets(result.data.buckets || []);
      setPayload({ theme_id: id });
      setOpen(true);
    } catch {
      setBuckets([]);
      setPayload({ theme_id: id });
      setOpen(true);
    }
  };

  if (isWorking) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppShell
        title="Waybar Themes"
        description={`Themes developed by ${themesData?.credits_to || "community maintainers"}.`}
      >
        <section className="space-y-4" aria-label="Waybar themes list">
          {themesData?.follow ? (
            <a
              href={themesData.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-link inline-flex text-sm"
              aria-label="Open Waybar author profile"
            >
              Open Creator Profile
            </a>
          ) : null}

          {waybarCardData.length ? (
            <div className="ui-card-grid">
              {waybarCardData.map((theme) => (
                <WaybarCollectionCard key={theme.id} data={theme} addToBucket={handleAddToBuckets} />
              ))}
            </div>
          ) : (
            <p className="ui-muted">No waybar themes were returned by the API.</p>
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
          featureName="waybar"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default WaybarThemeCollection;
