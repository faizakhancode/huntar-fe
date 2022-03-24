import React from "react";
import { Link } from "react-router-dom";
import LocationsMap from "../components/LocationsMap";
import FindList from "../components/lists/FindList";

export default function ManageGame({themes, themeIndex, setFindSelected, findSelected}) {
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
            <button className="button_arrow">
              <i className="arrow left"></i>
            </button>
            <div className="theme_container">
              <p>Countdown and (optional) leaderboard visualisations go here</p>
            </div>
            <button className="button_arrow">
              <i className="arrow right"></i>
            </button>
          </div>
        </section>
        <section className="row_flex">
          <Link to="/">
            <button className="button_menu">Stop game</button>
          </Link>
          <Link to="/">
            <button className="button_menu">Share</button>
          </Link>
        </section>
      </main>
    </div>
  );
}
