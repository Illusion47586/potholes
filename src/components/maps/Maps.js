import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import styles from "./maps.module.scss";

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAO39id9oXfTc7XvxmiMibJlEaeHWkKY3U",
  });

  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState({});

  function success(pos) {
    const crd = pos.coords;
    setCenter({ lat: crd.latitude, lng: crd.longitude });
  }

  function error(err) {
    // alert("ERROR(" + err.code + "): " + err.message);
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(success, error, options);
    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={styles.mapContainer}
      center={center}
      zoom={90}
      onLoad={onLoad}
      onUnmount={onUnmount}
      //   tilt={10}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);
