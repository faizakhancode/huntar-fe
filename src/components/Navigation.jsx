import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <footer>
      <Link to="/">Home</Link>
      <Link to="/player-view">Player view</Link>
      <Link to="/manage-game">Manage Game</Link>
      <Link to="/player-info">Player Info</Link>
      <Link to="/select-locations">Choose Locations</Link>
      <Link to="/select-game-name-and-theme">Select Theme</Link>
    </footer>
  );
}
