import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import PlayerView from "./pages/PlayerView";
import ManageGame from "./pages/ManageGame";
import Home from "./pages/Home";
import PlayerInfo from "./pages/PlayerInfo";
import SelectLocations from "./pages/SelectLocations";
import SetUpGame from "./pages/SetUpGame";
import themesJSON from "./themes.json";

function App() {
  // Background data
  const [themes, setThemes] = useState(themesJSON);
  const [newGame, setNewGame] = useState({});

  // User inputs and input states
  const [gameInputs, setGameInputs] = useState({});
  const [themeIndex, setThemeIndex] = useState(0);

  // Game state
  const [game, setGame] = useState({});

  // User notifications (pop ups, etc)
  const [displaySafetyPopUp, setDisplaySafetyPopUp] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/player-view"
            element={
              <PlayerView
                setDisplaySafetyPopUp={setDisplaySafetyPopUp}
                displaySafetyPopUp={displaySafetyPopUp}
              />
            }
          />
          <Route
            path="/manage-game"
            element={<ManageGame themes={themes} themeIndex={themeIndex} />}
          />
          <Route
            path="/player-info"
            element={<PlayerInfo themes={themes} themeIndex={themeIndex} />}
          />
          <Route
            path="/select-locations"
            element={
              <SelectLocations
                setNewGame={setNewGame}
                themes={themes}
                themeIndex={themeIndex}
              />
            }
          />
          <Route
            path="/set-up-game"
            element={
              <SetUpGame
                setNewGame={setNewGame}
                themes={themes}
                gameInputs={gameInputs}
                setGameInputs={setGameInputs}
                themeIndex={themeIndex}
                setThemeIndex={setThemeIndex}
              />
            }
          />
        </Routes>
        {/* <Navigation /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
