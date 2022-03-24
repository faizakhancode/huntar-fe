import { React, useState } from "react";
import { Link } from "react-router-dom";
import LocationsMap from "../components/LocationsMap";
import FindCheckBoxList from "../components/lists/FindCheckBoxList";

export default function SelectLocations({ themes, themeIndex }) {
  const [findsPlaced, setFindsPlaced] = useState({});

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
        <LocationsMap themes={themes} themeIndex={themeIndex} />
        <section>
          <nav className="nav_button_options">
            <Link to="/set-up-game">
              <button className="button_menu">Back</button>
            </Link>
            <Link to="/manage-game">
              <button className="button_menu">Confirm</button>
            </Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
