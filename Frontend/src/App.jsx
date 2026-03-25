import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import ThemeCollection from "./pages/ThemeCollection.jsx";
import WaybarThemeCollection from "./components/WaybarCollection.jsx";
import FastfetchCollection from "./components/FastfetchCollection.jsx";
import HyprlockCollection from "./components/HyprlockCollection.jsx";
import OmarchyThemeCollection from "./components/OmarchyThemeCollection.jsx";
import WalkerCollection from "./components/WalkerCollection.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import CollectionLayout from "./layouts/CollectionLayout.jsx";
import WaybarDetailsPage from "./components/ui/WaybarDetailsPage.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
    
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/collection" element={<ThemeCollection />} /> 
   
        <Route element={<CollectionLayout />}>
          <Route path="/collection/waybar" element={<WaybarThemeCollection />} />   
          <Route path="/collection/walker" element={<WalkerCollection />} /> 
          <Route path="/collection/fastfetch" element={<FastfetchCollection />} /> 
          <Route path="/collection/omarchy-themes" element={<OmarchyThemeCollection />} /> 
          <Route path="/collection/hyprlock" element={<HyprlockCollection />} /> 
          <Route path="/collection/waybar/:id" element={<WaybarDetailsPage/>} />
        </Route>
      </Routes>        


    </div>
  );
}

export default App;
