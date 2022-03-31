import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getGames } from "../utils/api";
import GameMap from "../components/GameMap";
import "aframe-state-component";
import "../utils/aframeStates";
import { getDistanceBetweenPoints } from "get-distance-between-points";


export default function PlayerView({
  displaySafetyPopUp,
  setDisplaySafetyPopUp,
  game,
  themes,
  setGame,
}) {

  const [playerViewPopUp, setPlayerViewPopUp] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [currScore, setCurrScore] = useState(0);
  const [error, setError] = useState(false);
  const userLat = useRef();
  const userLon = useRef();
  const nearestDistance = useRef(null);
  const nearestMsg = useRef();
  const foundTokens = useRef({});

  const { id } = useParams();

  const getNearestToken = () => {
    console.log(foundTokens);
    nearestDistance.current = 0;
    for (let index = 1; index < 6; index++) {
      if (!foundTokens.current[`token${index}`]) {
        const distanceInMeters = Math.round(
          getDistanceBetweenPoints(
            userLat.current,
            userLon.current,
            game.assets[index].latitude,
            game.assets[index].longitude
          )
        );
        console.log(index, distanceInMeters);
        if (
          (distanceInMeters && distanceInMeters < nearestDistance.current) ||
          nearestDistance.current === 0
        ) {
          nearestDistance.current = distanceInMeters;
          nearestMsg.current = `Distance to nearest token: ${nearestDistance.current} meters`;
        }
      }
    }
    const distanceMessage = document.getElementById("distance_message");
    if (distanceMessage) distanceMessage.innerHTML = nearestMsg.current;
  };

  const handleClick = () => {
    if (!displaySafetyPopUp) {
      setDisplaySafetyPopUp(true);
    } else {
      setDisplaySafetyPopUp(false);
    }
  };

  const Popup = ({ displayPopUp }) => {
    return displayPopUp ? (
      <div className="pop_up_overlay">
        <article className="pop_up">
          <h2>You're almost ready to begin...</h2>
          <p>But please take a moment to learn how to play HuntAR safely!</p>
          <p>
            Be aware of your surroundings and only look at the screen when
            standing still.
          </p>
          <p>Happy Scavenging!</p>
          <button onClick={handleClick}>Begin</button>
        </article>
      </div>
    ) : null;
  };
  
  useEffect(() => {
    setIsLoading(true);
    getGames(id)
      .then((gameRes) => {
        setGame(gameRes);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [id, setGame]);

  if (isLoading) {
    return (
      <div className="overall-loading">
        <h3>Loading </h3> <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overall-loading error">
        <h3> AR-gh, damn! game does not exist </h3>
        <Link to="/">
          {" "}
          <button className="error-page-button"> Home </button>{" "}
        </Link>
      </div>
    );
  }

  if (currScore === 5) {
    return (
      <div className="overall-loading winner">
        <h4 className="winner-page"> You A-R a winner!</h4>
        <Link to="/">
          {" "}
          <button className="error-page-button"> Home </button>{" "}
        </Link>
      </div>
    );
  }

  const handleplayerViewPopup = () => {
    if (!playerViewPopUp) {
      setPlayerViewPopUp(true);
    } else {
      setPlayerViewPopUp(false);
    }
  };

  const PlayerViewPopUp = ({ playerViewPopUp }) => {
    return playerViewPopUp ? (
      <>
        <div className="player-view_overlay">
          <div className="hint-content">
            <div className="hint-title">
              <h1 className="player-view-h1">{game.game_name} hint:</h1>
            </div>
            <div>
              <GameMap themes={themes} game={game} />
            </div>
            <section className="row_flex-2">
              <button onClick={handleplayerViewPopup} className="button_menu">
                Back
              </button>
              <Link to="/">
                <button className="button_menu">Quit game</button>
              </Link>
            </section>
          </div>
        </div>
      </>
    ) : null;
  };

  function handleClick() {
    if (!displaySafetyPopUp) {
      setDisplaySafetyPopUp(true);
    } else {
      setDisplaySafetyPopUp(false);
    }
  }

  function Popup({ displayPopUp }) {
    return displayPopUp ? (
      <div className="pop_up_overlay">
        <article className="pop_up">
          <h2>You're almost ready to begin...</h2>
          <p>But please take a moment to learn how to play HuntAR safely!</p>
          <p>
            Be aware of your surroundings and only look at the screen when
            standing still.
          </p>
          <p>Happy Scavenging!</p>
          <button onClick={handleClick}>Begin</button>
        </article>
      </div>
    );
  }

  const tokenTheme = game.assets[1].asset_name;
  const tokenFolder = `${process.env.PUBLIC_URL}/assets/${tokenTheme}`;

  document.addEventListener("increasescore", function (e) {
    foundTokens.current[e.detail.foundToken.id] = true;
    getNearestToken();
    setCurrScore(currScore + 1);
  });

  window.addEventListener("gps-camera-update-position", (e) => {
    userLat.current = e.detail.position.latitude;
    userLon.current = e.detail.position.longitude;
    getNearestToken();
  });

  return (
    <div className="page_container">
      <main>
        <Popup displayPopUp={displaySafetyPopUp} />
        <PlayerViewPopUp playerViewPopUp={playerViewPopUp} />
        <div className="camera_overlay">
          <div className="button_display">
            {game.game_name}
            <br />
            Score: {currScore}
            <br />
            <div id="distance_message">Loading...</div>
          </div>
          <nav>
            {/* <Link to="/player-info"> */}
            <button onClick={handleplayerViewPopup} className="button_menu">
              Get hint!
            </button>
            {/* </Link> */}
            {/* <Link to="/player-info">
              <button className="button_menu">Menu</button>
            </Link> */}
          </nav>
        </div>
        <section className="a_scene">
          {/* A-Frame Scene */}
          <a-scene
            vr-mode-ui="enabled: false"
            arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: true;"
            renderer="antialias: true; alpha: true"
          >
            {/* Re-usable Assets */}
            <a-assets>
              {/* Token structure */}
              <a-mixin id="clickable" increase-action></a-mixin>

              <a-mixin
                id="token"
                scale="1, 1, 1"
                rotation="0 0 0"
                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
                animation__click="startEvents: click; property: scale; from: 1 1 1; to: 0 0 0; dur: 1000"
              ></a-mixin>
            </a-assets>

            {/* 3D Camera */}
            <a-camera
              look-controls-enabled="false"
              gps-camera="gpsMinDistance: 5, maxDistance: 25"
              rotation-reader
              arjs-look-controls="smoothingFactor: 0.1"
            >
              {/* Cursor */}
              <a-entity
                animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
                animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
                animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1 "
                cursor="fuse: true;"
                material="color: white; shader: flat"
                position="0 0 -3"
                geometry="primitive: ring; radius-inner: 0.8; radius-outer: 0.9"
              ></a-entity>
            </a-camera>

            {/* Score and Found Tokens */}

            <a-entity
              id="scoreEntity"
              bind__text="value: score"
              text="value: score;"
            ></a-entity>

            {/* Tokens */}

            <a-gltf-model
              id="token1"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-entity-place={`latitude: ${game.assets[1].latitude}; longitude: ${game.assets[1].longitude}`}
            ></a-gltf-model>

            <a-gltf-model
              id="token2"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-entity-place={`latitude: ${game.assets[2].latitude}; longitude: ${game.assets[2].longitude}`}
            ></a-gltf-model>

            <a-gltf-model
              id="token3"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-entity-place={`latitude: ${game.assets[3].latitude}; longitude: ${game.assets[3].longitude}`}
            ></a-gltf-model>

            <a-gltf-model
              id="token4"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-entity-place={`latitude: ${game.assets[4].latitude}; longitude: ${game.assets[4].longitude}`}
            >
              <a-text value="token4" position="0 -3 0"></a-text>
            </a-gltf-model>

            <a-gltf-model
              id="token5"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-entity-place={`latitude: ${game.assets[5].latitude}; longitude: ${game.assets[5].longitude}`}
            ></a-gltf-model>
          </a-scene>
        </section>
      </main>
    </div>
  );
}
