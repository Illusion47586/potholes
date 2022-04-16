import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ImageSelect from "./components/imageSelect/ImageSelect";
import ContactUs from "./components/contactUs/ContactUs";
import "./App.css";
import MapBox from "./components/maps/Mapbox";
import { ToastContainer } from "react-toastify";
import "mapbox-gl/dist/mapbox-gl.css";

import "react-toastify/dist/ReactToastify.css";
import OpenModal from "./components/openModal/OpenModal";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<MapBox />} />
        <Route path="/report" exact element={<ImageSelect />} />
        <Route path="/us" exact element={<ContactUs />} />
      </Routes>
      <OpenModal />
      <ToastContainer />
    </div>
  );
}

export default App;
