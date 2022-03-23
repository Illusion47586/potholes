import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ImageSelect from "./components/imageSelect/ImageSelect";
import ContactUs from "./components/contactUs/ContactUs";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<div>Hi</div>} />
        <Route path="/report" exact element={<ImageSelect />} />
        <Route path="/us" exact element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
