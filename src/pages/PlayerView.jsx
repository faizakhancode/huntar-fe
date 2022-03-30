import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "aframe-state-component";
import "../utils/aframeStates";
import "aframe-arrow-component";

export default function PlayerView({
  displaySafetyPopUp,
  setDisplaySafetyPopUp,
}) {
  function handleClick() {
    if (!displaySafetyPopUp) {
      setDisplaySafetyPopUp(true);
    } else {
      setDisplaySafetyPopUp(false);
    }
  }

  const getLocations = () => {
    let closestDistance = 1000;
    let closestToken = "";
    for (let index = 1; index < 6; index++) {
      const token = document.querySelector(`#token${index}`);
      if (token.getAttribute("scale").x > 0 && token.getAttribute("distance")) {
        const currDistance = parseInt(token.getAttribute("distance"));
        console.log(closestDistance, currDistance);
        if (currDistance >= closestDistance) return;
        closestDistance = currDistance;
        closestToken = `#token${index}`;
      }
    }
    setDistanceMsg(`${closestDistance} meters`);
    document
      .querySelector("#pointer")
      .setAttribute("look-at", `${closestToken}`);
  };

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
    ) : null;
  }

  const [currScore, setCurrScore] = useState(0);
  const [distanceMsg, setDistanceMsg] = useState();
  const [nearestToken, setNearestToken] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [debugMsg, setDebugMsg] = useState();
  const [error, setError] = useState(false);
  const tokenTheme = game.assets[1].asset_name;
  const asset = themes.themes.filter((obj) => obj.theme_id === +tokenTheme);
  const tokenFolder = `${process.env.PUBLIC_URL}/assets/${tokenTheme}`;
  const tokenCoordinates = [
    `latitude: ${game.assets[1].latitude}; longitude: ${game.assets[1].longitude}`,
    `latitude: ${game.assets[2].latitude}; longitude: ${game.assets[2].longitude}`,
    `latitude: ${game.assets[3].latitude}; longitude: ${game.assets[3].longitude}`,
    `latitude: ${game.assets[4].latitude}; longitude: ${game.assets[4].longitude}`,
    `latitude: ${game.assets[5].latitude}; longitude: ${game.assets[5].longitude}`,
  ];

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

  document.addEventListener("increasescore", function () {
    setCurrScore(currScore + 1);
    getLocations();
  });

  window.onload = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      getLocations();
    }, 3000);
    const interval = setInterval(() => {
      getLocations();
    }, 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
    };
  }, [isLoading]);

  return (
    <div className="page_container">
      <main>
        <Popup displayPopUp={displaySafetyPopUp} />
        <div className="camera_overlay">
          <div className="button_display">
            Score: {currScore}
            <br />
            Nearest token: {distanceMsg}
            <br />
            {debugMsg}
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
            arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
            renderer="antialias: true; alpha: true"
          >
            {/* Token Structure */}
            <a-assets>
              <a-mixin id="clickable" increase-action></a-mixin>
              <a-mixin
                id="token"
                position="0 0 0"
                scale="1 1 1"
                rotation="0 0 0"
                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
                animation__click="startEvents: click; property: scale; from: 1 1 1; to: 0 0 0; dur: 1000"
              ></a-mixin>
            </a-assets>

            {/* 3D Camera */}
            <a-camera
              gps-camera="gpsMinDistance: 1; maxDistance: 100"
              look-controls-enabled="false"
              arjs-look-controls="smoothingFactor: 0.1"
              rotation-reader
            >
              {/* Cursor */}
              <a-entity
                animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
                animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
                animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1 "
                cursor="fuse: true;"
                material="color: black; shader: flat"
                position="0 0 -3"
                geometry="primitive: ring; radius-inner: 0.8; radius-outer: 0.9"
              ></a-entity>

              <a-entity
                id="pointer"
                arrow="headLength: .5; headWidth: .25; direction: 0 0 1"
                position="0 -2 -3"
                look-at={nearestToken}
              ></a-entity>
            </a-camera>

            {/* Score */}
            <a-entity
              id="scoreEntity"
              bind__text="value: score"
              text="value: score;"
            ></a-entity>

            {/* Tokens */}

            <a-entity
              id="token1"
              mixin="clickable token"
              gps-entity-place={tokenCoordinates[0]}
              gltf-model={`url(${tokenFolder}/token1.glb)`}
              increase-action
            ></a-entity>

            <a-entity
              id="token2"
              mixin="clickable token"
              gps-entity-place={tokenCoordinates[1]}
              gltf-model={`url(${tokenFolder}/token2.glb)`}
              increase-action
            ></a-entity>

            <a-entity
              id="token3"
              mixin="clickable token"
              gps-entity-place={tokenCoordinates[2]}
              gltf-model={`url(${tokenFolder}/token3.glb)`}
              increase-action
            ></a-entity>

            <a-entity
              id="token4"
              mixin="clickable token"
              gps-entity-place={tokenCoordinates[3]}
              gltf-model={`url(${tokenFolder}/token4.glb)`}
              increase-action
            ></a-entity>

            <a-entity
              id="token5"
              mixin="clickable token"
              gps-entity-place={tokenCoordinates[4]}
              gltf-model={`url(${tokenFolder}/token5.glb)`}
              increase-action
            ></a-entity>
          </a-scene>
        </section>
      </main>
    </div>
  );
}
