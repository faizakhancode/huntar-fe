import React from "react";
import { Link } from "react-router-dom";

export default function PlayerView({displaySafetyPopUp, setDisplaySafetyPopUp}) {

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
          <p>
            But please take a moment to learn how to play HuntAR safely!
          </p>
          <p>
            Be aware of your surroundings and only look at the screen when standing still.
          </p>
          <p>Happy Scavenging!</p>
          <button onClick={handleClick}>Close</button>
        </article>
      </div>
    ) : null;
  }

  return (
    <div className="page_container">
      <main>
          <Popup displayPopUp={displaySafetyPopUp} />
        <div className="camera_overlay">
          <nav>
            <div className="button_display">Score: 1350</div>
            <Link to="/player-info">
              <button className="button_icon">
                <img
                  className="icon"
                  src="../images/spiral-icon.png"
                  alt="Show and hide menu selector"
                />
              </button>
            </Link>
          </nav>
          <Link to="/player-info">
            <button className="button_player_view">Get hint!</button>
          </Link>
        </div>
        <section className="a_scene">
          <a-scene
            vr-mode-ui="enabled: false"
            arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
            renderer="antialias: true; alpha: true"
          >
            <a-camera gps-projected-camera rotation-reader></a-camera>
            <a-entity
              gps-projected-entity-place="latitude: 53.352855; longitude:  -1.478052"
              scale="2 2 2"
              gltf-model="./mushroom.glb"
            ></a-entity>
            <a-entity
              gps-projected-entity-place="latitude: 53.353255; longitude:  -1.479352"
              scale="5 5 5"
              gltf-model="./mushroom.glb"
            ></a-entity>
            <a-entity
              gps-projected-entity-place="latitude: 53.354255; longitude:  -1.476352"
              scale="20 20 20"
              gltf-model="./treasure-chest.glb"
            ></a-entity>
            <a-entity
              gps-projected-entity-place="latitude: 53.352501; longitude:  -1.479041"
              scale="3 3 3"
              gltf-model="./treasure-chest.glb"
            ></a-entity>
          </a-scene>
        </section>
      </main>
    </div>
  );
}
