import React from 'react'
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <footer>
      <Link to="/">| Home |</Link>
      <Link to="/camera-view">| AR UI |</Link>
      <Link to="/game-management">| Game Management |</Link>
      <Link to="/player-info">| Player Info |</Link>
      <Link to="/select-locations">| Select Locations |</Link>
      <Link to="/select-theme">| Select Theme |</Link>
    </footer>
  );
}
