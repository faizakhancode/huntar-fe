import React, { useState } from "react";
import WinScreen from "./WinScreen";

export default function CameraView() {
  const [currScore, setCurrScore] = useState(0);
  const tokenTheme = "fantasy";
  const tokenFolder = `https://bayardt.github.io/arassets/${tokenTheme}`;
  const tokenCoordinates = [
    "latitude: 53.561081; longitude: -0.083805",
    "latitude: 53.561104; longitude: -0.084025",
    "latitude: 53.561078; longitude: -0.084270",
    "latitude: 53.560993; longitude: -0.084216",
    "latitude: 53.561011; longitude: -0.083920",
  ];

  document.addEventListener("increasescore", function () {
    setCurrScore(currScore + 1);
  });

  // if (currScore >= 5) return <WinScreen />;

  return (
    <>
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

          {/* Token 3D assets */}
          {/* <a-asset-item
            id="token1"
            response-type="arraybuffer"
            src={tokenFolder + "/token1.glb"}
          ></a-asset-item> */}

          <a-asset-item
            id="token2"
            response-type="arraybuffer"
            src={tokenFolder + "/token2.glb"}
          ></a-asset-item>

          <a-asset-item
            id="token3"
            src={tokenFolder + "/token3.glb"}
          ></a-asset-item>
        </a-assets>

        {/* 3D Camera */}
        <a-camera
          look-controls-enabled="false"
          gps-camera="gpsMinDistance: 1; maxDistance: 10"
          rotation-reader
          arjs-look-controls="smoothingFactor: 0.1"
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
        </a-camera>

        {/* Score */}
        <a-entity
          id="scoreEntity"
          bind__text="value: score"
          text="value: score;"
        ></a-entity>

        {/* Tokens */}
          <a-gltf-model
            mixin="clickable token"
            src={tokenFolder + "/token2.glb"}
            gps-entity-place={tokenCoordinates[0]}
          ></a-gltf-model>

        <a-gltf-model
          mixin="clickable token"
          src={tokenFolder + "/token2.glb"}
          gps-entity-place={tokenCoordinates[1]}
        ></a-gltf-model>

        <a-gltf-model
          mixin="clickable token"
          src={tokenFolder + "/token2.glb"}
          gps-entity-place={tokenCoordinates[2]}
        ></a-gltf-model>

        <a-gltf-model
          mixin="clickable token"
          src={tokenFolder + "/token2.glb"}
          gps-entity-place={tokenCoordinates[3]}
        ></a-gltf-model>

        <a-gltf-model
          mixin="clickable token"
          src={tokenFolder + "/token3.glb"}
          gps-entity-place={tokenCoordinates[4]}
        ></a-gltf-model>
      </a-scene>
    </>
  );
}
