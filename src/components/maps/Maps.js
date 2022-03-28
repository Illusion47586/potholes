import React, { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./maps.module.scss";
import axios from "axios";

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

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAO39id9oXfTc7XvxmiMibJlEaeHWkKY3U",
  });

  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState({ lat: 0, lng: 0 });

  const [potholes, setPotholes] = React.useState([]);

  function success(pos) {
    const crd = pos.coords;

    if (
      center === null ||
      center.lat !== crd.latitude ||
      center.lng !== crd.longitude
    ) {
      console.log("Updating");
      setCenter({ lat: crd.latitude, lng: crd.longitude });
    }
  }

  const getPotholes = async () => {
    const potHoles = await axios.get(
      `https://potholesserver.herokuapp.com/potholeByDistance?lat=${center.lat}&long=${center.lng}`
    );
    // const potHoles = await axios.get(
    //   "https://potholesserver.herokuapp.com/potholeByDistance?lat=28.6488951&long=77.040059"
    // );
    const p = [];
    potHoles.data.forEach((v) => {
      if (
        getDistanceFromLatLonInM(
          v.location.coordinates[1],
          v.location.coordinates[0],
          center.lat,
          center.lng
        ) <= 20
      ) {
        toast("Caution, pothole nearby.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      p.push(v.location.coordinates);
    });
    console.log(p);
    setPotholes(p);
  };

  useEffect(() => {
    console.log("Center: ", center);
    if (center != null && map != null) {
      map.panTo(center);
      map.setCenter(center);
      const b = 0.00021;
      const bounds = {
        north: -b + center.lat,
        south: b + center.lat,
        west: -b + center.lng,
        east: b + center.lng,
      };
      map.fitBounds(bounds);
      getPotholes();
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

  const button = (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(success, error, options);
      }}
    >
      My location
    </button>
  );

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    navigator.geolocation.watchPosition(success, error, options);

    // button.map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
    //   button
    // );
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerClassName={styles.mapContainer}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        streetView={false}
        clickableIcons={false}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <button>Do something</button>
        <Circle
          // required
          center={center}
          // required
          options={circleOptions}
        />
        {potholes.map((p) => (
          <Marker
            icon={
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            }
            position={{ lat: p[1], lng: p[0] }}
          />
        ))}
      </GoogleMap>
      <ToastContainer />
    </>
  ) : (
    <h3>Loading...</h3>
  );
};

export default React.memo(Map);
