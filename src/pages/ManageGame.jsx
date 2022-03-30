import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocationsMap from "../components/LocationsMap";
import FindList from "../components/lists/FindList";

export default function ManageGame({
  themes,
  themeIndex,
  setFindSelected,
  findSelected,
  findsPlaced,
  gameMarkerPositions,
  gameId,
  gameInputs,
  setGameInputs,
  setFindsPlaced
}) {

const [copied, setCopied] = useState(false)

  const copyText = (event) => {
    navigator.clipboard.writeText(gameId).then(res => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false) 
      }, 4000)
  }
    )};

    const shareFunc = () => {
      const shareData = {
        title: 'Hunt-AR',
        text: 'You have been invited to play a hunt-AR game via the following link:',
        url: `https://scavengar.netlify.app/player-view/${gameId}`,
      }
      if (gameId) {
        navigator.share(shareData)
      } 
    }

const clearGame = () => {
  setGameInputs({ game_name: '', assets: {} }) 
  setFindsPlaced({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  })
}

  return (
    <div className="page_container">
      <main>
        <header>
          <h1 className="no_margin">Manage Game</h1>
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
        <LocationsMap
          themes={themes}
          themeIndex={themeIndex}
          findsPlaced={findsPlaced}
          gameMarkerPositions={gameMarkerPositions}
          gameInputs={gameInputs}
        />
        <section>
          <FindList
            themes={themes}
            themeIndex={themeIndex}
            setFindSelected={setFindSelected}
            findSelected={findSelected}
          />
        </section>
        {/* <section>
          <div className="theme_selector_container">
            <button className="button_arrow left" name="left"></button>
            <div className="theme_container">
              <p>Countdown and (optional) leaderboard visualisations go here</p>
            </div>
            <button className="button_arrow right" name="left"></button>
          </div>
        </section> */}
        {gameId  ? <section className="game-id-link"><h3 className="game-id-text"> Your gameID: {gameId} </h3> <button  onClick={copyText}>Copy Game ID link</button>{copied? <div className="copied-message"><p>Copied</p></div>: null} </section>: null}
        <section className="row_flex">
          <Link to="/">
            <button onClick={clearGame} className="button_menu">Clear game</button>
          </Link>
            <button className="button_menu" onClick={shareFunc}>Share</button>
        </section>
      </main>
    </div>
  );
}
