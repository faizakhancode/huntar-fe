import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGames } from "../utils/api";

export default function PlayerView({
  displaySafetyPopUp,
  setDisplaySafetyPopUp,
  game,
  themes,
  setGame,
}) {


  const [isLoading, setIsLoading] = useState(true);
  const [currScore, setCurrScore] = useState(0);
  const [error, setError] = useState(false);
  
  const { id } = useParams();
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

  document.addEventListener("increasescore", function () {
    setCurrScore(currScore + 1);
    // getNearestToken()
  });

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


  if(currScore === 5) {
    return <div className="overall-loading winner" 
     ><h4 className="winner-page" > You A-R a winner!</h4> 
     <Link to='/'> <button className="error-page-button"> Home </button> </Link>
     </div>
  }

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
          <p>Happy Hunting!</p>
          <button onClick={handleClick}>Begin</button>
        </article>
      </div>
    ) : null;
  }

  const tokenTheme = game.assets[1].asset_name;
  const tokenFolder = `${process.env.PUBLIC_URL}/assets/${tokenTheme}`;
  const tokenCoordinates = [
    `latitude: ${game.assets[1].latitude}; longitude: ${game.assets[1].longitude}`,
    `latitude: ${game.assets[2].latitude}; longitude: ${game.assets[2].longitude}`,
    `latitude: ${game.assets[3].latitude}; longitude: ${game.assets[3].longitude}`,
    `latitude: ${game.assets[4].latitude}; longitude: ${game.assets[4].longitude}`,
    `latitude: ${game.assets[5].latitude}; longitude: ${game.assets[5].longitude}`,
  ];

 

  return (
    <div className="page_container">
      <main>
        <Popup displayPopUp={displaySafetyPopUp} />
        <div className="camera_overlay">
          <div className="button_display">
             {game.game_name} 
            <br />
            Score: {currScore}
            {/* <br />
            Distance to nearest find: {distanceToToken} */}
          </div>
          <nav>
            <Link to="/player-info">
              <button className="button_menu">Get hint!</button>
            </Link>
            <Link to="/player-info">
              <button className="button_menu">Menu</button>
            </Link>
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
              far="25"
              look-controls-enabled="false"
              gps-projected-camera="gpsMinDistance: 1"
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

            {/* Score */}
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
              gps-projected-entity-place={tokenCoordinates[0]}
            ></a-gltf-model>

            <a-gltf-model
              id="token2"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-projected-entity-place={tokenCoordinates[1]}
            ></a-gltf-model>

            <a-gltf-model
              id="token3"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-projected-entity-place={tokenCoordinates[2]}
            ></a-gltf-model>

            <a-gltf-model
              id="token4"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-projected-entity-place={tokenCoordinates[3]}
            ></a-gltf-model>

            <a-gltf-model
              id="token5"
              mixin="clickable token"
              src={tokenFolder + "/token.glb"}
              gps-projected-entity-place={tokenCoordinates[4]}
            ></a-gltf-model>
          </a-scene>
        </section>
      </main>
    </div>
  );
}
