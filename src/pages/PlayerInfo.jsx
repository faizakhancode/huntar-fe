import React from "react";
import { Link } from "react-router-dom";
import GameMap from "../components/GameMap";

export default function PlayerInfo({
  themes,
  themeIndex,
  findsPlaced,
  gameMarkerPositions,
  game,
}) {
  return (
    <div className="page_container">
      <main>
        <header>
          <h1 className="no_margin">Player Info</h1>
        </header>
        <GameMap
          themes={themes}
          themeIndex={themeIndex}
          findsPlaced={findsPlaced}
          gameMarkerPositions={gameMarkerPositions}
          game={game}
        />
        <section className="row_flex">
          <Link to={`/player-view/${game._id}`}>
            <button className="button_menu">Back</button>
          </Link>
          <Link to="/">
            <button className="button_menu">Quit game</button>
          </Link>
        </section>
      </main>
    </div>
  );
}
