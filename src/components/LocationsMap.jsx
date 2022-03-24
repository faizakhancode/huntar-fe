import { React, useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export default function LocationsMap({ themes, themeIndex }) {
  // map container styling
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  // set map position (initial and current)
  const [currentPosition, setCurrentPosition] = useState({
    lat: 53.745,
    lng: 1.3,
  });

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDGJNLUwgbM7xtNwlJn1-oQujhcRoU1qUk",
  });

  // set map
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  });

  // markers
  const finds = themes.themes[themeIndex].finds

  const mapMarkers = finds.map((find) => {
    const image = {
      url: find.img_url,
      scaledSize: {width: 30, height: 30}
    };

    return (
      <Marker
        clickable={true}
        draggable={true}
        position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
        key={find.find_id}
        icon={image}
      ></Marker>
    );
  });

  return isLoaded ? (
    <div className="map_container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={10}
        options={{
            disableDefaultUI: true}}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {mapMarkers}
      </GoogleMap>
    </div>
  ) : (
    <p>nomap</p>
  );
}
