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
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FG5wJIzEboSrg08PxqMML6k%2FAnalysis%3Fnode-id%3D2%253A87%26scaling%3Dmin-zoom%26page-id%3D0%253A1%26starting-point-node-id%3D2%253A87"
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
