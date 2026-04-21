import { useParams } from "react-router-dom";
import api from "../../api/api.js";
import { useEffect, useState } from "react";
import { changeWaybarTheme } from "../../utils/themeUpdateCalls.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import LoadingScreen from "./Loadingscreen.jsx";
import { announcePolite } from "../../utils/a11y.js";
import { getBuckets } from "../../utils/bucket.utils.js";
import AppShell from "./AppShell.jsx";
import ThemeDetailView from "./ThemeDetailView.jsx";
import { CreateModal } from "./CreateModal.jsx";
import AddToBucket from "./AddToBucket.jsx";

const WaybarDetailsPage = () => {
  const { id } = useParams();
  const { isWorking, setIsWorking } = useTheme();
  const [fetchDetail, setFetchDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [bucket, setBucket] = useState([]);

  useEffect(() => {
    const fetchWaybarDetails = async () => {
      try {
        const response = await api.get(`/api/theme/waybar/${id}`);
        setFetchDetail(response.data.data);
      } catch {
        setFetchDetail(null);
      }
    };

    fetchWaybarDetails();
  }, [id]);

  const handleApply = async () => {
    setIsWorking(true);
    try {
      await changeWaybarTheme(Number(id));
      announcePolite("Waybar theme applied.");
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
        title="Waybar Theme Details"
        description="Review theme command and apply the selected variant."
      >
        <ThemeDetailView
          title={fetchDetail.theme_name}
          preview={fetchDetail.image_link}
          previewAlt={`${fetchDetail.theme_name} preview`}
          detailLabel="Theme Command"
          detailValue={fetchDetail.theme_cmd}
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
          featureName="waybar"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default WaybarDetailsPage;
