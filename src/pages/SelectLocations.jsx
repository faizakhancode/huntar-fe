import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LocationsMap from "../components/LocationsMap";
import FindCheckBoxList from "../components/lists/FindCheckBoxList";
import { postGames } from "../utils/api";

export default function SelectLocations({
  themes,
  themeIndex,
  findsPlaced,
  setFindsPlaced,
  gameMarkerPositions,
  setGameMarkerPositions,
  gameInputs,
  setGameId,
  setGameInputs,
}) {
  const navigate = useNavigate();
  const [notFive, setNotFive] = useState(false)

  const createGame = () => {
    const gameCheck = Object.keys(gameInputs.assets).length === 5;
    if (gameCheck) {
      postGames(gameInputs)
        .then((res) => {
          setGameId(res);
          navigate(`/manage-game`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else setNotFive(true)
  };

  return (
    <div className="page_container">
      <header>
        <h1 className="no_margin">Setup game</h1>
        <Link to="/">
          <button className="button_icon">
            <img
              className="icon"
              src="../images/home-icon.png"
              alt="Show and hide menu selector"
            />
          </button>
        </Link>
      </header>
      <main>
        <section>
          <p>Select locations for each of your finds:</p>
          <FindCheckBoxList
            themes={themes}
            themeIndex={themeIndex}
            setFindsPlaced={setFindsPlaced}
            findsPlaced={findsPlaced}
          />
        </section>
        <LocationsMap
          themes={themes}
          themeIndex={themeIndex}
          findsPlaced={findsPlaced}
          gameMarkerPositions={gameMarkerPositions}
          setGameMarkerPositions={setGameMarkerPositions}
          setGameInputs={setGameInputs}
          gameInputs={gameInputs}
        />
        <section>
          <nav className="nav_button_options">
            <Link to="/set-up-game">
              <button className="button_menu">Back</button>
            </Link>
            <button onClick={() => createGame()} className={`button_menu`}>
              Confirm
            </button>
          </nav>
          {notFive ? <h3>Please place all 5 assets</h3>: null}
        </section>
      </main>
    </div>
  );
}
