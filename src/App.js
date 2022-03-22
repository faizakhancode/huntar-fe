import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import CameraView from "./pages/CameraView";
import GameManagement from "./pages/GameManagement";
import Home from "./pages/Home";
import PlayerInfo from "./pages/PlayerInfo";
import SelectLocations from "./pages/SelectLocations";
import SelectTheme from "./pages/SelectTheme";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camera-view" element={<CameraView />} />
          <Route path="/game-management" element={<GameManagement />} />
          <Route path="/player-info" element={<PlayerInfo />} />
          <Route path="/select-locations" element={<SelectLocations />} />
          <Route path="/select-theme" element={<SelectTheme />} />
        </Routes>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
