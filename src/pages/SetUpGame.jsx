import { React, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Theme from "../components/Theme";

export default function SetUpGame({
  themes,
  gameInputs,
  setGameInputs,
  themeIndex,
  setThemeIndex,

}) {

  const [isLoading, setIsLoading] = useState(true)

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
     setGameInputs((values) => ({ ...values, [name]: value }));
  }

useEffect(() => {
  if (themes) {
    setIsLoading(false) 
  }
}, [])


if (isLoading) {return <div className="overall-loading" ><h3>Loading </h3> <div className="loader"></div></div>;}


  const themeList = themes.themes;

  const handleArrowClick = (event) => {
    const name = event.target.name;
    if (name === "left") {
      if (themeIndex === 0) {
        return setThemeIndex(0);
      } else {
        setThemeIndex((currValue) => {
          return currValue - 1;
        });
      }
    } else if (name === "right") {
      if (themeIndex === themeList.length - 1) {
        return setThemeIndex(themeList.length - 1);
      } else {
        setThemeIndex((currValue) => {
          return currValue + 1;
        });
      }
    }
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
          <label htmlFor="game-name">Choose a name for your game:</label>
          <input  placeholder="Game name required..."
            name="game_name"
            type="text"
            value={gameInputs?.game_name}
            onChange={(e) => handleChange(e)}
          ></input>
        </section>
        <section>
          <label htmlFor="theme">Choose a theme:</label>
          <div className="theme_selector_container">
            <button
              className="button_arrow left"
              name="left"
              onClick={handleArrowClick}
            ></button>
            <div className="theme_container">
              <Theme theme={themeList[themeIndex]} />
            </div>
            <button
              className="button_arrow right"
              name="right"
              onClick={handleArrowClick}
            ></button>
          </div>
          <nav className="nav_button_options">
            <Link to="/">
              <button className="button_menu">Back</button>
            </Link>
            <Link to="/select-locations">
              <button disabled={gameInputs.game_name? false: true}className="button_menu">Next</button>
            </Link>
          </nav>
        </section>
        <section></section>
      </main>
    </div>
  );
}
