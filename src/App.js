import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import PlayerView from './pages/PlayerView';
import ManageGame from './pages/ManageGame';
import Home from './pages/Home';
import PlayerInfo from './pages/PlayerInfo';
import SelectLocations from './pages/SelectLocations';
import SetUpGame from './pages/SetUpGame';
import themesJSON from './themes.json';

function App() {
  // Background data
  // This is part of the state which will most likely change once back-end is hooked up
  const [themes, setThemes] = useState(themesJSON);
  const [newGame, setNewGame] = useState({});
  const [gameId, setGameId] = useState('');

  // User inputs and input states
  // This is part of the state which will most likely change once back-end is hooked up
  const [gameInputs, setGameInputs] = useState({ game_name: '', assets: {} });

  const [themeIndex, setThemeIndex] = useState(0);
  const [findsPlaced, setFindsPlaced] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // Game state
  // This is part of the state which will most likely change once back-end is hooked up
  const [game, setGame] = useState({});
  // Markers
  // This is part of the state which will most likely change once back-end is hooked up
  const [gameMarkerPositions, setGameMarkerPositions] = useState({
    1: { lat: 53.2, lng: -1.47 },
    2: { lat: 53.2, lng: -1.47 },
    3: { lat: 53.2, lng: -1.47 },
    3: { lat: 53.2, lng: -1.47 },
    4: { lat: 53.2, lng: -1.47 },
    5: { lat: 53.2, lng: -1.47 },
  });

  // User notifications (pop ups, etc)
  const [displaySafetyPopUp, setDisplaySafetyPopUp] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setGame={setGame} />} />
          <Route
            path="/player-view/:id"
            element={
              <PlayerView
                setDisplaySafetyPopUp={setDisplaySafetyPopUp}
                displaySafetyPopUp={displaySafetyPopUp}
                game={game}
                themes={themes}
                setGame={setGame}
              />
            }
          />
          <Route
            path="/manage-game"
            element={
              <ManageGame
                themes={themes}
                themeIndex={themeIndex}
                findsPlaced={findsPlaced}
                setFindsPlaced={setFindsPlaced}
                gameMarkerPositions={gameMarkerPositions}
                gameId={gameId}
                gameInputs={gameInputs}
              />
            }
          />
          <Route
            path="/player-info"
            element={
              <PlayerInfo
                themes={themes}
                themeIndex={themeIndex}
                findsPlaced={findsPlaced}
                setFindsPlaced={setFindsPlaced}
                gameMarkerPositions={gameMarkerPositions}
              />
            }
          />
          <Route
            path="/select-locations"
            element={
              <SelectLocations
                setNewGame={setNewGame}
                themes={themes}
                themeIndex={themeIndex}
                findsPlaced={findsPlaced}
                setFindsPlaced={setFindsPlaced}
                gameMarkerPositions={gameMarkerPositions}
                setGameMarkerPositions={setGameMarkerPositions}
                gameInputs={gameInputs}
                setGameId={setGameId}
                setGameInputs={setGameInputs}
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
