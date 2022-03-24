import { React, useState } from "react";
import { Link } from "react-router-dom";
import FindList from "../components/lists/FindList";
import LocationsMap from "../components/LocationsMap";

export default function SelectLocations({ themes, themeIndex }) {
  const [findSelected, setFindSelected] = useState(-1);

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
          <FindList
            themes={themes}
            themeIndex={themeIndex}
            setFindSelected={setFindSelected}
            findSelected={findSelected}
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
