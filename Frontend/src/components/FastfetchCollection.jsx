import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useTheme } from "../context/ThemeContext.jsx";
import LoadingScreen from "./ui/Loadingscreen.jsx";
import { FastfetchCollectionCard } from "./ui/ThemeCollectionCard.jsx";
import { CreateModal } from "./ui/CreateModal.jsx";
import AddToBucket from "./ui/AddToBucket.jsx";
import { getBuckets } from "../utils/bucket.utils.js";
import AppShell from "./ui/AppShell.jsx";

const FastfetchCollection = () => {
  const { isWorking } = useTheme();
  const [themesData, setThemesData] = useState(null);
  const [fastfetchConfigData, setFastfetchConfigData] = useState([]);
  const [fastfetchLogoData, setFastfetchLogoData] = useState([]);
  const [open, setOpen] = useState(false);
  const [bucket, setBuckets] = useState([]);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const fetchFastfetchCollection = async () => {
      try {
        const response = await api.get("/api/fastfetch");
        setThemesData(response.data);
        setFastfetchConfigData(response.data.fastfetch_data?.theme_data || []);
        setFastfetchLogoData(response.data.fastfetch_logo_data?.theme_data || []);
      } catch {
        setThemesData({});
        setFastfetchConfigData([]);
        setFastfetchLogoData([]);
      }
    };

    fetchFastfetchCollection();
  }, []);

  const handleAddToBuckets = async (name, type) => {
    try {
      const result = await getBuckets();
      setBuckets(result.data.buckets || []);
    } catch {
      setBuckets([]);
    }

    setPayload({
      config_name: type === "config" ? name : null,
      logo_name: type === "logo" ? name : null,
    });
    setOpen(true);
  };

  if (isWorking) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppShell
        title="Fastfetch Collection"
        description={`Themes developed by ${themesData?.credits_to || "community maintainers"}.`}
      >
        <section className="space-y-6" aria-label="Fastfetch theme list">
          {themesData?.follow ? (
            <a
              href={themesData.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-link inline-flex text-sm"
              aria-label="Open Fastfetch author profile"
            >
              Open Creator Profile
            </a>
          ) : null}

          <section className="space-y-3" aria-label="Fastfetch config collection">
            <h2 className="text-lg font-semibold">Config Collection</h2>
            <p className="text-sm ui-muted">Change style and color arrangement of fastfetch output.</p>
            {fastfetchConfigData.length ? (
              <div className="ui-card-grid">
                {fastfetchConfigData.map((theme) => (
                  <FastfetchCollectionCard
                    key={theme.id}
                    data={theme}
                    type={themesData?.fastfetch_data?.themes_for}
                    addToBucket={handleAddToBuckets}
                  />
                ))}
              </div>
            ) : (
              <p className="ui-muted">No fastfetch config themes were returned by the API.</p>
            )}
          </section>

          <section className="space-y-3" aria-label="Fastfetch logo collection">
            <h2 className="text-lg font-semibold">Logo Collection</h2>
            <p className="text-sm ui-muted">Replace the default fastfetch logo with custom options.</p>
            {fastfetchLogoData.length ? (
              <div className="ui-card-grid">
                {fastfetchLogoData.map((theme) => (
                  <FastfetchCollectionCard
                    key={theme.id}
                    data={theme}
                    type={themesData?.fastfetch_logo_data?.themes_for}
                    addToBucket={handleAddToBuckets}
                  />
                ))}
              </div>
            ) : (
              <p className="ui-muted">No fastfetch logo themes were returned by the API.</p>
            )}
          </section>
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
          featureName="fastfetch"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default FastfetchCollection;
