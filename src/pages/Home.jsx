import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [displayPopUp, setDisplayPopUp] = useState(false);

  function handleSubmit() {
    console.log("handle submit: ", "game joined");
  }

  function handleClick() {
    if (!displayPopUp) {
      setDisplayPopUp(true);
    } else {
      setDisplayPopUp(false);
    }
  }

  function Popup({ displayPopUp }) {
    return displayPopUp ? (
      <div className="pop_up_overlay">
        <article className="pop_up">
          <h2>Welcome to ScavengAR!</h2>
          <p>
            ScavengAR is an augmented reality (AR) based scavenger hunt game
            that you can set up and play with others!
          </p>
          <p>
            Create a game yourself and share it with others, or join a game
            created by someone you know.
          </p>
          <p>Happy Scavenging!</p>
          <button onClick={handleClick}>Close</button>
        </article>
      </div>
    ) : null;
  }

  return (
    <div className="page_container">
      <header className="secondary_background">
        <h1 className="no_margin">ScavengAR</h1>
      </header>
      <main>
        <section className="home_background">
          <form onSubmit={handleSubmit}>
            <label htmlFor="game-id">Enter your Game ID:</label>
            <input name="game-id" type="text"></input>
            <Link to="/player-view">
              <button>Join Game</button>
            </Link>
          </form>
        </section>
        <section>
          <Link to="/set-up-game">
            <button>Create New Game</button>
          </Link>
          <br />
          <p>New to ScavengAR?</p>
          <button className="secondary" onClick={handleClick}>
            More info
          </button>
        </section>
        <Popup displayPopUp={displayPopUp} />
      </main>
    </div>
  );
}
