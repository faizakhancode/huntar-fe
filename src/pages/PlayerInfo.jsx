import React from "react";
import { Link } from "react-router-dom";
import LocationsMap from "../components/LocationsMap";
import FindList from "../components/lists/FindList";

export default function PlayerInfo({
  themes,
  themeIndex,
  setFindSelected,
  findSelected,
}) {
  return (
    <div className="page_container">
      <main>
        <header>
          <h1 className="no_margin">Player Info</h1>
        </header>
        <LocationsMap themes={themes} themeIndex={themeIndex} />
        <section>
          <FindList
            themes={themes}
            themeIndex={themeIndex}
            setFindSelected={setFindSelected}
            findSelected={findSelected}
          />
        </section>
        <section>
          <div className="theme_selector_container">
            <button className="button_arrow left" name="left"></button>
            <div className="theme_container">
              <p>Countdown and (optional) leaderboard visualisations go here</p>
            </div>
            <button className="button_arrow right" name="left"></button>
          </div>
        </section>
        <section className="row_flex">
          <Link to="/player-view">
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
