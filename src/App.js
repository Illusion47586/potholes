import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ImageSelect from "./components/imageSelect/ImageSelect";
import ContactUs from "./components/contactUs/ContactUs";
import "./App.css";
import Maps from "./components/maps/Maps";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Maps />} />
        <Route path="/report" exact element={<ImageSelect />} />
        <Route path="/us" exact element={<ContactUs />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
