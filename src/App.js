import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ImageSelect from "./components/imageSelect/ImageSelect";
import ContactUs from "./components/contactUs/ContactUs";
import "./App.css";
import MapBox from "./components/maps/Mapbox";
import { ToastContainer } from "react-toastify";
import "mapbox-gl/dist/mapbox-gl.css";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<MapBox />} />
        <Route path="/report" exact element={<ImageSelect />} />
        <Route path="/us" exact element={<ContactUs />} />
        <Route
          path="/reported"
          exact
          element={
            <iframe
              width="100%"
              height="850"
              title="reported"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FS6MjbQEtiUxawD8C1H4DX1%2FSIH%3Fnode-id%3D188%253A303%26scaling%3Dmin-zoom%26page-id%3D0%253A1%26starting-point-node-id%3D180%253A315"
              allowFullScreen
            ></iframe>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
