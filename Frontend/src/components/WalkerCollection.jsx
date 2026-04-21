import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import api from "../api/api.js";
import { WalkerCollectionCard } from "./ui/ThemeCollectionCard.jsx";
import LoadingScreen from "./ui/Loadingscreen.jsx";
import { CreateModal } from "./ui/CreateModal.jsx";
import AddToBucket from "./ui/AddToBucket.jsx";
import { getBuckets } from "../utils/bucket.utils.js";
import AppShell from "./ui/AppShell.jsx";

const WalkerCollection = () => {
  const { isWorking } = useTheme();
  const [themesData, setThemesData] = useState(null);
  const [walkerCardData, setWalkerCardData] = useState([]);
  const [open, setOpen] = useState(false);
  const [bucket, setBuckets] = useState([]);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const fetchWalkerCollection = async () => {
      try {
        const response = await api.get("/api/theme/walker");
        setThemesData(response.data);
        setWalkerCardData(response.data.walker_themes?.themes || []);
      } catch {
        setThemesData({});
        setWalkerCardData([]);
      }
    };

    fetchWalkerCollection();
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
        title="Walker Themes"
        description={`Themes developed by ${themesData?.credits_to || "community maintainers"}.`}
      >
        <section className="space-y-4" aria-label="Walker themes list">
          {themesData?.follow ? (
            <a
              href={themesData.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-link inline-flex text-sm"
              aria-label="Open Walker author profile"
            >
              Open Creator Profile
            </a>
          ) : null}

          {walkerCardData.length ? (
            <div className="ui-card-grid">
              {walkerCardData.map((theme) => (
                <WalkerCollectionCard key={theme.id} data={theme} addToBucket={handleAddToBuckets} />
              ))}
            </div>
          ) : (
            <p className="ui-muted">No walker themes were returned by the API.</p>
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
          featureName="walker"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default WalkerCollection;
