import React, { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";

import styles from "./maps.module.scss";

const circleOptions = {
  strokeColor: "#00b4d8",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#ade8f4",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 20,
  zIndex: 1,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAO39id9oXfTc7XvxmiMibJlEaeHWkKY3U",
  });

  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState(null);

  function success(pos) {
    const crd = pos.coords;

    if (
      center === null ||
      center.lat != crd.latitude ||
      center.lng != crd.longitude
    ) {
      console.log("Updating");
      setCenter({ lat: crd.latitude, lng: crd.longitude });
    }
  }

  useEffect(() => {
    console.log("Center: ", center);
    if (center != null && map != null) {
      map.setCenter(center);
      const b = 0.0001;
      const bounds = {
        north: -b + center.lat,
        south: b + center.lat,
        west: -b + center.lng,
        east: b + center.lng,
      };
      map.fitBounds(bounds);
      //   setMap(map);
    }
  }, [center]);

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

  return isLoaded && center !== null ? (
    <GoogleMap
      mapContainerClassName={styles.mapContainer}
      center={center}
      zoom={100}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Circle
        // required
        center={center}
        // required
        options={circleOptions}
      />
      <Marker
        icon={
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        }
        position={center}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);
