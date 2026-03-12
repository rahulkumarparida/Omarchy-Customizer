import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import ThemeCollection from "./pages/ThemeCollection.jsx";
import WaybarThemeCollection from "./components/WaybarCollection.jsx";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/collection" element={<ThemeCollection />} /> 
        <Route path="/collection/waybar" element={<WaybarThemeCollection />} />
      </Routes>
    </div>
  );
}

export default App;
