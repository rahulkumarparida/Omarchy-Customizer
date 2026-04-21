import { useParams } from "react-router-dom";
import api from "../../api/api.js";
import { useEffect, useState } from "react";
import { changeHyprlockTheme } from "../../utils/themeUpdateCalls.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import LoadingScreen from "./Loadingscreen.jsx";
import { announcePolite } from "../../utils/a11y.js";
import { getBuckets } from "../../utils/bucket.utils.js";
import AppShell from "./AppShell.jsx";
import ThemeDetailView from "./ThemeDetailView.jsx";
import { CreateModal } from "./CreateModal.jsx";
import AddToBucket from "./AddToBucket.jsx";

const HyprlockDetailsPage = () => {
  const { id } = useParams();
  const { isWorking, setIsWorking } = useTheme();
  const [fetchDetail, setFetchDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [bucket, setBucket] = useState([]);

  useEffect(() => {
    const fetchHyprlockDetails = async () => {
      try {
        const response = await api.get(`/api/theme/hyprlock/${id}`);
        setFetchDetail(response.data.data);
      } catch {
        setFetchDetail(null);
      }
    };

    fetchHyprlockDetails();
  }, [id]);

  const handleApply = async () => {
    setIsWorking(true);
    try {
      await changeHyprlockTheme(Number(id));
      announcePolite("Hyprlock theme applied.");
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
        title="Hyprlock Theme Details"
        description="Apply the selected lockscreen style or add it to a bucket preset."
      >
        <ThemeDetailView
          title={fetchDetail.name}
          preview={fetchDetail.preview_image}
          previewAlt={`${fetchDetail.name} preview`}
          onPrimary={handleApply}
          onSecondary={openAddToBucket}
        />
      </AppShell>

      <CreateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Theme to Bucket"
        description="Choose one bucket destination."
      >
        <AddToBucket
          payload={{ theme_id: Number(id) }}
          featureName="hyprlock"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default HyprlockDetailsPage;
