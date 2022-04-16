import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./maps.module.scss";
import axios from "axios";

import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";

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

const MapBox = () => {
  const map = useRef(null);
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
    potHoles.data.forEach((v, i) => {
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
    // console.log(p);
    setPotholes(p);
  };

  useEffect(() => {
    console.log("Center: ", center);
    if (center != null && map != null) {
      const b = 0.00051;
      const bounds = {
        north: -b + center.lat,
        south: b + center.lat,
        west: -b + center.lng,
        east: b + center.lng,
      };

      map.current?.fitBounds(
        [
          [bounds.east, bounds.south],
          [bounds.west, bounds.north],
        ],
        { padding: 10, duration: 1000 }
      );
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

  useEffect(() => {
    navigator.geolocation.watchPosition(success, error, options);
  });

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [center.lng, center.lat] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 100,
      "circle-color": "#89cff0",
    },
  };

  // console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

  return (
    <div className={styles.mapContainer}>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        ref={map}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        initialViewState={{
          latitude: center.lat,
          longitude: center.lng,
          zoom: 9,
        }}
        testMode={process.env.NODE_ENV === "development"}
      >
        <GeolocateControl position="bottom-left" />
        <NavigationControl
          showCompass={true}
          showZoom={true}
          position="bottom-left"
        />
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <Marker longitude={center.lng} latitude={center.lat}>
          <img src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
        </Marker>
        {potholes.map((p) => (
          <Marker longitude={p[0]} latitude={p[1]}>
            <img src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default React.memo(MapBox);
