import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

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

import WaybarDetailsPage from "./components/ui/WaybarDetailsPage.jsx";
import WalkerDetailsPage from "./components/ui/WalkerDetailsPage.jsx";
import HyprlockDetailsPage from "./components/ui/HyprlockDetailsPage.jsx"
import OmarchyThemeDetailsPage from "./components/ui/OmarchyThemeDetailsPage.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/collection" element={<ThemeCollection />} /> 


      <Route element={<BucketCollectionLayout/>}>
      <Route path="/buckets" element={<BucketCollectionPage />} />   

        <Route element={<CollectionLayout />}>
          <Route path="/collection/waybar" element={<WaybarThemeCollection />} />   
          <Route path="/collection/waybar/:id" element={<WaybarDetailsPage/>} />  
          <Route path="/collection/walker" element={<WalkerCollection />} /> 
          <Route path="/collection/walker/:id" element={<WalkerDetailsPage/>} />  
          <Route path="/collection/hyprlock" element={<HyprlockCollection />} /> 
          <Route path="/collection/hyprlock/:id" element={<HyprlockDetailsPage />} /> 
          <Route path="/collection/omarchy-themes" element={<OmarchyThemeCollection />} />  
          <Route path="/collection/omarchy-themes/:id" element={<OmarchyThemeDetailsPage/>}  />
          <Route path="/collection/fastfetch" element={<FastfetchCollection />} />   
          
          
        </Route>
      </Route>  

      </Routes>        


    </div>
  );
}

export default App;
