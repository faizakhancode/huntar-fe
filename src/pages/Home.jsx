import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getGames } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Home({setGame}) {
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [cantLink, setCantLink] = useState(false)
  const [searchGame, setSearchGame] = useState('')
  const navigate = useNavigate();

  function handleSubmit () {
    getGames(searchGame).then((res) => {
    setGame(res)
    navigate(`/player-view/${res._id}`)}).catch(err => setCantLink(true))
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
          <h2>Welcome to Hunt-AR!</h2>
          <p>
            Hunt-AR is an augmented reality (AR) based scavenger hunt game
            that you can set up and play with others!
          </p>
          <p>
            Create a game yourself and share it with others, or join a game
            created by someone you know.
          </p>
          <p>Happy Hunting!</p>
          <button onClick={handleClick}>Close</button>
        </article>
      </div>
    ) : null;
  }

  return (
    <div className="page_container">
      <header className="secondary_background">
        <h1 className="no_margin">Hunt-AR</h1>
      </header>
      <main>
        <section className="home_background">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()}}>
            <label htmlFor="game-id">Enter your Game ID:</label>
            <input placeholder="Enter gameId code ..." onChange={(e) =>{setSearchGame(e.target.value)}} value={searchGame} name="game-id" type="text"></input>
           {cantLink ? <p>This game does not exist</p> : null}
            {/* <Link to={`/player-view/${}`}> */}
              <button type='submit'>Join Game</button>
            {/* </Link> */}
          </form>
        </section>
        <section>
          <Link to="/set-up-game">
            <button>Create New Game</button>
          </Link>
          <br />
          <p>New to Hunt-AR?</p>
          <button className="secondary" onClick={handleClick}>
            More info
          </button>
        </section>
        <Popup displayPopUp={displayPopUp} />
      </main>
    </div>
  );
}
