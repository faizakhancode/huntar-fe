import { React, useState } from "react";
import { Link } from "react-router-dom";
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
  setGameInputs
}) {  
  
  const createGame = () => {
    postGames(gameInputs).then((res) => setGameId(res)).catch(err => console.log(err))
  }



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
            <Link to="/manage-game">
              <button onClick={() => createGame()} className="button_menu">Confirm</button>
            </Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
