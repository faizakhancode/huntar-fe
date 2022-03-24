import { React, useState } from "react";
import { Link } from "react-router-dom";
import Theme from "../components/Theme";

export default function SetUpGame({
  themes,
  setNewGame,
  gameInputs,
  setGameInputs,
  themeIndex,
  setThemeIndex,
}) {
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setGameInputs((values) => ({ ...values, [name]: value }));
    console.log(gameInputs);
  };

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
          <input
            name="game_name"
            type="text"
            value={gameInputs.game_name || ""}
            onChange={handleChange}
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
              <button className="button_menu">Next</button>
            </Link>
          </nav>
        </section>
        <section></section>
      </main>
    </div>
  );
}
