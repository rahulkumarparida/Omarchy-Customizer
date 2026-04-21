import { useParams } from "react-router-dom";
import api from "../../api/api.js";
import { useEffect, useState } from "react";
import { applyOmarchyTheme } from "../../utils/themeUpdateCalls.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import LoadingScreen from "./Loadingscreen.jsx";
import { announcePolite } from "../../utils/a11y.js";
import { getBuckets } from "../../utils/bucket.utils.js";
import AppShell from "./AppShell.jsx";
import ThemeDetailView from "./ThemeDetailView.jsx";
import { CreateModal } from "./CreateModal.jsx";
import AddToBucket from "./AddToBucket.jsx";

const OmarchyThemeDetailsPage = () => {
  const { id } = useParams();
  const { isWorking, setIsWorking } = useTheme();
  const [fetchDetail, setFetchDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [bucket, setBucket] = useState([]);

  useEffect(() => {
    const fetchOmarchyDetails = async () => {
      try {
        const response = await api.get(`/api/theme/hypr/${id}`);
        setFetchDetail(response.data.data);
      } catch {
        setFetchDetail(null);
      }
    };

    fetchOmarchyDetails();
  }, [id]);

  const handleApply = async () => {
    setIsWorking(true);
    try {
      await applyOmarchyTheme(Number(id));
      announcePolite("Omarchy theme applied.");
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
        title="Omarchy Theme Details"
        description="Review repository source and apply the selected Omarchy theme."
      >
        <ThemeDetailView
          title={fetchDetail.title}
          preview={fetchDetail.theme_image}
          previewAlt={`${fetchDetail.title} preview`}
          detailLabel="Theme Repository"
          detailValue={fetchDetail.github_repo}
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
          featureName="omarchy-theme"
          data={bucket}
          onClose={() => setOpen(false)}
        />
      </CreateModal>
    </>
  );
};

export default OmarchyThemeDetailsPage;
