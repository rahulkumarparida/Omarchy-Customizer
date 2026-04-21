import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Homepage from "./pages/Homepage.jsx";
import ThemeCollection from "./pages/ThemeCollection.jsx";
import WaybarThemeCollection from "./components/WaybarCollection.jsx";
import FastfetchCollection from "./components/FastfetchCollection.jsx";
import HyprlockCollection from "./components/HyprlockCollection.jsx";
import OmarchyThemeCollection from "./components/OmarchyThemeCollection.jsx";
import WalkerCollection from "./components/WalkerCollection.jsx";
import BucketCollectionPage from "./pages/BucketCollectionPage.jsx";
import CollectionLayout from "./layouts/CollectionLayout.jsx";
import BucketCollectionLayout from "./layouts/BucketLayout.jsx";
import BackupPage from "./pages/BackupPage.jsx";
import FileExplorerUI from "./pages/EditorPage.jsx";
import DocumentationPage from "./pages/DocumentationPage.jsx";
import WaybarDetailsPage from "./components/ui/WaybarDetailsPage.jsx";
import WalkerDetailsPage from "./components/ui/WalkerDetailsPage.jsx";
import HyprlockDetailsPage from "./components/ui/HyprlockDetailsPage.jsx";
import OmarchyThemeDetailsPage from "./components/ui/OmarchyThemeDetailsPage.jsx";
import { useGlobalHotkeys } from "./hooks/useGlobalHotkeys.js";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useGlobalHotkeys();

  return (
    <div className="min-h-screen bg-black text-[var(--text-0)]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2500}
        toastClassName="ui-panel"
        bodyClassName="text-sm"
      />

      <div id="app-live-region" aria-live="polite" className="sr-only" />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/collection" element={<ThemeCollection />} />

        <Route element={<BucketCollectionLayout />}>
          <Route path="/buckets" element={<BucketCollectionPage />} />
          <Route path="/backups" element={<BackupPage />} />
          <Route path="/editor" element={<FileExplorerUI />} />

          <Route element={<CollectionLayout />}>
            <Route path="/collection/waybar" element={<WaybarThemeCollection />} />
            <Route path="/collection/waybar/:id" element={<WaybarDetailsPage />} />
            <Route path="/collection/walker" element={<WalkerCollection />} />
            <Route path="/collection/walker/:id" element={<WalkerDetailsPage />} />
            <Route path="/collection/hyprlock" element={<HyprlockCollection />} />
            <Route path="/collection/hyprlock/:id" element={<HyprlockDetailsPage />} />
            <Route path="/collection/omarchy-themes" element={<OmarchyThemeCollection />} />
            <Route path="/collection/omarchy-themes/:id" element={<OmarchyThemeDetailsPage />} />
            <Route path="/collection/fastfetch" element={<FastfetchCollection />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
